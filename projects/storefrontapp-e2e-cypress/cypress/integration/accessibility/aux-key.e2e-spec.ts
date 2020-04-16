context('Auxiliary Keys', () => {
  describe('Category Navigation', () => {
    before(() => {
      loadPageWithComponenents('/');
    });

    it('should open menu with space key', () => {
      cy.get('cx-category-navigation').within(() => {
        cy.get('cx-navigation-ui').find('nav').should('have.length', 30);
        cy.get('cx-navigation-ui')
          .first()
          .should('contain.text', 'Brands')
          .and('be.visible')
          .within(() => {
            cy.wait(1000); // TODO: Wait stabilizes test, change after cx-navigation-ui refactor(#6743)
            cy.get('nav h5').first().focus();
            cy.focused().trigger('keydown', {
              key: ' ',
              code: 'Space',
              force: true,
            });
          });
      });
      cy.get('cx-navigation-ui nav div.wrapper').first().should('be.visible');
    });

    it('should close menu with space key', () => {
      cy.get('cx-category-navigation').within(() => {
        cy.get('cx-navigation-ui').find('nav').should('have.length', 30);
        cy.get('cx-navigation-ui')
          .first()
          .should('contain.text', 'Brands')
          .and('be.visible')
          .within(() => {
            cy.focused().trigger('keydown', {
              key: ' ',
              code: 'Space',
              force: true,
            });
          });
      });
      cy.get('cx-navigation-ui nav div.wrapper')
        .first()
        .should('not.be.visible');
    });
  });

  describe('My Account Navigation', () => {
    before(() => {
      cy.requireLoggedIn();
      loadPageWithComponenents('/');
    });

    it('should open menu with space key', () => {
      cy.get('cx-page-layout[section="header"]').within(() => {
        cy.get('cx-navigation-ui.accNavComponent')
          .should('contain.text', 'My Account')
          .and('be.visible')
          .within(() => {
            cy.wait(1000); // TODO: Wait stabilizes test, change after cx-navigation-ui refactor (#6743)
            cy.get('nav h5').first().focus();
            cy.focused().trigger('keydown', {
              key: ' ',
              code: 'Space',
              force: true,
            });
            cy.get('cx-generic-link')
              .contains('Order History')
              .should('be.visible');
          });
      });
    });

    it('should close menu with space key', () => {
      cy.get('cx-page-layout[section="header"]').within(() => {
        cy.get('cx-navigation-ui.accNavComponent')
          .should('contain.text', 'My Account')
          .and('be.visible')
          .within(() => {
            cy.focused().trigger('keydown', {
              key: ' ',
              code: 'Space',
              force: true,
            });
          });
      });
      cy.get('cx-generic-link')
        .contains('Order History')
        .should('not.be.visible');
    });
  });

  describe('Search Bar', () => {
    before(() => {
      loadPageWithComponenents('/');
    });

    it('should make search suggestions', () => {
      cy.server();
      cy.route('GET', `${Cypress.env('BASE_ENDPOINT')}/products/search?**`).as(
        'query'
      );
      cy.get('cx-searchbox input').type('dsa');
      cy.wait('@query');
      cy.get('cx-searchbox a').should('have.length', 6);
    });

    it('should navigate through suggestions with ArrowDown key', () => {
      cy.focused().trigger('keydown', { key: 'ArrowDown' });
      cy.focused().should('contain.text', 'dsa');
      cy.focused().trigger('keydown', { key: 'ArrowDown' });
      cy.focused().should('contain.text', 'DSC-S930');
      cy.focused().trigger('keydown', { key: 'ArrowDown' });
      cy.focused().should('contain.text', 'DSC-S930');
      cy.focused().trigger('keydown', { key: 'ArrowDown' });
      cy.focused().should('contain.text', 'DSC-S930');
      cy.focused().trigger('keydown', { key: 'ArrowDown' });
      cy.focused().should('contain.text', 'DSC-W270');
      cy.focused().trigger('keydown', { key: 'ArrowDown' });
      cy.focused().should('contain.text', 'DSC-HX1');
      cy.focused().trigger('keydown', { key: 'ArrowDown' });
      cy.focused().should('contain.text', 'dsa');
    });

    it('should navigate through suggestions with ArrowUp key', () => {
      cy.focused().should('contain.text', 'dsa');
      cy.focused().trigger('keydown', { key: 'ArrowUp' });
      cy.focused().should('contain.text', 'DSC-HX1');
      cy.focused().trigger('keydown', { key: 'ArrowUp' });
      cy.focused().should('contain.text', 'DSC-W270');
      cy.focused().trigger('keydown', { key: 'ArrowUp' });
      cy.focused().should('contain.text', 'DSC-S930');
      cy.focused().trigger('keydown', { key: 'ArrowUp' });
      cy.focused().should('contain.text', 'DSC-S930');
      cy.focused().trigger('keydown', { key: 'ArrowUp' });
      cy.focused().should('contain.text', 'DSC-S930');
      cy.focused().trigger('keydown', { key: 'ArrowUp' });
      cy.focused().should('contain.text', 'dsa');
    });

    it('should go to suggested page with Enter key', () => {
      cy.focused().click(); // Simulates enter key
      cy.url().should('include', '/search/dsa');
    });
  });

  // TODO: Waiting for carousel fix
  xdescribe('Carousel', () => {
    it('should navigate with ArrowLeft key', () => {});

    it('should navigate with ArrowRight key', () => {});

    it('should go to link with Enter key', () => {});
  });

  describe('Skip Links', () => {
    before(() => {
      loadPageWithComponenents('/');
      cy.get('body').focus();
      cy.pressTab();
      cy.focused().should('contain.text', 'Skip to Header');
    });

    it('should navigate with ArrowRight key', () => {
      cy.focused().trigger('keydown', { key: 'ArrowRight', force: true });
      cy.focused().should('contain.text', 'Skip to Main Content');
      cy.focused().trigger('keydown', { key: 'ArrowRight', force: true });
      cy.focused().should('contain.text', 'Skip to Footer');
      cy.focused().trigger('keydown', { key: 'ArrowRight', force: true });
      cy.focused().should('contain.text', 'Skip to Footer');
    });

    it('should navigate with ArrowLeft key', () => {
      cy.focused().trigger('keydown', { key: 'ArrowLeft', force: true });
      cy.focused().should('contain.text', 'Skip to Main Content');
      cy.focused().trigger('keydown', { key: 'ArrowLeft', force: true });
      cy.focused().should('contain.text', 'Skip to Header');
      cy.focused().trigger('keydown', { key: 'ArrowLeft', force: true });
      cy.focused().should('contain.text', 'Skip to Header');
    });
  });
});

function loadPageWithComponenents(pageUrl: string) {
  cy.server();
  cy.route(`${Cypress.env('BASE_ENDPOINT')}/cms/components*`).as(
    'getComponents'
  );
  cy.visit(pageUrl);
  cy.wait('@getComponents');
}
