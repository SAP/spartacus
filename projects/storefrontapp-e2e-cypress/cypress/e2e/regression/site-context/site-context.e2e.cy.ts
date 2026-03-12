/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { login } from '../../../helpers/auth-forms';
import * as siteContextSelector from '../../../helpers/site-context-selector';
import * as merchandisingCarousel from '../../../helpers/vendor/cds/merchandising-carousel';
import { switchSiteContext } from '../../../support/utils/switch-site-context';
import { isolateTestsBefore } from '../../../support/utils/test-isolation';
import { myCompanyAdminUser } from '../../../sample-data/shared-users';

context(
  'Site Context changes made on login page',
  { testIsolation: false },
  () => {
    isolateTestsBefore();
    const registrationData = myCompanyAdminUser.registrationData;
    const filmCamerasCategoryUrl =
      '/c/' + merchandisingCarousel.filmCamerasCategoryCode;

    it('should navigate to film cameras category page to save redirect url', () => {
      cy.visit('/');
      merchandisingCarousel.navigateToCategory(
        merchandisingCarousel.filmCamerasCategoryName,
        merchandisingCarousel.filmCamerasCategoryCode
      );
      cy.url().should('include', filmCamerasCategoryUrl);
    });

    it('should navigate to login page without submitting the form', () => {
      cy.visit('/login');
    });

    it('should change language and currency site context', () => {
      switchSiteContext(
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL
      );
    });

    it('should login and redirect to film cameras category page with the updated language and currency context', () => {
      login(registrationData.email, registrationData.password);
      siteContextSelector.assertSiteContextChange(
        siteContextSelector.FULL_BASE_URL_DE_USD + filmCamerasCategoryUrl
      );
    });
  }
);
