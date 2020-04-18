'use strict';

const moment = require('moment');
// exports.relativeTime = time => moment(new Date(time * 1000)).fromNow();

// uuid格式：年月日时分秒3位毫秒+3位随机数，共20位  ===>   20190312162455043167
exports.uuid = function uuid() {
  let uuid = moment().format('YYYYMMDDHHmmssSSS');
  uuid += (Array(3).join(0) + Math.random() * 100).slice(-3);
  return uuid;
};

exports.errorCode = {
  200: '请求成功。客户端向服务器请求数据，服务器返回相关数据',
  201: '资源创建成功。客户端向服务器提供数据，服务器创建资源',
  202: '请求被接收。但处理尚未完成',
  204: '客户端告知服务器删除一个资源，服务器移除它',
  206: '请求成功。但是只有部分回应',
  400: '请求无效。数据不正确，请重试',
  401: '请求没有权限。缺少API token，无效或者超时',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求失败。请求头部不一致，请重试',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '请求失败。请验证参数',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

module.exports = {
  /**
   * 调用正常情况的返回数据封装
   * @param {Object} ctx - context
   * @param {Number} code - 返回的errorCode
   * @param {String} msg - 自定义返回的信息
   * @param {*} res - 返回的状态数据
   */

  success: (ctx, { code = 200, msg = null, res = null }) => {
    ctx.status = 200;
    ctx.body = {
      result: true,
      code,
      msg: msg || ctx.helper.errorCode[code],
      data: res,
    };
  },

  /**
   * 处理失败，处理传入的失败原因
   * @param {Object} ctx - context
   * @param {String} msg - 自定义返回的信息
   * @param {Number} code - 返回的errorCode
   * @param {*} res - 返回的状态数据
   */

  fail: (ctx, { code = 500, msg = null, res = null }) => {
    ctx.status = 200;
    ctx.body = {
      result: false,
      code,
      msg: msg || ctx.helper.errorCode[code],
      data: {
        error: res,
      },
    };
  },
};
