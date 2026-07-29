/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

const B2B_UNIT_SELECTION_DIALOG = 'cx-b2b-unit-selection-dialog';

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
