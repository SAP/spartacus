export function verifyConfigurationOverviewPageIsDisplayed() {
  cy.get('cx-config-overview-form').should('be.visible');
}

export function navigateToConfigurationPage() {
  cy.get('cx-config-tab-bar div div:first a').click({
    force: true,
  });
}

export function verifyNumberOfGroupsDisplayed(number: number) {
  cy.get('.cx-config-overview-group')
    .its('length')
    .should('eq', number);
}
