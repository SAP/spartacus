/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { login } from '../../../helpers/auth-forms';
import * as alerts from '../../../helpers/global-message';
import { signOut } from '../../../helpers/register';
import * as updateEmail from '../../../helpers/update-email';
import { registerAndLogin } from '../../../helpers/update-email';
import { viewportContext } from '../../../helpers/viewport-context';
import { standardUser } from '../../../sample-data/shared-users';
import { isolateTests } from '../../../support/utils/test-isolation';

describe('My Account - Update Email', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    describe('Anonymous user', () => {
      it('should redirect to login page (CXSPA-4442)', () => {
        cy.visit(updateEmail.UPDATE_EMAIL_URL);
        cy.location('pathname').should('contain', '/login');
      });
    });

    describe('Logged in user', { testIsolation: false }, () => {
      isolateTests();
      before(() => {
        registerAndLogin();
        cy.visit('/');
      });

      beforeEach(() => {
        cy.restoreLocalStorage();
        cy.selectUserMenuOption({
          option: 'Email Address',
        });
      });

      it('should click edit email and go to edit menu, and cancel works as expected (CXSPA-4442)', () => {
        cy.get('.cx-message-info').should('not.exist');
        cy.get('.email-enhancedUI-value').should('exist');

        cy.log('--> click edit button');
        cy.get('.email-enhancedUI-editButton').click();

        cy.log('--> should show email message bar');
        cy.get('.cx-message-info').should('exist');
        cy.get('email-enhancedUI-value').should('not.exist');
        cy.get('.email-enhancedUI-button-cancel').should('exist');

        cy.log('--> click cancel button');
        cy.get('.email-enhancedUI-button-cancel').click();

        cy.log('--> should show email content');
        cy.get('.cx-message-info').should('not.exist');
        cy.get('.email-enhancedUI-value').should('exist');

        cy.log('--> click edit button');
        cy.get('.email-enhancedUI-editButton').click();
      });

      // Core e2e test. Check with different view port.
      updateEmail.testUpdateEmailAndLogin();

      // Below test depends on core test for setup.
      it('should not allow login with old email address (CXSPA-4442)', () => {
        signOut();
        cy.visit('/login');
        login(
          standardUser.registrationData.email,
          standardUser.registrationData.password
        );
        alerts.getErrorAlert().should('contain', 'Bad credentials');
      });

      afterEach(() => {
        cy.saveLocalStorage();
      });
    });
  });
});
