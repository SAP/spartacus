/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { loginAsMyCompanyAdmin } from '../../../helpers/b2b/my-company/my-company.utils';
import { isolateTestsBefore } from '../../../support/utils/test-isolation';
import { SKELETON_SELECTOR } from './b2b.my-company-account-summaries.a11y-e2e.cy';

const MY_COMPANY_URL = '/organization/units';

/**
 * This test checks accessibility concerns on the B2B My Company Units page using Access Continuum
 */
describe(
  'B2B / My Company / Units / Page Accessibility',
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

    it('page loaded', () => {
      cy.get('#Rustic');
      cy.get('main').a11yRunContinuumTest();
    });

    it('unit details / initial panel', () => {
      cy.get('[id="Rustic"]').click();
      cy.get('.main .details .property .value.is-active');
      cy.get('cx-org-unit-details').a11yRunContinuumTest();
    });

    it('unit details / edit panel', () => {
      cy.get(
        'cx-org-unit-details cx-org-card cx-view .header .actions .btn.edit'
      ).click();
      cy.get('cx-org-unit-details cx-org-card cx-view .main .details input');
      cy.get('cx-org-unit-details').a11yRunContinuumTest();
    });

    it('unit details / edit-save panel', () => {
      cy.get(
        'cx-org-unit-details cx-org-card cx-view .header .actions .btn.btn-primary'
      ).click();
      cy.get(
        'cx-org-unit-details cx-org-card cx-view .main cx-org-notification'
      );
      cy.get('cx-org-unit-details').a11yRunContinuumTest();
    });

    it('unit details / links list / child units panel', () => {
      cy.get(
        'cx-org-unit-details .main .link-list a.link:nth-child(1)'
      ).click();
      cy.get(
        'cx-org-unit-children cx-org-sub-list cx-org-card cx-view .main cx-table table cx-org-unit-details-cell button'
      );
      cy.get(
        'cx-org-unit-children cx-org-sub-list cx-org-card cx-view .main cx-table table tr:nth-child(2) cx-org-unit-details-cell button'
      ).click();
      cy.get('cx-org-unit-details').a11yRunContinuumTest();
    });

    it('unit details / links list / child units / create panel', () => {
      cy.get(
        'cx-org-unit-details cx-org-unit-children .header .actions .btn'
      ).click();
      cy.get('cx-org-unit-details cx-org-unit-children .main input');
      cy.get('cx-org-unit-details').a11yRunContinuumTest();
    });

    it('unit details / users list panel', () => {
      cy.get(
        'cx-breadcrumb a[href="/powertools-spa/en/USD/organization/units/Rustic"]'
      ).click();
      cy.get(
        'cx-org-unit-details .main .link-list a.link:nth-child(2)'
      ).click();
      cy.get(
        'cx-org-unit-details  .main cx-table table tr:nth-child(2) td.roles a'
      );
      cy.get(
        'cx-org-unit-details .main cx-table table tr:nth-child(2) button'
      ).click();
      cy.get('cx-org-unit-details').a11yRunContinuumTest();
    });

    it('unit details / users list / roles and rights panel', () => {
      cy.get(
        'cx-org-unit-details  .main cx-table table tr:nth-child(2) td.roles a'
      ).click();
      cy.get('cx-org-unit-user-roles form input');
      cy.get('cx-org-unit-details').a11yRunContinuumTest();
    });

    it('unit details / approvers list panel', () => {
      cy.get(
        'cx-breadcrumb a[href="/powertools-spa/en/USD/organization/units/Rustic"]'
      ).click();
      cy.get(
        'cx-org-unit-details .main .link-list a.link:nth-child(3)'
      ).click();
      cy.get('td.actions button');
      cy.get('cx-org-unit-assigned-approver-list').a11yRunContinuumTest();
    });

    it('unit details / approvers list / manage approvers panel', () => {
      cy.get(
        'cx-org-unit-assigned-approver-list cx-org-sub-list .header .btn:first-child'
      ).click();
      cy.get('.actions cx-org-assign-cell button');
      cy.get('table tr:nth-child(2) cx-org-user-details-cell button').click();
      cy.get('cx-org-unit-approver-list').a11yRunContinuumTest();
    });

    it('unit details / approvers list / manage approvers assign panel', () => {
      // Assign button click
      cy.get(
        'table tr:nth-child(2) .actions cx-org-assign-cell button'
      ).click();
      cy.get('.main cx-org-message cx-org-notification');
      cy.get('body').a11yRunContinuumTest();
    });

    it('unit details / delivery addresses list panel', () => {
      cy.get(
        'cx-breadcrumb a[href="/powertools-spa/en/USD/organization/units/Rustic"]'
      ).click();
      cy.get(
        'cx-org-unit-details .main .link-list a.link:nth-child(4)'
      ).click();
      cy.get('td.formattedAddress cx-org-link-cell a');
      cy.get('cx-org-unit-address-list').a11yRunContinuumTest();
    });

    it('unit details / delivery addresses list / create panel', () => {
      cy.get(
        'cx-org-unit-address-list cx-org-sub-list .header .btn:first-child'
      ).click();
      cy.get('cx-org-unit-address-list cx-org-sub-list input');
      cy.get('cx-org-unit-address-list').a11yRunContinuumTest();
    });

    it('unit details / cost centers list panel', () => {
      cy.get(
        'cx-breadcrumb a[href="/powertools-spa/en/USD/organization/units/Rustic"]'
      ).click();
      cy.get(
        'cx-org-unit-details .main .link-list a.link:nth-child(5)'
      ).click();
      cy.get('cx-org-cost-center-details-cell button');
      cy.get('cx-org-unit-cost-centers').a11yRunContinuumTest();
    });

    it('unit details / cost centers list / create panel', () => {
      cy.get(
        'cx-org-unit-cost-centers cx-org-sub-list .header .btn:first-child'
      ).click();
      cy.get('cx-org-unit-cost-centers cx-org-sub-list input');
      cy.get('cx-org-unit-cost-centers').a11yRunContinuumTest();
    });
  }
);
