'use strict';
const Controller = require('egg').Controller;
// https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html
const wxConfig = {
  appid: 'wx48e2e5e33a760777',
  appSecret: '0dc72573dd693debdd2957d8e2c86d17',
};

class WxminiController extends Controller {
  // 获取用户openid
  // 通过 wx.login 接口获得临时登录凭证 code 后传到开发者服务器调用此接口完成登录流程
  async openid() {
    const { ctx } = this;
    console.log('----------------this', ctx);
    const urlStr = 'https://api.weixin.qq.com/sns/jscode2session';
    const data = {
      appid: wxConfig.appid, // 小程序 appId
      secret: wxConfig.appSecret, // 小程序 appSecret
      js_code: ctx.query.code, // 登录时获取的 code
      grant_type: 'authorization_code', // 授权类型，此处只需填写 authorization_code
    };
    const result = await ctx.curl(urlStr, {
      data,
      dataType: 'json',
    });
    if (result.data.errmsg) {
      ctx.body = {
        status: 101,
        msg: '操作失败',
        errcode: result.data.errcode,
        errmsg: result.data.errmsg,
      };
    } else {
      ctx.body = {
        status: 100,
        msg: '操作成功',
        openid: result.data.openid,
        session_key: result.data.session_key,
      };
    }
  }
  // 获取小程序全局唯一后台接口调用凭据（access_token）
  async getAccessToken() {
    const { ctx } = this;
    console.log('----------------this', ctx);
    const urlStr = 'https://api.weixin.qq.com/cgi-bin/token';
    const data = {
      appid: wxConfig.appid, // 小程序 appId
      secret: wxConfig.appSecret, // 小程序 appSecret
      grant_type: 'client_credential', // 授权类型，此处只需填写 authorization_code
    };
    const result = await ctx.curl(urlStr, {
      data,
      dataType: 'json',
    });
    if (result.data.errmsg) {
      ctx.body = {
        status: 101,
        msg: '操作失败',
        errcode: result.data.errcode,
        errmsg: result.data.errmsg,
      };
    } else {
      ctx.body = {
        status: 100,
        msg: '操作成功',
        expires_in: result.data.expires_in,
        access_token: result.data.access_token,
      };
    }
  }
}

module.exports = WxminiController;
