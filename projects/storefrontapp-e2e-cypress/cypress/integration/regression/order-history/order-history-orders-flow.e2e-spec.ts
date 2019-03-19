import { user } from '../../../sample-data/big-happy-path';

describe('Order History with no orders', () => {
  let orderNumber: string;

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.window().then(win => {
      const token = JSON.parse(win.sessionStorage.getItem('auth'));
      cy.requireProductAddedToCart(token).then(cart => {
        console.log('cart: ', cart);
      });
      cy.requireShippingAddressAdded(user.address, token);
      cy.requireShippingMethodSelected(token);
      cy.requirePaymentDetailsDefined(token);
    });
  });

  it('should display in Order History after placing orders', () => {
    cy.visit('/checkout');
    cy.get(':nth-child(1) .card-body .card-link')
      .first()
      .click();
    cy.get('cx-shipping-address .btn-primary').click();
    cy.get('#deliveryMode-standard-gross').click();
    cy.get('cx-delivery-mode .btn-primary').click();
    cy.get('.cx-place-order .btn-primary').click();
    cy.get('.cx-page__title').then(el => {
      el.should('contain', 'Confirmation of Order');
      orderNumber = el.text().match(/\d+/)[0];
    });

    cy.selectUserMenuOption('Order History');
    cy.get('cx-order-history h3').should('contain', 'Order history');
    cy.get('.cx-order-history-value').should('contain', orderNumber);
  });
});
