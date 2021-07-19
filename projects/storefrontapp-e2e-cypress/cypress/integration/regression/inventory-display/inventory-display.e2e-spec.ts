import { visitProductPage } from '../../../helpers/coupons/cart-coupon';
import {
  configureInventoryDisplay,
  stockSelector,
} from '../../../helpers/inventory-display';
import { viewportContext } from '../../../helpers/viewport-context';
import * as sampleData from '../../../sample-data/inventory-display';

context('B2B - Inventory Display', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    describe('Inventory Display - disabled', () => {
      before(() => {
        configureInventoryDisplay(false);
      });

      it('should NOT render number of available stock', () => {
        visitProductPage(sampleData.IN_STOCK_WITH_QUANTITY_PRODUCT);

        cy.get(stockSelector).then(($ele) => {
          console.log($ele.text());
          console.log($ele.text().trim());
          const text = $ele.text().trim();
          assert.equal(text, sampleData.stockLabel);
        });
      });
    });

    describe('Inventory Display - active', () => {
      beforeEach(() => {
        configureInventoryDisplay(true);
      });

      it('should render number of available stock', () => {
        visitProductPage(sampleData.IN_STOCK_WITH_QUANTITY_PRODUCT);

        cy.get(stockSelector).then(($ele) => {
          console.log('a', $ele.text());
          console.log($ele.text().trim());

          const text = $ele.text().trim();
          const regex = '[0-9]* ' + sampleData.stockLabel;
          const match = text.match(regex);
          expect(match.length).equal(1);
        });
      });

      it("should render 'out of stock' if stock level 0 and inventory display is on", () => {
        visitProductPage(sampleData.OUT_OF_STOCK_PRODUCT);

        cy.get(stockSelector).then(($ele) => {
          const text = $ele.text().trim();
          const expected = sampleData.stockOutOfStockLabel;
          assert.equal(text, expected);
        });
      });

      it("should render 'In Stock' if force inStock status and inventory display is on", () => {
        visitProductPage(sampleData.FORCE_IN_STOCK_PRODUCT);

        cy.get(stockSelector).then(($ele) => {
          const text = $ele.text().trim();
          const expected = sampleData.stockLabel;
          assert.equal(text, expected);
        });
      });

      it('should render + if threshold applied and inventory display is on', () => {
        visitProductPage(sampleData.THRESHOLD_STOCK);

        cy.get(stockSelector).then(($ele) => {
          const text = $ele.text().trim();
          expect(text.includes('+')).to.be.true;
        });
      });

      it('should NOT render + if threshold greater than stock level and inventory display is on', () => {
        visitProductPage(sampleData.STOCK_LESS_THAN_THRESHOLD);

        cy.get(stockSelector).then(($ele) => {
          const text = $ele.text().trim();
          expect(text.includes('+')).to.be.false;
        });
      });

      it('should NOT render + if threshold equal to stock level and inventory display is on', () => {
        visitProductPage(sampleData.STOCK_EQUAL_THRESHOLD);

        cy.get(stockSelector).then(($ele) => {
          const text = $ele.text().trim();
          expect(text.includes('+')).to.be.false;
        });
      });
    });
  });
});
