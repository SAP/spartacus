import { viewportContext } from '../../helpers/viewport-context';
import { standardUser } from '../../sample-data/shared-users';
import { addProductToCart } from '../../helpers/save-for-later';
import {
  lowStockResponse,
  outOfStockResponse,
  PRODUCT_1,
  PRODUCT_2,
} from '../../sample-data/cart-validation';
import { removeCartItem } from '../../helpers/cart';

context('Cart validation', () => {
  viewportContext(['mobile', 'desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.window().then((win) => win.localStorage.clear());
      cy.clearLocalStorageMemory();
      cy.requireLoggedIn(standardUser);
    });

    describe('As logged in', () => {
      beforeEach(() => {
        cy.restoreLocalStorage();
      });

      afterEach(() => {
        cy.saveLocalStorage();
      });

      after(() => {
        removeCartItem(PRODUCT_1);
      });

      it('should display information about reduced stock for product in cart', () => {
        addProductToCart(PRODUCT_1);
        addProductToCart(PRODUCT_2);

        cy.intercept(
          {
            method: 'POST',
            pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
              'BASE_SITE'
            )}/users/current/carts/*/validate`,
          },
          lowStockResponse
        ).as('validate');

        cy.findByText(/proceed to checkout/i).click();
        cy.wait(`@validate`);

        cy.get('cx-global-message').should(
          'contain',
          `During checkout availability of entries in your cart has changed. Please review your cart.`
        );

        cy.get('cx-cart-item-list cx-cart-item-validation-warning div').should(
          'have.length',
          2
        );
        cy.get('cx-cart-item-list')
          .contains('cx-cart-item-validation-warning span', PRODUCT_1.name)
          .should(
            'contain',
            `quantity has reduced to 1 due to insufficient stock.`
          );
        cy.get('cx-cart-item-list')
          .contains('cx-cart-item-validation-warning span', PRODUCT_2.name)
          .should(
            'contain',
            `quantity has reduced to 1 due to insufficient stock.`
          );
      });

      it('should display information about removed product from cart due to out of stock', () => {
        cy.intercept(
          {
            method: 'POST',
            pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
              'BASE_SITE'
            )}/users/current/carts/*/validate`,
          },
          outOfStockResponse
        ).as('validate');

        cy.findByText(/proceed to checkout/i).click();
        cy.wait(`@validate`);

        cy.get('cx-global-message').should(
          'contain',
          `During checkout availability of entries in your cart has changed. Please review your cart.`
        );

        cy.get('cx-cart-details')
          .contains('cx-cart-validation-warnings span', PRODUCT_1.name)
          .should(
            'contain',
            `has been removed from the cart due to insufficient stock.`
          );
      });

      it('should display information about only product in cart being removed due to out of stock', () => {
        removeCartItem(PRODUCT_2);

        cy.intercept(
          {
            method: 'POST',
            pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
              'BASE_SITE'
            )}/users/current/carts/*/validate`,
          },
          outOfStockResponse
        ).as('validate');

        cy.findByText(/proceed to checkout/i).click();
        cy.wait(`@validate`);

        cy.get('cx-global-message').should(
          'contain',
          `${PRODUCT_1.name} was removed from the cart due to being out of stock.`
        );
      });
    });
  });
});
