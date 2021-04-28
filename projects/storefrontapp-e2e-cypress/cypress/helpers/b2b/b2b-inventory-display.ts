import { waitForPage } from '../checkout-flow';

export function visitProduct(productCode) {
  const page = `/product/${productCode}`;
  const inventoryAlias = 'inventoryDisplay';
  const productPageAlias = 'productPage';

  waitForPage(productCode, productPageAlias);

  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/orgProducts/${productCode}*`
  ).as(inventoryAlias);

  cy.visit(page);

  cy.wait(`@${productPageAlias}`);
  cy.wait(`@${inventoryAlias}`).its('response.statusCode').should('eq', 200);
}
