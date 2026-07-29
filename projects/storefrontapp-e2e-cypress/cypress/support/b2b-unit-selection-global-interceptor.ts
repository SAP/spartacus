/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Global beforeEach interceptor for the two OCC endpoints introduced by the
 * B2B Unit Selection feature.
 *
 * `B2bUnitSelectorComponent` is registered as a CMS Flex component placed in
 * `SiteContextSlot`, so it renders on every B2B page and fires these requests
 * on every test run — regardless of whether the test exercises the dialog.
 * Stubbing them globally avoids touching every individual login helper.
 *
 * Only active when `BASE_SITE` is set to the B2B powertools site; B2C tests
 * are unaffected.
 *
 * Intercepted endpoints:
 *  - GET …/orgUsers/{userId}/orgUnits  (loadOrgUnits)
 *  - GET …/orgUsers/{userId}           (loadDefaultOrgUnitName)
 */
beforeEach(() => {
  const baseSite = Cypress.env('BASE_SITE');
  if (!baseSite || !String(baseSite).startsWith('powertools')) {
    return;
  }

  const occPrefix = `${Cypress.env('OCC_PREFIX')}/${baseSite}`;

  // Must register the more-specific `/orgUnits` stub FIRST so Cypress matches
  // it before the broader `orgUsers/**` pattern.
  cy.intercept('GET', `${occPrefix}/orgUsers/**/orgUnits`, {
    statusCode: 200,
    body: { orgUnits: [] },
  }).as('stubOrgUserUnits');

  cy.intercept('GET', `${occPrefix}/orgUsers/**`, {
    statusCode: 200,
    body: { orgUnit: { uid: 'Rustic', name: 'Rustic' } },
  }).as('stubOrgUser');
});
