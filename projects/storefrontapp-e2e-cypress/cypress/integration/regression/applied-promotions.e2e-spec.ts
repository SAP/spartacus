import * as appliedPromotions from '../../helpers/applied-promotions';
import { viewportContext } from '../../helpers/viewport-context';
import { standardUser } from '../../sample-data/shared-users';

context('Applied promotions', () => {
  viewportContext(['mobile'], () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
      cy.requireLoggedIn(standardUser);
    });

    describe('As a logged in user', () => {
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
