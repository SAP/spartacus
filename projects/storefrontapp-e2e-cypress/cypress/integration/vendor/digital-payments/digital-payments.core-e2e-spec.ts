import {
  loginUser,
  goToCheapProductDetailsPage,
  addCheapProductToCartAndBeginCheckoutForSignedInCustomer,
  signOut,
} from '../../../helpers/checkout-flow';
import {
  my_user,
  orderConfirmation,
  checkoutShippingAddress,
  checkoutDeliveryMode,
  checkoutPaymentDetails,
  reviewAndPlaceOrder,
} from '../../../helpers/vendor/digital-payments/user';

describe('checkout using digital-payments', () => {
  it('checkout using digital-payments', () => {
    cy.visit('/electronics-spa/en/USD/login');
    loginUser(my_user);
    cy.wait(3000);
    goToCheapProductDetailsPage();
    addCheapProductToCartAndBeginCheckoutForSignedInCustomer();
    checkoutShippingAddress();
    checkoutDeliveryMode();
    checkoutPaymentDetails();
    reviewAndPlaceOrder();
    orderConfirmation();
    signOut();
  });
});
