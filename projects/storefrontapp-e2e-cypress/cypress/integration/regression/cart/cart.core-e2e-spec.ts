import * as cart from '../../../helpers/cart';
import { visitHomePage } from '../../../helpers/checkout-flow';
import { clickHamburger } from '../../../helpers/homepage';
import { viewportContext } from '../../../helpers/viewport-context';
import { login } from '../../../support/utils/login';

// Slow test. Improve Execution in pipeline.
describe('Cart', () => {
  viewportContext(['desktop'], () => {
    context('Anonymous user', () => {
      it('should add and remove products', () => {
        cart.checkBasicCart();
      });

      it('should be unable to add out of stock products to cart', () => {
        cart.outOfStock();
      });

      it('should keep cart on page refresh', () => {
        cart.addProductAsAnonymous();
        cy.reload();
        cart.verifyCartNotEmpty();
      });
    });
  });

  viewportContext(['desktop'], () => {
    context('Registered user', () => {
      before(() => {
        cy.window().then((win) => win.sessionStorage.clear());
        cart.loginRegisteredUser();
        visitHomePage();
      });

      it('should merge carts when user is authenticated', () => {
        cart.registerCreateCartRoute();
        cart.registerSaveCartRoute();

        cart.addProductWhenLoggedIn(false);

        clickHamburger();

        cart.logOutAndNavigateToEmptyCart();
        cart.addProductAsAnonymous();
        cart.verifyMergedCartWhenLoggedIn();
        cart.logOutAndEmptyCart();
      });

      it('should add product and manipulate cart quantity', () => {
        cart.manipulateCartQuantity();
      });

      it('should be loaded after user login', () => {
        cart.registerCartUser();
        cart.loginCartUser();
        cy.visit(`/product/${cart.products[0].code}`);
        cart.clickAddToCart();
        cart.checkAddedToCartDialog();
        cart.closeAddedToCartDialog();
        cy.selectUserMenuOption({
          option: 'Sign Out',
        });
        cy.clearLocalStorage();
        cy.intercept(
          `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
            'BASE_SITE'
          )}/users/current/carts?fields*`
        ).as('carts');
        cart.loginCartUser();
        cy.wait('@carts');
        cy.visit('/cart');
        cart.checkProductInCart(cart.products[0]);

        // cleanup
        cart.removeCartItem(cart.products[0]);
        cart.validateEmptyCart();
      });

      it('should create new cart when adding first entry for authenticated user without a cart', () => {
        cart.loginCartUser();
        login(
          cart.cartUser.registrationData.email,
          cart.cartUser.registrationData.password,
          false
        ).then((res) => {
          expect(res.status).to.eq(200);
          cy.log('Removing current Cart for the test case');
          cy.request({
            method: 'DELETE',
            url: `${Cypress.env('API_URL')}/${Cypress.env(
              'OCC_PREFIX'
            )}/${Cypress.env('BASE_SITE')}/users/current/carts/current`,
            headers: {
              Authorization: `bearer ${res.body.access_token}`,
            },
          }).then((response) => {
            expect(response.status).to.eq(200);
          });
        });
        cy.visit(`/product/${cart.products[0].code}`);
        cy.get('cx-breadcrumb h1').contains(cart.products[0].name);
        cy.intercept({
          method: 'GET',
          pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
            'BASE_SITE'
          )}/users/current/carts`,
        }).as('cart');
        cart.clickAddToCart();
        cart.checkAddedToCartDialog();
        cy.visit('/cart');
        cart.checkProductInCart(cart.products[0]);

        // cleanup
        cy.intercept({
          method: 'GET',
          pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
            'BASE_SITE'
          )}/users/current/carts/*`,
          query: {
            lang: 'en',
            curr: 'USD',
            fields: '*',
          },
        }).as('refresh_cart');
        cart.removeCartItem(cart.products[0]);
        cart.validateEmptyCart();
      });

      it('should have different cart on different base sites', () => {
        cy.visit(`/product/${cart.products[0].code}`);
        cart.clickAddToCart();
        cart.checkAddedToCartDialog();
        cart.closeAddedToCartDialog();

        const apparelProduct = {
          code: '300310300',
          name: 'Wallet Dakine Agent Leather Wallet brown',
          price: 33.96,
        };

        cy.visit(`/apparel-uk-spa/en/GBP/product/${apparelProduct.code}`);
        cart.clickAddToCart();
        cart.checkAddedToCartDialog();
        cart.closeAddedToCartDialog();

        cy.visit(`/${Cypress.env('BASE_SITE')}/en/USD/cart`);
        cart.checkProductInCart(cart.products[0]);
        cy.get('cx-global-message .alert-danger').should('not.exist');

        cy.visit(`/apparel-uk-spa/en/GBP/cart`);
        cart.checkProductInCart(apparelProduct, 1, 'GBP');
        cy.get('cx-global-message .alert-danger').should('not.exist');
      });
    });
  });
});
