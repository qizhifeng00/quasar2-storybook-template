import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { $bugout } from 'boot/debugout';
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: (window as any).api.apiURL });

axios.defaults.baseURL = (window as any).api.apiURL;
// axios.defaults.headers.common['Content-Type'] =
//   'application/json;charset=UTF-8;';

//封装http请求
class QiHttp {
  instance: QiHttp;
  constructor() {
    this.instance = this;
    this.register();
  }

  /**
   * Send Request.
   * @param config
   */
  protected async send(config: AxiosRequestConfig): Promise<any> {
    if (!config.timeout) config.timeout = 60000;
    $bugout.log(config.data);

    return await axios(config)
      .then((res: any) => {
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  /**
   * Registration of common methods.
   * Without `CONNECT`, `TRACE`.
   * @type Promise
   */
  register(): void {
    ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'].forEach(
      (method) => {
        this.instance[method.toLocaleLowerCase()] = (
          url: string,
          data: { [index: string]: any } = {},
          config?: AxiosRequestConfig & {
            retry?: number;
            retryDelay?: number;
            retryCount?: 0;
          }
        ): Promise<any> => {
          const args: { [index: string]: any } = {
            url,
            data: data,
            method: method.toUpperCase(),
            retry: 0,
            retryDelay: 1000,
            retryCount: (config && config.retryCount) || 0,
          };
          if (method.toUpperCase() === 'GET') {
            delete args.data;
            args.params = data;
          }
          const configuration = Object.assign({}, args, config);
          return this.send(configuration);
        };
      }
    );
  }
}

export const $http = new QiHttp() as any;

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  app.config.globalProperties.$http = $http;
});

export { api };
