/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { myAccountV2UserEmailManagementTabbingOrder } from './my-account-v2-email-management';
import { myAccountV2UserProfileManagementTabbingOrder } from './my-account-v2-profile-management';
import * as loginHelper from '../../../../helpers/my-account-v2/my-account-v2-login-helper';
import { generateMail, randomString } from '../../../../helpers/user';
import { standardUser } from '../../../../sample-data/shared-users';
import { tabbingOrderConfig as config } from './tabbing-order.config';
import { isolateTests } from '../../../../support/utils/test-isolation';

describe(
  'Tabbing order - tests do require user to be logged in display model',
  { testIsolation: false },
  () => {
    isolateTests();

    beforeEach(() => {
      standardUser.registrationData.email = generateMail(randomString(), true);
      loginHelper.registerAndLogin(
        standardUser.registrationData.email,
        standardUser.registrationData.password
      );
    });

    afterEach(() => {
      cy.restoreLocalStorage();
    });

    context('My Account V2 Profile Management ', () => {
      it('should allow to navigate with tab key display mode (CXSPA-4442)', () => {
        myAccountV2UserProfileManagementTabbingOrder(
          config.myAccountV2ProfileDisplay
        );
      });

      it('should allow to navigate with tab key edit mode (CXSPA-4442)', () => {
        myAccountV2UserProfileManagementTabbingOrder(
          config.myAccountV2ProfileEdit,
          true
        );
      });
    });

    context('My Account V2 Email Management', () => {
      it('should allow to navigate with tab key display mode (CXSPA-4442)', () => {
        myAccountV2UserEmailManagementTabbingOrder(
          config.myAccountV2EmailDisplay
        );
      });
      it('should allow to navigate with tab key edit mode (CXSPA-4442)', () => {
        myAccountV2UserEmailManagementTabbingOrder(
          config.myAccountV2EmailEdit,
          true
        );
      });
    });
  }
);
