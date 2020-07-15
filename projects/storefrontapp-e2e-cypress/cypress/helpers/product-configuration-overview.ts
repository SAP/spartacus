const continueToCartButtonSelector = 'cx-config-add-to-cart-button button';

export function isConfigOverviewPageDisplayed() {
  cy.get('cx-config-overview-form').should('be.visible');
}

export function navigateToConfigurationPage() {
  cy.get('cx-config-tab-bar div div:first a').click({
    force: true,
  });
}

export function continueToCart() {
  cy.get(continueToCartButtonSelector).click({
    force: true,
  });
}
