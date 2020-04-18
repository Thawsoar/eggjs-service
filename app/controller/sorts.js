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
      parent_id: ctx.request.body.parent_id || '0',
    };
    ctx.validate(createRule, params);
    const result = await ctx.service.Sort.create(params);
    ctx.helper.success(ctx, { msg: '创建分类成功', res: result });
  }

  async update() {
    const ctx = this.ctx;
    console.log('----------------------------------------', ctx.service.sort)
    const result = await ctx.service.sort.update(ctx.params.id, ctx.request.body);
    if (!result) {
      ctx.helper.fail(ctx, { msg: '更新分类失败', res: result });
      return;
    }
    ctx.helper.success(ctx, { msg: '更新分类成功', res: result });
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const result = await ctx.model.sort.findByPk(id);
    if (!result) {
      ctx.helper.fail(ctx, { msg: '删除分类失败', res: result });
      return;
    }
    await result.destroy();
    ctx.helper.success(ctx, { msg: '删除分类成功', res: result });
  }
}

module.exports = SortsController;
