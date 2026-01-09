/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isMobile } from '../../helpers/viewport-context';

export function switchSiteContext(option: string, label: string) {
  const selector = isMobile()
    ? '.navigation .SiteContext label'
    : '.header .SiteContext label';

  cy.get(selector).contains(label).parent().children('select').select(option);
}
