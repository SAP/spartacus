import * as notification from '../../../helpers/notification';
describe('stock notification', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  describe('Guest', () => {
    before(() => {
      cy.visit('/');
    });
    it('should login first when guest subscribing stock notification', () => {
      notification.navigateToPDP(notification.normalProductCode);
      notification.guestSubscribeStockNotification();
    });
  });

  describe('Registered Customer', () => {
    before(() => {
      notification.registerAndLogin();
      cy.reload();
      cy.visit('/');
    });
    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    it('should navigate to notification preference page through success dialog', () => {
      notification.notificationFlow(notification.normalProductCode);
      notification.navigateToPDP(notification.normalProductCode);
      notification.unsubscribeStockNotification();
    });
  });
});
