import { retrieveTokenAndLogin } from '../../helpers/checkout-as-persistent-user';
import * as appliedPromotions from '../../helpers/applied-promotions';

context('Applied promotions', () => {
  before(() =>
    cy.window().then(win => {
      win.sessionStorage.clear();
    })
  );

  describe('Applied promotions as a logged user', () => {
    before(() => {
      retrieveTokenAndLogin();
      cy.reload();
      cy.visit('/product/1382080');
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    appliedPromotions.checkAppliedPromotionsForLoggedUser();
    appliedPromotions.checkAppliedPromotionsFordifferentCartTotals();
  });
});
