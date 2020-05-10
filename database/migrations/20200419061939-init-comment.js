'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 comment 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, UUID, STRING } = Sequelize;
    await queryInterface.createTable('comment', {
      id: {
        type: UUID,
        primaryKey: true,
        allowNull: false,
        comment: '评论ID',
      },
      user_id: {
        type: UUID,
        allowNull: false,
        comment: '用户ID',
      },
      user_nickname: {
        type: STRING(100),
        allowNull: false,
        comment: '用户昵称',
      },
      user_email: {
        type: STRING(255),
        allowNull: false,
        comment: '用户邮箱',
      },
      user_url: {
        type: STRING(255),
        allowNull: false,
        comment: '用户网站',
      },
      article_id: {
        type: UUID,
        allowNull: false,
        comment: '文章ID',
      },
      like_count: {
        type: INTEGER(20),
        comment: '评论点赞数',
      },
      date: {
        type: DATE,
        comment: '评论日期',
      },
      content: {
        type: STRING(255),
        comment: '评论内容',
      },
      parent_id: {
        type: UUID,
        allowNull: false,
        comment: '父级评论ID',
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
  // 在执行数据库降级时调用的函数，删除 comment 表
  down: async queryInterface => {
    await queryInterface.dropTable('comment');
  },
};
