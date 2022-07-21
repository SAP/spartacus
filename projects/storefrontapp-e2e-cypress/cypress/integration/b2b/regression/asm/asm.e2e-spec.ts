import { clearAllStorage } from '../../../../support/utils/clear-all-storage';
import { ELECTRONICS_BASESITE } from '../../../../helpers/checkout-flow';
import { POWERTOOLS_BASESITE } from '../../../../sample-data/b2b-checkout';

/**
 * TODO
 */
context('B2B - Assisted Service Module', () => {
  before(() => {
    clearAllStorage();
  });

  describe('Powertools Site', () => {
    before(() => {
      Cypress.env('BASE_SITE', POWERTOOLS_BASESITE);
    });

    after(() => {
      Cypress.env('BASE_SITE', ELECTRONICS_BASESITE);
    });

    it("should fetch cost centers based on the emulated user's role", () => {
      cy.cxConfig({
        context: {
          baseSite: ['powertools-spa'],
          currency: ['USD'],
        },
      });
    });
  });
});
