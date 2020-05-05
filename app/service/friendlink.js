'use strict';
const Service = require('egg').Service;
class FriendlinkService extends Service {

  // 创建
  async create(params) {
    // console.log('---------------', params)
    const result = await this.app.model.FriendLink.create(params);
    if (!result) {
      this.ctx.throw(404, 'role is not found');
    }
    return result;
  }
  // 创建
  async update(id, params) {
    const label = await this.app.model.FriendLink.findByPk(id);
    if (!label) {
      return false;
    }
    await label.update(params);
    return label;
  }
  // 查询详情
  async getDetail(id) {
    const label = await this.app.model.FriendLink.findOne({
      where: {
        id,
      },
    });
    if (!label) {
      this.ctx.throw(404, 'friend link is not found');
    }
    return label;
  }
}

module.exports = FriendlinkService;
