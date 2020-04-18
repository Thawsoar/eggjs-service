'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 friend 表
  up: async (queryInterface, Sequelize) => {
    const { STRING, DATE, UUID } = Sequelize;
    await queryInterface.createTable('friend', {
      id: {
        type: UUID,
        primaryKey: true,
        allowNull: false,
        comment: 'ID',
      },
      user_id: {
        type: UUID,
        allowNull: false,
        comment: '用户ID',
      },
      user_friend_id: {
        type: UUID,
        allowNull: false,
        comment: '好友ID',
      },
      user_note: {
        type: STRING(20),
        comment: '好友备注',
      },
      user_status: {
        type: STRING(20),
        comment: '好友状态',
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
  // 在执行数据库降级时调用的函数，删除 friend 表
  down: async queryInterface => {
    await queryInterface.dropTable('friend');
  },
};
