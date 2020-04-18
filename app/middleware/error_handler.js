'use strict';

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 控制台输出
      console.error('MiddleWare errorHandler', err);
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);
      // status 如果没有,则统一为500
      const status = err.status || 500;
      // 如果是500错误，且是生产环境，则统一显示“服务器错误，请联系管理员！”
      const error = status === 500 && ctx.app.config.env === 'prod' ? '服务器错误，请联系管理员！' : err;
      // 从 error 对象上读出各个属性，设置到响应中
      ctx.helper.fail(ctx, {
        code: status,
        msg: error.message,
        res: error.errors,
      });
    }
  };
};
