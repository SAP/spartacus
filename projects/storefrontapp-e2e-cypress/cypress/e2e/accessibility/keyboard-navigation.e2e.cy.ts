/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

describe('Kayboard navigation', () => {
  context('Navigation UI component', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.get('cx-navigation-ui [aria-haspopup="true"]').as('firstDropdown');
    });
    it('opens a node after pressing space', () => {
      cy.get('@firstDropdown').each((dropdownButton) => {
        cy.wrap(dropdownButton).as('dropdownButton');
        cy.get('@dropdownButton').focus().type(' ').next().should('be.visible');
      });
    });
    it('navigates node children with downArrow key', () => {
      cy.get('@firstDropdown').first().focus().type(' ');
      cy.contains(' Cameras ').type('{downArrow}');
      cy.contains(' Canon ').should('have.focus').type('{downArrow}');
      cy.contains(' Sony ').should('have.focus').type('{downArrow}');
      cy.contains(' Kodak ').should('have.focus').type('{downArrow}');
      cy.contains(' Samsung ').should('have.focus').type('{downArrow}');
      cy.contains(' Toshiba ').should('have.focus').type('{downArrow}');
      cy.contains(' Fujifilm ').should('have.focus').type('{downArrow}');
      cy.contains(' Fujifilm ').should('have.focus');
    });

    it('navigates node children with upArrow key', () => {
      cy.get('@firstDropdown').first().focus().type(' ');
      cy.contains(' Fujifilm ').focus().type('{upArrow}');
      cy.contains(' Toshiba ').should('have.focus').type('{upArrow}');
      cy.contains(' Samsung ').should('have.focus').type('{upArrow}');
      cy.contains(' Kodak ').should('have.focus').type('{upArrow}');
      cy.contains(' Sony ').should('have.focus').type('{upArrow}');
      cy.contains(' Canon ').should('have.focus').type('{upArrow}');
      cy.contains(' Canon ').should('have.focus');
    });
  });
});
