'use strict';

const https = require('https');
const axios = require('axios');

function storeTSP (data, cb) {
  let url = 'https://tsp.caixamagica.pt/api/v1/store';

  axios.post(url, data).then(res => {
    cb(null, res.data);

  }).catch(err => {
    let error = JSON.parse(JSON.stringify(err));
    error = error.response.data.message;
    cb(error, null);
  });
}

module.exports = storeTSP;
