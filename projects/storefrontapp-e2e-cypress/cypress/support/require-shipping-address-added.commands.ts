import { user } from '../sample-data/checkout-flow';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Adds a shipping address to a cart of the current user
       * Returns address object.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.requireShippingAddressAdded(address, token, cartCode);
        ```
       */
      requireShippingAddressAdded: (
        address: {},
        token: {},
        cartCode: 'current'
      ) => Cypress.Chainable<{}>;
    }
  }
}

Cypress.Commands.add(
  'requireShippingAddressAdded',
  (address, token, cartCode) => {
    Cypress.log({
      displayName: 'requireShippingAddressAdded',
      message: [`Adding shipping address with token ${token.access_token}`],
    });

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
        url: `${Cypress.env('API_URL')}/${Cypress.env(
          'OCC_PREFIX'
        )}/${Cypress.env(
          'BASE_SITE'
        )}/users/current/carts/${cartCode}/addresses/delivery`,
        body: _address,
        form: false,
        headers: {
          Authorization: `bearer ${token.access_token}`,
        },
      });
    }

    addAddress().then((resp) => cy.wrap(resp));
  }
);
