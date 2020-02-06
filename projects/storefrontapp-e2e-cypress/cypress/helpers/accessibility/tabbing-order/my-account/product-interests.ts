import { verifyTabbingOrder } from '../../tabbing-order';
import {
  subscribeStockNotification,
  enableNotificationChannel,
} from '../../../notification';
import { TabElement } from '../../tabbing-order.model';

const containerSelector = '.AccountPageTemplate';

export function productInterestTabbingOrder(config: TabElement[]) {
  cy.visit('/');
  enableNotificationChannel();
  subscribeStockNotification('1978440_green');
  cy.visit('/my-account/my-interests');
  verifyTabbingOrder(containerSelector, config);
}
