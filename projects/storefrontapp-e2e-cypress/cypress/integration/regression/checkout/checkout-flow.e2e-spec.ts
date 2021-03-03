import * as checkout from '../../../helpers/checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';
import { getSampleUser } from '../../../sample-data/checkout-flow';

function clickHamburger() {
  cy.get('cx-hamburger-menu [aria-label="Menu"]').click();
}

context('Checkout flow', () => {
  viewportContext(['mobile', 'desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
    });

    it('should perform checkout', () => {
      const user = getSampleUser();
      checkout.visitHomePage();
      cy.onMobile(() => {
        clickHamburger();
      });
      checkout.registerUser(false, user);
      checkout.goToCheapProductDetailsPage();
      checkout.addCheapProductToCartAndLogin(user);
      checkout.fillAddressFormWithCheapProduct(user);
      checkout.verifyDeliveryMethod();
      checkout.fillPaymentFormWithCheapProduct(user);
      checkout.placeOrderWithCheapProduct(user);
      checkout.verifyOrderConfirmationPageWithCheapProduct(user);
    });
  });
});
