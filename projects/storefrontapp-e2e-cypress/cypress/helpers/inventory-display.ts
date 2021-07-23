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

export function assertInventoryDisplay(productCode: string, alias: string) {
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
        if (stock.stockLevelStatus === 'outOfStock') {
          expect(text).to.equal(sampleData.stockOutOfStockLabel);
        } else {
          if (stock?.stockLevel) {
            /**
             * Currently have sample data set for the 'Webcams' category to have a threshold
             * Threshold is set to 343.
             **/
            if (stock?.isValueRounded) {
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
        expect(text).to.equal(`${sampleData.stockLabel}`);
      }
    });
  });
}
