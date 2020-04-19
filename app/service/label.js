'use strict';
const Service = require('egg').Service;
class LabelService extends Service {

  // 创建
  async create(params) {
    // console.log('---------------', params)
    const result = await this.app.model.Label.create(params);
    if (!result) {
      this.ctx.throw(404, 'role is not found');
    }
    return result;
  }
  // 创建
  async update(id, params) {
    const label = await this.app.model.Label.findByPk(id);
    if (!label) {
      return false;
    }
    await label.update(params);
    return label;
  }
  // 查询用户信息
  async getLabel(id) {
    const label = await this.app.model.Label.findOne({
      where: {
        id,
      },
    });
    if (!label) {
      this.ctx.throw(404, 'Label is not found');
    }
    return label;
  }
}

module.exports = LabelService;
