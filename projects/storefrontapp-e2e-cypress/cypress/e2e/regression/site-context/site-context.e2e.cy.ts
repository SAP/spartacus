/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { login } from '../../../helpers/auth-forms';
import * as siteContextSelector from '../../../helpers/site-context-selector';
import * as merchandisingCarousel from '../../../helpers/vendor/cds/merchandising-carousel';
import { switchSiteContext } from '../../../support/utils/switch-site-context';
import { isolateTests } from '../../../support/utils/test-isolation';

context(
  'Site Context changes made on login page should persist when redirecting on login',
  { testIsolation: false },
  () => {
    const filmCamerasPath = '/c/574';
    isolateTests();
    before(() => {
      cy.visit('/');
    });

    it('should navigate to film cameras category page to save redirect url', () => {
      merchandisingCarousel.navigateToCategory(
        merchandisingCarousel.filmCamerasCategoryName,
        merchandisingCarousel.filmCamerasCategoryCode
      );
    });

    it('should navigate to login page without submitting the form', () => {
      // loginHelper.navigateToLoginPage();
      cy.visit('/login');
    });

    it('should change language and currency site context', () => {
      cy.wait(3000);
      switchSiteContext(
        siteContextSelector.LANGUAGE_DE,
        siteContextSelector.LANGUAGE_LABEL
      );
      // switchSiteContext(
      //   siteContextSelector.CURRENCY_JPY,
      //   siteContextSelector.CURRENCY_LABEL
      // );
    });

    it('should login and redirect to film cameras category page with the updated language and currency context', () => {
      login('mark.rivers@rustic-hw.com', 'pw4all');
      cy.reload();
      siteContextSelector.assertSiteContextChange(
        siteContextSelector.FULL_BASE_URL_DE + filmCamerasPath
      );
    });
  }
);
