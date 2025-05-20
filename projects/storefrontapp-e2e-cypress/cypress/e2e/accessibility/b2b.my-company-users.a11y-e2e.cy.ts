/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { loginAsMyCompanyAdmin } from '../../helpers/b2b/my-company/my-company.utils';

const MY_COMPANY_URL = '/organization/users';
const firstRusticSelector =
  'main cx-view cx-table table tr:nth-child(2) .unit cx-org-unit-cell [title="Rustic"]';
const detailsActionsListSelector = 'cx-org-user-details .main .link-list';

/**
 * This test checks accessibility concerns on the B2B My Company Users page using Access Continuum
 */
describe(
  'B2B / My Company / Users / Page Accessibility',
  { testIsolation: false },
  () => {
    before(() => {
      cy.a11yContinuumSetup();
      loginAsMyCompanyAdmin();
      cy.visit(MY_COMPANY_URL);
    });

    it('list page loaded', () => {
      cy.get(firstRusticSelector);
      cy.get('main').a11yRunContinuumTest();
    });

    it('user details / initial panel', () => {
      cy.get(firstRusticSelector).click();
      cy.get(
        'cx-org-user-details cx-org-card cx-view .main .details .property a[href="/powertools-spa/en/USD/organization/units/Rustic"]'
      );
      cy.get('cx-org-user-details').a11yRunContinuumTest();
    });

    it('user details / change password panel', () => {
      const changePasswordLink = '.details .property:last-child';
      cy.get(changePasswordLink).click();
      cy.get('cx-org-user-details cx-org-user-change-password-form form input');
      cy.get('cx-org-user-details').a11yRunContinuumTest();
    });

    it('user details / approvers panel', () => {
      cy.get(firstRusticSelector).click();
      cy.get(
        'cx-org-user-details cx-org-card cx-view .main .details .property a[href="/powertools-spa/en/USD/organization/units/Rustic"]'
      );

      cy.get(`${detailsActionsListSelector} a:nth-child(1)`).click();
      cy.get('cx-org-user-assigned-approver-list .main .is-empty');
      cy.get('cx-org-user-details').a11yRunContinuumTest();
    });

    it('user details / approvers / manage approvers assign panel', () => {
      const manageLinkBtn =
        'cx-org-user-assigned-approver-list .header .actions a';
      const assignTableRowCel =
        'cx-org-user-approver-list cx-org-sub-list .main table tr:nth-child(2) td';
      cy.get(manageLinkBtn).click();
      cy.get(`${assignTableRowCel} cx-org-assign-cell button`);
      cy.get(`${assignTableRowCel} cx-org-user-details-cell button`).click();
      cy.get('cx-org-user-details').a11yRunContinuumTest();
    });

    it('user details / user groups panel', () => {
      cy.get(`${detailsActionsListSelector} a:nth-child(2)`).click();
      cy.get('cx-org-user-assigned-user-group-list .main .is-empty');
      cy.get('cx-org-user-details').a11yRunContinuumTest();
    });

    it('user details / purchase limits panel', () => {
      cy.get(`${detailsActionsListSelector} a:nth-child(3)`).click();
      cy.get('cx-org-user-assigned-permission-list .main .is-empty');
      cy.get('cx-org-user-details').a11yRunContinuumTest();
    });
  }
);
