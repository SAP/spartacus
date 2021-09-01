import { visitProductPage } from '../helpers/coupons/cart-coupon';
import * as sampleData from '../sample-data/inventory-display';

export const stockSelector = 'cx-add-to-cart .info';
export const GET_PRODUCT_DETAILS_ENDPOINT_ALIAS = 'getProductDetails';

export function interceptProductDetails(productCode: string) {
  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/products/${productCode}?fields=*stock(DEFAULT)*&lang=en&curr=USD`
  ).as(GET_PRODUCT_DETAILS_ENDPOINT_ALIAS);

  return GET_PRODUCT_DETAILS_ENDPOINT_ALIAS;
}

export function configureInventoryDisplay(enable: boolean) {
  cy.cxConfig({
    cmsComponents: {
      ProductAddToCartComponent: {
        data: {
          inventoryDisplay: enable,
        },
      },
    },
  });
}

export function assertInventoryDisplay(
  productCode: string,
  alias: string,
  functionality: string
) {
  cy.get(`${alias}`).then((xhr) => {
    let isInventoryDisplayActive;
    cy.getCookie('cxConfigE2E')
      .should('exist')
      .then((data) => (isInventoryDisplayActive = data.value.includes('true')));

    const body = xhr.response.body;
    const code = body.code;
    const stock = body.stock;

    expect(code).to.equal(productCode);

    cy.get(stockSelector).then(($ele) => {
      const text = $ele.text().trim();

      if (isInventoryDisplayActive) {
        // Out of stock
        if (
          stock.stockLevelStatus === 'outOfStock' ||
          functionality === 'outOfStock'
        ) {
          expect(text).to.equal(sampleData.stockOutOfStockLabel);
        } else {
          if (stock?.stockLevel) {
            /**
             * B2C: Currently have sample data set for the 'Webcams' category to have a threshold.
             *    Threshold is set to 343.
             * B2B: Currently have sample data set for the 'Measuring & Layout Tools' category to have a threshold.
             *    Threshold is set to 215.
             **/
            if (
              stock?.isValueRounded ||
              functionality === 'categoryThresholdLimitReached'
            ) {
              expect(text).to.equal(
                `${stock.stockLevel}+ ${sampleData.stockLabel}`
              );
            } else {
              expect(text).to.equal(
                `${stock.stockLevel} ${sampleData.stockLabel}`
              );
            }
            /**
             * Out of stock, but is 'Forced in stock'
             * Forced in stock products does not have the property 'stockLevel'
             **/
          } else {
            expect(text).to.equal(`${sampleData.stockLabel}`);
          }
        }
      } else {
        if (
          stock.stockLevelStatus === 'outOfStock' ||
          functionality === 'outOfStock'
        ) {
          expect(text).to.equal(sampleData.stockOutOfStockLabel);
        } else {
          expect(text).to.equal(`${sampleData.stockLabel}`);
        }
      }
    });
  });
}

export function testInventoryDisplay(
  productCode: string,
  functionality: string = ''
) {
  const productDetailsAlias = interceptProductDetails(productCode);
  visitProductPage(productCode);

  cy.wait(`@${productDetailsAlias}`)
    .its('response.statusCode')
    .should('eq', 200);

  assertInventoryDisplay(productCode, `@${productDetailsAlias}`, functionality);
}

export function runInventoryDisplayE2E(business: string, sampleData: any) {
  context(`${business} - Inventory Display`, () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    describe('Inventory Display - disabled', () => {
      beforeEach(() => {
        configureInventoryDisplay(false);
      });

      it('should NOT render number of available stock', () => {
        testInventoryDisplay(sampleData.IN_STOCK_WITH_QUANTITY_PRODUCT);
      });

      it("should render 'out of stock' if stock level 0 and inventory display is off", () => {
        testInventoryDisplay(sampleData.OUT_OF_STOCK_PRODUCT, 'outOfStock');
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
        testInventoryDisplay(sampleData.OUT_OF_STOCK_PRODUCT, 'outOfStock');
      });

      it("should render 'In Stock' if force inStock status and inventory display is on", () => {
        testInventoryDisplay(sampleData.FORCE_IN_STOCK_PRODUCT);
      });

      it('should render + if threshold applied and inventory display is on', () => {
        testInventoryDisplay(
          sampleData.THRESHOLD_STOCK,
          'categoryThresholdLimitReached'
        );
      });

      it('should NOT render + if threshold greater than stock level and inventory display is on', () => {
        testInventoryDisplay(sampleData.STOCK_LESS_THAN_THRESHOLD);
      });

      it('should NOT render + if threshold equal to stock level and inventory display is on', () => {
        testInventoryDisplay(sampleData.STOCK_EQUAL_THRESHOLD);
      });
    });
  });
}
