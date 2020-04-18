'use strict';
const Service = require('egg').Service;
class UserService extends Service {
  // 判断数据库里面是否存在该用户
  async login(params) {
    const user = await this.app.model.User.findOne({
      where: {
        ...params,
      },
    });
    if (!user) {
      this.ctx.throw(404, 'user is not found');
    }
    const verifyPsw = params.password === user.password;
    if (!verifyPsw) {
      this.ctx.throw(404, 'user password is error', null);
    }
    return { token: await this.service.actionToken.apply(user.id) };
  }
  // 创建
  async create(params) {
    const result = await this.app.model.User.create(params);
    if (!result) {
      this.ctx.throw(404, 'role is not found');
    }
    return result;
  }
  // 创建
  async update(id, params) {
    const user = await this.app.model.User.findByPk(id);
    if (!user) {
      return false;
    }
    await user.update(params);
    return user;
  }
  // 查询用户信息
  async getUser(id) {
    const user = await this.app.model.User.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      this.ctx.throw(404, 'user is not found');
    }
    return user;
  }
}

module.exports = UserService;
