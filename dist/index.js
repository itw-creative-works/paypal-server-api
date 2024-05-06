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

  return new Promise(function(resolve, reject) {
    const url = `${self._getURL('v1/oauth2/token')}`;

    // Log
    self._log('Authenticate', url);

    // Authenticate with server
    fetch(url, {
      method: 'post',
      response: 'json',
      tries: 2,
      timeout: 30000,
      cacheBreaker: false,
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

  return new Promise(function(resolve, reject) {
    options = options || {};
    url = self._getURL(url);

    // Build payload
    const payload = {
      method: options.method || 'get',
      response: 'text',
      tries: 2,
      timeout: 30000,
      cacheBreaker: false,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'en_US',
        'Authorization': `Bearer ${self.access_token}`,
      },
    }

    // Add body
    if (options.body) {
      payload.body = options.body;
    }

    // Add headers
    if (options.headers) {
      payload.headers = Object.assign(payload.headers, options.headers);
    }

    // Log
    self._log('Execute', url, payload.headers, payload.body || {});

    // Execute
    fetch(url, payload)
      .then(async (text) => {
        // Log
        self._log('Response (raw)', text);

        // Parse JSON
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

PayPal.prototype._log = function () {
  const self = this;

  if (self.log) {
    console.log('[PayPal]', ...arguments);
  }
};

PayPal.prototype._getURL = function (url) {
  const self = this;

  url = (url || '')
    // Remove leading slashes
    .replace(/^\/+/, '')

  return (self.environment === 'sandbox' || self.environment === 'development' || self.environment === 'dev'
    ? `https://api-m.sandbox.paypal.com/${url}`
    : `https://api.paypal.com/${url}`)
};

module.exports = PayPal;
