'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 set_artitle_sort 表
  up: async (queryInterface, Sequelize) => {
    const { DATE, UUID, INTEGER } = Sequelize;
    await queryInterface.createTable('set_artitle_sort', {
      article_id: {
        type: UUID,
        primaryKey: true,
        allowNull: false,
        comment: '文章ID',
      },
      label_id: {
        type: UUID,
        allowNull: false,
        comment: '分类ID',
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
  // 在执行数据库降级时调用的函数，删除 set_artitle_sort 表
  down: async queryInterface => {
    await queryInterface.dropTable('set_artitle_sort');
  },
};
