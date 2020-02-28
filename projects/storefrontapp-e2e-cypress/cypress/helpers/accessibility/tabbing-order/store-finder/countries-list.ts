import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.StoreFinderPageTemplate';

export function countriesListTabbingOrder(config: TabElement[]) {
  cy.visit('/store-finder/view-all');

  verifyTabbingOrder(containerSelector, config);
}
