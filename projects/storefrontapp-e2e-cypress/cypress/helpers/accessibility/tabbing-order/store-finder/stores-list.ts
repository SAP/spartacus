import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.StoreFinderPageTemplate';

export function storesListTabbingOrder(config: TabElement[]) {
  cy.visit('/store-finder/country/JP');

  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}/stores`,
  }).as('storesList');

  cy.wait('@storesList');

  verifyTabbingOrder(containerSelector, config);
}
