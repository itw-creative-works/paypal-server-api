<p align="center">
  <a href="https://cdn.itwcreativeworks.com/assets/itw-creative-works/images/logo/itw-creative-works-brandmark-black-x.svg">
    <img src="https://cdn.itwcreativeworks.com/assets/itw-creative-works/images/logo/itw-creative-works-brandmark-black-x.svg">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/package-json/v/itw-creative-works/paypal-server-api.svg">
  <br>
  <img src="https://img.shields.io/david/itw-creative-works/paypal-server-api.svg">
  <img src="https://img.shields.io/david/dev/itw-creative-works/paypal-server-api.svg">
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
  <strong>PayPal API</strong> is an NPM module for backend and frontend developers that exposes powerful utilities and tools.
</p>

## Install
Install with npm:
```shell
npm install paypal-server-api
```

## Features
* Work with the PayPal API

## Example Setup
After installing via npm, simply `require` the library and begin enjoying the library 🧰.
```js
// In your functions/index.js file
const Payapl = require('paypal-server-api');
const paypal = new Payapl({
  clientId: 'client_id',
  secret: 'secret',
  environment: 'production', // production | sandbox
  log: true,
});
await paypal.authenticate();
const billingData = await paypal.execute(`v1/billing/subscriptions/I-ABC123ABC123`);

```

## Final Words
If you are still having difficulty, we would love for you to post a question to [the PayPal API issues page](https://github.com/itw-creative-works/paypal-server-api/issues). It is much easier to answer questions that include your code and relevant files! So if you can provide them, we'd be extremely grateful (and more likely to help you find the answer!)

## Projects Using this Library
[Somiibo](https://somiibo.com/): A Social Media Bot with an open-source module library. <br>
[JekyllUp](https://jekyllup.com/): A website devoted to sharing the best Jekyll themes. <br>
[Slapform](https://slapform.com/): A backend processor for your HTML forms on static sites. <br>
[Proxifly](https://proxifly.com/): A backend processor for your HTML forms on static sites. <br>
[SoundGrail Music App](https://app.soundgrail.com/): A resource for producers, musicians, and DJs. <br>
[Hammock Report](https://hammockreport.com/): An API for exploring and listing backyard products. <br>

Ask us to have your project listed! :)
