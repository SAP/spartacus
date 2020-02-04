import { checkAllElements, TabElement } from '../tabbing-order';
import {
  subscribeStockNotification,
  enableNotificationChannel,
} from '../../notification';

export function productInterestTabbingOrder(config: TabElement[]) {
  cy.visit('/');
  enableNotificationChannel();
  subscribeStockNotification('1978440_green');
  cy.visit('/my-account/my-interests');
  cy.get('cx-my-interests ng-select input')
    .first()
    .focus();
  checkAllElements(config);
}
