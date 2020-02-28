import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.StoreFinderPageTemplate';

export function defaultViewTabbingOrder(config: TabElement[]) {
  cy.visit('/store-finder');

  verifyTabbingOrder(containerSelector, config);
}
