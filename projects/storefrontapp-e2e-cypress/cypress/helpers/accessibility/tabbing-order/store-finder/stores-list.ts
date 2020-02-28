import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.StoreFinderPageTemplate';

export function storesListTabbingOrder(config: TabElement[]) {
  cy.visit('/store-finder/country/JP');

  verifyTabbingOrder(containerSelector, config);
}
