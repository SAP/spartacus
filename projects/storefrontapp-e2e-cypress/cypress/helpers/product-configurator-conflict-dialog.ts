/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

//import * as configurationVc from './product-configurator-vc';

export function checkConflictDialogOpen() {
  cy.get('cx-configurator-conflict-solver-dialog').should('be.visible');
}

export function checkConflictDialogClosed() {
  cy.get('cx-configurator-conflict-solver-dialog').should('not.exist');
}
