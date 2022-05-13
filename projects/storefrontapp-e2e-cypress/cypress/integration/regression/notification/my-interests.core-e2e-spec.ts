import * as notification from '../../../helpers/notification';
import { viewportContext } from '../../../helpers/viewport-context';

describe('My interests', () => {
  viewportContext(['desktop'], () => {
    describe('Customer', () => {
      beforeEach(() => {
        cy.window().then((win) => win.sessionStorage.clear());
        cy.requireLoggedIn();
        cy.visit('/');
        notification.enableNotificationChannel();
      });

      it(['my_interest'], 'should show/remove interest', () => {
        notification.verifyCustomerInterests();
      });

      it(['my_interest'], 'should remove the subscrption in PDP', () => {
        notification.verifyRemovingCustomerInterestInPDP();
      });
    });
  });
});
