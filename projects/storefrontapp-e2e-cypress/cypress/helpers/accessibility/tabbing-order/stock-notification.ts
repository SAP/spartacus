import {
  subscribeStockNotification,
  enableNotificationChannel,
  clickNotifyMeBtn,
  navigateToPDP,
  unsubscribeStockNotification,
} from '../../notification';
import { TabElement } from '../tabbing-order.model';
import { verifyTabbingOrder } from '../tabbing-order';

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
  enableNotificationChannel();
  subscribeStockNotification('1978440_green');
  cy.get('cx-stock-notification > .btn').should('contain', 'STOP NOTIFICATION');
  verifyTabbingOrder(containerSelector, config);
}

export function stockNotificationDialogTabbingOrder(config: TabElement[]) {
  unsubscribeStockNotification('1978440_green');
  clickNotifyMeBtn('1978440_green');
  verifyTabbingOrder('cx-stock-notification-dialog', config);
}

export function stockNotificationTabbingOrder(config: TabElement[]) {
  unsubscribeStockNotification('1978440_green');
  navigateToPDP('1978440_green');
  cy.get('cx-stock-notification > .btn')
    .should('contain', 'NOTIFY ME')
    .should('not.be.disabled');
  verifyTabbingOrder(containerSelector, config);
}
