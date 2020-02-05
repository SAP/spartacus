import { checkAllElements, TabElement } from '../tabbing-order';
import { loginUsingUserWithOrder } from '../../consignment-tracking';

export function consignmentTrackingTabbingOrder(config: TabElement[]) {
  loginUsingUserWithOrder();
  cy.visit('/my-account/order/100000');
  cy.get('cx-consignment-tracking button')
    .first()
    .focus();
  checkAllElements(config);
}

export function consignmentTrackingEventsTabbingOrder(config: TabElement[]) {
  loginUsingUserWithOrder();
  cy.visit('/my-account/order/100000');
  cy.get('cx-consignment-tracking button')
    .first()
    .click();
  cy.get('cx-tracking-events button')
    .first()
    .focus();
  checkAllElements(config);
}
