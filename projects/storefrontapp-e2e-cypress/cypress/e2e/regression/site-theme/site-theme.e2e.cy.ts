/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isolateTests } from '../../../support/utils/test-isolation';
import * as siteTheme from '../../../helpers/site-theme';
import { FeaturesConfig } from '@spartacus/core';

context('Site Theme', { testIsolation: false }, () => {
  isolateTests();
  before(() => {
    cy.cxConfig({
      features: {
        useSiteThemeService: true,
      },
    } as FeaturesConfig);
    cy.visit('/');
    // TODO: (CXSPA-8363) Remove the manual addition of the Theme component in e2e test when sample data is available
    siteTheme.interceptToAddThemeCompnent();
  });

  it('should display theme switcher', () => {
    cy.get('cx-site-theme-switcher').should('be.visible');
  });

  it('should set default theme', () => {
    cy.get('cx-site-theme-switcher select').then(($select) => {
      const selectedOption = $select.find('option:selected');
      cy.wrap(selectedOption).should('have.attr', 'aria-label', 'Default');
      cy.wrap(selectedOption).should('have.value', '');
    });
  });

  it('should change theme in the page', () => {
    cy.get('cx-site-theme-switcher select')
      .select('HC-Dark')
      .should('have.value', 'cx-theme-high-contrast-dark');
    cy.get('cx-storefront').should('have.class', 'cx-theme-high-contrast-dark');

    cy.get('cx-site-theme-switcher select')
      .select('HC-Light')
      .should('have.value', 'cx-theme-high-contrast-light');
    cy.get('cx-storefront').should(
      'have.class',
      'cx-theme-high-contrast-light'
    );

    cy.get('cx-site-theme-switcher select')
      .select('Default')
      .should('have.value', '');
    cy.get('cx-storefront').should(
      'not.have.class',
      'cx-theme-high-contrast-light'
    );
  });

  it('should keep selected theme after reload the page', () => {
    cy.get('cx-site-theme-switcher select')
      .select('HC-Dark')
      .should('have.value', 'cx-theme-high-contrast-dark');
    cy.get('cx-storefront').should('have.class', 'cx-theme-high-contrast-dark');

    cy.cxConfig({
      features: {
        useSiteThemeService: true,
      },
    } as FeaturesConfig);
    cy.reload();

    siteTheme.interceptToAddThemeCompnent();

    cy.get('cx-storefront').should('have.class', 'cx-theme-high-contrast-dark');
    cy.get('cx-site-theme-switcher select').then(($select) => {
      const selectedOption = $select.find('option:selected');
      cy.wrap(selectedOption).should('have.attr', 'aria-label', 'HC-Dark');
      cy.wrap(selectedOption).should(
        'have.value',
        'cx-theme-high-contrast-dark'
      );
    });
  });
});
