/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { checkA11yConcerns } from '../../support/utils/a11y-continuum.utils';

context('Registration Page Accessibility', () => {
  before(() => {
    cy.a11yContinuumSetup();
  });

  describe('Initial Load', () => {
    before(() => {
      cy.visit('/login/register');
    });

    checkA11yConcerns();
  });

  describe('Submit Empty Form', () => {
    before(() => {
      cy.visit('/login/register');
      cy.get('form').submit();
    });

    checkA11yConcerns();
  });
});
