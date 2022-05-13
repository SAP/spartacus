import * as notification from '../../../helpers/notification';
import { viewportContext } from '../../../helpers/viewport-context';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

describe('My interests', () => {
  viewportContext(['mobile', 'desktop'], () => {
    describe('Stock Notification for Guest', () => {
      before(() => {
        clearAllStorage();
        cy.visit('/');
      });
      it(
        ['stock_notification'],
        'should login first when guest want to subscribe notification',
        () => {
          notification.verifyStockNotificationAsGuest();
        }
      );
    });

    describe('Stock Notification for Customer', () => {
      beforeEach(() => {
        clearAllStorage();
        cy.requireLoggedIn();
        cy.visit('/');
      });

      it(
        ['stock_notification'],
        'should navigate to notification preference page through product detail page',
        () => {
          notification.verifyStockNotificationWithoutChannel();
        }
      );
      it(
        ['stock_notification'],
        'should subscribe/unsubscribe notification',
        () => {
          notification.verifyStockNotification();
        }
      );
    });
  });
});
