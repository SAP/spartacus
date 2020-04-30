import { verifyTabbingOrder } from '../../tabbing-order';
import {
  verifySubscriptionAndCustomerInterest,
  enableNotificationChannel,
  disableNotificationChannel,
} from '../../../notification';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.AccountPageTemplate';

export function myInterestTabbingOrder(config: TabElement[]) {
  cy.visit('/');
  enableNotificationChannel();
  verifySubscriptionAndCustomerInterest('872912');
  verifyTabbingOrder(containerSelector, config);

  disableNotificationChannel();
}
