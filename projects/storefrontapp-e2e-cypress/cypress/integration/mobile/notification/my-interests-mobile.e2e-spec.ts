import * as notification from '../../../helpers/notification';
import { formats } from '../../../sample-data/viewports';

context(`${formats.mobile.width + 1}my interests`, () => {
  beforeEach(() => {
    cy.viewport(formats.mobile.width, formats.mobile.height);
    cy.requireLoggedIn();
    cy.visit('/');
    notification.enableNotificationPreferenceChannel();
  });

  it('should subscribe stock notification using configurable product', () => {
    notification.navigateToPDP(notification.configurableProductCode);
    notification.subscribeGotoMyInterestPage();

    notification.verifyCustomerInterest(notification.configurableProductCode);
  });

  it('should subscribe stock notification using variant product', () => {
    notification.navigateToPDP(notification.variantProductCode);
    notification.subscribeGotoMyInterestPage();

    notification.verifyCustomerInterest(notification.variantProductCode);
  });

  it('should subscribe stock notification using normal product', () => {
    notification.navigateToPDP(notification.normalProductCode);
    notification.subscribeGotoMyInterestPage();

    notification.verifyCustomerInterest(notification.normalProductCode);
  });

  it('should remove customer interest', () => {
    notification.navigateToPDP(notification.normalProductCode);
    notification.subscribeGotoMyInterestPage();
    notification.removeCustomerInterest(notification.normalProductCode);

    cy.get('.cx-product-interests-message').should('exist');
  });

  it('should navigate to PDP when clicking product', () => {
    notification.navigateToPDP(notification.normalProductCode);
    notification.subscribeGotoMyInterestPage();
    notification.navigateToPDPThrougnCustomerInterest(
      notification.normalProductCode
    );

    notification.verifyProductPage(notification.normalProductCode);
  });

  it('should page and sort', () => {
    notification.subscribeProductList(notification.productCodeList);
    notification.navigateToMyInterestsPage();

    notification.verifyPagingSort();
  });
});
