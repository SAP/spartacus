import * as cart from '../../helpers/cart';
import * as alerts from '../../helpers/global-message';

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

  it('should be saved in browser and restored on refresh', () => {
    cart.addProductAsAnonymous();
    cy.reload();
    cart.verifyCartNotEmpty();
  });

  it('should be loaded after logging in', () => {
    cart.loginRegisteredUser();
    cart.addProductWhenLoggedIn(false);
    cart.logOutAndNavigateToEmptyCart();
    cart.loginRegisteredUser();
    cart.verifyCartNotEmpty();
  });

  it('should be loaded for logged user after "cart not found" error', () => {
    cart.loginRegisteredUser();
    cart.addProductWhenLoggedIn(false);
    cy.window().then(window => {
      const storage = JSON.parse(
        window.localStorage.getItem('spartacus-local-data')
      );
      const cartCode = storage.cart.active.value.content.code;
      storage.cart.active.value.content.code = 'incorrect-code';
      window.localStorage.setItem(
        'spartacus-local-data',
        JSON.stringify(storage)
      );
      cy.visit('/cart');
      alerts.getErrorAlert().should('contain', 'Cart not found');
      cy.get('.cart-details-wrapper .cx-total').contains(`Cart #${cartCode}`);
    });
  });
});
