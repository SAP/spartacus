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
    notification.stockNotificationGuestTests();
  });

  describe('Stock Notification for Customer without Channel Enbaled', () => {
    before(() => {
      cy.viewport(formats.mobile.width, formats.mobile.height);
      notification.registerAndLogin();
      cy.reload();
      cy.visit('/');
    });
    notification.stockNotificationCustomerNoChannelSetTests();
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

    notification.stockNotificationCustomerTests();
  });
});
