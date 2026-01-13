/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { clickHamburger } from './navigation';

export function checkBanner() {
  cy.get('cx-page-slot cx-banner img').should('exist');
}

export function waitForHomePage() {
  checkBanner();
  clickHamburger();
}
