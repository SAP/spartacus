import { DaysOfWeek, recurrencePeriod } from '../sample-data/b2b-checkout';
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Places an order with the current cart of the current user.
       * Returns new order object.
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.requirePlacedOrder(token, address);
        ```
       */
      requirePlacedOrder: (token: {}, cartId: {}) => Cypress.Chainable<{}>;
    }
  }
}

Cypress.Commands.add('requirePlacedOrder', (token, cartId) => {
  function placeOrder() {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/${Cypress.env(
        'OCC_PREFIX'
      )}/${Cypress.env('BASE_SITE')}/${Cypress.env(
        'OCC_PREFIX_USER_ENDPOINT'
      )}/current/${Cypress.env(
        'OCC_PREFIX_ORDER_ENDPOINT'
      )}?cartId=${cartId}&termsChecked=true`,
      form: false,
      headers: {
        Authorization: `bearer ${token.access_token}`,
      },
      body: Cypress.env('OCC_PREFIX_USER_ENDPOINT')
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

  placeOrder().then((response) => cy.wrap(response));
});
