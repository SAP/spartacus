import { verifyTabbingOrder } from '../../tabbing-order';
import {
  verifySubscriptionAndCustomerInterest,
  enableNotificationChannel,
} from '../../../notification';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.AccountPageTemplate';

export function productInterestTabbingOrder(config: TabElement[]) {
  cy.visit('/');
  enableNotificationChannel();
  verifySubscriptionAndCustomerInterest('553637');
  verifyTabbingOrder(containerSelector, config);
}
