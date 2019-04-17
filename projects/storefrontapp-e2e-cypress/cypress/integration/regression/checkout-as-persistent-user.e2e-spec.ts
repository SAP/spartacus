import * as checkoutAsPersistentUser from '../../helpers/checkout-as-persistent-user';
import { formats } from '../../sample-data/viewports';

function checkoutAsPersistentUserTest() {
  it('should login successfully', () => {
    checkoutAsPersistentUser.loginSuccessfully();
  });

  it('should go to product page from category page', () => {
    checkoutAsPersistentUser.changePageFromProductToCategory();
  });

  it('should add product to cart', () => {
    checkoutAsPersistentUser.addProductToCart();
  });

  it('should get cartId and add a payment method', () => {
    checkoutAsPersistentUser.addPaymentMethod();
  });

  it('should proceed to checkout and select shipping address', () => {
    checkoutAsPersistentUser.selectShippingAddress();
  });

  it('should choose delivery', () => {
    checkoutAsPersistentUser.selectDeliveryMethod();
  });

  it('should select payment method', () => {
    checkoutAsPersistentUser.selectPaymentMethod();
  });

  it('should review and place order', () => {
    checkoutAsPersistentUser.verifyAndPlaceOrder();
  });

  it('should display summary page', () => {
    checkoutAsPersistentUser.displaySummaryPage();
  });
}

context('Check login', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.login('test-user-cypress@ydev.hybris.com', 'Password123.');
    cy.visit('/');
  });

  checkoutAsPersistentUserTest();
});

context(`${formats.mobile.width + 1}p resolution - Check login`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.login('test-user-cypress@ydev.hybris.com', 'Password123.');
    cy.visit('/');
  });
  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  checkoutAsPersistentUserTest();
});
