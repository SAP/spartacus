import { user } from '../../../sample-data/checkout-flow';

describe('Order History with orders', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.window().then(win => {
      const token = JSON.parse(win.sessionStorage.getItem('auth'));
      cy.requireProductAddedToCart(token);
      cy.requireShippingAddressAdded(user.address, token);
      cy.requireShippingMethodSelected(token);
      cy.requirePaymentDone(token);
    });
  });

  it('should display in Order History after placing orders', () => {
    cy.visit('/checkout');

    // select already added shipping address
    cy.get(':nth-child(1) .card-body .card-link')
      .first()
      .click();
    cy.get('cx-shipping-address .btn-primary').click();

    // select deliverymode
    cy.get('#deliveryMode-standard-gross').click();
    cy.get('cx-delivery-mode .btn-primary').click();

    // select already added payment
    cy.get(':nth-child(1) .card-body .card-link')
      .first()
      .click();
    cy.get('cx-payment-method .btn-primary').click();

    // place an order
    cy.get('.cx-place-order').within(() => {
      cy.get('.form-check-input').click();
      cy.get('.btn-primary').click();
    });

    cy.get('.cx-page__title').then(el => {
      const orderNumber = el.text().match(/\d+/)[0];
      cy.wrap(el).should('contain', 'Confirmation of Order');
      cy.selectUserMenuOption('Order History');
      cy.get('cx-order-history h3').should('contain', 'Order history');
      cy.get('.cx-order-history-code > .cx-order-history-value').should(
        'contain',
        orderNumber
      );
    });
  });
});
