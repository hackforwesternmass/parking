'use strict';

var api = {
  getMapData() {
    var url = `https://localhost:50000/api/garage`;
    return fetch(url).then((res) => res.json())
  }
};

module.exports = api;
