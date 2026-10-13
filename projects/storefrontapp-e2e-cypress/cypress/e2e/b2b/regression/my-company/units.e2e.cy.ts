/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { unitConfig } from '../../../../helpers/b2b/my-company/config/unit';
import {
  loginAsMyCompanyAdmin,
  testMyCompanyFeatureFromConfig,
} from '../../../../helpers/b2b/my-company/my-company.utils';

testMyCompanyFeatureFromConfig(unitConfig, true);

function getUnitRow(id: string): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.get(`[id="${id}"]`).closest('[data-cx-roving-item]');
}

describe('A11y - Units List Keyboard Controls', () => {
  beforeEach(() => {
    loginAsMyCompanyAdmin();
    cy.visit(`/organization/units`);
  });

  it('navigate to next link on arrow down', () => {
    getUnitRow('Rustic').focus();
    cy.focused().type('{downArrow}');
    getUnitRow('Rustic Retail').should('have.focus');
    cy.focused().type('{downArrow}');
    getUnitRow('Rustic Services').should('have.focus');
    cy.focused().type('{downArrow}');
    getUnitRow('Rustic Services').should('have.focus');
  });

  it('navigate to previous link on arrow up', () => {
    getUnitRow('Rustic Services').focus();
    cy.focused().type('{upArrow}');
    getUnitRow('Rustic Retail').should('have.focus');
    cy.focused().type('{upArrow}');
    getUnitRow('Rustic').should('have.focus');
    cy.focused().type('{upArrow}');
    getUnitRow('Rustic').should('have.focus');
  });

  it('collapses option on arrow left', () => {
    getUnitRow('Rustic').focus();
    cy.focused().type('{leftArrow}');
    cy.get('[id="Rustic Retail"]').should('not.exist');
  });

  it('expands option on arrow right', () => {
    getUnitRow('Rustic Services').focus();
    cy.focused().type('{rightArrow}');
    cy.focused().type('{downArrow}');
    getUnitRow('Services East').should('have.focus');
  });

  it('active row retains tabindex=0 while detail card is open', () => {
    getUnitRow('Rustic Services').focus();
    cy.focused().type(' ');
    // Wait for the card to appear after router navigation.
    cy.get('cx-org-card').should('exist');
    // The active row must stay in the tab sequence (tabindex="0") while the
    // card is open so keyboard users can Shift-Tab back to it.
    getUnitRow('Rustic Services').should('have.attr', 'tabindex', '0');
  });
});
