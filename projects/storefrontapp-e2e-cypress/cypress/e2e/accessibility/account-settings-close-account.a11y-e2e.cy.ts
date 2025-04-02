/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as updateEmail from '../../helpers/update-email';
import { isolateTests } from '../../support/utils/test-isolation';

const CLOSE_ACCOUNT_URL = '/my-account/close-account';

/**
 * This test checks accessibility concerns on the Account Settings Close Account page using Access Continuum
 */
describe('Account Settings / Close Account Page Accessibility', () => {
  isolateTests();

  before(() => {
    cy.a11yContinuumSetup();
  });

  it('initial page load', () => {
    updateEmail.registerAndLogin();
    cy.visit(CLOSE_ACCOUNT_URL);
    cy.get('cx-breadcrumb h1').should('contain', 'Close Account');

    cy.get('main').a11yRunContinuumTest();
  });

  it('Close Account update success', () => {
    updateEmail.registerAndLogin();
    cy.visit(CLOSE_ACCOUNT_URL);
    cy.get('cx-breadcrumb h1').should('contain', 'Close Account');
    cy.get('cx-close-account button.btn-primary').click();
    cy.get('cx-close-account-modal .cx-close-account-modal-title').should(
      'contain',
      'Confirm Account Closure'
    );
    cy.get(
      'cx-close-account-modal .cx-close-account-modal-footer button.btn-secondary'
    ).click();

    cy.get('main').a11yRunContinuumTest();
  });
});
