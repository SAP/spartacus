import * as bulkPricingActions from '../../../../helpers/b2b/b2b-bulk-pricing';
//import * as sampleData from '../../../../sample-data/b2b-bulk-pricing';

describe('B2B - Bulk Pricing', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  describe('Check bulk pricing table', () => {
    it('should render pricing table for products that contain bulk prices', () => {
      bulkPricingActions.visitProductWithBulkPrices();
      bulkPricingActions.checkTableData();
    });

    // it('should not render pricing table for products that do NOT contain bulk prices', () => {
    //   bulkPricingActions.visitProductWithNoBulkPrices();
    //   bulkPricingActions.checkNoTableRendered();
    // });
  });

  
});