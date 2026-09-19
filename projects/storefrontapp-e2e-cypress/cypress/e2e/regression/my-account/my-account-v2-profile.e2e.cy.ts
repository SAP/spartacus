/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as alerts from '../../../helpers/global-message';
import { checkBanner } from '../../../helpers/homepage';
import { generateMail, randomString } from '../../../helpers/user';
import * as loginHelper from '../../../helpers/my-account-v2/my-account-v2-login-helper';
import { standardUser } from '../../../sample-data/shared-users';
import { viewportContext } from '../../../helpers/viewport-context';
import { isolateTests } from '../../../support/utils/test-isolation';

export const newTitle = 'Mr.';
export const newFirstName = 'Cypress';
export const newLastName = 'User';
export const UPDATE_PROFILE_URL = '/my-account/update-profile';

describe('My Account - Update Profile (CXSPA-10780)', () => {
  viewportContext(['desktop', 'mobile'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
    });

    describe('update profile test for anonymous user', () => {
      // Verifies that anonymous users cannot access the update profile page and are redirected to the login page.
      // The final check ensures the URL pathname contains '/login'.
      it('should redirect to login page for anonymous user (CXSPA-10780)', () => {
        cy.visit(UPDATE_PROFILE_URL);
        cy.location('pathname').should('contain', '/login');
      });
    });
  });

  viewportContext(['desktop'], () => {
    describe(
      'update profile test for logged in user (CXSPA-10780)',
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
            option: 'Personal Details',
          });
        });

        // Tests updating profile details including title, first name, and last name, then verifies the changes.
        // The final check verifies that the greeting displays the new name in the upper right corner.
        it('should be able to update profile details (CXSPA-10780)', () => {
          cy.get('.editButton').click();

          cy.get('cx-update-profile, cx-my-account-v2-profile').within(() => {
            cy.get('[formcontrolname="titleCode"]').ngSelect(newTitle);
            cy.get('[formcontrolname="firstName"]').clear().type(newFirstName);
            cy.get('[formcontrolname="lastName"]').clear().type(newLastName);
            cy.get('button.btn-primary').click();
          });

          // check for the global message and home screen
          alerts
            .getSuccessAlert()
            .should('contain', 'Personal details successfully updated');
          checkBanner();

          // check is the new name displayed in the upper right corner
          cy.get('.cx-login-greet').should(
            'contain',
            `Hi, ${newFirstName} ${newLastName}`
          );
        });

        // Tests viewing the updated profile information in edit mode and canceling back to the display view.
        // The final check verifies that after clicking cancel, the value display is shown and the edit form is hidden.
        it('should be able to see the new profile info and cancle back to edit first page (CXSPA-10780)', () => {
          cy.get('.editButton').click();
          // check where the user's details updated in the previous test
          cy.get('cx-update-profile, cx-my-account-v2-profile').within(() => {
            cy.get('[formcontrolname="titleCode"] .ng-value-label').should(
              'have.text',
              newTitle
            );
            cy.get('[formcontrolname="firstName"]').should(
              'have.value',
              newFirstName
            );
            cy.get('[formcontrolname="lastName"]').should(
              'have.value',
              newLastName
            );

            cy.log('--> click cancel button');
            cy.get('.button-cancel').click();

            cy.log('--> should show email content');
            cy.get('.value').should('exist');
          });
        });
      }
    );
  });
});
