import * as appliedPromotions from '../../helpers/applied-promotions';
import { waitForProductPage } from '../../helpers/checkout-flow';
import { viewportContext } from '../../helpers/viewport-context';
import { standardUser } from '../../sample-data/shared-users';

context('Applied promotions', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
      cy.requireLoggedIn(standardUser);
    });

    describe('As a logged in user', () => {
      before(() => {
        const eosCameraProductCode = '1382080';
        const productPage = waitForProductPage(
          eosCameraProductCode,
          'getProductPage'
        );
        cy.visit(`/product/${eosCameraProductCode}`);
        cy.wait(`@${productPage}`).its('response.statusCode').should('eq', 200);
      });

      beforeEach(() => {
        cy.restoreLocalStorage();
      });

      appliedPromotions.checkAppliedPromotions();

      appliedPromotions.checkAppliedPromotionsFordifferentCartTotals();

      afterEach(() => {
        cy.saveLocalStorage();
      });
    });
  });
});
