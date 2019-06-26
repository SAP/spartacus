import * as checkout from '../../helpers/checkout-flow';
import { checkBanner } from '../../helpers/homepage';
import { formats } from '../../sample-data/viewports';

function clickHamburger() {
  cy.get('cx-hamburger-menu [aria-label="Menu"]').click();
}

function waitForHomePage() {
  checkBanner();
  clickHamburger();
}

context(`${formats.mobile.width + 1}p resolution - Big happy path`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.visit('/');
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  it('should register successfully', () => {
    waitForHomePage();

    checkout.registerUser();

    waitForHomePage();

    checkout.signOutUser();
  });

  it('should go to product page from category page', () => {
    checkout.goToProductDetailsPage();
  });

  it('should add product to cart and go to checkout', () => {
    checkout.addProductToCart();
    checkout.loginUser();
  });

  it('should fill in address form', () => {
    checkout.fillAddressForm();
  });

  it('should choose delivery', () => {
    checkout.chooseDeliveryMethod();
  });

  it('should fill in payment form', () => {
    checkout.fillPaymentForm();
  });

  it('should review and place order', () => {
    checkout.placeOrder();
  });

  it('should display summary page', () => {
    checkout.verifyOrderConfirmationPage();
  });

  it('should be able to check order in order history', () => {
    clickHamburger();
    checkout.viewOrderHistory();
    clickHamburger();
    checkout.signOut();
  });
});
