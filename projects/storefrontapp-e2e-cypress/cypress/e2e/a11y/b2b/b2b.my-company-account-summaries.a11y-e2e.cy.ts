/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { loginAsMyCompanyAdmin } from '../../../helpers/b2b/my-company/my-company.utils';
import { isolateTestsBefore } from '../../../support/utils/test-isolation';

const MY_COMPANY_URL = '/organization/account-summary';
export const SKELETON_SELECTOR = 'main cx-view .cx-list-content.is-loading';

/**
 * This test checks accessibility concerns on the B2B My Company Account Summaries page using Access Continuum
 */
describe(
  'B2B / My Company / Account Summaries / Page Accessibility',
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

    it('account summaries details / initial panel', () => {
      const EXPAND_BTN_SELECTOR = '.actions > button:first-of-type';
      cy.get(EXPAND_BTN_SELECTOR).click();
      cy.get('[id="Custom Retail"]').click();
      cy.get(
        '.cx-account-summary-document-row:nth-child(2) .cx-account-summary-document-label'
      );
      cy.get('main').a11yRunContinuumTest();
    });
  }
);
