import { viewportContext } from '../../../helpers/viewport-context';
import * as sampleData from '../../../sample-data/inventory-display';
import { visitProduct } from '../../../helpers/inventory-display';

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
          const match = text.match(regex);
          expect(match).not.to.be.empty;
        });
      });

      it("should render 'out of stock' if stock level 0 and inventory display is on", () => {
        visitProduct(sampleData.OUT_OF_STOCK_PRODUCT);
        const valueSelector = 'cx-add-to-cart .info';
        cy.get(valueSelector).should(($ele) => {
          const text = $ele.text().trim();
          const expected = sampleData.stockOutOfStockLabel;
          assert.equal(text, expected);
        });
      });
    });
  });
});
