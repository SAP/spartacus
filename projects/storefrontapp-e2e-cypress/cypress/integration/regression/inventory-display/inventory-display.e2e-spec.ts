import { visitProductPage } from '../../../helpers/coupons/cart-coupon';
import {
  assertInventoryDisplay,
  configureInventoryDisplay,
  interceptProductDetails,
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
        const productDetailsAlias = interceptProductDetails(
          sampleData.IN_STOCK_WITH_QUANTITY_PRODUCT
        );
        visitProductPage(sampleData.IN_STOCK_WITH_QUANTITY_PRODUCT);

        cy.wait(`@${productDetailsAlias}`)
          .its('response.statusCode')
          .should('eq', 200);

        assertInventoryDisplay(
          sampleData.IN_STOCK_WITH_QUANTITY_PRODUCT,
          `@${productDetailsAlias}`
        );
      });
    });

    describe('Inventory Display - active', () => {
      beforeEach(() => {
        configureInventoryDisplay(true);
      });

      it('should render number of available stock', () => {
        const productDetailsAlias = interceptProductDetails(
          sampleData.IN_STOCK_WITH_QUANTITY_PRODUCT
        );
        visitProductPage(sampleData.IN_STOCK_WITH_QUANTITY_PRODUCT);

        cy.wait(`@${productDetailsAlias}`)
          .its('response.statusCode')
          .should('eq', 200);

        assertInventoryDisplay(
          sampleData.IN_STOCK_WITH_QUANTITY_PRODUCT,
          `@${productDetailsAlias}`
        );
      });

      it("should render 'out of stock' if stock level 0 and inventory display is on", () => {
        const productDetailsAlias = interceptProductDetails(
          sampleData.OUT_OF_STOCK_PRODUCT
        );
        visitProductPage(sampleData.OUT_OF_STOCK_PRODUCT);

        cy.wait(`@${productDetailsAlias}`)
          .its('response.statusCode')
          .should('eq', 200);

        assertInventoryDisplay(
          sampleData.OUT_OF_STOCK_PRODUCT,
          `@${productDetailsAlias}`
        );
      });

      it("should render 'In Stock' if force inStock status and inventory display is on", () => {
        const productDetailsAlias = interceptProductDetails(
          sampleData.FORCE_IN_STOCK_PRODUCT
        );
        visitProductPage(sampleData.FORCE_IN_STOCK_PRODUCT);

        cy.wait(`@${productDetailsAlias}`)
          .its('response.statusCode')
          .should('eq', 200);

        assertInventoryDisplay(
          sampleData.FORCE_IN_STOCK_PRODUCT,
          `@${productDetailsAlias}`
        );
      });

      it('should render + if threshold applied and inventory display is on', () => {
        const productDetailsAlias = interceptProductDetails(
          sampleData.THRESHOLD_STOCK
        );
        visitProductPage(sampleData.THRESHOLD_STOCK);

        cy.wait(`@${productDetailsAlias}`)
          .its('response.statusCode')
          .should('eq', 200);

        assertInventoryDisplay(
          sampleData.THRESHOLD_STOCK,
          `@${productDetailsAlias}`
        );
      });

      it('should NOT render + if threshold greater than stock level and inventory display is on', () => {
        const productDetailsAlias = interceptProductDetails(
          sampleData.STOCK_LESS_THAN_THRESHOLD
        );
        visitProductPage(sampleData.STOCK_LESS_THAN_THRESHOLD);

        cy.wait(`@${productDetailsAlias}`)
          .its('response.statusCode')
          .should('eq', 200);

        assertInventoryDisplay(
          sampleData.STOCK_LESS_THAN_THRESHOLD,
          `@${productDetailsAlias}`
        );
      });

      it('should NOT render + if threshold equal to stock level and inventory display is on', () => {
        const productDetailsAlias = interceptProductDetails(
          sampleData.STOCK_EQUAL_THRESHOLD
        );
        visitProductPage(sampleData.STOCK_EQUAL_THRESHOLD);

        cy.wait(`@${productDetailsAlias}`)
          .its('response.statusCode')
          .should('eq', 200);

        assertInventoryDisplay(
          sampleData.STOCK_EQUAL_THRESHOLD,
          `@${productDetailsAlias}`
        );
      });
    });
  });
});
