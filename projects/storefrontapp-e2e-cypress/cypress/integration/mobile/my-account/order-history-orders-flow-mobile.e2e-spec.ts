import { formats } from '../../../sample-data/viewports';
import { user, product } from '../../../sample-data/checkout-flow';

let orderData: any;

function doPlaceOrder() {
  cy.window().then(win => {
    const savedState = JSON.parse(
      win.localStorage.getItem('spartacus-local-data')
    );
    cy.requireProductAddedToCart(savedState.auth).then(resp => {
      cy.requireShippingAddressAdded(user.address, savedState.auth);
      cy.requireShippingMethodSelected(savedState.auth);
      cy.requirePaymentDone(savedState.auth);
      cy.requirePlacedOrder(savedState.auth, resp.cartId).then(order => {
        orderData = order;
      });
    });
  });
}

describe.only(`${formats.mobile.width +
  1}p resolution - Order History with orders`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
    doPlaceOrder();
    // do it again to test orders table sorting
    doPlaceOrder();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('should display in Order History after placing orders', () => {
    cy.visit('/my-account/orders');
    cy.get('cx-order-history h3').should('contain', 'Order history');
    cy.get('.cx-order-history-code > .cx-order-history-value').should(
      'contain',
      orderData.body.code
    );
    cy.get('.cx-order-history-total > .cx-order-history-value').should(
      'contain',
      orderData.body.totalPrice.formattedValue
    );
  });

  it('should sort the orders table by given code', () => {
    cy.server();
    cy.route('GET', /sort=byOrderNumber/).as('query_order_asc');
    cy.visit('/my-account/orders');
    cy.get('.top cx-sorting .ng-select').ngSelect('Order Number');
    cy.wait('@query_order_asc');
    cy.get('.cx-order-history-code > .cx-order-history-value').then($orders => {
      expect(parseInt($orders[0].textContent, 10)).to.be.lessThan(
        parseInt($orders[1].textContent, 10)
      );
    });
  });
});

describe.only(`${formats.mobile.width +
  1}p resolution - Order details page`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
    doPlaceOrder();
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  it('should display order details page', () => {
    cy.visit('/my-account/orders');
    cy.get('.cx-order-history-code > .cx-order-history-value')
      .first()
      .click();
    cy.get('.cx-item-list-row .cx-link').should('contain', product.name);
    cy.get('.cx-item-list-row .cx-code').should('contain', product.code);
    cy.get('.cx-summary-total > .cx-summary-amount').should(
      'contain',
      orderData.body.totalPrice.formattedValue
    );
  });
});
