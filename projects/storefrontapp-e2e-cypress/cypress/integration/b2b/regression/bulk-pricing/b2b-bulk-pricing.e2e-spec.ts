import * as bulkPricingActions from '../../../../helpers/b2b/b2b-bulk-pricing';

describe('B2B - Bulk Pricing', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  describe('Check bulk pricing table', () => {
    it('should render pricing table for products that contain bulk prices', () => {
      bulkPricingActions.visitProductWithBulkPrices();
      bulkPricingActions.checkTableData();
    });

    it('should checkout using the proper bulk price based on quantity', () => {
      bulkPricingActions.visitProductWithBulkPrices();
      bulkPricingActions.preformCheckoutWithCorrectPrice();
    });

    it('should NOT render pricing table for products that DO NOT contain bulk prices', () => {
      bulkPricingActions.visitProductWithNoBulkPrices();
      bulkPricingActions.checkNoTableRendered();
    });
  });
});
