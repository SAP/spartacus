import * as appliedPromotions from '../../../helpers/applied-promotions';
import { viewportContext } from '../../../helpers/viewport-context';

context('Applied promotions', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
      cy.requireLoggedIn();
    });

    appliedPromotions.testPromotionsForLoggedInUser();
  });
});
