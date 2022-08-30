const package = require('../package.json');
const assert = require('assert');

const clientId = process.env.PAYPAL_CLIENT_ID;
const secret = process.env.PAYPAL_SECRET;
const subscriptionId = process.env.PAYPAL_SUBSCRIPTION_ID;

if (!clientId || !secret || !subscriptionId) {
  throw new Error('You need to supply environment variables: PAYPAL_CLIENT_ID, PAYPAL_SECRET, and PAYPAL_SUBSCRIPTION_ID')
}

const PayPal = require('../dist/index.js');
const paypal = new PayPal({
  clientId: clientId,
  secret: secret,
  environment: 'production',
  log: true,
});

paypal.authenticate()
.then(() => {
  return paypal.execute(`v1/billing/subscriptions/${subscriptionId}`)
  .then((billingData) => {
    console.log('billingData:', billingData.id, billingData.plan_id);
  })
  .catch((e) => {
    console.log('Error fetching data:', e);
  })
})
.catch(e => {
  console.error('Error authenticating:', e)
})

// beforeEach(() => {
// });

// before(() => {
// });

// after(() => {
// });

// /*
//  * ============
//  *  Test Cases
//  * ============
//  */
// describe(`${package.name}`, async () => {


//   describe('.getKeys()', () => {

//     describe('keys', () => {
//       // Normal
//       it('object (one key) => array (one key)', () => {
//         // return assert.deepEqual(powertools.getKeys({name: 'ian'}), ['name']);
//         return true;
//       });

//     });

//   });

// })
