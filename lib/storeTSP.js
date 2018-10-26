'use strict';

const https = require('http');
const axios = require('axios');

function storeTSP (data) {
  let url = 'http://172.17.0.3:3000/api/v1/store';

  axios.post(url, data).then(res => {
    console.log('response: ', res);

  }).catch(err => {
    console.error(err);
  });
}

module.exports = storeTSP;
