export function checkBanner() {
  cy.get(
    'cx-page-slot cx-banner img[alt="Save Big On Select SLR & DSLR Cameras"]'
  ).should('exist');
}

export function clickHamburger() {
  cy.get('cx-hamburger-menu [aria-label="Menu"]').click();
}

export function waitForHomePage() {
  checkBanner();
  clickHamburger();
}
