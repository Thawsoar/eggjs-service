'use strict';
// app/controller/users.js
const Controller = require('egg').Controller;
const qs = require('qs')
// 定义创建接口的请求参数规则
const createRule = {
  username: {
    required: true,
    type: 'userName',
  },
  password: 'password',
};


class LoginController extends Controller {
  async login() {
    const ctx = this.ctx;
    // ctx.validate(createRule, ctx.request.body);
    const { username, password } = ctx.request.body;
    const token = await ctx.service.user.login({ username, password });
    this.ctx.helper.success(ctx, { msg: '登录成功', res: token });
  }

  async getUserInfo() {
    const ctx = this.ctx;
    const token = ctx.request.header['x-token'];
    // { id, exp, iat }
    const { data: { id } } = ctx.app.jwt.decode(token);
    const userInfo = await ctx.service.user.getUser(id);
    this.ctx.helper.success(ctx, { msg: '获取用户信息成功', res: userInfo });
  }
  async getGithubUserInfo() {
    const ctx = this.ctx;
    const code = ctx.request.body.code;
    const githubConfig = ctx.app.config.passportGithub;
    const result = await ctx.curl(githubConfig.access_token_url, {
      method: 'post',
      contentType: 'json',
      data: {
        client_id: githubConfig.clientID,
        client_secret: githubConfig.clientSecret,
        code,
      },
      dataType: 'json',
    });
    const access_token = result.data.access_token;
    if (access_token) {
      const userInfo = await ctx.curl(`${githubConfig.user_info_url}?access_token=${access_token}`, {
        headers: {
          Authorization: `token ${access_token}`,
          'User-Agent': 'eggjs-service',
        },
      });
      this.ctx.helper.success(ctx, { msg: '获取用户信息成功', res: JSON.parse(userInfo.data) });
    } else {
      this.ctx.helper.fail(ctx, { msg: 'code不正确或已过期，请重新登录', res: result.data });
    }
  }
  async logout() {
    const ctx = this.ctx;
    const token = ctx.request.header['x-token'];
    if (token) {
      this.ctx.helper.success(ctx, { msg: '登出成功' });
    } else {
      this.ctx.helper.fail(ctx, { msg: '你已经登出' });
    }
  }
}

module.exports = LoginController;
