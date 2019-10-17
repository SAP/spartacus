import * as notification from '../../../helpers/notification';

describe('my interests', () => {
  beforeEach(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.visit('/');
  });

  it('should subscribe stock notification using configurable product', () => {
    notification.notificationFlow(notification.configurableProductCode);
  });

  it('should subscribe stock notification using variant product', () => {
    notification.notificationFlow(notification.variantProductCode);
  });

  it('should subscribe stock notification using normal product', () => {
    notification.notificationFlow(notification.normalProductCode);
  });

  it('should remove customer interest', () => {
    notification.notificationFlow(notification.normalProductCode);
    notification.removeCustomerInterest(notification.normalProductCode);
  });

  it('should navigate to PDP when clicking product', () => {
    notification.notificationFlow(notification.normalProductCode);
    notification.navigateToPDPThrougnCustomerInterest(
      notification.normalProductCode
    );
  });

  it('?should page and sort', () => {});
});
