import { viewportContext } from '../../../../helpers/viewport-context';
import * as sampleData from '../../../../sample-data/b2b-bulk-pricing';
import * as b2bBulkPricing from '../../../../helpers/b2b/b2b-bulk-pricing';

describe('B2B - Bulk Pricing', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    describe('Check bulk pricing table', () => {
      it('should render pricing table for products that contain bulk prices', () => {
        b2bBulkPricing.visitProduct(sampleData.PRODUCT);

        const selector = 'cx-bulk-pricing-table .table';
        sampleData.expectedData.forEach((element) => {
          cy.get(selector).contains('td', element.quantity);
          cy.get(selector).contains('td', element.price);
          cy.get(selector).contains('td', element.discount);
        });
      });

      it('should checkout using the proper bulk price based on quantity', () => {
        b2bBulkPricing.visitProduct(sampleData.PRODUCT);

        b2bBulkPricing.addAndverifyTotal(sampleData.TEST_QUANTITY);
      });

      it('should NOT render pricing table for products that DO NOT contain bulk prices', () => {
        b2bBulkPricing.visitProduct(sampleData.PRODUCT_NO_PRICING);

        cy.get('cx-bulk-pricing-table .container').should('not.exist');
      });

      it('should verify lowering the quantity also lowers the discount', () => {
        b2bBulkPricing.visitProduct(sampleData.PRODUCT);

        b2bBulkPricing.addAndverifyTotal(sampleData.QUANTITY_FOR_25_DISCOUNT);

        b2bBulkPricing.updateAndverifyTotal(
          sampleData.QUANTITY_FOR_13_DISCOUNT
        );

        b2bBulkPricing.updateAndverifyTotal(
          sampleData.QUANTITY_FOR_NO_DISCOUNT
        );
      });

      it('should verify increasing the quantity also increases the discount', () => {
        b2bBulkPricing.visitProduct(sampleData.PRODUCT);

        b2bBulkPricing.addAndverifyTotal(sampleData.QUANTITY_FOR_8_DISCOUNT);
        b2bBulkPricing.updateAndverifyTotal(sampleData.QUANTITY_PLUS_ONE);
      });

      it('should verify checking out a bulk priced item and a regular product', () => {
        b2bBulkPricing.loginB2bUser();
        b2bBulkPricing.visitProduct(sampleData.PRODUCT);

        b2bBulkPricing.addAndverifyTotal(sampleData.QUANTITY_FOR_3_DISCOUNT);

        b2bBulkPricing.visitProduct(sampleData.PRODUCT_NO_PRICING);
        b2bBulkPricing.addOneToCart();

        b2bBulkPricing.placeOrder();
      });
    });
  });
});
