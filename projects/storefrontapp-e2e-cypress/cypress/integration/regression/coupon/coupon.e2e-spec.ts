import * as cartCoupon from '../../../helpers/cart-coupon';
import * as bigHappyPath from '../../../helpers/checkout-flow';

export const CouponCode1 = 'BUYMORE16';
export const CouponCode2 = 'WINTER16';
export const CouponCode3 = 'CHRISTMAS16';

describe('Cart Coupon', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  it('should remove the coupon when back to cart and place order without coupon', () => {
    bigHappyPath.registerUser();
    bigHappyPath.goToProductDetailsPage();
    bigHappyPath.addProductToCart();

    cartCoupon.navigateToCartPage();
    cartCoupon.applyCoupon(CouponCode1);
    cartCoupon.removeCoupon(CouponCode1);
    cartCoupon.navigateToCheckoutPage();

    bigHappyPath.fillAddressForm();
    bigHappyPath.chooseDeliveryMethod();
    bigHappyPath.fillPaymentForm();
    bigHappyPath.placeOrder();

    bigHappyPath.verifyOrderConfirmationPage();
    cartCoupon.getCouponItemOrderSummary(CouponCode1).should('not.exist');
    bigHappyPath.viewOrderHistory();

    bigHappyPath.goToProductDetailsPage();
    bigHappyPath.addProductToCart();
    cartCoupon.navigateToCartPage();
    cartCoupon.applyCoupon(CouponCode1);
  });
});
