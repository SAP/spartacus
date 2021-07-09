import { viewportContext } from '../../../helpers/viewport-context';
import * as sampleData from '../../../sample-data/inventory-display';
import { visitProduct } from '../../../helpers/inventory-display';

describe('B2B - Inventory Display', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());

      cy.cxConfig({
        cmsComponents: {
          ProductAddToCartComponent: {
            data: {
              inventoryDisplay: true,
            },
          },
        },
      });
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

      it("should render 'In Stock' if force inStock status and inventory display is on", () => {
        visitProduct(sampleData.FORCE_IN_STOCK_PRODUCT);
        const valueSelector = 'cx-add-to-cart .info';

        cy.get(valueSelector).should(($ele) => {
          const text = $ele.text().trim();
          const expected = sampleData.stockLabel;
          assert.equal(text, expected);
        });
      });

      it('should render + if threshold applied and inventory display is on', () => {
        visitProduct(sampleData.THRESHOLD_STOCK);
        const valueSelector = 'cx-add-to-cart .info span';

        cy.get(valueSelector).should(($ele) => {
          const text = $ele.text().trim();
          expect(text.includes('+')).to.be.true;
        });
      });

      it('should NOT render + if threshold greater than stock level and inventory display is on', () => {
        visitProduct(sampleData.STOCK_LESS_THAN_THRESHOLD);
        const valueSelector = 'cx-add-to-cart .info span';

        cy.get(valueSelector).should(($ele) => {
          const text = $ele.text().trim();
          expect(text.includes('+')).to.be.false;
        });
      });

      it('should NOT render + if threshold equal to stock level and inventory display is on', () => {
        visitProduct(sampleData.STOCK_EQUAL_THRESHOLD);
        const valueSelector = 'cx-add-to-cart .info span';

        cy.get(valueSelector).should(($ele) => {
          const text = $ele.text().trim();
          expect(text.includes('+')).to.be.false;
        });
      });

      it('should NOT render maxQuantity if inventory display is off', () => {
        cy.cxConfig({
          cmsComponents: {
            ProductAddToCartComponent: {
              data: {
                inventoryDisplay: false,
              },
            },
          },
        });

        visitProduct(sampleData.IN_STOCK_WITH_QUANT_PRODUCT);
        const quantitySelector = 'cx-add-to-cart .info span';
        const valueSelector = 'cx-add-to-cart .info';

        cy.get(quantitySelector).should(($ele) => {
          const text = $ele.text().trim();
          assert.equal(text, '');
        });

        cy.get(valueSelector).should(($ele) => {
          const text = $ele.text().trim();
          assert.equal(text, sampleData.stockLabel);
        });
      });
    });
  });
});
