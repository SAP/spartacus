/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { loginAsMyCompanyAdmin } from '../../../helpers/b2b/my-company/my-company.utils';

const MY_COMPANY_URL = '/organization/purchase-limits';
const rowCellSelector =
  'cx-org-list.orgPurchaseLimit table tr:nth-child(2) cx-org-status-cell span';
const detailsActionsListSelector =
  'cx-org-list.orgPurchaseLimit .main .link-list';

/**
 * This test checks accessibility concerns on the B2B My Company Purchase Limits page using Access Continuum
 */
describe(
  'B2B / My Company / Purchase Limits / Page Accessibility',
  { testIsolation: false },
  () => {
    before(() => {
      cy.a11yContinuumSetup();
      loginAsMyCompanyAdmin();
      cy.visit(MY_COMPANY_URL);
    });

    it('list page loaded', () => {
      cy.get(rowCellSelector);
      cy.get('main').a11yRunContinuumTest();
    });

    it('purchase Limits / initial panel', () => {
      cy.get(rowCellSelector).click();
      cy.get(
        'cx-org-permission-details cx-org-card cx-view .main .details .property .value'
      );
      cy.get('cx-org-permission-details').a11yRunContinuumTest();
    });

    it('purchase Limits / edit panel', () => {
      const editdLink = 'cx-org-permission-details .header .actions a.edit';
      cy.get(editdLink).click();
      cy.get('cx-org-permission-details cx-org-permission-form form input');
      cy.get('cx-org-permission-details').a11yRunContinuumTest();
    });
  }
);
