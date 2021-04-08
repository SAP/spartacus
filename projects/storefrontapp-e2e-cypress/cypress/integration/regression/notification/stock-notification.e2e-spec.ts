import * as notification from '../../../helpers/notification';
import { viewportContext } from '../../../helpers/viewport-context';

const normalProductCode = '872912';

function verifyStockNotificationAsGuest() {
  notification.navigateToPDP(normalProductCode);
  cy.get('.stock-notification-notes > p > a').click();
  cy.location('pathname').should('contain', '/login');
}

function verifyStockNotificationWithoutChannel() {
  notification.navigateToPDP(normalProductCode);
  cy.wait(3000);
  cy.get('.stock-notification-notes > p > a').click();
  cy.location('pathname').should('contain', '/notification-preference');
}

function clickNotifyMeBtn(productCode: string) {
  notification.navigateToPDP(productCode);
  cy.get('cx-stock-notification > .btn')
    .should('contain', 'NOTIFY ME')
    .should('not.be.disabled')
    .click();
}

function verifyNavigateToNotificationPreferenceInDialog() {
  cy.get('.link-prefs').click();
  cy.location('pathname').should(
    'contain',
    '/my-account/notification-preference'
  );
}

function unsubscribeStockNotification(productCode: string) {
  notification.navigateToPDP(productCode);
  cy.get('cx-stock-notification > .btn')
    .should('contain', 'STOP NOTIFICATION')
    .click();
}

function verifyUnsubscribe() {
  cy.get('.alert');
  cy.get('cx-stock-notification > .btn').should('contain', 'NOTIFY ME');
}

function verifyStockNotification() {
  notification.enableNotificationChannel();
  clickNotifyMeBtn(normalProductCode);
  verifyNavigateToNotificationPreferenceInDialog();
  unsubscribeStockNotification(normalProductCode);
  verifyUnsubscribe();
  // clickNotifyMeBtn(normalProductCode);
  // unsubscribeStockNotification(normalProductCode);
}

describe('Stock Notification for Guest', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.visit('/');
    });

    it('should login first when guest want to subscribe notification', () => {
      verifyStockNotificationAsGuest();
    });
  });
});

describe('Stock Notification for Customer', () => {
  viewportContext(['desktop', 'mobile'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.requireLoggedIn();
      cy.visit('/');
    });

    beforeEach(() => {
      // notification.enableNotificationChannel();
      // clickNotifyMeBtn(normalProductCode);
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      // unsubscribeStockNotification(normalProductCode);
      cy.saveLocalStorage();
    });

    it('should navigate to notification preference page through product detail page', () => {
      verifyStockNotificationWithoutChannel();
    });
    it('should subscribe/unsubscribe notification', () => {
      verifyStockNotification();
    });
  });
});
