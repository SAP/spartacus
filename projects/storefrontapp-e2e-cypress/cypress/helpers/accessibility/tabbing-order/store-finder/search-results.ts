import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.StoreFinderPageTemplate';
const lastPageSelector = 'cx-pagination .end';

export function searchResultsTabbingOrder(config: TabElement[]) {
  cy.server();
  cy.route('GET', '/rest/v2/electronics-spa/stores?fields=*').as('storesList');

  cy.visit('/store-finder/find?query=Nakano');

  cy.wait('@storesList');

  cy.get(lastPageSelector).click();

  cy.wait('@storesList');

  cy.get('cx-store-finder-map .cx-store-map div div div').should('be.visible'); // waiting for the map to show up

  verifyTabbingOrder(containerSelector, config);
}
