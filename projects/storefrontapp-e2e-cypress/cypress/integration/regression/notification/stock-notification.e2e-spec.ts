import { viewportContext } from '../../../helpers/viewport-context';
import * as notification from '../../../helpers/notification';

viewportContext(['mobile', 'desktop'], () => {
  describe('Stock notification for guest', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    it('should login first when guest want to subscribe notification', () => {
      notification.verifyStockNotificationAsGuest();
    });
  });

  describe('Stock Notification for customer', () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.requireLoggedIn();
      cy.saveLocalStorage();
    });
    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });
    it('should navigate to notification preference page through product detail page', () => {
      notification.verifyStockNotificationWithoutChannel();
    });

    it('should subscribe/unsubscribe notification', () => {
      notification.verifyStockNotification();
    });
  });
});
