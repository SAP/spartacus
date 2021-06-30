import { viewportContext } from '../../../../helpers/viewport-context';
import * as sampleData from '../../../../sample-data/b2b-inventory-display';
import { visitProduct } from '../../../../helpers/b2b/b2b-inventory-display';

describe('B2B - Inventory Display', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    describe('Check inventory display', () => {
      it('should render number of available stock', () => {
        visitProduct(sampleData.IN_STOCK_WITH_QUANT_PRODUCT);
        const valueSelector = 'cx-add-to-cart .info';

        cy.get(valueSelector).should(($ele) => {
          const text = $ele.text().trim();
          const regex = '[0-9]* ' + sampleData.stockLabel;
          const match = text.match(regex); // returns null if not match
          expect(match).not.to.be.empty;
        });
      });

      it('should render out of stock', () => {
        visitProduct(sampleData.OUT_OF_STOCK_PRODUCT);
        const valueSelector = 'cx-add-to-cart .info';
        cy.get(valueSelector).should(($ele) => {
          const text = $ele.text().trim();
          assert.equal(text, sampleData.outStockLabel);
        });
      });

      it('should render In stock when quantity information unavailable', () => {
        visitProduct(sampleData.IN_STOCK_WITH_NO_QUANT_PRODUCT);
        const valueSelector = 'cx-add-to-cart .info';
        cy.get(valueSelector).should(($ele) => {
          const text = $ele.text().trim();
          assert.equal(text, sampleData.stockLabel);
        });
      });
    });
  });
});
