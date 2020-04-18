'use strict';

const db = require('../db');
module.exports = app => {
  const { UUID, TEXT, INTEGER, DATE } = app.Sequelize;
  const Comment = db.defineModel(app, 'comment', {
    user_id: {
      type: UUID,
      comment: '用户ID',
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
      type: TEXT,
      comment: '评论内容',
    },
    parent_id: {
      type: UUID,
      comment: '父级评论ID',
    },
  });

  return Comment;
};
