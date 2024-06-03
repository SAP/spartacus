/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export function checkBanner() {
  cy.get('cx-page-slot cx-banner img').should('exist');
}

export function clickHamburger() {
  cy.onMobile(() => {
    cy.get('cx-hamburger-menu [aria-label="Menu"]').click();
  });
}

export function waitForHomePage() {
  checkBanner();
  clickHamburger();
}
