import * as notification from '../../../helpers/notification';
import { formats } from '../../../sample-data/viewports';

context(`${formats.mobile.width + 1}stock notification`, () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.viewport(formats.mobile.width, formats.mobile.height);
  });

  describe('Stock Notification for Guest', () => {
    before(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
      cy.visit('/');
    });
    it('should login first when guest subscribing stock notification', () => {
      notification.navigateToPDP(notification.normalProductCode);
      notification.guestSubscribeStockNotification();
    });
  });

  describe('Stock Notification for Customer without Channel Enbaled', () => {
    before(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
      notification.registerAndLogin();
      cy.reload();
      cy.visit('/');
    });

    it('should navigate to notification preference page through product detail page', () => {
      notification.navigateToPDP(notification.normalProductCode);
      notification.navigateToNotificationPreferencePage();
  
      cy.location('pathname').should('contain', '/notification-preference');
    });
  });

  describe('Stock Notification for Customer  with Channel Enbaled', () => {
    before(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
      notification.registerAndLogin();
      cy.reload();
      cy.visit('/');
      notification.enableNotificationPreferenceChannel();
    });
    beforeEach(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
      notification.navigateToPDP(notification.normalProductCode);
      cy.restoreLocalStorage();
    });

    it('should navigate to my interest page through success dialog', () => {
      notification.subscribeGotoMyInterestPage();
      notification.verifyCustomerInterest(notification.normalProductCode);
    });
  
    it ('should navigate to notification preference page through success dialog', () => {
      notification.unsubscribeStockNotification();
      notification.subscribeGotoNotificationPreferencePage();
  
      cy.location('pathname').should('contain', '/notification-preference');
    })
  
    it('should unsubscribe in product detail page', () => {
      notification.unsubscribeStockNotification();
  
      notification.verifyUnsubscribe();
    });
  });
});
