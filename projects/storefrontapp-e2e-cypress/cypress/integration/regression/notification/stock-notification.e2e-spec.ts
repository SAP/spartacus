import * as notification from '../../../helpers/notification';
describe('stock notification', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.visit('/');
  });

  it('should login first when guest subscribing stock notification', () => {
    //logout
    notification.logout();
    //navigate to PDP
    notification.navigateToPDP('358639');
    //click notifyme
    notification.guestSubscribeStockNotification();
    //subceribe
    notification.registerAndLogin();
    //navigateToNotificationPreferencePage
    notification.navigateToNotificationPreferencePage();
    //enableNotificationPreferenceChannel
    notification.enableNotificationPreferenceChannel();
    //navigate to PDP
    notification.navigateToPDP('358639');
    //subscribe stock notification
    notification.subscribeStockNotification();
    notification.navigateToMyInterestsPageThroughSuccessDialog();
    notification.varifyCustomerInterest('358639');
  });

  it('should unsubscribe stock notification', () => {});

  it('should navigate to notification preference page through success dialog', () => {});

  it('should navigate to my interests page through success dialog', () => {});
});
