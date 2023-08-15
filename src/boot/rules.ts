const rulesName = [
    (v: string) => !!v || '名称不能为空',
    // (v: string) => (v && v.length <= 10) || '名称不能超过10个字符',
  ];
  const rulesClass = [
    (v: string) => !!v || '分类不能为空',
    // (v: string) => (v && v.length <= 10) || '名称不能超过10个字符',
  ];
  const rulesCode = [
    (v: string) => !!v || '账号不能为空',
    (v: string) => (v && v.length <= 10) || '账号不能超过10个字符',
  ];
  const rulesPwd = [
    (v: string) => !!v || '密码不能为空',
    (v: string) => (v && v.length <= 10) || '密码不能超过10个字符',
    (v: string) => (v && v.length >= 5) || '密码不能少于5个字符',
  ];
  const rulesPhone = [
    (v: string) => !!v || '手机号不能为空',
    (v: string) => (v && v.length <= 11) || '手机号不能超过11个字符',
    (v: string) => (v && v.length >= 11) || '手机号不能少于11个字符',
  ];
  const rulesCard = [
    (v: string) => !!v || '身份证号不能为空',
    (v: string) => (v && v.length <= 18) || '身份证号不能超过18个字符',
    (v: string) => (v && v.length >= 18) || '身份证号不能少于18个字符',
    (v: string) => {
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      return reg.test(v) || '身份证号格式不正确';
    },
  ];
  const rulesSex = [(v: string) => !!v || '性别不能为空'];
  
  const rulesDateTime = [
    (v: string) => !!v || '时间不能为空',
    (v: string) => {
      const reg = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/;
      return reg.test(v) || '时间格式不正确,正确格式为:2020-01-01 00:00';
    },
  ];
  
  const rulesDepartmentName = [(v: string) => !!v || '科室名称不能为空'];
  
  const rulesORoomName = [(v: string) => !!v || '手术室名称不能为空'];
  
  export {
    rulesName,
    rulesCode,
    rulesPwd,
    rulesPhone,
    rulesCard,
    rulesSex,
    rulesClass,
    rulesDateTime,
    rulesDepartmentName,
    rulesORoomName,
  };
  