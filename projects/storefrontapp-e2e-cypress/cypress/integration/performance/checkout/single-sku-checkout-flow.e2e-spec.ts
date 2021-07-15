import * as checkout from '../../../helpers/checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';
import { getSampleUser } from '../../../sample-data/checkout-flow';
import * as productSearchFlow from '../../../helpers/product-search';
//import { viewportContext } from '../../../helpers/viewport-context';

context('Checkout flow', () => {
  viewportContext(['desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
    });

    it('should perform checkout single sku', () => {
      const user = getSampleUser();
      checkout.visitHomePage();
      checkout.clickHamburger();
      checkout.registerAndSignInUser(false, user);
      productSearchFlow.searchForProductAddToCart("base");
      productSearchFlow.goToCartPage();
      checkout.proceedToCheckoutSignedInUser();
      checkout.fillAddressFormNoProduct(user);
      checkout.verifyDeliveryMethod();
      checkout.fillPaymentFormNoProduct();
      checkout.placeOrder(false);
      checkout.verifyOrder();
      checkout.signOutUser();
    });
  });
});
