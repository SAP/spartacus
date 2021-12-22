import * as appliedPromotions from '../../../helpers/applied-promotions';
import { viewportContext } from '../../../helpers/viewport-context';
import { standardUser } from '../../../sample-data/shared-users';

context('Applied promotions', () => {
  viewportContext(['mobile'], () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
      cy.requireLoggedIn(standardUser);
    });

    // Core test. Repeat in mobile.
    appliedPromotions.testPromotionsForLoggedInUser();
  });
});
