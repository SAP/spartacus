import { visitProductPage } from '../../../helpers/coupons/cart-coupon';
import {
  assertInventoryDisplay,
  configureInventoryDisplay,
  interceptProductDetails,
} from '../../../helpers/inventory-display';
import * as sampleData from '../../../sample-data/inventory-display';

function testInventoryDisplay(productCode: string) {
  const productDetailsAlias = interceptProductDetails(productCode);
  visitProductPage(productCode);

  cy.wait(`@${productDetailsAlias}`)
    .its('response.statusCode')
    .should('eq', 200);

  assertInventoryDisplay(productCode, `@${productDetailsAlias}`);
}

context('B2B - Inventory Display', () => {
  before(() => {
    cy.window().then((win) => win.sessionStorage.clear());
  });

  describe('Inventory Display - disabled', () => {
    before(() => {
      configureInventoryDisplay(false);
    });

    it('should NOT render number of available stock', () => {
      testInventoryDisplay(sampleData.IN_STOCK_WITH_QUANTITY_PRODUCT);
    });
  });

  describe('Inventory Display - active', () => {
    beforeEach(() => {
      configureInventoryDisplay(true);
    });

    it('should render number of available stock', () => {
      testInventoryDisplay(sampleData.IN_STOCK_WITH_QUANTITY_PRODUCT);
    });

    it("should render 'out of stock' if stock level 0 and inventory display is on", () => {
      testInventoryDisplay(sampleData.OUT_OF_STOCK_PRODUCT);
    });

    it("should render 'In Stock' if force inStock status and inventory display is on", () => {
      testInventoryDisplay(sampleData.FORCE_IN_STOCK_PRODUCT);
    });

    it('should render + if threshold applied and inventory display is on', () => {
      testInventoryDisplay(sampleData.THRESHOLD_STOCK);
    });

    it('should NOT render + if threshold greater than stock level and inventory display is on', () => {
      testInventoryDisplay(sampleData.STOCK_LESS_THAN_THRESHOLD);
    });

    it('should NOT render + if threshold equal to stock level and inventory display is on', () => {
      testInventoryDisplay(sampleData.STOCK_EQUAL_THRESHOLD);
    });
  });
});
