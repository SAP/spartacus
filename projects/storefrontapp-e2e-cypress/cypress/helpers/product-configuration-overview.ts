const continueToCartButtonSelector = 'cx-config-add-to-cart-button button';
const resolveIssuesLinkSelector =
  'cx-configure-cart-entry button.cx-action-link';

/**
 * Navigate to the configured product overview page.
 *
 * @param configuratorType - Configuration type
 * @param productId - Product ID
 */
export function goToConfigOverviewPage(configuratorType, productId) {
  cy.visit(
    `/electronics-spa/en/USD/configureOverview${configuratorType}/product/entityKey/${productId}`
  ).then(() => {
    cy.get('.VariantConfigurationOverviewTemplate').should('be.visible');
    this.isConfigOverviewPageDisplayed();
  });
}

/**
 * Verifies whether the product overview page is displayed.
 */
export function isConfigOverviewPageDisplayed() {
  cy.get('cx-config-overview-form').should('be.visible');
}

/**
 * Navigate to the configuration page via configuration tab.
 */
export function navigateToConfigurationPage() {
  cy.get('cx-config-tab-bar div div:first a').click({
    force: true,
  });
}

/**
 * Click on 'Continue to cart' on the product overview page.
 */
export function clickContinueToCartBtnOnOP() {
  cy.get(continueToCartButtonSelector)
    .click()
    .then(() => {
      cy.get('h1').contains('Your Shopping Cart').should('be.visible');
      cy.get('cx-cart-details').should('be.visible');
    });
}

/**
 * Clicks on 'Resolve Issues' link on the product overview page.
 */
export function clickOnResolveIssuesLinkOnOP() {
  cy.get(resolveIssuesLinkSelector)
    .click()
    .then(() => {
      this.isConfigPageDisplayed();
    });
}

/**
 * Verifies whether the issues banner is displayed and the number of issues are accurate.
 *
 * @param {number} numberOfIssues - Expected number of issues
 */
export function verifyNotificationBannerOnOP(numberOfIssues?: number) {
  const element = cy.get('cx-configure-issues-notification');
  if (numberOfIssues) {
    this.checkNotificationBanner(element, numberOfIssues);
  } else {
    element.should('not.be.visible');
  }
}
