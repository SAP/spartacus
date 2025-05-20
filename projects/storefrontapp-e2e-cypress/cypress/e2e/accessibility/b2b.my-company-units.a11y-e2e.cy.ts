/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { loginAsMyCompanyAdmin } from '../../helpers/b2b/my-company/my-company.utils';

const MY_COMPANY_URL = '/organization/units';

/**
 * This test checks accessibility concerns on the B2B My Company Units page using Access Continuum
 */
describe(
  'B2B / My Company / Units / Page Accessibility',
  { testIsolation: false },
  () => {
    before(() => {
      cy.a11yContinuumSetup();
      loginAsMyCompanyAdmin();
      cy.visit(MY_COMPANY_URL);
    });

    it('initial page load', () => {
      cy.get('main cx-view cx-table table');
      cy.get('main').a11yRunContinuumTest();
    });

    it('page loaded', () => {
      cy.get('#Rustic');
      cy.get('main').a11yRunContinuumTest();
    });

    it('unit details / initial panel', () => {
      cy.get('[id="Rustic Services"]').click();
      cy.get(
        'cx-org-unit-details cx-org-card cx-view .main .details .property a[href="/powertools-spa/en/USD/organization/units/Rustic"]'
      );
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
      cy.get(
        'cx-org-unit-details cx-org-card cx-view .main .details .property a[href="/powertools-spa/en/USD/organization/units/Rustic"]'
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
      // TODO: save as rusticServicesBreadcrumb and reuse elsewhere!
      cy.get(
        'cx-breadcrumb a[href="/powertools-spa/en/USD/organization/units/Rustic%20Services"]'
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
      // TODO: save as rusticServicesBreadcrumb and reuse elsewhere!
      cy.get(
        'cx-breadcrumb a[href="/powertools-spa/en/USD/organization/units/Rustic%20Services"]'
      ).click();
      cy.get(
        'cx-org-unit-details .main .link-list a.link:nth-child(3)'
      ).click();
      cy.get(
        'cx-org-unit-assigned-approver-list cx-org-sub-list .main .is-empty'
      );
      cy.get('cx-org-unit-assigned-approver-list').a11yRunContinuumTest();
    });

    it('unit details / approvers list / manage approvers panel', () => {
      cy.get(
        'cx-org-unit-assigned-approver-list cx-org-sub-list .header .btn:first-child'
      ).click();
      cy.get(
        'cx-org-unit-approver-list cx-org-sub-list cx-table table tr:nth-child(2) td.orgUnit span[title="Services East"]'
      );
      cy.get(
        'cx-org-unit-approver-list cx-org-sub-list cx-table table tr:nth-child(2) cx-org-user-details-cell button'
      ).click();
      cy.get('cx-org-unit-approver-list').a11yRunContinuumTest();
    });

    it('unit details / approvers list / manage approvers assign panel', () => {
      // Assign button click
      cy.get(
        'cx-org-unit-approver-list cx-org-sub-list cx-table table tr:nth-child(2) cx-org-assign-cell button'
      ).click();
      cy.get('cx-global-message .alert-danger');
      cy.get('body').a11yRunContinuumTest();
    });

    it('unit details / delivery addresses list panel', () => {
      // TODO: save as rusticServicesBreadcrumb and reuse elsewhere!
      cy.get(
        'cx-breadcrumb a[href="/powertools-spa/en/USD/organization/units/Rustic%20Services"]'
      ).click();
      cy.get(
        'cx-org-unit-details .main .link-list a.link:nth-child(4)'
      ).click();
      cy.get('cx-org-unit-address-list cx-org-sub-list .main .is-empty');
      cy.get('cx-org-unit-address-list').a11yRunContinuumTest();
    });

    it('unit details / delivery addresses list / create panel', () => {
      cy.get(
        'cx-org-unit-address-list cx-org-sub-list .header .btn:first-child'
      ).click();
      cy.get('cx-org-unit-address-list cx-org-sub-list input');
      cy.get('cx-org-unit-address-list').a11yRunContinuumTest();
    });

    it('unit details / const centers list panel', () => {
      // TODO: save as rusticServicesBreadcrumb and reuse elsewhere!
      cy.get(
        'cx-breadcrumb a[href="/powertools-spa/en/USD/organization/units/Rustic%20Services"]'
      ).click();
      cy.get(
        'cx-org-unit-details .main .link-list a.link:nth-child(5)'
      ).click();
      cy.get('cx-org-unit-cost-centers cx-org-sub-list .main .is-empty');
      cy.get('cx-org-unit-cost-centers').a11yRunContinuumTest();
    });

    it('unit details / const centers list / create panel', () => {
      cy.get(
        'cx-org-unit-cost-centers cx-org-sub-list .header .btn:first-child'
      ).click();
      cy.get('cx-org-unit-cost-centers cx-org-sub-list input');
      cy.get('cx-org-unit-cost-centers').a11yRunContinuumTest();
    });
  }
);
