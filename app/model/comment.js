'use strict';

const db = require('../db');
module.exports = app => {
  const { UUID, INTEGER, DATE, STRING } = app.Sequelize;
  const Comment = db.defineModel(app, 'comment', {
    user_id: {
      type: UUID,
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
      comment: '父级评论ID',
    },
  });
  Comment.associate = () => {
    Comment.belongsTo(app.model.Article, { foreignKey: 'article_id', targetKey: 'id' });

  };
  return Comment;
};
