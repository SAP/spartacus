/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { verifyTabbingOrder } from '../../../../helpers/accessibility/tabbing-order';
import { TabElement } from '../../../../helpers/accessibility/tabbing-order.model';

const containerSelector = 'cx-my-new-account-v2-profile';

export function myAccountV2UserProfileManagementTabbingOrder(
  config: TabElement[],
  isEdit: boolean = false
) {
  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/cms/components`,
  }).as('getComponents');
  cy.visit('/my-account/update-profile');

  cy.wait('@getComponents');
  if (isEdit) {
    cy.get('.myaccount-enhancedUI-editButton').click();
  }

  verifyTabbingOrder(containerSelector, config);
}
