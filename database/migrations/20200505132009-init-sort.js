'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 sort 表
  up: async (queryInterface, Sequelize) => {
    const { STRING, DATE, UUID, TEXT, INTEGER } = Sequelize;
    await queryInterface.createTable('sort', {
      id: {
        type: UUID,
        primaryKey: true,
        allowNull: false,
        comment: '分类ID',
      },
      name: {
        type: STRING(20),
        comment: '分类名称',
      },
      alias: {
        type: STRING(15),
        comment: '分类别名',
      },
      description: {
        type: TEXT,
        comment: '分类描述',
      },
      parent_id: {
        type: UUID,
        allowNull: false,
        comment: '父分类ID',
      },
      created_at: {
        type: DATE,
        comment: '创建时间',
      },
      updated_at: {
        type: DATE,
        comment: '修改时间',
      },
      version: {
        type: INTEGER(11),
      },
    });
  },
  // 在执行数据库降级时调用的函数，删除 sort 表
  down: async queryInterface => {
    await queryInterface.dropTable('sort');
  },
};
