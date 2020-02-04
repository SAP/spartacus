import { checkAllElements, TabElement } from '../tabbing-order';
import {
  subscribeStockNotification,
  enableNotificationChannel,
  clickNotifyMeBtn,
  navigateToPDP,
} from '../../notification';

export function stockNotificationNotLoginTabbingOrder(config: TabElement[]) {
  cy.visit('/product/1978440_green');
  cy.get('cx-stock-notification a')
    .first()
    .focus();
  checkAllElements(config);
}

export function stockNotificationNoEnbaledPreferenceTabbingOrder(
  config: TabElement[]
) {
  cy.visit('/product/1978440_green');
  cy.get('cx-stock-notification a')
    .first()
    .focus();
  checkAllElements(config);
}

export function stockNotificationProductSubscribedTabbingOrder(
  config: TabElement[]
) {
  cy.visit('/');
  enableNotificationChannel();
  subscribeStockNotification('1978440_green');
  cy.get('cx-stock-notification button')
    .first()
    .focus();
  checkAllElements(config);
}

export function stockNotificationDialogTabbingOrder(config: TabElement[]) {
  cy.visit('/');
  enableNotificationChannel();
  clickNotifyMeBtn('1978440_green');
  cy.get('.link-prefs')
    .first()
    .focus();
  checkAllElements(config);
}

export function stockNotificationTabbingOrder(config: TabElement[]) {
  cy.visit('/');
  enableNotificationChannel();
  navigateToPDP('1978440_green');
  cy.get('cx-stock-notification > .btn')
    .should('contain', 'NOTIFY ME')
    .should('not.be.disabled')
    .then(el => {
      cy.wrap(el).focus();
      checkAllElements(config);
    });
}
