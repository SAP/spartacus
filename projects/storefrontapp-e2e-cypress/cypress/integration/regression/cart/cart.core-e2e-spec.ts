import * as cart from '../../../helpers/cart';
import { visitHomePage } from '../../../helpers/checkout-flow';
import * as alerts from '../../../helpers/global-message';
import { clickHamburger } from '../../../helpers/homepage';
import { viewportContext } from '../../../helpers/viewport-context';
import { login } from '../../../support/utils/login';

describe('Cart', () => {
  viewportContext(['mobile', 'desktop'], () => {
    context('Anonymous user', () => {
      it('should add and remove products', () => {
        cart.checkBasicCart();
      });
    });

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
    });
  });

  viewportContext(['desktop'], () => {
    context('Anonymous user', () => {
      it('should be unable to add out of stock products to cart', () => {
        cart.outOfStock();
      });

      it('should keep cart on page refresh', () => {
        cart.addProductAsAnonymous();
        cy.reload();
        cart.verifyCartNotEmpty();
      });
    });

    context('Registered user', () => {
      before(() => {
        cy.window().then((win) => win.sessionStorage.clear());
        cart.loginRegisteredUser();
        visitHomePage();
      });

      it('should be loaded for authenticated user after "cart not found" error', () => {
        cart.registerCreateCartRoute();
        cart.registerSaveCartRoute();
        cart.loginRegisteredUser();
        cart.addProductWhenLoggedIn(false);
        cy.window().then((window) => {
          const storage = JSON.parse(
            window.localStorage.getItem('spartacus⚿electronics-spa⚿cart')
          );
          const cartCode = storage.active;
          storage.active = 'incorrect-code';
          window.localStorage.setItem(
            'spartacus⚿electronics-spa⚿cart',
            JSON.stringify(storage)
          );
          cy.visit('/cart');
          alerts.getErrorAlert().should('contain', 'Cart not found');
          cy.get('.cart-details-wrapper .cx-total').contains(
            `Cart #${cartCode}`
          );
        });
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

      // will fail right now, as this is not implemented yet
      it('should first try to load cart when adding first entry for logged user', () => {
        cart.loginCartUser();

        login(
          cart.cartUser.registrationData.email,
          cart.cartUser.registrationData.password,
          false
        ).then((res) => {
          expect(res.status).to.eq(200);
          // remove cart
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
        login(
          cart.cartUser.registrationData.email,
          cart.cartUser.registrationData.password,
          false
        ).then((res) => {
          cy.request({
            // create cart
            method: 'POST',
            url: `${Cypress.env('API_URL')}/${Cypress.env(
              'OCC_PREFIX'
            )}/${Cypress.env('BASE_SITE')}/users/current/carts`,
            headers: {
              Authorization: `bearer ${res.body.access_token}`,
            },
          }).then((response) => {
            // add entry to cart
            return cy.request({
              method: 'POST',
              url: `${Cypress.env('API_URL')}/${Cypress.env(
                'OCC_PREFIX'
              )}/${Cypress.env('BASE_SITE')}/users/current/carts/${
                response.body.code
              }/entries`,
              headers: {
                Authorization: `bearer ${res.body.access_token}`,
              },
              body: {
                product: { code: cart.products[1].code, qty: 1 },
              },
            });
          });
        });

        cart.clickAddToCart();
        cart.checkAddedToCartDialog(2);
        cy.visit('/cart');
        cart.checkProductInCart(cart.products[0]);
        cart.checkProductInCart(cart.products[1]);

        cart.registerCartRefreshRoute();

        cart.removeCartItem(cart.products[0]);

        cy.wait('@refresh_cart');

        cart.removeCartItem(cart.products[1]);
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

      it('should use existing cart when adding new entries', () => {
        cy.visit(`/product/${cart.products[0].code}`);
        cy.get('cx-breadcrumb h1').contains(cart.products[0].name);
        cart.clickAddToCart();
        cart.checkAddedToCartDialog();
        cy.visit(`/product/${cart.products[1].code}`);
        cy.get('cx-breadcrumb h1').contains(cart.products[1].name);
        cart.clickAddToCart();
        cart.checkAddedToCartDialog(2);

        cy.visit('/cart');
        cart.checkProductInCart(cart.products[0]);
        cart.checkProductInCart(cart.products[1]);

        // cleanup
        cart.registerCartRefreshRoute();
        cart.removeCartItem(cart.products[0]);
        cy.wait('@refresh_cart');

        cart.removeCartItem(cart.products[1]);
        cy.wait('@refresh_cart');

        cart.validateEmptyCart();
      });

      // will fail right now, as this is not fixed yet
      it.skip("shouldn't show added to cart dialog when entry couldn't be added", () => {
        cy.visit(`/product/${cart.products[0].code}`);
        cy.get('cx-breadcrumb h1').contains(cart.products[0].name);
        cy.intercept(
          {
            method: 'POST',
            pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
              'BASE_SITE'
            )}/users/anonymous/carts/*/entries`,
          },
          {
            body: {
              error: {},
            },
            statusCode: 400,
          }
        ).as('addEntry');
        cart.clickAddToCart();
        cy.wait('@addEntry').its('response.statusCode').should('eq', 400);
        cy.get('cx-added-to-cart-dialog .modal-header').should(
          'not.contain',
          'Item(s) added to your cart'
        );
        cart.checkAddedToCartDialog();
        cy.visit('/cart');
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
