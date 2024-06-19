<p align="center">
  <a href="https://itwcreativeworks.com">
    <img src="https://cdn.itwcreativeworks.com/assets/itw-creative-works/images/logo/itw-creative-works-brandmark-black-x.svg" width="100px">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/package-json/v/itw-creative-works/paypal-server-api.svg">
  <br>
  <img src="https://img.shields.io/librariesio/release/npm/paypal-server-api.svg">
  <img src="https://img.shields.io/bundlephobia/min/paypal-server-api.svg">
  <img src="https://img.shields.io/codeclimate/maintainability-percentage/itw-creative-works/paypal-server-api.svg">
  <img src="https://img.shields.io/npm/dm/paypal-server-api.svg">
  <img src="https://img.shields.io/node/v/paypal-server-api.svg">
  <img src="https://img.shields.io/website/https/itwcreativeworks.com.svg">
  <img src="https://img.shields.io/github/license/itw-creative-works/paypal-server-api.svg">
  <img src="https://img.shields.io/github/contributors/itw-creative-works/paypal-server-api.svg">
  <img src="https://img.shields.io/github/last-commit/itw-creative-works/paypal-server-api.svg">
  <br>
  <br>
  <a href="https://itwcreativeworks.com">Site</a> | <a href="https://www.npmjs.com/package/paypal-server-api">NPM Module</a> | <a href="https://github.com/itw-creative-works/paypal-server-api">GitHub Repo</a>
  <br>
  <br>
  <strong>PayPal API</strong> makes it easy to work with the PayPal API.
</p>

## 📦 Install PayPal API
Install with npm:
```shell
npm install paypal-server-api
```

## 🦄 Features
* Work with the PayPal API

## 📘 Example Setup
After installing via npm, simply `require` the library and authenticate it.
```js
// In your functions/index.js file
const Payapl = require('paypal-server-api');
const paypal = new Payapl({
  clientId: 'client_id', // Your PayPal client ID
  secret: 'secret', // Your PayPal secret
  environment: 'production', // Determine which API URL to use (sandbox OR production)
  log: true, // Log some information to the console
});

// Authenticate with PayPal
await paypal.authenticate();
```

## 🚀 Making calls
After installing and authenticating, begin enjoying the library 🧰.
```js
// Get subscription details
const subscription = await paypal.execute(`v1/billing/subscriptions/I-ABC123ABC123`);

// Update subscription pricing
const update = await paypal.execute(`v1/billing/subscriptions/I-ABC123ABC123`, {
  method: 'PATCH',
  body: [
    {
      op: 'replace',
      path: '/plan/billing_cycles/@sequence==1/pricing_scheme/fixed_price',
      value: {
        currency_code: 'USD',
        value: '19.95',
      },
    },
    {
      op: 'replace',
      path: '/plan/payment_preferences/payment_failure_threshold',
      value: 0,
    },
    {
      op: 'replace',
      path: '/plan/payment_preferences/auto_bill_outstanding',
      value: true,
    },
  ]
});
```

## 🧪 Testing the library
Add your PayPal client secret and client ID to environment variables and run the test command
```shell
export PAYPAL_CLIENT_ID="..."
export PAYPAL_SECRET="..."
export PAYPAL_SUBSCRIPTION_ID="..."

npm run test
```


## 🗨️ Final Words
If you are still having difficulty, we would love for you to post a question to [the PayPal API issues page](https://github.com/itw-creative-works/paypal-server-api/issues). It is much easier to answer questions that include your code and relevant files! So if you can provide them, we'd be extremely grateful (and more likely to help you find the answer!)

## 📚 Projects Using this Library
[Somiibo](https://somiibo.com/): A Social Media Bot with an open-source module library. <br>
[JekyllUp](https://jekyllup.com/): A website devoted to sharing the best Jekyll themes. <br>
[Slapform](https://slapform.com/): A backend processor for your HTML forms on static sites. <br>
[Proxifly](https://proxifly.com/): A backend processor for your HTML forms on static sites. <br>
[SoundGrail Music App](https://app.soundgrail.com/): A resource for producers, musicians, and DJs. <br>
[Hammock Report](https://hammockreport.com/): An API for exploring and listing backyard products. <br>

Ask us to have your project listed! :)
