'use strict';

const db = require('../db');

module.exports = app => {
  const { UUID, TEXT, INTEGER, DATE, STRING } = app.Sequelize;
  const Article = db.defineModel(app, 'article', {
    user_id: {
      type: UUID,
      comment: '用户ID',
    },
    title: {
      type: STRING(300),
      comment: '文章标题',
    },
    description: {
      type: STRING(300),
      comment: '文章简介',
    },
    content: {
      type: TEXT,
      comment: '文章内容',
    },
    img_url: {
      type: STRING(300),
      comment: '文章图片地址',
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

  Article.associate = () => {
    // 定义多对多关联
    Article.belongsToMany(app.model.Label, {
      // 中间表的model
      through: app.model.SetArtitleLabel,
    });

    Article.belongsToMany(app.model.Sort, {
      // 中间表的model
      through: app.model.SetArtitleSort,
    });
  };
  return Article;
};
