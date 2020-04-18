'use strict';
/*
options: 中间件的配置项 框架会将app.config[${middlewareName}]传递进来
app: 当前应用 Application的实例

1. 在config中 配置中间件
*/

// app/middleware/auth.js
// options === app.config.auth
module.exports = (options, app) => {
  return async function auth(ctx, next) {
    // 设置模板的全局变量
    ctx.state.csrf = ctx.csrf;
    await next();
  };
};

