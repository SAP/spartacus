import * as checkout from '../../../helpers/checkout-flow';

context('Checkout flow', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
    checkout.visitHomePage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('should perform checkout', () => {
    checkout.registerUser();
    checkout.goToCheapProductDetailsPage();
    checkout.addCheapProductToCartAndLogin();
    checkout.fillAddressFormWithCheapProduct();
    checkout.verifyDeliveryMethod();
    checkout.fillPaymentFormWithCheapProduct();
    checkout.placeOrderWithCheapProduct();
    checkout.verifyOrderConfirmationPageWithCheapProduct();
    cy.waitForOrderToBePlacedRequest();
    checkout.viewOrderHistoryWithCheapProduct();
    checkout.signOut();
  });
});
