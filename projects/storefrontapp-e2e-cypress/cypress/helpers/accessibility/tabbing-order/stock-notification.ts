import {
  enableNotificationChannel,
  navigateToPDP,
  normalProductCode,
  disableNotificationChannel,
} from '../../notification';
import { TabElement } from '../tabbing-order.model';
import { verifyTabbingOrder } from '../tabbing-order';

const containerSelector = '.ProductDetailsPageTemplate cx-stock-notification';

export function stockNotificationTabbingOrderNotificationsNotAllowed(
  config: TabElement[]
) {
  navigateToPDP(normalProductCode);

  cy.get(`${containerSelector} button[disabled]`);

  verifyTabbingOrder(containerSelector, config);
}

export function stockNotificationTabbingOrderNotificationsAllowed(
  config: TabElement[]
) {
  navigateToPDP(normalProductCode);
  enableNotificationChannel();
  navigateToPDP(normalProductCode);

  cy.get(`${containerSelector} button:not([disabled])`);

  verifyTabbingOrder(containerSelector, config);

  disableNotificationChannel();
}

export function stockNotificationDialogTabbingOrder(config: TabElement[]) {
  navigateToPDP(normalProductCode);
  enableNotificationChannel();
  navigateToPDP(normalProductCode);

  cy.get(`${containerSelector} button:not([disabled])`).first().click();

  verifyTabbingOrder('cx-stock-notification-dialog', config);

  cy.get('cx-stock-notification-dialog button:not([disabled])').first().click();
  cy.get(`${containerSelector} button:not([disabled])`).first().click();
  disableNotificationChannel();
}

export function stockNotificationTabbingOrderProductSubscribed(
  config: TabElement[]
) {
  navigateToPDP(normalProductCode);
  enableNotificationChannel();
  navigateToPDP(normalProductCode);

  cy.get(`${containerSelector} button:not([disabled])`).first().click();
  cy.get('cx-stock-notification-dialog button:not([disabled])').first().click();

  verifyTabbingOrder(containerSelector, config);

  cy.get(`${containerSelector} button:not([disabled])`).first().click();
  disableNotificationChannel();
}

export function stockNotificationNotLoginTabbingOrder(config: TabElement[]) {
  navigateToPDP(normalProductCode);

  verifyTabbingOrder(containerSelector, config);
}
