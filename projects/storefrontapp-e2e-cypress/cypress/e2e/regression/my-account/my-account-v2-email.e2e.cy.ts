/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as alerts from '../../../helpers/global-message';
import * as loginHelper from '../../../helpers/my-account-v2/my-account-v2-login-helper';
import { generateMail, randomString } from '../../../helpers/user';
import { viewportContext } from '../../../helpers/viewport-context';
import { standardUser } from '../../../sample-data/shared-users';
import { isolateTests } from '../../../support/utils/test-isolation';

export const UPDATE_EMAIL_URL = '/my-account/update-email';

describe('My Account - Update Email (CXSPA-10780)', () => {
  viewportContext(['mobile'/*, 'desktop'*/], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    describe('Update email for anonymous user (CXSPA-10780)', () => {
      it('should redirect to login page (CXSPA-10780)', () => {
        cy.visit(UPDATE_EMAIL_URL);
        cy.location('pathname').should('contain', '/login');
      });
    });
  });

  viewportContext(['desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });
    describe(
      'Update emial for logged in user (CXSPA-10780)',
      { testIsolation: false },
      () => {
        isolateTests();
        beforeEach(() => {
          standardUser.registrationData.email = generateMail(
            randomString(),
            true
          );
          loginHelper.registerAndLogin(
            standardUser.registrationData.email,
            standardUser.registrationData.password
          );

          cy.wait(2000);
          cy.selectUserMenuOption({
            option: 'Email Address',
          });
        });

        it('should click edit email and go to edit menu, and cancel works as expected (CXSPA-10780)', () => {
          cy.get('.cx-message-info').should('not.exist');
          cy.get('.value').should('exist');

          cy.log('--> click edit button');
          cy.get('.editButton').click();

          cy.log('--> should show email message bar');
          cy.get('.cx-message-info').should('exist');
          cy.get('.value').should('not.exist');
          cy.get('.button-cancel').should('exist');

          cy.log('--> click cancel button');
          cy.get('.button-cancel').click();

          cy.log('--> should show email content');
          cy.get('.cx-message-info').should('not.exist');
          cy.get('.value').should('exist');

          cy.log('--> click edit button');
          cy.get('.editButton').click();
        });

        // Core e2e test. Check with different view port.

        it('should update the email address and login successfully (CXSPA-10780)', () => {
          cy.get('.editButton').click();
          const newUid = generateMail(randomString(), true);
          cy.get('cx-update-email, cx-my-account-v2-email').within(() => {
            cy.get('[formcontrolname="email"]').type(newUid);
            cy.get('[formcontrolname="confirmEmail"]').type(newUid);
            cy.get('[formcontrolname="password"]').type(
              standardUser.registrationData.password
            );
            cy.get('button.btn-primary').click();
          });

          alerts
            .getSuccessAlert()
            .should('contain', `Success. Please sign in with ${newUid}`);

          cy.location('pathname').should('contain', '/login');

          loginHelper.loginWithOTP(
            newUid,
            standardUser.registrationData.password,
            1
          );
          cy.get('cx-login .cx-login-greet').should('exist');
        });
      }
    );
  });
});
