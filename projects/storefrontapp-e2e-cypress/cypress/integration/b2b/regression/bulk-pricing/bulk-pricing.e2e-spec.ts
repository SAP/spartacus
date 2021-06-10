import { viewportContext } from '../../../../helpers/viewport-context';
import * as sampleData from '../../../../sample-data/b2b-bulk-pricing';
import { visitProduct } from '../../../../helpers/b2b/b2b-bulk-pricing';

describe('B2B - Bulk Pricing', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    describe('Check bulk pricing table', () => {
      it('should render pricing table for products that contain bulk prices', () => {
        visitProduct(sampleData.PRODUCT);

        const selector = 'cx-bulk-pricing-table .table';
        sampleData.expectedData.forEach((element) => {
          cy.get(selector).contains('td', element.quantity);
          cy.get(selector).contains('td', element.price);
          cy.get(selector).contains('td', element.discount);
        });
      });

      it('should checkout using the proper bulk price based on quantity', () => {
        visitProduct(sampleData.PRODUCT);

        const quantity: string = sampleData.TEST_QUANTITY;
        const expectedTotal: any = sampleData.EXPECTED_TOTAL;
        const selector = 'cx-add-to-cart form div cx-item-counter input';
        cy.get(selector).type('{selectall}').type(quantity);
        const btnSelector = 'cx-add-to-cart form button';
        cy.get(btnSelector).last().click();

        cy.wait(2000);
        const valueSelector = 'cx-added-to-cart-dialog .cx-dialog-total';
        cy.get(valueSelector).contains(expectedTotal);
      });

      it('should NOT render pricing table for products that DO NOT contain bulk prices', () => {
        visitProduct(sampleData.PRODUCT_NO_PRICING);

        cy.get('cx-bulk-pricing-table .container').should('not.exist');
      });
    });
  });
});
