import { loginUsingUserWithOrder } from '../../consignment-tracking';
import { verifyTabbingOrder } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';

export function consignmentTrackingTabbingOrder(config: TabElement[]) {
  loginUsingUserWithOrder();
  cy.visit('/my-account/order/100000');
  cy.get('cx-consignment-tracking').should('exist');
  verifyTabbingOrder('.AccountPageTemplate', config);
}

export function consignmentTrackingEventsTabbingOrder(config: TabElement[]) {
  loginUsingUserWithOrder();
  cy.visit('/my-account/order/100000');
  cy.get('cx-consignment-tracking button').first().click();
  verifyTabbingOrder('cx-tracking-events', config);
}
