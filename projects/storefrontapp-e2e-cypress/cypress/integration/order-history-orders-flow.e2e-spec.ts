import { user } from '../sample-data/big-happy-path';
// import { register, login } from '../helpers/auth-forms';

describe('Order History with no orders', () => {
  // const loginLink = 'cx-login [role="link"]';
  // const orderHistoryLink = '/my-account/orders';
  let orderNumber: string;

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.requirePlacedOrder().then(order => {
      orderNumber = order.code;
    });
  });

  it('should display in Order History after placing orders', () => {
    cy.get('.cx-page__title').should('contain', 'Confirmation of Order');
    cy.selectUserMenuOption('Order History');
    // cy.visit('/my-account/orders');
    cy.get('cx-order-history h3').should('contain', 'Order history');
    cy.get('.cx-order-history-value').should('contain', orderNumber);
  });
});
