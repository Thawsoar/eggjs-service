'use strict';
// app/controller/users.js
const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
  name: {
    required: true,
    type: 'string',
  },
};

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class FriendlinksController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    const result = await ctx.model.FriendLink.findAll(query);
    ctx.helper.success(ctx, { msg: '友链列表查询成功', code: 200, res: result });
  }

  async show() {
    const ctx = this.ctx;
    const result = await ctx.model.FriendLink.findByPk(ctx.params.id);
    ctx.helper.success(ctx, { msg: '查询友链详情成功', res: result });
  }

  async create() {
    const ctx = this.ctx;
    const params = {
      ...ctx.request.body,
    };
    ctx.validate(createRule, params);
    const result = await ctx.service.friendlink.create(params);
    ctx.helper.success(ctx, { msg: '创建友链成功', res: result });
  }

  async update() {
    const ctx = this.ctx;
    const result = await ctx.service.friendlink.update(ctx.params.id, ctx.request.body);
    if (!result) {
      ctx.helper.fail(ctx, { msg: '更新友链失败', res: result });
      return;
    }
    ctx.helper.success(ctx, { msg: '更新友链成功', res: result });
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const result = await ctx.model.FriendLink.findByPk(id);
    if (!result) {
      ctx.helper.fail(ctx, { msg: '删除友链失败', res: result });
      return;
    }
    await result.destroy();
    ctx.helper.success(ctx, { msg: '删除友链成功', res: result });
  }
}

module.exports = FriendlinksController;
