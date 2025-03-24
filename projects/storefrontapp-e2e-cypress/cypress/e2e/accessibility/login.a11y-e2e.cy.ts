/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { checkA11yConcerns } from '../../support/utils/a11y-continuum.utils';

context('Login Page Accessibility', () => {
  before(() => {
    cy.a11yContinuumSetup();
  });

  describe('Initial Load', () => {
    before(() => {
      cy.visit('/login');
    });

    checkA11yConcerns();
  });

  describe('Submit Invalid Login', () => {
    before(() => {
      cy.visit('/login');
      cy.get('input[formControlName="userId"]').type('invalid@email');
      cy.get('input[formControlName="password"]').type('wrongpass');
      cy.get('form').submit();
    });

    checkA11yConcerns();
  });
});
