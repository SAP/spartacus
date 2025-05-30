/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Checks if the homepage banner is displayed.
 */
export function checkBanner(): void {
  cy.get('cx-page-slot cx-banner img').should('exist');
}

/**
 * Clicks the hamburger menu button on mobile devices.
 */
export function clickHamburger(): void {
  cy.onMobile(() => {
    cy.get('cx-hamburger-menu button', { timeout: 15000 }).click();
  });
}

/**
 * Waits for the homepage to be ready by checking the banner and clicking the hamburger menu (on mobile).
 */
export function waitForHomePage(): void {
  checkBanner();
  clickHamburger();
}