'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 user 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, UUID } = Sequelize;
    await queryInterface.createTable('user', {
      id: {
        type: UUID,
        primaryKey: true,
        allowNull: false,
        comment: '用户ID',
      },
      ip: {
        type: STRING(20),
        comment: '用户IP',
      },
      username: {
        type: STRING(20),
        comment: '用户姓名',
      },
      password: {
        type: STRING(16),
        comment: '用户密码',
      },
      email: {
        type: STRING(30),
        unique: true,
        comment: '用户邮箱',
      },
      profile_pho: {
        type: STRING(255),
        comment: '用户头像',
      },
      registration: {
        type: DATE,
        comment: '用户注册时间',
      },
      birthday: {
        type: DATE,
        comment: '用户生日',
      },
      age: {
        type: INTEGER(4),
        comment: '用户年龄',
      },
      telephone: {
        type: INTEGER(11),
        comment: '用户手机',
      },
      nickname: {
        type: STRING(20),
        comment: '用户昵称',
      },
      created_at: {
        type: DATE,
        comment: '创建时间',
      },
      updated_at: {
        type: DATE,
        comment: '修改时间',
      },
      version: true,
    });
  },
  // 在执行数据库降级时调用的函数，删除 user 表
  down: async queryInterface => {
    await queryInterface.dropTable('user');
  },
};
