import * as checkout from '../../../helpers/checkout-flow';

context('Checkout flow', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  it('should perform checkout', () => {
    checkout.visitHomePage();
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
