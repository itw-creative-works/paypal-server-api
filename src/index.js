const fetch = require('wonderful-fetch');
const JSON5 = require('json5');

function PayPal(options) {
  const self = this;

  options = options || {};
  
  self.client_id = options.client_id || options.clientId || options.username || '';
  self.secret = options.secret || options.password || '';
  self.environment = options.environment || 'sandbox';
  self.access_token = '';
  self.log = options.log;

  self.tries = typeof options.tries === 'undefined' 
    ? 2
    : options.tries

  self.timeout = typeof options.timeout === 'undefined' 
    ? 30000
    : options.timeout    

  return self;
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
      response: 'json',
      tries: 2,
      timeout: 30000,      
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'en_US',
        'Authorization': `Basic ${Buffer.from(self.client_id + ':' + self.secret).toString('base64')}`,
      },
      body: 'grant_type=client_credentials',
    })
    .then(async (json) => {
      if (!json || !json.access_token) {
        return reject(new Error('No access token.'))
      }
      self.access_token = json.access_token;
      return resolve(json);
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
      response: 'text',
      tries: 2,
      timeout: 30000,         
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
      .then(async (text) => {
        try {
          return resolve(JSON5.parse(text));
        } catch (e) {
          return resolve(text);
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
