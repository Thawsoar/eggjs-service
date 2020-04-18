'use strict';
module.exports = app => {

  const { validator } = app;

  // 校验用户名是否正确
  validator.addRule('userName', (rule, value) => {
    if (/^\d+$/.test(value)) {
      return '用户名必须是字符串';
    } else if (value.length < 6 || value.length > 12) {
      return '用户名的长度必须在6-12之间';
    }
  });
};
