/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { unitConfig } from '../../../../helpers/b2b/my-company/config/unit';
import {
  loginAsMyCompanyAdmin,
  testMyCompanyFeatureFromConfig,
} from '../../../../helpers/b2b/my-company/my-company.utils';

testMyCompanyFeatureFromConfig(unitConfig, true);

describe('A11y - Units List Keyboard Controls', () => {
  beforeEach(() => {
    loginAsMyCompanyAdmin();
    cy.visit(`/organization/units`);
  });

  it('navigate to next link on arrow down', () => {
    cy.get('#Rustic').focus();
    cy.focused().type('{downArrow}');
    cy.focused().should('have.id', 'Rustic Retail');
    cy.focused().type('{downArrow}');
    cy.focused().should('have.id', 'Rustic Services');
    cy.focused().type('{downArrow}');
    cy.focused().should('have.id', 'Rustic Services');
  });

  it('navigate to previous link on arrow up', () => {
    cy.get('[id="Rustic Services"]').focus();
    cy.focused().type('{upArrow}');
    cy.focused().should('have.id', 'Rustic Retail');
    cy.focused().type('{upArrow}');
    cy.focused().should('have.id', 'Rustic');
    cy.focused().type('{upArrow}');
    cy.focused().should('have.id', 'Rustic');
  });

  it('collapses option on arrow left', () => {
    cy.get('#Rustic').focus();
    cy.focused().type('{leftArrow}');
    cy.get('[id="Rustic Retail"]').should('not.exist');
  });

  it('expands option on arrow right', () => {
    cy.get('[id="Rustic Services"]').focus();
    cy.focused().type('{rightArrow}');
    cy.focused().type('{downArrow}');
    cy.focused().should('have.id', 'Services East');
  });

  it('focuses on active option while navigating back to list', () => {
    cy.get('[id="Rustic Services"]').focus();
    cy.focused().type(' ');
    cy.focused().parents('cx-org-card').should('exist');
    cy.focused().pressTab(true);
    cy.focused().should('have.id', 'Rustic Services');
  });
});
