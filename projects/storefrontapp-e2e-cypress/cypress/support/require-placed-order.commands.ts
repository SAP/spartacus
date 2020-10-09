import { DaysOfWeek, recurrencePeriod } from '../sample-data/b2b-checkout';

declare namespace Cypress {
  interface Chainable {
    /**
       * Make sure you have placed the order. Returns new order data.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.requirePlacedOrder(auth, address);
        ```
       */
    requirePlacedOrder: (token: {}, cartId: {}) => Cypress.Chainable<{}>;
  }
}

Cypress.Commands.add('requirePlacedOrder', (auth, cartId) => {
  function placeOrder() {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/${Cypress.env(
        'OCC_PREFIX'
      )}/${Cypress.env('BASE_SITE')}/${Cypress.env(
        'USER'
      )}/current/${Cypress.env('ORDER')}?cartId=${cartId}&termsChecked=true`,
      form: false,
      headers: {
        Authorization: `bearer ${auth.userToken.token.access_token}`,
      },
      body: Cypress.env('USER')
        ? {
            daysOfWeek: [DaysOfWeek.MONDAY],
            nthDayOfMonth: '1',
            numberOfDays: '14',
            numberOfWeeks: '1',
            recurrencePeriod: recurrencePeriod.DAILY,
            replenishmentStartDate: '2020-10-08T07:52:23Z',
          }
        : {},
    });
  }

  cy.server();
  placeOrder().then((resp) => cy.wrap(resp));
});
