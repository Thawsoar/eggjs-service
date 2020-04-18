'use strict';
/*
options: 中间件的配置项 框架会将app.config[${middlewareName}]传递进来
app: 当前应用 Application的实例

1. 在config中 配置中间件
*/

// app/middleware/robot.js
// options === app.config.robot
module.exports = (options, app) => {
  return async function robotMiddleware(ctx, next) {
    const source = ctx.get('user-agent') || '';
    const match = options.ua.some(ua => ua.test(source));
    if (match) {
      ctx.status = 403;
      ctx.message = 'Go away, robot.';
    } else {
      await next();
    }
  };
};

