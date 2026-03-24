/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { loginAsMyCompanyAdmin } from '../../../helpers/b2b/my-company/my-company.utils';
import { isolateTestsBefore } from '../../../support/utils/test-isolation';

const MY_COMPANY_URL = '/organization/user-groups';
const rowCellSelector =
  'main cx-view cx-table table tr:last-child .uid cx-org-cell .text';
const detailsActionsListSelector = 'cx-org-user-group-details .main .link-list';
export const SKELETON_SELECTOR =
  'main cx-view cx-table table cx-org-cell:not(:has(a))';

/**
 * This test checks accessibility concerns on the B2B My Company User Groups page using Access Continuum
 */
describe(
  'B2B / My Company / User Groups / Page Accessibility',
  { testIsolation: false },
  () => {
    isolateTestsBefore();
    before(() => {
      cy.a11yContinuumSetup();
      loginAsMyCompanyAdmin();
      cy.visit(MY_COMPANY_URL);
    });

    it('page loading (skeleton)', () => {
      cy.get(SKELETON_SELECTOR);
      cy.get('main').a11yRunContinuumTest();
    });

    it('user groups / initial panel', () => {
      cy.get(rowCellSelector).click();
      cy.get(
        'cx-org-user-group-details cx-org-card cx-view .main .details .property .value'
      );
      cy.get('cx-org-user-group-details').a11yRunContinuumTest();
    });

    it('user groups / edit panel', () => {
      const editdLink = 'cx-org-user-group-details .header .actions a.edit';
      cy.get(editdLink).click();
      cy.get('cx-org-user-group-details cx-org-user-group-form form input');
      cy.get('cx-org-user-group-details').a11yRunContinuumTest();
    });

    it('user groups / users panel', () => {
      cy.get(`${detailsActionsListSelector} a:nth-child(1)`).click();
      cy.get(
        'cx-org-user-group-assigned-user-list table cx-org-assign-cell button'
      );
      cy.get(
        'cx-org-user-group-assigned-user-list table tr:nth-child(2) cx-org-user-details-cell button'
      ).click();
      cy.get('cx-org-user-group-details').a11yRunContinuumTest();
    });

    it('user groups / users / manage users panel', () => {
      const manageLink =
        'cx-org-user-group-assigned-user-list .header .actions a.btn';
      cy.get(manageLink).click();
      const assignButtonCell =
        'cx-org-user-group-user-list .main table tr:nth-child(2) cx-org-assign-cell button';
      cy.get(assignButtonCell);
      cy.get(
        'cx-org-user-group-user-list .main table tr:nth-child(2) cx-org-user-details-cell button'
      ).click();
      cy.get('cx-org-user-group-user-list').a11yRunContinuumTest();
    });

    it('user groups / purchase limits panel', () => {
      cy.get(`${detailsActionsListSelector} a:nth-child(2)`).click();
      cy.get(
        'cx-org-user-group-assigned-permission-list table cx-org-assign-cell button'
      );
      cy.get(
        'cx-org-user-group-assigned-permission-list table tr:nth-child(2) cx-org-permission-details-cell button'
      ).click();
      cy.get('cx-org-user-group-details').a11yRunContinuumTest();
    });

    it('user groups / purchase limits / manage purchase limits panel', () => {
      const manageLink =
        'cx-org-user-group-assigned-permission-list .header .actions a.link';
      cy.get(manageLink).click();
      const assignButtonCell =
        'cx-org-user-group-permission-list .main table tr:nth-child(2) cx-org-assign-cell button';
      cy.get(assignButtonCell);
      cy.get(
        'cx-org-user-group-permission-list .main table tr:nth-child(2) cx-org-permission-details-cell button'
      ).click();
      cy.get('cx-org-user-group-permission-list').a11yRunContinuumTest();
    });
  }
);
