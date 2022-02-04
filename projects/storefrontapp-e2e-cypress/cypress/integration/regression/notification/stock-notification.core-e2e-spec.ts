import * as notification from '../../../helpers/notification';
import { viewportContext } from '../../../helpers/viewport-context';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

describe('My interests', () => {
  viewportContext(['desktop'], () => {
    describe('Stock Notification for Guest', () => {
      before(() => {
        clearAllStorage();
      });
      it('should login first when guest want to subscribe notification', () => {
        notification.verifyStockNotificationAsGuest();
      });
    });

    describe('Stock Notification for Customer', () => {
      beforeEach(() => {
        clearAllStorage();
        cy.requireLoggedIn();
      });

      it('should navigate to notification preference page through product detail page', () => {
        notification.verifyStockNotificationWithoutChannel();
      });
      it('should subscribe/unsubscribe notification', () => {
        notification.verifyStockNotification();
      });
    });
  });
});
