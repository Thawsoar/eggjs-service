'use strict';

const db = require('../db');
module.exports = app => {
  const { UUID, TEXT, INTEGER, DATE } = app.Sequelize;
  const Article = db.defineModel(app, 'article', {
    user_id: {
      type: UUID,
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
  });

  return Article;
};
