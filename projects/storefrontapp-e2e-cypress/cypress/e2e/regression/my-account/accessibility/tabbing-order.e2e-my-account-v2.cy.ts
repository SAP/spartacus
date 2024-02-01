/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { myAccountV2UserEmailManagementTabbingOrder } from './my-account-v2-email-management';
import { myAccountV2UserProfileManagementTabbingOrder } from './my-account-v2-profile-management';

import { tabbingOrderConfig as config } from './tabbing-order.config';

describe('Tabbing order - tests do require user to be logged in display model', () => {
  before(() => {
    cy.requireLoggedIn();
  });

  beforeEach(() => {
    cy.requireLoggedIn();
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
});
