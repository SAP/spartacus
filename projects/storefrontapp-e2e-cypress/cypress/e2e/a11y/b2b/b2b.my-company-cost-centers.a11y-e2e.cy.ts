/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { loginAsMyCompanyAdmin } from '../../../helpers/b2b/my-company/my-company.utils';
import { isolateTestsBefore } from '../../../support/utils/test-isolation';

const MY_COMPANY_URL = '/organization/cost-centers';
const rowCellSelector =
  'main cx-view cx-table table tr:nth-child(2) .unit cx-org-unit-cell [title="Custom Retail"]';
const detailsActionsListSelector =
  'cx-org-cost-center-details .main .link-list';

/**
 * This test checks accessibility concerns on the B2B My Company Cost Centers page using Access Continuum
 */
describe(
  'B2B / My Company / Cost Centers / Page Accessibility',
  { testIsolation: false },
  () => {
    isolateTestsBefore();
    before(() => {
      cy.a11yContinuumSetup();
      loginAsMyCompanyAdmin();
      cy.visit(MY_COMPANY_URL);
    });

    it('list page loaded', () => {
      cy.get(rowCellSelector);
      cy.get('main').a11yRunContinuumTest();
    });

    it('cost centers / initial panel', () => {
      cy.get(rowCellSelector).click();
      cy.get(
        'cx-org-cost-center-details cx-org-card cx-view .main .details .property .value'
      );
      cy.get('cx-org-cost-center-details').a11yRunContinuumTest();
    });

    it('cost centers / edit panel', () => {
      const editdLink = 'cx-org-cost-center-details .header .actions a.edit';
      cy.get(editdLink).click();
      cy.get('cx-org-cost-center-details cx-org-cost-center-form form input');
      cy.get('cx-org-cost-center-details').a11yRunContinuumTest();
    });

    it('cost centers / budgets panel', () => {
      cy.get(`${detailsActionsListSelector} a:nth-child(1)`).click();
      cy.get(
        'cx-org-cost-center-assigned-budget-list table cx-org-assign-cell button'
      );
      cy.get(
        'cx-org-cost-center-assigned-budget-list table cx-org-budget-details-cell button'
      ).click();
      cy.get('cx-org-cost-center-details').a11yRunContinuumTest();
    });

    it('cost centers / budgets / manage budgets panel', () => {
      const manageLink =
        'cx-org-cost-center-assigned-budget-list .header .actions a.btn';
      cy.get(manageLink).click();
      const assignButtonCell =
        'cx-org-cost-center-budget-list .main table tr:nth-child(2) cx-org-assign-cell button';
      cy.get(assignButtonCell);
      cy.get('cx-org-cost-center-budget-list').a11yRunContinuumTest();
    });
  }
);
