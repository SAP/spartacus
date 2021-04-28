import { viewportContext } from '../../../../helpers/viewport-context';
import * as sampleData from '../../../../sample-data/b2b-inventory-display';
import { visitProduct } from '../../../../helpers/b2b/b2b-inventory-display';

describe('B2B - Inventory Display', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    describe('Check inventory display', () => {
      it('should render product availablity stock', () => {
        visitProduct(sampleData.PRODUCT_ID);
        const valueSelector = 'cx-add-to-cart .info';
        cy.get(valueSelector).contains(sampleData.expectedLabel);
      });
    });
  });
});
