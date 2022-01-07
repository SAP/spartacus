import * as appliedPromotions from '../../../helpers/applied-promotions';
import { viewportContext } from '../../../helpers/viewport-context';
<<<<<<< HEAD
import { standardUser } from '../../../sample-data/shared-users';
=======
>>>>>>> 8775c910f9621a280ea99983353c55bf56f81b4f

context('Applied promotions', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.localStorage.clear();
      });
<<<<<<< HEAD
      cy.requireLoggedIn(standardUser);
=======
      cy.requireLoggedIn();
>>>>>>> 8775c910f9621a280ea99983353c55bf56f81b4f
    });

    appliedPromotions.testPromotionsForLoggedInUser();
  });
});
