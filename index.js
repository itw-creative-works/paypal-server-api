const fetch = require('node-fetch');

function PayPal(options) {
  options = options || {};
  this.client_id = options.client_id || options.clientId || options.username || '';
  this.secret = options.secret || options.password || '';
  this.environment = options.environment || 'sandbox';
  this.access_token = '';
  this.log = options.log;
  return this;
}

PayPal.prototype.authenticate = function () {
  const self = this;
  const url = `${self._getURL('v1/oauth2/token')}`;
  if (self.log) {
    console.log('Authenticate', url);
  }

  return new Promise(function(resolve, reject) {
    fetch(url, {
      method: 'post',
      body: 'grant_type=client_credentials',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'en_US',
        'Authorization': `Basic ${Buffer.from(self.client_id + ':' + self.secret).toString('base64')}`,
      },
    })
    .then(async (res) => {
      if (res.status >= 200 && res.status < 300) {
        let json = await res.json();
        if (!json || !json.access_token) {
          return reject(new Error('No access token.'))
        }
        self.access_token = json.access_token;
        return resolve(json);
      } else {
        return reject(new Error(res.statusText || 'Unknown error.'))
      }
    })
    .catch(e => {
      return reject(e);
    });
  });
};

PayPal.prototype.execute = function (url, options) {
  const self = this;

  options = options || {};
  url = self._getURL(url);
  if (self.log) {
    console.log('Execute', url);
  }

  let payload =
    {
      method: options.method || 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'en_US',
        'Authorization': `Bearer ${self.access_token}`,
      },
    }

  if (options.body) {
    payload.body = JSON.stringify(options.body);
  }

  return new Promise(function(resolve, reject) {
    fetch(url, payload)
      .then(async (res) => {
        if (res.status >= 200 && res.status < 300) {
          let json = await res.json()
          return resolve(json);
        } else {
          return reject(new Error(res.statusText || 'Unknown error.'))
        }
      })
      .catch(e => {
        return reject(e);
      });
  });
}

PayPal.prototype._getURL = function (url) {
  const self = this;
  return (self.environment === 'sandbox' || self.environment === 'development' || self.environment === 'dev'
    ? `https://api-m.sandbox.paypal.com/${url}`
    : `https://api.paypal.com/${url}`).replace(/v1\/\//g, '')
};


module.exports = PayPal;
