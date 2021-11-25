import * as cartValidation from '../../../helpers/cart-validation';
import { viewportContext } from '../../../helpers/viewport-context';
import {
  lowStockResponse,
  PRODUCT_1,
  PRODUCT_2,
} from '../../../sample-data/cart-validation';
import { standardUser } from '../../../sample-data/shared-users';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';
import {
  addMultipleProductsToCart,
  removeItemAndCheckCartEntriesNumber,
} from '../../../helpers/cart-validation';

context('Cart validation', () => {
  viewportContext(['desktop'], () => {
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
        cy.requireLoggedIn(standardUser);
      });

      afterEach(() => {
        cy.saveLocalStorage();
      });

      it('should display information about reduced stock for product in cart', () => {
        addMultipleProductsToCart([PRODUCT_1, PRODUCT_2]);

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

        removeItemAndCheckCartEntriesNumber(PRODUCT_1, 1);
        removeItemAndCheckCartEntriesNumber(PRODUCT_2, 0);
      });
    });
  });
});
