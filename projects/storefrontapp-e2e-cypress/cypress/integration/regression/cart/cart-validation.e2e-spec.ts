import * as cartValidation from '../../../helpers/cart-validation';
import { viewportContext } from '../../../helpers/viewport-context';
import {
  outOfStockResponse,
  PRODUCT_1,
  PRODUCT_2,
} from '../../../sample-data/cart-validation';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';
import {
  addMultipleProductsToCart,
  removeItemAndCheckCartEntriesNumber,
} from '../../../helpers/cart-validation';

context('Cart validation', () => {
  viewportContext(['mobile'], () => {
    beforeEach(() => {
      clearAllStorage();
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
        cy.requireLoggedIn();
      });

      afterEach(() => {
        cy.saveLocalStorage();
      });

      // Core test. Check with mobile as well.
      cartValidation.testReducedProductStockValidation();
    });
  });

  viewportContext(['mobile', 'desktop'], () => {
    beforeEach(() => {
      clearAllStorage();
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
        cy.requireLoggedIn();
      });

      afterEach(() => {
        cy.saveLocalStorage();
      });

      it('should display information about removed product from cart due to out of stock', () => {
        addMultipleProductsToCart([PRODUCT_1, PRODUCT_2]);

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

        removeItemAndCheckCartEntriesNumber(PRODUCT_1, 1);
        removeItemAndCheckCartEntriesNumber(PRODUCT_2, 0);
      });

      it('should display information about only product in cart being removed due to out of stock', () => {
        addMultipleProductsToCart([PRODUCT_1]);

        cartValidation.validateStock(outOfStockResponse);

        cy.findByText(/proceed to checkout/i).click();
        cy.wait(`@validate`);

        cy.get('cx-global-message').should(
          'contain',
          `${PRODUCT_1.name} was removed from the cart due to being out of stock.`
        );

        removeItemAndCheckCartEntriesNumber(PRODUCT_1, 1);
      });
    });
  });
});
