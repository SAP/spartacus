import * as cart from '../../helpers/cart';
import { user } from '../../sample-data/checkout-flow';

describe('Cart', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
  });

  it('should add products to cart via search autocomplete', () => {
    cart.addProductToCartViaAutoComplete(false);
  });

  it('should add products to cart through search result page', () => {
    cart.addProductToCartViaSearchPage(false);
  });

  it('should display empty cart if no items added and when items are removed', () => {
    cart.removeAllItemsFromCart();
  });

  it('should add product to cart as anonymous and merge when logged in', () => {
    cart.loginRegisteredUser();

    cart.addProductWhenLoggedIn(false);

    cart.logOutAndNavigateToEmptyCart();

    cart.addProductAsAnonymous();

    cart.verifyMergedCartWhenLoggedIn();

    cart.logOutAndEmptyCart();
  });

  it('should add product to cart and manipulate quantity', () => {
    cart.manipulateCartQuantity();
  });

  it('should be unable to add out of stock products to cart', () => {
    cart.outOfStock();
  });



});

describe.only('Coupon Cart', () => {
  function placeOrder() {
    cy.window().then(win => {
      const savedState = JSON.parse(
        win.localStorage.getItem('spartacus-local-data')
      );
      cy.requireProductAddedToCart(savedState.auth).then(resp => {
        cy.requireShippingAddressAdded(user.address, savedState.auth);
        cy.requireShippingMethodSelected(savedState.auth);
        cy.requirePaymentDone(savedState.auth);
        cy.requirePlacedOrder(savedState.auth, resp.cartId);
      });
    });
  }

  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.visit('/');
  });

  it('should show the promotion, discount in price and success message when applied a coupon with cart total action successfully', () => {
    cart.addProductWhenLoggedIn(false);
    cart.goToCartAndApplyCoupon();
  })

  it('should show error message when applied a wrong coupon', () => {
    cart.addProductWhenLoggedIn(false);
    cart.applyWrongCoupon();
  });

  it('should be able to place order with discount promotion and show applied coupon ' +
    'in order confirmation and order history when applied coupon with cart total action', () => {
      placeOrder();
      cy.visit('/order-confirmation')
    });

  it('should be able to remove the coupon when back to cart and place order without coupon', () => {
    cart.addProductWhenLoggedIn(false);
    cart.goToCartAndApplyCoupon();
    cy.visit('/');
    cart.goToCartAndRemoveCoupon();

  });
});

