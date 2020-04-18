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

class SortsController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    const result = await ctx.model.Sort.findAll(query);
    ctx.helper.success(ctx, { msg: '分类列表查询成功', code: 200, res: result });
  }

  async show() {
    const ctx = this.ctx;
    const result = await ctx.model.Sort.findByPk(ctx.params.id);
    ctx.helper.success(ctx, { msg: '查询分类详情成功', res: result });
  }

  async create() {
    const ctx = this.ctx;
    const params = {
      ...ctx.request.body,
    };
    ctx.validate(createRule, params);
    const user = await ctx.service.Sort.create(ctx.request.body);
    ctx.helper.success(ctx, { msg: '创建分类成功', res: user });
  }

  async update() {
    const ctx = this.ctx;
    const user = await ctx.service.Sort.update(ctx.params.id, ctx.request.body);
    if (!user) {
      ctx.helper.fail(ctx, { msg: '更新分类失败', res: user });
      return;
    }
    ctx.helper.success(ctx, { msg: '更新分类成功', res: user });
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const user = await ctx.model.Sort.findByPk(id);
    if (!user) {
      ctx.helper.fail(ctx, { msg: '删除分类失败', res: user });
      return;
    }
    await user.destroy();
    ctx.helper.success(ctx, { msg: '删除分类成功', res: user });
  }
}

module.exports = SortsController;
