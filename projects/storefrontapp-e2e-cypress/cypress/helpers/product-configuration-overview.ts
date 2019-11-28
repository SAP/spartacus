export function verifyConfigurationOverviewPageIsDisplayed() {
  cy.get('cx-config-overview-form').should('be.visible');
}

export function navigateToConfigurationPage() {
  cy.get('cx-config-tab-bar div div:first a').click({
    force: true,
  });
}
