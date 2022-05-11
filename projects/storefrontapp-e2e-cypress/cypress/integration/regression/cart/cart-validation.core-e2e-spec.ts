import * as cartValidation from '../../../helpers/cart-validation';
import { viewportContext } from '../../../helpers/viewport-context';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

context('Cart validation', () => {
  viewportContext(['desktop'], () => {
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
      cartValidation.testReducedProductStockValidation();
    });
  });
});
