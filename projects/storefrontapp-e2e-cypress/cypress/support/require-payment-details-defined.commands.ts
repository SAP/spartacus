// import { generateMail } from '../helpers/user';
import { product } from '../sample-data/big-happy-path';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Make sure you have placed the order. Returns order object.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.requirePlacedOrder(); // default values
        cy.requirePlacedOrder(user, product, cart);
        ```
       */
      requirePaymentDetailsDefined: (auth: {}) => Cypress.Chainable<{}>;
    }
  }
}
Cypress.Commands.add('requirePaymentDetailsDefined', res => {
  console.log('sm', product);
  const apiUrl = Cypress.env('API_URL');
  // const email = res.email;
  function getResponseUrl() {
    return cy.request({
      method: 'GET',
      url: `${apiUrl}/rest/v2/electronics/users/current/carts/current/payment/sop/request?responseUrl=sampleUrl`,
      // body: {
      //   deliveryModeId: 'standard-gross'
      // },
      form: false,
      headers: {
        Authorization: `bearer ${res.userToken.token.access_token}`
      }
    });
  }

  function doVerification(data) {
    return cy.request({
      method: 'POST',
      url: `${apiUrl}/acceleratorservices/sop-mock/process`,
      body: data,
      form: true,
      headers: {
        Authorization: `bearer ${res.userToken.token.access_token}`
      }
    });
  }
  function doPayment(data) {
    console.log('dp', data);
    data.decision = 'ACCEPT';
    data.card_cardType = 'visa';
    data.card_accountNumber = '4111111111111111';
    data.card_expirationMonth = '02';
    data.card_expirationYear = '2020';
    data.card_nameOnCard = 'dfdfdfdfdfdfs';

    return cy.request({
      method: 'POST',
      url: `${apiUrl}/rest/v2/electronics/users/current/carts/current/payment/sop/response`,
      body: data,
      form: true,
      headers: {
        Authorization: `bearer ${res.userToken.token.access_token}`
      }
    });
  }

  function convertToMap(paramList: { key; value }[]) {
    return paramList.reduce(function(result, item) {
      const key = item.key;
      result[key] = item.value;
      return result;
    }, {});
  }
  cy.server();
  // setShippingMethod().then(resp => cy.wrap(resp));
  getResponseUrl().then(resp => {
    // console.log('ml', convertToMap(resp.body.parameters.entry));
    doVerification(convertToMap(resp.body.parameters.entry));
    doPayment(convertToMap(resp.body.parameters.entry)).then(resp2 => {
      console.log('P', resp2);
    });
  });
});
// "0%5Bkey%5D=billTo_city&0%5Bvalue%5D=Tralfamadore&1%5Bkey%5D=billTo_email&1%5Bvalue%5D=user_4ce3cchxd_17450690673%40ydev.hybris.com&2%5Bkey%5D=shipTo_lastName&2%5Bvalue%5D=Rumfoord&3%5Bkey%5D=recurringSubscriptionInfo_automaticRenew&3%5Bvalue%5D=false&4%5Bkey%5D=billTo_country&4%5Bvalue%5D=US&5%5Bkey%5D=billTo_lastName&5%5Bvalue%5D=Rumfoord&6%5Bkey%5D=billTo_street2&6%5Bvalue%5D=Betelgeuse&7%5Bkey%5D=billTo_street1&7%5Bvalue%5D=Chrono-Synclastic%20Infundibulum&8%5Bkey%5D=shipTo_shippingMethod&8%5Bvalue%5D=standard-gross&9%5Bkey%5D=orderPage_transactionType&9%5Bvalue%5D=subscription&10%5Bkey%5D=orderPage_declineResponseURL&10%5Bvalue%5D=sampleUrl&11%5Bkey%5D=orderPage_merchantURLPostAddress&11%5Bvalue%5D=https%3A%2F%2Flocalhost%3A9002%2Frest%2Fv2%2Felectronics%2Fintegration%2Fmerchant_callback&12%5Bkey%5D=shipTo_city&12%5Bvalue%5D=Tralfamadore&13%5Bkey%5D=recurringSubscriptionInfo_startDate&13%5Bvalue%5D=20190319&14%5Bkey%5D=shipTo_street1&14%5Bvalue%5D=Chrono-Synclastic%20Infundibulum&15%5Bkey%5D=shipTo_street2&15%5Bvalue%5D=Betelgeuse&16%5Bkey%5D=recurringSubscriptionInfo_frequency&16%5Bvalue%5D=on-demand&17%5Bkey%5D=shipTo_postalCode&17%5Bvalue%5D=06247&18%5Bkey%5D=currency&18%5Bvalue%5D=USD&19%5Bkey%5D=orderPage_signaturePublic&19%5Bvalue%5D=66r82Fj0J71z4oxVheh9XVoW%2F%2Bg%3D&20%5Bkey%5D=shipTo_country&20%5Bvalue%5D=US&21%5Bkey%5D=orderPage_serialNumber&21%5Bvalue%5D=your_serial_number&22%5Bkey%5D=recurringSubscriptionInfo_signaturePublic&22%5Bvalue%5D=dBbJI7i6gxBpHurq8DTFUMxwTuw%3D&23%5Bkey%5D=amount&23%5Bvalue%5D=0&24%5Bkey%5D=recurringSubscriptionInfo_numberOfPayments&24%5Bvalue%5D=0&25%5Bkey%5D=shipTo_firstName&25%5Bvalue%5D=Winston&26%5Bkey%5D=orderPage_colorScheme&26%5Bvalue%5D=blue&27%5Bkey%5D=orderPage_receiptResponseURL&27%5Bvalue%5D=sampleUrl&28%5Bkey%5D=billTo_postalCode&28%5Bvalue%5D=06247&29%5Bkey%5D=orderPage_version&29%5Bvalue%5D=7&30%5Bkey%5D=billTo_firstName&30%5Bvalue%5D=Winston&31%5Bkey%5D=orderPage_timestamp&31%5Bvalue%5D=1552990676377&32%5Bkey%5D=orderPage_ignoreCVN&32%5Bvalue%5D=true&33%5Bkey%5D=recurringSubscriptionInfo_amount&33%5Bvalue%5D=0&34%5Bkey%5D=merchantID&34%5Bvalue%5D=your_merchant_id&35%5Bkey%5D=orderPage_cancelResponseURL&35%5Bvalue%5D=sampleUrl&36%5Bkey%5D=orderPage_ignoreAVS&36%5Bvalue%5D=true"
