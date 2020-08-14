const continueToCartButtonSelector = 'cx-config-add-to-cart-button button';
const resolveIssuesLinkSelector =
  'cx-configure-cart-entry button.cx-action-link';

export function isConfigOverviewPageDisplayed() {
  cy.get('cx-config-overview-form').should('be.visible');
}

export function navigateToConfigurationPage() {
  cy.get('cx-config-tab-bar div div:first a').click({
    force: true,
  });
}

export function clickAddToCartBtnOnOP() {
  cy.get(continueToCartButtonSelector)
    .click()
    .then(() => {
      cy.get('h1').contains('Your Shopping Cart').should('be.visible');
      cy.get('cx-cart-details').should('be.visible');
    });
}

export function clickOnResolveIssuesLinkOnOP() {
  cy.get(resolveIssuesLinkSelector)
    .click()
    .then(() => {
      this.isConfigPageDisplayed();
    });
}

export function verifyNotificationBannerOnOP(numberOfIssues?: number) {
  const element = cy.get('cx-configure-issues-notification');
  if (numberOfIssues) {
    this.checkNotificationBanner(element, numberOfIssues);
  } else {
    element.should('not.be.visible');
  }
}
