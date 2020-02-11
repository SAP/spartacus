import { verifyTabbingOrder } from '../../tabbing-order';
import {
  verifySubscriptionAndCustomerInterest,
  enableNotificationChannel,
} from '../../../notification';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.AccountPageTemplate';

export function myInterestTabbingOrder(config: TabElement[]) {
  cy.visit('/');
  enableNotificationChannel();
  verifySubscriptionAndCustomerInterest('1978440_green');
  verifyTabbingOrder(containerSelector, config);
}
