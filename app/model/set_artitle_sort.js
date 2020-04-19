'use strict';

const uuidv1 = require('uuid/v1');

module.exports = app => {
  const { UUID } = app.Sequelize;
  function generateUUID() {
    return uuidv1().replace(/-/g, '');
  }
  const SetArtitleSort = app.model.define('set_artitle_label', {
    article_id: {
      type: UUID,
      primaryKey: true,
      defaultValue: () => {
        return generateUUID();
      },
    },
    label_id: {
      type: UUID,
      defaultValue: () => {
        return generateUUID();
      },
    },
  }, {
    created_at: 'created_at',
    updated_at: 'updated_at',
    version: true,
    freezeTableName: true,
  });

  return SetArtitleSort;
};
