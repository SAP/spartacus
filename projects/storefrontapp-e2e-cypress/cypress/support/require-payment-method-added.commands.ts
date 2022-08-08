declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Adds a payment method to the given cart of the current user.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.requirePaymentMethodAdded(cartId);
        ```
       */
      requirePaymentMethodAdded: (cartId?: string) => Cypress.Chainable<{}>;
    }
  }
}

Cypress.Commands.add('requirePaymentMethodAdded', (cartId) => {
  const cartCode = cartId || 'current';

  function addPaymentMethod() {
    return cy
      .request({
        method: 'POST',
        url: `${Cypress.env('API_URL')}/${Cypress.env(
          'OCC_PREFIX'
        )}/${Cypress.env(
          'BASE_SITE'
        )}/users/current/carts/${cartCode}/paymentdetails`,
        headers: {
          Authorization: `bearer ${
            JSON.parse(localStorage.getItem('spartacus⚿⚿auth')).token
              .access_token
          }`,
        },
        body: {
          accountHolderName: 'Cypress User',
          cardNumber: '4111111111111111',
          cardType: { code: 'visa' },
          expiryMonth: '12',
          expiryYear: '2027',
          defaultPayment: true,
          saved: true,
          billingAddress: {
            firstName: 'Cypress',
            lastName: 'User',
            titleCode: 'mr',
            line1: '100 Fifth Avenue',
            line2: '',
            town: 'New York',
            postalCode: '10001',
            country: { isocode: 'US' },
          },
        },
      })
      .then((response) => {
        expect(response.status).to.eq(201);
      });
  }

  addPaymentMethod().then((resp) => cy.wrap(resp));
});
