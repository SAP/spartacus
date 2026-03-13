/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { login } from '../../../helpers/auth-forms';
import * as siteContextSelector from '../../../helpers/site-context-selector';
import * as merchandisingCarousel from '../../../helpers/vendor/cds/merchandising-carousel';
import { myCompanyAdminUser } from '../../../sample-data/shared-users';
import { whenJDK17, whenJDK21 } from '../../../support/utils/jdk-versions';
import { switchSiteContext } from '../../../support/utils/switch-site-context';
import { isolateTestsBefore } from '../../../support/utils/test-isolation';

context('Site Context on redirect', { testIsolation: false }, () => {
  isolateTestsBefore();
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

  it('should change site context language to German and currency to JPY', () => {
    switchSiteContext(
      siteContextSelector.LANGUAGE_DE,
      siteContextSelector.LANGUAGE_LABEL
    );

    // Do not attempt to switch currency site context when using JDK21 backend server
    whenJDK17(() => {
      switchSiteContext(
        siteContextSelector.CURRENCY_JPY,
        siteContextSelector.CURRENCY_LABEL
      );
    });
  });

  it('should login and redirect to film cameras category page with the updated language and currency context', () => {
    const registrationData = myCompanyAdminUser.registrationData;

    cy.intercept('POST', '**/oauth/token').as('loginToken');

    login(registrationData.email, registrationData.password);

    cy.wait('@loginToken').its('response.statusCode').should('eq', 200);

    //assert site context based on JDK - on 17 we switch language and currency - on 21 we switch langugage
    whenJDK17(() => {
      siteContextSelector.assertSiteContextChange(
        siteContextSelector.FULL_BASE_URL_DE_JPY + filmCamerasCategoryUrl
      )
    });

    whenJDK21(() => {
      siteContextSelector.assertSiteContextChange(
        siteContextSelector.FULL_BASE_URL_DE_USD + filmCamerasCategoryUrl
      )
    });
  });
});
