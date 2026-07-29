/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

const B2B_UNIT_SELECTION_DIALOG = 'cx-b2b-unit-selection-dialog';

/**
 * Stubs the two OCC endpoints introduced by the B2B Unit Selection feature.
 *
 * `B2bUnitSelectorComponent` is placed in `SiteContextSlot` and fires these
 * requests on every B2B page load. Tests that do not exercise the unit
 * selection dialog should call this helper before `cy.requireLoggedIn()` so
 * that the requests are intercepted before the app bootstraps.
 *
 * Intercepted endpoints:
 *  - GET …/orgUsers/{userId}/orgUnits (loadOrgUnits)    → empty list, no dialog
 *  - GET …/orgUsers/{userId}           (loadDefaultOrgUnitName) → minimal stub
 */
export function stubB2bUnitSelectionApis(): void {
  const occPrefix = `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}`;

  // Use pathname-based matching to avoid glob ambiguity with query strings
  // (e.g. ?lang=en&curr=USD appended by OccEndpointsService).
  //
  // Register the more-specific /orgUnits path first so Cypress routes it
  // before the broader orgUsers/{userId} rule below.
  cy.intercept(
    { method: 'GET', pathname: `${occPrefix}/orgUsers/*/orgUnits` },
    { statusCode: 200, body: { orgUnits: [] } }
  ).as('stubOrgUserUnits');

  cy.intercept(
    { method: 'GET', pathname: `${occPrefix}/orgUsers/*` },
    { statusCode: 200, body: { orgUnit: { uid: 'Rustic', name: 'Rustic' } } }
  ).as('stubOrgUser');
}

/**
 * Confirms the B2B Unit selection dialog if it appears within a short timeout.
 *
 * The dialog is shown after login when the feature `b2bUnitSelection.enabled` is true
 * and the user belongs to at least one org unit. E2E tests that do not specifically
 * test this dialog should call this helper right after the B2B login step so that the
 * dialog does not block subsequent test interactions.
 *
 * If the dialog does not appear (feature disabled / user has no units), this helper
 * is a no-op.
 *
 * A 500ms wait is included to account for the async 50ms polling interval in the
 * effect that opens the dialog after login, preventing a race condition where the
 * dialog has not yet appeared at the time of the DOM check.
 */
export function confirmB2bUnitSelectionDialogIfPresent(): void {
  cy.wait(500);
  cy.get('body').then(($body) => {
    if ($body.find(B2B_UNIT_SELECTION_DIALOG).length > 0) {
      cy.get(B2B_UNIT_SELECTION_DIALOG).find('button.btn-primary').click();
    }
  });
}
