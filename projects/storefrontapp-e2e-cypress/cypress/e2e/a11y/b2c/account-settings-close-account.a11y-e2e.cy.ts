/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { standardUser } from '../../../sample-data/shared-users';

const CLOSE_ACCOUNT_URL = '/my-account/close-account';

/**
 * This test checks accessibility concerns on the Account Settings Close Account page using Access Continuum
 */
describe(
  'Account Settings / Close Account Page Accessibility',
  { testIsolation: false },
  () => {
    before(() => {
      cy.a11yContinuumSetup();
    });

    it('initial page load', () => {
      cy.requireLoggedIn(standardUser);
      cy.visit(CLOSE_ACCOUNT_URL);
      cy.get('cx-close-account button.btn-primary');
      cy.get('main').a11yRunContinuumTest();
    });

    it('confirm Account Closure Modal', () => {
      cy.requireLoggedIn(standardUser);
      cy.visit(CLOSE_ACCOUNT_URL);
      cy.get('cx-close-account button.btn-primary').click();
      cy.get('cx-close-account-modal').a11yRunContinuumTest();
    });
  }
);
