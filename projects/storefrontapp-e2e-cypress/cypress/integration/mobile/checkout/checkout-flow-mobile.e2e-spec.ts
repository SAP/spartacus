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

context(`${formats.mobile.width + 1}p resolution - Checkout flow`, () => {
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

  it('should peform checkout registering a new user', () => {
    waitForHomePage();
    checkout.registerUser();
    verifyGlobalMessageAfterRegistration();
    checkout.goToCheapProductDetailsPage();
    checkout.addCheapProductToCartAndLogin();
    checkout.fillAddressFormWithCheapProduct();
    checkout.verifyDeliveryMethod();
    checkout.fillPaymentFormWithCheapProduct();
    checkout.placeOrderWithCheapProduct();
    checkout.verifyOrderConfirmationPageWithCheapProduct();
    cy.waitForOrderToBePlacedRequest();
    clickHamburger();
    checkout.viewOrderHistoryWithCheapProduct();
    clickHamburger();
    checkout.signOut();
  });
});
