import {
  subscribeStockNotification,
  enableNotificationChannel,
  clickNotifyMeBtn,
  navigateToPDP,
} from '../../../notification';
import { TabElement } from '../../tabbing-order.model';
import { verifyTabbingOrder } from '../../tabbing-order';

const containerSelector = '.ProductDetailsPageTemplate cx-stock-notification';

export function stockNotificationNotLoginTabbingOrder(config: TabElement[]) {
  cy.visit('/product/1978440_green');
  verifyTabbingOrder(containerSelector, config);
}

export function stockNotificationNoEnbaledPreferenceTabbingOrder(
  config: TabElement[]
) {
  cy.visit('/product/1978440_green');
  verifyTabbingOrder(containerSelector, config);
}

export function stockNotificationProductSubscribedTabbingOrder(
  config: TabElement[]
) {
  cy.visit('/');
  enableNotificationChannel();
  subscribeStockNotification('1978440_green');
  verifyTabbingOrder(containerSelector, config);
}

export function stockNotificationDialogTabbingOrder(config: TabElement[]) {
  cy.visit('/');
  enableNotificationChannel();
  clickNotifyMeBtn('1978440_green');
  verifyTabbingOrder('cx-stock-notification-dialog', config);
}

export function stockNotificationTabbingOrder(config: TabElement[]) {
  cy.visit('/');
  enableNotificationChannel();
  navigateToPDP('1978440_green');
  cy.get('cx-stock-notification button').should('be.enabled');
  verifyTabbingOrder(containerSelector, config);
}
