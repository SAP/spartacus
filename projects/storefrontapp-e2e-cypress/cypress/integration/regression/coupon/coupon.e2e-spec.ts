import * as cartCoupon from '../../../helpers/cart-coupon';
import * as bigHappyPath from '../../../helpers/checkout-flow';

export const couponCode1 = 'BUYMORE16';
export const couponCode2 = 'QingyuCoupon';
export const productCode = '300938';

function addProductToCart() {
  bigHappyPath.goToProductDetailsPage();
  bigHappyPath.addProductToCart();
}

function checkout() {
  cartCoupon.navigateToCheckoutPage();
  bigHappyPath.fillAddressForm();
  bigHappyPath.chooseDeliveryMethod();
  bigHappyPath.fillPaymentForm();
  bigHappyPath.placeOrder();
}

function verifyChecoutResults(couponCode: string, withCoupon: boolean) {
  bigHappyPath.verifyOrderConfirmationPage();
  cartCoupon.verifyCouponInOrderSummary(couponCode, withCoupon);
  bigHappyPath.viewOrderHistory();
  cartCoupon.navigateToOrderDetailsPage();
  cartCoupon.verifyCouponInOrderSummary(couponCode, withCoupon);
}

describe('Gift Product Coupon', () => {
  beforeEach(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.visit('/');
  });

  it('should place order with gift product and show applied coupon in order confirmation and order history when applied coupon with gift product action', () => {
    addProductToCart();
    cartCoupon.navigateToCartPage();
    cartCoupon.applyCoupon(couponCode2);
    cartCoupon.verifyGiftProductCoupon(productCode);

    checkout();
    verifyChecoutResults(couponCode2, true);
  });

  it('should remove the coupon when back to cart and place order without coupon', () => {
    addProductToCart();
    cartCoupon.navigateToCartPage();
    cartCoupon.applyCoupon(couponCode1);
    cartCoupon.removeCoupon(couponCode1);

    checkout();
    verifyChecoutResults(couponCode1, false);

    addProductToCart();
    cartCoupon.navigateToCartPage();
    cartCoupon.applyCoupon(couponCode1);
  });
});
