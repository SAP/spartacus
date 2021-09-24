import { waitForProductPage } from '../checkout-flow';

export function visitProduct(productCode) {
  const page = `/product/${productCode}`;
  const bulkPricingAlias = 'bulkPrices';
  const productPageAlias = 'productPage';

  waitForProductPage(productCode, productPageAlias);

  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/orgProducts/${productCode}*`
  ).as(bulkPricingAlias);

  cy.visit(page);

  cy.wait(`@${productPageAlias}`);
  cy.wait(`@${bulkPricingAlias}`).its('response.statusCode').should('eq', 200);
}
