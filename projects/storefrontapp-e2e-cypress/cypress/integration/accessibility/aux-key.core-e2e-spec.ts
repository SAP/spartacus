context('Auxiliary Keys', () => {
  describe('Category Navigation', () => {
    before(() => {
      loadPageWithComponenents('/');
    });

    it('should open and close menu with space key', () => {
      cy.get('cx-category-navigation').within(() => {
        cy.get('cx-navigation-ui').find('nav').should('have.length', 30);
        cy.get('cx-navigation-ui')
          .first()
          .should('contain.text', 'Brands')
          .and('be.visible')
          .within(() => {
            cy.get('div.wrapper')
              .should('have.length', 7)
              .first()
              .should('not.be.visible');
            cy.get('nav span').contains('Brands').focus().trigger('keydown', {
              key: ' ',
              code: 'Space',
              force: true,
            });
            cy.get('div.wrapper')
              .should('have.length', 7)
              .first()
              .should('be.visible');
            cy.focused().trigger('keydown', {
              key: ' ',
              code: 'Space',
              force: true,
            });
            cy.get('div.wrapper')
              .should('have.length', 7)
              .first()
              .should('not.be.visible');
          });
      });
    });
  });

  describe('My Account Navigation', () => {
    before(() => {
      cy.requireLoggedIn();
      loadPageWithComponenents('/');
    });

    it('should open and close menu with space key', () => {
      cy.get('cx-page-layout[section="header"]').within(() => {
        cy.get('cx-navigation-ui.accNavComponent')
          .should('contain.text', 'My Account')
          .and('be.visible')
          .within(() => {
            cy.get('cx-generic-link')
              .contains('Order History')
              .should('not.be.visible');
            cy.get('nav span').first().focus().trigger('keydown', {
              key: ' ',
              code: 'Space',
              force: true,
            });
            cy.get('cx-generic-link')
              .contains('Order History')
              .should('be.visible');
            cy.focused().trigger('keydown', {
              key: ' ',
              code: 'Space',
              force: true,
            });
            cy.get('cx-generic-link')
              .contains('Order History')
              .should('not.be.visible');
          });
      });
    });
  });
});

function loadPageWithComponenents(pageUrl: string) {
  cy.intercept({
    method: 'GET',
    pathname: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/cms/components`,
  }).as('getComponents');
  cy.visit(pageUrl);
  cy.wait('@getComponents');
}
