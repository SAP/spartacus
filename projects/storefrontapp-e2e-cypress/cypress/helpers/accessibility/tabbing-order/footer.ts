/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { visitLoginPage } from '../../../support/utils/login';
import { verifyTabbingOrder } from '../tabbing-order';
import { TabElement } from '../tabbing-order.model';
import { cmsEndpoints } from '../../cms-endpoints';

const containerSelector = 'cx-footer-navigation';

export function footerTabbingOrder(config: TabElement[]) {
  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/${cmsEndpoints.components}`,
  }).as('getComponents');

  visitLoginPage();
  cy.wait('@getComponents');

  verifyTabbingOrder(containerSelector, config);
}
