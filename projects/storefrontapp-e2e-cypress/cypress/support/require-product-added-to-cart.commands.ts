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
      requireProductAddedToCart: (auth: {}) => Cypress.Chainable<{}>;
    }
  }
}
// /electronics/users/mgrochowski@divante.pl/carts/?fields=DEFAULT,deliveryItemsQuantity,totalPrice(formattedValue),entries(totalPrice(formattedValue),product(images(FULL)))&lang=en&curr=USD
Cypress.Commands.add('requireProductAddedToCart', res => {
  const apiUrl = Cypress.env('API_URL');
  // const email = res.email;
  console.log(`Y|${res}|Y`, res);
  function createCart() {
    return cy.request({
      method: 'POST',
      // url: config.tokenUrl,
      url: `${apiUrl}/rest/v2/electronics/users/current/carts`,
      body: {
        // userId: 'current',
        fields: 'DEFAULT',
        lang: 'en',
        curr: 'USD'
      },
      form: true,
      headers: {
        Authorization: `bearer ${res.userToken.token.access_token}`
      }
    });
  }

  function addToCart(cartCode: any, productData: any) {
    return cy.request({
      method: 'POST',
      url: `${apiUrl}/rest/v2/electronics/users/current/carts/${cartCode}/entries`,
      body: {
        code: productData.code,
        qty: 1
      },
      form: true,
      headers: {
        Authorization: `bearer ${res.userToken.token.access_token}`
      }
    });
  }

  cy.server();

  createCart().then(resp => {
    addToCart(resp.body.code, product).then(cart => cy.wrap(cart));
  });

  // return cy.wrap(cart);
});
