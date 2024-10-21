/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

describe('Kayboard navigation', () => {
  context('Navigation UI component', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.get('cx-navigation-ui [aria-haspopup="true"]')
        .first()
        .as('firstDropdown');
    });
    it('opens/closes a node after pressing space', () => {
      cy.get('@firstDropdown').focus().type(' ').next().should('be.visible');
      cy.focused().type(' ');
      cy.focused().type(' ').should('not.be.visible');
    });

    it('navigates node children with downArrow key', () => {
      cy.get('@firstDropdown').focus().type(' ');
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
      cy.get('@firstDropdown').focus().type(' ');
      cy.contains(' Fujifilm ').focus().type('{upArrow}');
      cy.contains(' Toshiba ').should('have.focus').type('{upArrow}');
      cy.contains(' Samsung ').should('have.focus').type('{upArrow}');
      cy.contains(' Kodak ').should('have.focus').type('{upArrow}');
      cy.contains(' Sony ').should('have.focus').type('{upArrow}');
      cy.contains(' Canon ').should('have.focus').type('{upArrow}');
      cy.contains(' Canon ').should('have.focus');
    });
  });

  context('Facet component', () => {
    beforeEach(() => {
      cy.visit('/Brands/all/c/brands');
      cy.get('cx-facet-list button.tab-btn').first().as('facetHeader');
      cy.get('cx-facet a').first().as('firstFacetOption');
    });

    it('navigates facet options with down arrow key', () => {
      cy.get('@firstFacetOption').focus().type('{downArrow}');
      cy.contains('Choshi').should('have.focus').type('{downArrow}');
      cy.contains('Fukuoka Best Western')
        .should('have.focus')
        .type('{downArrow}');
      cy.contains('Fukuoka Canal City')
        .should('have.focus')
        .type('{downArrow}');
      cy.contains('Fukuoka Hilton').should('have.focus').type('{downArrow}');
      cy.contains('Fukuoka Hotel').should('have.focus').type('{downArrow}');
      cy.contains('Fukuoka Hotel').should('have.focus');
    });

    it('navigates facet options with up arrow key', () => {
      cy.contains('Fukuoka Hotel').focus().type('{upArrow}');
      cy.contains('Fukuoka Hilton').should('have.focus').type('{upArrow}');
      cy.contains('Fukuoka Canal City').should('have.focus').type('{upArrow}');
      cy.contains('Fukuoka Best Western')
        .should('have.focus')
        .type('{upArrow}');
      cy.contains('Choshi').should('have.focus').type('{upArrow}');
      cy.contains('Chiba').should('have.focus').type('{upArrow}');
      cy.contains('Chiba').should('have.focus');
    });

    it('navigates facet categories with down arrow key', () => {
      cy.get('cx-facet-list').get('@facetHeader').focus().type('{downArrow}');
      cy.get('cx-facet-list')
        .contains('Price')
        .should('have.focus')
        .type('{downArrow}');
      cy.get('cx-facet-list')
        .contains('Resolution')
        .should('have.focus')
        .type('{downArrow}');
      cy.get('cx-facet-list').contains('Mounting').should('have.focus');
    });

    it('navigates facet categories with up arrow key', () => {
      cy.get('@facetHeader').focus().type('{upArrow}');
      cy.get('cx-facet-list')
        .contains('Category')
        .should('have.focus')
        .type('{upArrow}');
      cy.get('cx-facet-list')
        .contains('Brand')
        .should('have.focus')
        .type('{upArrow}');
      cy.get('cx-facet-list').contains('Color').should('have.focus');
    });
  });
});
