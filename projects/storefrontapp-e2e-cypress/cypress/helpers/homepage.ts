export function checkBanner() {
  cy.get('cx-page-slot cx-banner img').should('exist');
}

export function clickHamburger() {
  cy.get('cx-hamburger-menu [aria-label="Menu"]').click();
}

export function waitForHomePage() {
  checkBanner();
  clickHamburger();
}
