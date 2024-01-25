/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// Use language switcher to change language

export function switchLanguage(lang: string) {
  cy.get('.SiteContext label')
    .contains('Language')
    .parent()
    .children('select')
    .select(lang, { force: true });
}
