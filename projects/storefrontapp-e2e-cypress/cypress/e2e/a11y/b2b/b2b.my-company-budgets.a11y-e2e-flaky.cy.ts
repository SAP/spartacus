/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { loginAsMyCompanyAdmin } from '../../../helpers/b2b/my-company/my-company.utils';

const MY_COMPANY_URL = '/organization/budgets';
const rowCellSelector =
  'cx-org-list.orgBudget table tr:last-child cx-org-status-cell span';
const detailsActionsListSelector = 'cx-org-list.orgBudget .main .link-list';

/**
 * This test checks accessibility concerns on the B2B My Company Budgets page using Access Continuum
 */
describe(
  'B2B / My Company / Budgets / Page Accessibility',
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

    it('budgets / initial panel', () => {
      cy.get(rowCellSelector).click();
      cy.get(
        'cx-org-budget-details cx-org-card cx-view .main .details .property .value'
      );
      cy.get('cx-org-budget-details').a11yRunContinuumTest();
    });

    it('budgets / edit panel', () => {
      const editdLink = 'cx-org-budget-details .header .actions a.edit';
      cy.get(editdLink).click();
      cy.get('cx-org-budget-details cx-org-budget-form form input');
      cy.get('cx-org-budget-details').a11yRunContinuumTest();
    });

    it('budgets / const centers panel', () => {
      cy.get(`${detailsActionsListSelector} a:nth-child(1)`).click();
      cy.get(
        'cx-org-budget-cost-center-list table cx-org-cost-center-details-cell button'
      ).click();
      cy.get('cx-org-budget-details').a11yRunContinuumTest();
    });
  }
);
