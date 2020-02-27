import { user } from '../sample-data/checkout-flow';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Make sure you have shipping address added. Returns address object.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.requireShippingAddressAdded(auth, address);
        ```
       */
      requireShippingAddressAdded: (
        address: {},
        auth: {}
      ) => Cypress.Chainable<{}>;
    }
  }
}

Cypress.Commands.add('requireShippingAddressAdded', (address, auth) => {
  const apiUrl = Cypress.env('API_URL');

  // format the request body
  const _address = {
    ...address,
    firstName: user.firstName,
    lastName: user.lastName,
    town: address.city,
    postalCode: address.postal,
    titleCode: 'mr',
    country: {
      isocode: 'US',
      name: user.address.country,
    },
    defaultAddress: false,
  };

  function addAddress() {
    return cy.request({
      method: 'POST',
      url: `${apiUrl}/rest/v2/electronics-spa/users/current/carts/current/addresses/delivery`,
      body: _address,
      form: false,
      headers: {
        Authorization: `bearer ${auth.userToken.token.access_token}`,
      },
    });
  }

  cy.server();
  addAddress().then(resp => cy.wrap(resp));
});
