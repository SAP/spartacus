import * as checkout from '../../../helpers/checkout-flow';
import { checkBanner } from '../../../helpers/homepage';
import { verifyGlobalMessageAfterRegistration } from '../../../helpers/register';
import { formats } from '../../../sample-data/viewports';

function clickHamburger() {
  cy.get('cx-hamburger-menu [aria-label="Menu"]').click();
}

function waitForHomePage() {
  checkBanner();
  clickHamburger();
}

context(`${formats.mobile.width + 1}p resolution - Big happy path`, () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
    checkout.visitHomePage();
  });

  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('should register successfully', () => {
    waitForHomePage();

    checkout.registerUser();
    verifyGlobalMessageAfterRegistration();
  });

  it('should go to product page from category page', () => {
    checkout.goToCheapProductDetailsPage();
  });

  it('should add product to cart and go to checkout', () => {
    checkout.addCheapProductToCartAndLogin();
  });

  it('should fill in address form', () => {
    checkout.fillAddressFormWithCheapProduct();
  });

  it('should choose delivery', () => {
    checkout.verifyDeliveryMethod();
  });

  it('should fill in payment form', () => {
    checkout.fillPaymentFormWithCheapProduct();
  });

  it('should review and place order', () => {
    checkout.placeOrderWithCheapProduct();
  });

  it('should display summary page', () => {
    checkout.verifyOrderConfirmationPageWithCheapProduct();
  });

  it('should be able to check order in order history', () => {
    cy.waitForOrderToBePlacedRequest();
    clickHamburger();
    checkout.viewOrderHistoryWithCheapProduct();
    clickHamburger();
    checkout.signOut();
  });
});
