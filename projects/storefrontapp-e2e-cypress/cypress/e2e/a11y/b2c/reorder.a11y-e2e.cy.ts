import { clearAllStorage } from '../../support/utils/clear-all-storage';
import { POWERTOOLS_BASESITE } from '../../sample-data/b2b-checkout';
import {
  loginB2bUser,
  navigateToReviewOrderPage,
} from './helpers/a11y-b2b.checkout';

describe('Reorder accessibility', () => {
  before(() => {
    clearAllStorage();
    Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    cy.a11yContinuumSetup();
    loginB2bUser();
    navigateToReviewOrderPage();
  });

  it('Page reorder', () => {
    cy.get('input[formcontrolname="termsAndConditions"]').check();
    cy.get('cx-place-order button').contains(' Place Order ').click();

    cy.get('main').contains('Thank you for your order!');
    cy.visit('my-account/orders');
    cy.get('cx-order-history .cx-order-history-value').first().click();
    cy.get('button').contains(' Reorder ').click();
  });
});
