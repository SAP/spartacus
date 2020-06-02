export function checkBanner(isPowertools = false) {
  if (!isPowertools) {
    cy.get(
      'cx-page-slot cx-banner img[alt="Save Big On Select SLR & DSLR Cameras"]'
    ).should('exist');
  } else {
    cy.get(
      'cx-page-slot cx-banner img[alt="The Most Powerful Tools in their Price Range"]'
    ).should('exist');
  }
}

export function clickHamburger() {
  cy.get('cx-hamburger-menu [aria-label="Menu"]').click();
}

export function waitForHomePage() {
  checkBanner();
  clickHamburger();
}
