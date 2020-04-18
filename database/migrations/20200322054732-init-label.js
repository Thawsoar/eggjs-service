'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 label 表
  up: async (queryInterface, Sequelize) => {
    const { STRING, DATE, UUID, TEXT } = Sequelize;
    await queryInterface.createTable('label', {
      id: {
        type: UUID,
        primaryKey: true,
        allowNull: false,
        comment: '标签ID',
      },
      name: {
        type: STRING(20),
        comment: '标签名称',
      },
      alias: {
        type: STRING(15),
        comment: '标签别名',
      },
      description: {
        type: TEXT,
        comment: '标签描述',
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
  // 在执行数据库降级时调用的函数，删除 label 表
  down: async queryInterface => {
    await queryInterface.dropTable('label');
  },
};
