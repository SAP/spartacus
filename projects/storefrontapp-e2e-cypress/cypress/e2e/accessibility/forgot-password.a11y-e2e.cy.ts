/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { checkA11yConcerns } from '../../support/utils/a11y-continuum.utils';

context('Forgot Password Page Accessibility', () => {
  before(() => {
    cy.a11yContinuumSetup();
  });

  describe('Initial Load', () => {
    before(() => {
      cy.visit('/login/forgot-password');
    });

    checkA11yConcerns();
  });

  describe('Submit Invalid Email', () => {
    before(() => {
      cy.visit('/login/forgot-password');
      cy.get('input[type="email"]').type('notanemail');
      cy.get('form').submit();
    });

    checkA11yConcerns();
  });
});
