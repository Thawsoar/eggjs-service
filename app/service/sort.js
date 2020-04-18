'use strict';
const Service = require('egg').Service;
class SortService extends Service {

  // 创建
  async create(params) {
    const result = await this.app.model.Sort.create(params);
    if (!result) {
      this.ctx.throw(404, 'role is not found');
    }
    return result;
  }
  // 创建
  async update(id, params) {
    const sort = await this.app.model.Sort.findByPk(id);
    if (!sort) {
      return false;
    }
    await sort.update(params);
    return sort;
  }
  // 查询用户信息
  async getSort(id) {
    const sort = await this.app.model.Sort.findOne({
      where: {
        id,
      },
    });
    if (!sort) {
      this.ctx.throw(404, 'Sort is not found');
    }
    return sort;
  }
}

module.exports = SortService;
