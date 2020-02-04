import { retrieveTokenAndLogin } from '../../helpers/checkout-as-persistent-user';
import * as appliedPromotions from '../../helpers/applied-promotions';

context('Applied promotions', () => {
  const eosCameraProductCode = '1382080';

  before(() =>
    cy.window().then(win => {
      win.sessionStorage.clear();
    })
  );

  describe('Applied promotions as a logged user', () => {
    before(() => {
      retrieveTokenAndLogin();
      cy.reload();
      cy.visit(`/product/${eosCameraProductCode}`);
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    appliedPromotions.checkAppliedPromotionsForLoggedUser();
  });

  describe('Applied promotions for different cart totals', () => {
    before(() => {
      retrieveTokenAndLogin();
      cy.reload();
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    appliedPromotions.checkAppliedPromotionsFordifferentCartTotals();
  });
});
