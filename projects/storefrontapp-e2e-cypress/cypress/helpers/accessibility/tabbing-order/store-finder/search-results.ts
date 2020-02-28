import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.StoreFinderPageTemplate';
const lastPageSelector = 'cx-pagination:last .page-link:last';

export function searchResultsTabbingOrder(config: TabElement[]) {
  cy.visit('/store-finder/find?query=Nakano');
  cy.get(lastPageSelector).click();

  verifyTabbingOrder(containerSelector, config);
}
