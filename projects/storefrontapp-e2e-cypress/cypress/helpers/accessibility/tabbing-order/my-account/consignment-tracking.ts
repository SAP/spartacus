import { loginUsingUserWithOrder } from '../../../consignment-tracking';
import { verifyTabbingOrder } from '../../tabbing-order';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.AccountPageTemplate';

export function consignmentTrackingTabbingOrder(config: TabElement[]) {
  loginUsingUserWithOrder();
  cy.visit('/my-account/order/100000');
  cy.get('cx-consignment-tracking').should('exist');
  verifyTabbingOrder(containerSelector, config);
}

export function consignmentTrackingEventsTabbingOrder(config: TabElement[]) {
  loginUsingUserWithOrder();
  cy.visit('/my-account/order/100000');
  cy.get('cx-consignment-tracking button')
    .first()
    .click();
  verifyTabbingOrder(containerSelector, config);
}
