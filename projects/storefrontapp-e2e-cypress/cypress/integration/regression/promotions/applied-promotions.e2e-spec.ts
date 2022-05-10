import * as appliedPromotions from '../../../helpers/applied-promotions';
import { viewportContext } from '../../../helpers/viewport-context';

context('Applied promotions', () => {
  viewportContext(['mobile'], () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
      cy.requireLoggedIn();
    });

    it(['promotions'], 'should validate promotions core functionality', () => {
      // Core test. Repeat in mobile.
      appliedPromotions.testPromotionsForLoggedInUser();
    });
  });
});
