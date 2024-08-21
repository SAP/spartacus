/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { isolateTests } from '../../../support/utils/test-isolation';

context('Site Theme', { testIsolation: false }, () => {
  isolateTests();
  before(() => {
    cy.visit('/');
  });

  it('should display theme switcher', () => {
    cy.get('cx-theme-switcher').should('be.visible');
  });

  it('should set default theme', () => {
    cy.get('cx-theme-switcher select').then(($select) => {
      const selectedOption = $select.find('option:selected');
      cy.wrap(selectedOption).should('have.attr', 'aria-label', 'Default');
      cy.wrap(selectedOption).should('have.value', 'santorini');
    });
  });

  it('should change theme in the page', () => {
    cy.get('cx-theme-switcher select')
      .select('HC-Dark')
      .should('have.value', 'cx-theme-high-contrast-dark');
    cy.get('cx-storefront').should('have.class', 'cx-theme-high-contrast-dark');

    cy.get('cx-theme-switcher select')
      .select('HC-Light')
      .should('have.value', 'cx-theme-high-contrast-light');
    cy.get('cx-storefront').should(
      'have.class',
      'cx-theme-high-contrast-light'
    );
  });

  it('should keep selected theme after reload the page', () => {
    cy.get('cx-theme-switcher select')
      .select('HC-Dark')
      .should('have.value', 'cx-theme-high-contrast-dark');
    cy.get('cx-storefront').should('have.class', 'cx-theme-high-contrast-dark');

    cy.reload();

    cy.get('cx-storefront').should('have.class', 'cx-theme-high-contrast-dark');
    cy.get('cx-theme-switcher select').then(($select) => {
      const selectedOption = $select.find('option:selected');
      cy.wrap(selectedOption).should('have.attr', 'aria-label', 'HC-Dark');
      cy.wrap(selectedOption).should(
        'have.value',
        'cx-theme-high-contrast-dark'
      );
    });
  });
});
