import { prefixAndBaseSite } from '../../../constants/backend';
import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.StoreFinderPageTemplate';

export function countriesListTabbingOrder(config: TabElement[]) {
  cy.visit('/store-finder/view-all');

  cy.server();

  cy.route('GET', `${prefixAndBaseSite}/stores/storescounts*`).as(
    'storesCounts'
  );

  cy.wait('@storesCounts');
  verifyTabbingOrder(containerSelector, config);
}
