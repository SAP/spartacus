import * as cartValidation from '../../../helpers/cart-validation';
import { viewportContext } from '../../../helpers/viewport-context';
import { standardUser } from '../../../sample-data/shared-users';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

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

      cartValidation.testReducedProductStockValidation();
    });
  });
});
