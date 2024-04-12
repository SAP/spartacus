/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { loginAsMyCompanyAdmin } from '../../../../helpers/b2b/my-company/my-company.utils';
import { getAssistiveAlert } from '../../../../helpers/global-message';

describe('My Company - Accessibility', () => {
  beforeEach(() => {
    loginAsMyCompanyAdmin();
    cy.visit('/organization/units/Rustic/');
  });
  context('Announce navigation between views', () => {
    it('on view load', () => {
      getAssistiveAlert().contains('Unit Details').should('not.be.visible');
    });
    it('on next ciew', () => {
      cy.contains('Child Units').click();
      getAssistiveAlert().contains('Child units').should('not.be.visible');
    });
    it('on previous view', () => {
      cy.contains('Child Units').click();
      cy.get('.close').last().click();
      getAssistiveAlert().contains('Unit Details').should('not.be.visible');
    });
  });
});
