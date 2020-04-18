'use strict';

module.exports = {
  getRequest() {
    console.log(this);
    return this.header.host;
  },
};
