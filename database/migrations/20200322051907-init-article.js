'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 article 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, UUID, TEXT } = Sequelize;
    await queryInterface.createTable('article', {
      id: {
        type: UUID,
        primaryKey: true,
        allowNull: false,
        comment: '文章ID',
      },
      user_id: {
        type: UUID,
        allowNull: false,
        comment: '用户ID',
      },
      title: {
        type: TEXT,
        comment: '文章标题',
      },
      content: {
        type: TEXT,
        comment: '文章内容',
      },
      views: {
        type: INTEGER(20),
        comment: '浏览量',
      },
      comment: {
        type: INTEGER(20),
        comment: '评论总数',
      },
      date: {
        type: DATE,
        comment: '发表时间',
      },
      like_count: {
        type: INTEGER(20),
        comment: '点赞数量',
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
  // 在执行数据库降级时调用的函数，删除 article 表
  down: async queryInterface => {
    await queryInterface.dropTable('article');
  },
};
