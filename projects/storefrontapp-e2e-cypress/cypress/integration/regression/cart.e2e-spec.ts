import * as cart from '../../helpers/cart';
import * as alerts from '../../helpers/global-message';
import { apiUrl, login } from '../../support/utils/login';

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
    cart.registerCreateCartRoute();
    cart.registerSaveCartRoute();
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

  it('should be loaded for logged user after "cart not found" error', () => {
    cart.registerCreateCartRoute();
    cart.registerSaveCartRoute();
    cart.loginRegisteredUser();
    cart.addProductWhenLoggedIn(false);
    // Wait to make sure everything was processed, so there won't be any ngrx -> localStorage synchronization
    // Related issue: #4672
    cy.wait(2000);
    cy.window().then(window => {
      const storage = JSON.parse(
        window.localStorage.getItem('spartacus-local-data')
      );
      const cartCode = storage['multi-cart'].active;
      storage['multi-cart'].active = 'incorrect-code';
      window.localStorage.setItem(
        'spartacus-local-data',
        JSON.stringify(storage)
      );
      cy.visit('/cart');
      alerts.getErrorAlert().should('contain', 'Cart not found');
      cy.get('.cart-details-wrapper .cx-total').contains(`Cart #${cartCode}`);
      cy.selectUserMenuOption({
        option: 'Sign Out',
      });
    });
  });

  it('should be loaded after user login', () => {
    cy.server();
    cart.registerCartUser();
    cart.loginCartUser();
    cy.visit(`/product/${cart.products[0].code}`);
    cart.addToCart();
    cart.checkAddedToCartDialog();
    cart.closeAddedToCartDialog();
    cy.selectUserMenuOption({
      option: 'Sign Out',
    });
    cy.clearLocalStorage();
    cy.route(
      `${apiUrl}/rest/v2/electronics-spa/users/current/carts?fields=*`
    ).as('carts');
    cart.loginCartUser();
    cy.wait('@carts')
      .its('status')
      .should('eq', 200);
    cy.visit('/cart');
    cart.checkProductInCart(cart.products[0]);

    // cleanup
    cart.removeCartItem(cart.products[0]);
    cart.validateEmptyCart();
  });

  it('should load cart saved in browser storage', () => {
    cy.server();
    cart.loginCartUser();
    cy.visit(`/product/${cart.products[0].code}`);
    cart.addToCart();
    cart.checkAddedToCartDialog();
    cart.closeAddedToCartDialog();
    cy.reload();
    cy.route(`${apiUrl}/rest/v2/electronics-spa/users/current/carts/*`).as(
      'cart'
    );
    cy.wait('@cart')
      .its('status')
      .should('eq', 200);
    cy.visit('/cart');
    cart.checkProductInCart(cart.products[0]);

    // cleanup
    cart.removeCartItem(cart.products[0]);
    cart.validateEmptyCart();
  });

  // will fail right now, as this is not implemented yet
  it('should first try to load cart when adding first entry for logged user', () => {
    cy.server();
    login(
      cart.cartUser.registrationData.email,
      cart.cartUser.registrationData.password,
      false
    ).then(res => {
      // remove cart
      cy.request({
        method: 'DELETE',
        url: `${apiUrl}/rest/v2/electronics-spa/users/current/carts/current`,
        headers: {
          Authorization: `bearer ${res.body.access_token}`,
        },
      });
    });
    cart.loginCartUser();
    cy.visit(`/product/${cart.products[0].code}`);
    cy.get('cx-breadcrumb h1').contains(cart.products[0].name);
    login(
      cart.cartUser.registrationData.email,
      cart.cartUser.registrationData.password,
      false
    ).then(res => {
      cy.request({
        // create cart
        method: 'POST',
        url: `${apiUrl}/rest/v2/electronics-spa/users/current/carts`,
        headers: {
          Authorization: `bearer ${res.body.access_token}`,
        },
      }).then(response => {
        // add entry to cart
        return cy.request({
          method: 'POST',
          url: `${apiUrl}/rest/v2/electronics-spa/users/current/carts/${response.body.code}/entries`,
          headers: {
            Authorization: `bearer ${res.body.access_token}`,
          },
          body: {
            product: { code: cart.products[1].code, qty: 1 },
          },
        });
      });
    });
    cy.route(`${apiUrl}/rest/v2/electronics-spa/users/current/carts?*`).as(
      'cart'
    );
    cart.addToCart();
    cart.checkAddedToCartDialog(2);
    cy.visit('/cart');
    cart.checkProductInCart(cart.products[0]);
    cart.checkProductInCart(cart.products[1]);

    // cleanup
    cy.route(
      'GET',
      `${apiUrl}/rest/v2/electronics-spa/users/current/carts/*?fields=*&lang=en&curr=USD`
    ).as('refresh_cart');
    cart.removeCartItem(cart.products[0]);
    cy.wait('@refresh_cart')
      .its('status')
      .should('eq', 200);
    cart.removeCartItem(cart.products[1]);
    cart.validateEmptyCart();
  });

  it('should create new cart when adding first entry for logged user without cart', () => {
    cy.server();
    login(
      cart.cartUser.registrationData.email,
      cart.cartUser.registrationData.password,
      false
    ).then(res => {
      // remove cart
      cy.request({
        method: 'DELETE',
        url: `${apiUrl}/rest/v2/electronics-spa/users/current/carts/current`,
        headers: {
          Authorization: `bearer ${res.body.access_token}`,
        },
      });
    });
    cart.loginCartUser();
    cy.visit(`/product/${cart.products[0].code}`);
    cy.get('cx-breadcrumb h1').contains(cart.products[0].name);
    cy.route(`${apiUrl}/rest/v2/electronics-spa/users/current/carts?*`).as(
      'cart'
    );
    cart.addToCart();
    cart.checkAddedToCartDialog();
    cy.visit('/cart');
    cart.checkProductInCart(cart.products[0]);

    // cleanup
    cy.route(
      'GET',
      `${apiUrl}/rest/v2/electronics-spa/users/current/carts/*?fields=*&lang=en&curr=USD`
    ).as('refresh_cart');
    cart.removeCartItem(cart.products[0]);
    cart.validateEmptyCart();
  });

  it('should use existing cart when adding new entries', () => {
    cy.server();
    cy.visit(`/product/${cart.products[0].code}`);
    cy.get('cx-breadcrumb h1').contains(cart.products[0].name);
    cart.addToCart();
    cart.checkAddedToCartDialog();
    cy.visit(`/product/${cart.products[1].code}`);
    cy.get('cx-breadcrumb h1').contains(cart.products[1].name);
    cart.addToCart();
    cart.checkAddedToCartDialog(2);

    cy.visit('/cart');
    cart.checkProductInCart(cart.products[0]);
    cart.checkProductInCart(cart.products[1]);

    // cleanup
    cy.route(
      'GET',
      `${apiUrl}/rest/v2/electronics-spa/users/anonymous/carts/*?fields=*&lang=en&curr=USD`
    ).as('refresh_cart');
    cart.removeCartItem(cart.products[0]);
    cy.wait('@refresh_cart')
      .its('status')
      .should('eq', 200);
    cart.removeCartItem(cart.products[1]);
    cart.validateEmptyCart();
  });

  // will fail right now, as this is not fixed yet
  it.skip("shouldn't show added to cart dialog when entry couldn't be added", () => {
    cy.server();
    cy.visit(`/product/${cart.products[0].code}`);
    cy.get('cx-breadcrumb h1').contains(cart.products[0].name);
    cy.route({
      url: `${apiUrl}/rest/v2/electronics-spa/users/anonymous/carts/*/entries*`,
      method: 'POST',
      status: 400,
      response: {
        error: {},
      },
    }).as('addEntry');
    cart.addToCart();
    cy.wait('@addEntry')
      .its('status')
      .should('eq', 200);
    cy.get('cx-added-to-cart-dialog .modal-header').should(
      'not.contain',
      'Item(s) added to your cart'
    );
    cart.checkAddedToCartDialog();
    cy.visit('/cart');
    cart.validateEmptyCart();
  });
});
