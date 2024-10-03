/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export function switchSiteContext(option: string, label: string) {
  cy.get('.SiteContext label')
    .contains(label)
    .parent()
    .children('select')
    .select(option);
}
