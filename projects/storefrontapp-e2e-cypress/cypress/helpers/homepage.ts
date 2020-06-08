export function checkBanner(
  isOtherBaseSite: boolean = false,
  mainBannerSelector?: string
) {
  if (!isOtherBaseSite) {
    cy.get(
      'cx-page-slot cx-banner img[alt="Save Big On Select SLR & DSLR Cameras"]'
    ).should('exist');
  } else {
    cy.get(mainBannerSelector).should('exist');
  }
}

export function clickHamburger() {
  cy.get('cx-hamburger-menu [aria-label="Menu"]').click();
}

export function waitForHomePage() {
  checkBanner();
  clickHamburger();
}
