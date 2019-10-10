export function clickOnConfigureButton() {
  cy.get('cx-configure-product a').click({ force: true });
}

export function verifyConfigurationPageIsDisplayed() {
  cy.get('cx-config-form').should('be.visible');
}
