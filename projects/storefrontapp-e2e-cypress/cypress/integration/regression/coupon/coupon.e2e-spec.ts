import * as cartCoupon from '../../../helpers/cart-coupon';
import * as login from '../../../helpers/login';

export const productCode1 = '300938';
export const couponCode1 = 'SUMMER69';
export const productCode2 = '493683';
export const couponCode2 = 'BUYMORE16';
export const productCode3 = '1986316';
export const couponCode3 = 'CHRISTMAS16';
export const giftProductCode = '443175';

describe('Cart Coupon', () => {
  beforeEach(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.visit('/');
  });
  afterEach(() => {
    cy.visit('/');
    login.signOutUser();
  });

  it('should show the promotion for cart, discount in price and success message when applied a coupon with cart total action successfully.', () => {
    const stateAuth = JSON.parse(localStorage.getItem('spartacus-local-data'))
      .auth;
    cartCoupon.addProductToCart(productCode1);
    cartCoupon.applyCoupon(couponCode1);
    cartCoupon.verifyCouponAndPromotion(couponCode1, '$104.12', '$10');
    cartCoupon.placeOrder(stateAuth).then(orderData => {
      cartCoupon.varifyOrderHistory(orderData, couponCode1, '$104.12', '$10');
    });
  });

  it('should show the promotion for product, discount in price and success message when applied a coupon with product category action successfully.', () => {
    const stateAuth = JSON.parse(localStorage.getItem('spartacus-local-data'))
      .auth;
    cartCoupon.addProductToCart(productCode2);
    cartCoupon.applyCoupon(couponCode2);
    cartCoupon.verifyCouponAndPromotion(couponCode2, '$88.84', '$29.61');
    cartCoupon.placeOrder(stateAuth).then(orderData => {
      cartCoupon.varifyOrderHistory(orderData, couponCode2, '$88.84', '$29.61');
    });
  });

  it('should show gift product, correct price and success message when applied a coupon with gift product action', () => {
    const stateAuth = JSON.parse(localStorage.getItem('spartacus-local-data'))
      .auth;
    cartCoupon.addProductToCart(productCode3);
    cartCoupon.applyCoupon(couponCode3);
    cartCoupon.addProductToCart(giftProductCode);
    cartCoupon.verifyGiftProductCoupon(giftProductCode);
    cartCoupon.verifyCouponAndPromotion(couponCode3, '$1,920.27', '$20');
    cartCoupon.placeOrder(stateAuth).then(orderData => {
      cartCoupon.varifyOrderHistory(orderData, couponCode3, '$1,920.27', '$20');
    });
  });

  it('should show error message when applied a wrong coupon', () => {
    cartCoupon.addProductToCart(productCode1);
    cartCoupon.applyWrongCoupon();
  });

  it('should remove the coupon when back to cart and place order without coupon', () => {
    const stateAuth = JSON.parse(localStorage.getItem('spartacus-local-data'))
      .auth;
    cartCoupon.addProductToCart(productCode1);
    cartCoupon.applyCoupon(couponCode1);
    cartCoupon.verifyCouponAndPromotion(couponCode1, '$104.12', '$10');

    cartCoupon.navigateToCheckoutPage();
    cartCoupon.navigateToCartPage();
    cartCoupon.removeCoupon(couponCode1);

    cartCoupon.placeOrder(stateAuth).then(orderData => {
      cartCoupon.varifyOrderHistory(orderData);
    });
  });

  // it('should place order with gift product and show applied coupon in order confirmation and order history when applied coupon with gift product action', () => {
  //   addProductToCart();
  //   cartCoupon.navigateToCartPage();
  //   cartCoupon.applyCouponAndVerify(couponCode2);
  //   cartCoupon.verifyGiftProductCoupon(productCode);

  //   checkout();
  //   verifyChecoutResults(couponCode2, true);
  //   login.signOutUser();
  // });

  // it('should remove the coupon when back to cart and place order without coupon', () => {
  //   addProductToCart();
  //   cartCoupon.navigateToCartPage();
  //   cartCoupon.applyCouponAndVerify(couponCode1);
  //   cartCoupon.removeCoupon(couponCode1);

  //   checkout();
  //   verifyChecoutResults(couponCode1, false);

  //   addProductToCart();
  //   cartCoupon.navigateToCartPage();
  //   cartCoupon.applyCoupon(couponCode1);
  //   login.signOutUser();
  // });

  // it('should show gift product, correct price and success message when applied a coupon with gift product action', () => {
  //   addProductToCart();
  //   cartCoupon.navigateToCartPage();
  //   cartCoupon.applyCouponAndVerify(couponCode2);
  //   cartCoupon.verifyGiftProductCoupon(productCode);
  //   login.signOutUser();
  // });

  // it(
  //   'should be able to place order with discount promotion and show applied coupon ' +
  //     'in order confirmation and order history when applied coupon with cart total action',
  //   () => {
  //     addProductToCart();
  //     cartCoupon.navigateToCartPage();
  //     cartCoupon.applyCouponAndVerify(couponCode1);
  //     checkout();
  //     verifyChecoutResults(couponCode1, true);
  //     login.signOutUser();
  //   }
  // );

  // it('', () => {
  //   const stateAuth = JSON.parse(localStorage.getItem('spartacus-local-data'))
  //     .auth;
  //   addProductToCart();

  //   cy.visit('cart');
  //   cartCoupon.applyCouponAndVerify(couponCode2);
  //   cartCoupon.verifyGiftProductCoupon(productCode);
  //   cy.get('.cx-total')
  //     .first()
  //     .then($cart => {
  //       const cartId = $cart.text().match(/[0-9]+/)[0];
  //       cy.requireShippingAddressAdded(user.address, stateAuth);
  //       cy.requireShippingMethodSelected(stateAuth);
  //       cy.requirePaymentDone(stateAuth);

  //       cy.requirePlacedOrder(stateAuth, cartId).then((orderData: any) => {
  //         cy.visit('my-account/orders');
  //         cy.get('cx-order-history h3').should('contain', 'Order history');
  //         cy.get('.cx-order-history-code > .cx-order-history-value').should(
  //           'contain',
  //           orderData.body.code
  //         );
  //         cy.get('.cx-order-history-total > .cx-order-history-value').should(
  //           'contain',
  //           orderData.body.totalPrice.formattedValue
  //         );

  //         cartCoupon.navigateToOrderDetailsPage();
  //         cartCoupon.verifyCouponInOrderSummary(couponCode2, true);
  //         login.signOutUser();
  //       });
  //     });
  // });
});
