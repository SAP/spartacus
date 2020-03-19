import * as appliedPromotions from '../../helpers/applied-promotions';
import { retrieveTokenAndLogin } from '../../helpers/checkout-as-persistent-user';
import { waitForPage } from '../../helpers/checkout-flow';

context('Applied promotions', () => {
  const eosCameraProductCode = '1382080';

  before(() =>
    cy.window().then(win => {
      win.localStorage.clear();
      win.sessionStorage.clear();
    })
  );

  describe('Applied promotions as a logged user', () => {
    before(() => {
      cy.server();
      retrieveTokenAndLogin();
      cy.reload();
      const productPageEosCamera = waitForPage(
        `ProductPage&code=${eosCameraProductCode}`,
        'getProductPageEosCamera'
      );
      cy.visit(`/product/${eosCameraProductCode}`);
      cy.wait(`@${productPageEosCamera}`)
        .its('status')
        .should('eq', 200);
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
      cy.server();
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
