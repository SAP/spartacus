import * as sampleData from '../../sample-data/b2b-bulk-pricing';
import { waitForPage } from '../checkout-flow';

function visitProduct(productCode) {
  cy.server();

  const productPageWithBulkPricingAlias = waitForPage(
    productCode,
    'productPage'
  );
  const bulkPricingAlias = 'bulkPrices';

  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/orgProducts/${productCode}*`
  ).as(bulkPricingAlias);

  cy.visit(`/product/${productCode}`);

  cy.wait(`@${productPageWithBulkPricingAlias}`)
    .its('status')
    .should('eq', 200);
  cy.wait(`@${bulkPricingAlias}`).its('status').should('eq', 200);
}

export function visitProductWithBulkPrices() {
  visitProduct(sampleData.PRODUCT);
  checkTableData();
}

export function checkTableData() {
  const selector = 'cx-bulk-pricing-table .table';

  sampleData.expectedData.forEach((element) => {
    cy.get(selector).contains('td', element.quantity);
    cy.get(selector).contains('td', element.price);
    cy.get(selector).contains('td', element.discount);
  });
}

export function visitProductWithNoBulkPrices() {
  visitProduct(sampleData.PRODUCT_NO_PRICING);
}

export function checkNoTableRendered() {
  cy.get('cx-bulk-pricing-table .container').should('not.exist');
}
