/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export function switchSiteContext(option: string, label: string) {
  cy.get('.SiteContext label')
    .contains(label)
    .should('exist')
    .parent()
    .children('select')
    .select(option);
}
