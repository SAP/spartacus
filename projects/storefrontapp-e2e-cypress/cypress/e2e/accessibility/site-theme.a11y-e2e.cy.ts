/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FeaturesConfig } from '@spartacus/core';
import * as siteTheme from '../../helpers/site-theme';

context('Continuum Theme Switching Context', { testIsolation: false }, () => {
  before(() => {
    cy.cxConfig({
      features: {
        useSiteThemeService: true,
      },
    } as FeaturesConfig);

    cy.visit('/');
    siteTheme.interceptToAddThemeCompnent();
    cy.a11yContinuumSetup();
  });

  it('should scan storefront with default theme', () => {
    cy.get('main').a11yRunContinuumTest();
  });

  it('should scan storefront after changing theme to HC-Dark', () => {
    cy.get('cx-site-theme-switcher select').select('HC-Dark');
    cy.get('main').a11yRunContinuumTest();
  });

  it('should scan storefront after changing theme to HC-Light', () => {
    cy.get('cx-site-theme-switcher select').select('HC-Light');
    cy.get('main').a11yRunContinuumTest();
  });

  it('should scan storefront after reverting theme to Default', () => {
    cy.get('cx-site-theme-switcher select').select('Default');
    cy.get('main').a11yRunContinuumTest();
  });
});
