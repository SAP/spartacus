context('Auxiliary Keys', () => {
  describe('Category Navigation', () => {
    before(() => {
      cy.visit('/');
    });

    it('should open menu with space key', () => {
      cy.get('cx-page-slot[ng-reflect-position="NavigationBar"]').within(() => {
        cy.get('cx-navigation-ui')
          .find('nav')
          .should('have.length', 30);
        cy.wait(2000);
        cy.get('cx-navigation-ui nav')
          .first()
          .get('span')
          .first()
          .focus()
          .type(' ');
        cy.wait(2000);
        cy.get('cx-generic-link')
          .contains('Shop all Brands >')
          .should('be.visible');
      });
    });

    xit('should tab through menu items', () => {
      // TODO: Waiting on Navigation UI Refactor
    });

    it('should close menu with space key', () => {
      cy.type(' ');
      cy.get('cx-generic-link')
        .contains('Shop all Brands >')
        .should('not.be.visible');
    });
  });

  xdescribe('My Account Navigation', () => {
    it('should open menu with space key', () => {});

    xit('should tab through menu items', () => {});

    it('should close menu with space key', () => {});
  });

  describe('Search Bar', () => {
    before(() => {
      cy.visit('/');
    });

    it('should make search suggestions', () => {
      cy.get('cx-searchbox input').type('dsa');
      cy.get('cx-searchbox a').should('have.length', 6);
    });

    it('should navigate through suggestions with ArrowDown key', () => {
      cy.focused().trigger('keydown', { key: 'ArrowDown' });
      cy.focused().should('contain.text', 'dsa');
      cy.focused().trigger('keydown', { key: 'ArrowDown' });
      cy.focused().should('contain.text', 'DSC-WX1');
      cy.focused().trigger('keydown', { key: 'ArrowDown' });
      cy.focused().should('contain.text', 'DSC-S930');
      cy.focused().trigger('keydown', { key: 'ArrowDown' });
      cy.focused().should('contain.text', 'DSC-W270');
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
      cy.focused().should('contain.text', 'DSC-W270');
      cy.focused().trigger('keydown', { key: 'ArrowUp' });
      cy.focused().should('contain.text', 'DSC-S930');
      cy.focused().trigger('keydown', { key: 'ArrowUp' });
      cy.focused().should('contain.text', 'DSC-WX1');
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
});
