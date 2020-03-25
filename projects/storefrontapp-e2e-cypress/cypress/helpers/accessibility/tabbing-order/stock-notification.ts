import {
  subscribeStockNotification,
  enableNotificationChannel,
  clickNotifyMeBtn,
  navigateToPDP,
  unsubscribeStockNotification,
  normalProductCode,
} from '../../notification';
import { TabElement } from '../tabbing-order.model';
import { verifyTabbingOrder } from '../tabbing-order';

const containerSelector = '.ProductDetailsPageTemplate cx-stock-notification';
const productUrl = '/product/872912';

export function stockNotificationNotLoginTabbingOrder(config: TabElement[]) {
  cy.visit(productUrl);
  verifyTabbingOrder(containerSelector, config);
}

export function stockNotificationNoEnbaledPreferenceTabbingOrder(
  config: TabElement[]
) {
  cy.visit(productUrl);
  verifyTabbingOrder(containerSelector, config);
}

export function stockNotificationProductSubscribedTabbingOrder(
  config: TabElement[]
) {
  enableNotificationChannel();
  subscribeStockNotification(normalProductCode);
  cy.get('cx-stock-notification > .btn').should('contain', 'STOP NOTIFICATION');
  verifyTabbingOrder(containerSelector, config);
}

export function stockNotificationDialogTabbingOrder(config: TabElement[]) {
  unsubscribeStockNotification(normalProductCode);
  clickNotifyMeBtn(normalProductCode);
  verifyTabbingOrder('cx-stock-notification-dialog', config);
}

export function stockNotificationTabbingOrder(config: TabElement[]) {
  unsubscribeStockNotification(normalProductCode);
  navigateToPDP(normalProductCode);
  cy.get('cx-stock-notification > .btn')
    .should('contain', 'NOTIFY ME')
    .should('not.be.disabled');
  verifyTabbingOrder(containerSelector, config);
}
