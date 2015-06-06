'use strict';

var api = {
  getMapData() {
    var url = `https://api.github.com/users/klgilbert`;
    return fetch(url).then((res) => res.json())
  }
};

module.exports = api;
