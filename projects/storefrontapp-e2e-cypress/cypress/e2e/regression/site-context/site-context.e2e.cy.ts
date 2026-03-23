/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { login } from '../../../helpers/auth-forms';
import * as siteContextSelector from '../../../helpers/site-context-selector';
import * as merchandisingCarousel from '../../../helpers/vendor/cds/merchandising-carousel';
import { myCompanyAdminUser } from '../../../sample-data/shared-users';
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

  it('should navigate to login page with a change in site context language to German and currency to JPY', () => {
    // Use URL to switch site context instead of switchSiteContext() that relies on UI elements. Some backends only expose language dropdown
    cy.visit('/de/JPY/login');
  });

  it('should login and redirect to film cameras category page with the updated language and currency context', () => {
    const registrationData = myCompanyAdminUser.registrationData;

    cy.intercept('POST', '**/oauth/token').as('loginToken');

    login(registrationData.email, registrationData.password);

    cy.wait('@loginToken').its('response.statusCode').should('eq', 200);

    siteContextSelector.assertSiteContextChange(
      siteContextSelector.FULL_BASE_URL_DE_JPY + filmCamerasCategoryUrl
    );
  });
});
