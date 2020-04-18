'use strict';
// app/controller/users.js
const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
  username: {
    required: true,
    type: 'userName',
  },
  password: 'password',
  email: 'email',
  age: {
    type: 'number', // 年龄范围0-120
    required: false,
    min: 0,
    max: 120,
  },
};

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UsersController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    const result = await ctx.model.User.findAll(query);
    this.ctx.helper.success(ctx, { msg: '用户列表查询成功', code: 200, res: result });
  }

  async show() {
    const ctx = this.ctx;
    const result = await ctx.model.User.findByPk(ctx.params.id);
    ctx.helper.success(ctx, { msg: '用户详情查询成功', res: result });
  }

  async create() {
    const ctx = this.ctx;
    const params = {
      ...ctx.request.body,
      age: toInt(ctx.request.body.age),
      telephone: toInt(ctx.request.body.telephone),
    };
    ctx.validate(createRule, params);
    const user = await ctx.service.user.create(ctx.request.body);
    ctx.helper.success(ctx, { msg: '用户信息创建成功', res: user });
  }

  async update() {
    const ctx = this.ctx;
    const user = await ctx.service.user.update(ctx.params.id, ctx.request.body);
    if (!user) {
      this.ctx.helper.success(ctx, { msg: '用户信息更新失败', res: user });
    }
    ctx.helper.success(ctx, { msg: '用户信息更新成功', res: user });
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.helper.success(ctx, { msg: '删除用户成功', res: user });
      return;
    }
    await user.destroy();
    ctx.helper.success(ctx, { msg: '删除用户成功', res: user });
  }
}

module.exports = UsersController;
