/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isMobile } from './viewport-context';

// Use language switcher to change language

export function switchLanguage(lang: string) {
  const selector = isMobile()
    ? '.navigation .SiteContext label'
    : '.header .SiteContext label';

  cy.get(selector)
    .contains('Language')
    .parent()
    .children('select')
    .select(lang, { force: true });
}
