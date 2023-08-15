import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/mdi-v5/mdi-v5.css';
import '@quasar/extras/animate/fadeInUp.css';
import '@quasar/extras/animate/fadeOutDown.css';
import '@quasar/extras/animate/fadeInRight.css';
import '@quasar/extras/animate/fadeOutRight.css';

import 'quasar/dist/quasar.css';

import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import { i18n } from '../src/boot/i18n';
import { createPinia } from 'pinia';

import { Quasar } from 'quasar';

setup((app) => {
  app.use(Quasar, {});
  app.use(i18n);
  app.use(createPinia());
});

const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en-US', title: 'English' },
        { value: 'zh-CN', title: '简体中文' },
      ],
      showName: true,
    },
  },
};

const decorator = (story, context) => {
  const { locale } = context.globals;
  i18n.global.locale.value = locale;
  return story();
};

const preview: Preview = {
  globalTypes,
  decorators: [decorator],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
