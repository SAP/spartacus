import * as appliedPromotions from '../../helpers/applied-promotions';
import { retrieveTokenAndLogin } from '../../helpers/checkout-as-persistent-user';
import { waitForPage } from '../../helpers/checkout-flow';
import { standardUser } from '../../sample-data/shared-users';

context('Applied promotions', () => {
  const eosCameraProductCode = '1382080';

  before(() =>
    cy.window().then((win) => {
      win.sessionStorage.clear();
      win.localStorage.clear();
    })
  );

  describe('Applied promotions as a logged user', () => {
    before(() => {
      cy.requireLoggedIn(standardUser);
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
