import * as checkout from '../../../helpers/checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';
import { getSampleUser } from '../../../sample-data/checkout-flow';

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

      checkout.clickHamburger();

      checkout.registerUser(false, user);
      checkout.goToCheapProductDetailsPage();
      checkout.addCheapProductToCartAndLogin(user);
      checkout.proceedWithEmptyShippingAdressForm();
      checkout.proceedWithIncorrectShippingAddressForm({
        ...user,
        firstName: '',
      });
      checkout.fillAddressFormWithCheapProduct({ firstName: user.firstName });
      checkout.verifyDeliveryMethod();
      checkout.proceedWithEmptyPaymentForm();
      checkout.proceedWithIncorrectPaymentForm({
        ...user,
        payment: { ...user.payment, number: null },
      });
      checkout.fillPaymentFormWithCheapProduct({
        payment: { number: user.payment.number },
      });
      checkout.placeOrderWithCheapProduct(user);
      checkout.verifyOrderConfirmationPageWithCheapProduct(user);
    });
  });
});
