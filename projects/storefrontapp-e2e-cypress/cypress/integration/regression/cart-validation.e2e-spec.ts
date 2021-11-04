import { removeCartItem } from '../../helpers/cart';
import * as cartValidation from '../../helpers/cart-validation';
import { addProductToCart } from '../../helpers/save-for-later';
import { viewportContext } from '../../helpers/viewport-context';
import {
  lowStockResponse,
  outOfStockResponse,
  PRODUCT_1,
  PRODUCT_2,
} from '../../sample-data/cart-validation';
import { standardUser } from '../../sample-data/shared-users';
import { clearAllStorage } from '../../support/utils/clear-all-storage';

context('Cart validation', () => {
  viewportContext(['mobile', 'desktop'], () => {
    beforeEach(() => {
      clearAllStorage();
      cy.requireLoggedIn(standardUser);

      cy.cxConfig({
        cart: {
          validation: {
            enabled: true,
          },
        },
      });
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

        cartValidation.validateStock(lowStockResponse);

        cy.findByText(/proceed to checkout/i).click();
        cy.wait(`@validate`);

        cartValidation.checkProductAvailabilityMessage();

        cy.get('cx-cart-item-list cx-cart-item-validation-warning div').should(
          'have.length',
          2
        );

        cartValidation.checkReducedQuantity(PRODUCT_1);
        cartValidation.checkReducedQuantity(PRODUCT_2);
      });

      it('should display information about removed product from cart due to out of stock', () => {
        cartValidation.validateStock(outOfStockResponse);

        cy.findByText(/proceed to checkout/i).click();
        cy.wait(`@validate`);

        cartValidation.checkProductAvailabilityMessage();

        cy.get('cx-cart-details')
          .contains('cx-cart-validation-warnings span', PRODUCT_1.name)
          .should(
            'contain',
            `has been removed from the cart due to insufficient stock.`
          );
      });

      it('should display information about only product in cart being removed due to out of stock', () => {
        removeCartItem(PRODUCT_2);

        cartValidation.validateStock(outOfStockResponse);

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
