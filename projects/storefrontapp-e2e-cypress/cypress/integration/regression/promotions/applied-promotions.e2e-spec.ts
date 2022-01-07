import * as appliedPromotions from '../../../helpers/applied-promotions';
import { viewportContext } from '../../../helpers/viewport-context';

context('Applied promotions', () => {
  viewportContext(['mobile'], () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
    });

    // Core test. Repeat in mobile.
    appliedPromotions.testPromotionsForLoggedInUser(true);
    appliedPromotions.checkAppliedPromotionsDiffQuantities();
  });
});
