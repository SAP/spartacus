import * as appliedPromotions from '../../helpers/applied-promotions';
import { waitForPage } from '../../helpers/checkout-flow';
import { standardUser } from '../../sample-data/shared-users';

context('Applied promotions', () => {
  before(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
      win.localStorage.clear();
    });
    cy.requireLoggedIn(standardUser);
  });

  describe('Applied promotions as a logged user', () => {
    before(() => {
      const eosCameraProductCode = '1382080';
      const productPage = waitForPage(eosCameraProductCode, 'getProductPage');
      cy.visit(`/product/${eosCameraProductCode}`);
      cy.wait(`@${productPage}`).its('status').should('eq', 200);
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    appliedPromotions.checkAppliedPromotions();

    afterEach(() => {
      cy.saveLocalStorage();
    });
  });

  describe('Applied promotions for different cart totals', () => {
    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    appliedPromotions.checkAppliedPromotionsFordifferentCartTotals();
  });
});
