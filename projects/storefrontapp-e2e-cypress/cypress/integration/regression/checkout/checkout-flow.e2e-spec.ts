import * as checkout from '../../../helpers/checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';

context('Checkout flow', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        checkout.visitHomePage();
      });
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
});
