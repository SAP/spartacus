import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.AccountPageTemplate';

export function personalDetailsTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/update-profile');

  verifyTabbingOrder(containerSelector, config);
}
