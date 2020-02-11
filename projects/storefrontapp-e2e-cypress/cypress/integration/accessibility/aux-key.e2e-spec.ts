import { testProductUrl } from '../../helpers/accessibility/tabbing-order';

context('Auxiliary Keys', () => {
  describe('Category Navigation', () => {
    before(() => {
      cy.server();
      cy.route(
        `${Cypress.env('API_URL')}/rest/v2/electronics-spa/cms/components*`
      ).as('getComponents');
      cy.visit('/');
      cy.wait('@getComponents');
    });

    it('should open menu with space key', () => {
      cy.get('cx-page-slot[ng-reflect-position="NavigationBar"]').within(() => {
        cy.get('cx-navigation-ui')
          .find('nav')
          .should('have.length', 30);
        cy.get('cx-navigation-ui nav h5')
          .contains('Brands')
          .should('be.visible');
        cy.wait(1000); // TODO: Wait stabilizes test, change after cx-navigation-ui refactor
        cy.get('cx-navigation-ui nav span')
          .first()
          .focus();
        cy.focused().trigger('keydown', {
          key: ' ',
          code: 'Space',
          force: true,
        });
        cy.get('cx-navigation-ui nav div[class="wrapper"]').should(
          'be.visible'
        );
      });
    });

    it('should tab through menu items', () => {
      cy.pressTab();
      cy.focused().should('contain.text', 'Shop all Brands');
      cy.pressTab();
      cy.focused().should('contain.text', 'Canon');
      cy.pressTab();
      cy.focused().should('contain.text', 'Sony');
      cy.pressTab();
      cy.focused().should('contain.text', 'Kodak');
      cy.pressTab();
      cy.focused().should('contain.text', 'Samsung');
      cy.pressTab();
      cy.focused().should('contain.text', 'Toshiba');
      cy.pressTab();
      cy.focused().should('contain.text', 'Fujifilm');
      cy.pressTab();
      cy.focused().should('contain.text', 'Kingston');
      cy.pressTab();
      cy.focused().should('contain.text', 'Icidu');
      cy.pressTab();
      cy.focused().should('contain.text', 'TDK');
      cy.pressTab();
      cy.focused().should('contain.text', 'Sweex');
    });

    it('should close menu with space key', () => {
      cy.focused().type(' ');
      cy.get('cx-navigation-ui nav span')
        .first()
        .parent()
        .contains('Shop all Brands')
        .should('not.be.visible');
    });
  });

  describe('My Account Navigation', () => {
    before(() => {
      cy.requireLoggedIn();
      cy.server();
      cy.route(
        `${Cypress.env('API_URL')}/rest/v2/electronics-spa/cms/components*`
      ).as('getComponents');
      cy.visit('/');
      cy.wait('@getComponents');
    });

    it('should open menu with space key', () => {
      cy.get('cx-page-layout[section="header"]').within(() => {
        cy.get('cx-navigation-ui[ng-reflect-ng-class="accNavComponent"]')
          .should('contain.text', 'My Account')
          .and('be.visible');
        cy.wait(1000); // TODO: Wait stabilizes test, change after cx-navigation-ui refactor
        cy.get(
          'cx-navigation-ui[ng-reflect-ng-class="accNavComponent"] nav span'
        )
          .first()
          .focus();
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

    it('should tab through menu items', () => {
      cy.pressTab();
      cy.focused().should('contain.text', 'Order History');
      cy.pressTab();
      cy.focused().should('contain.text', 'Wish List');
      cy.pressTab();
      cy.focused().should('contain.text', 'Address Book');
      cy.pressTab();
      cy.focused().should('contain.text', 'Payment Details');
      cy.pressTab();
      cy.focused().should('contain.text', 'Personal Details');
      cy.pressTab();
      cy.focused().should('contain.text', 'Password');
      cy.pressTab();
      cy.focused().should('contain.text', 'Email Address');
      cy.pressTab();
      cy.focused().should('contain.text', 'Consent Management');
      cy.pressTab();
      cy.focused().should('contain.text', 'Close Account');
      cy.pressTab();
      cy.focused().should('contain.text', 'My Interests');
      cy.pressTab();
      cy.focused().should('contain.text', 'Notification Preference');
      cy.pressTab();
      cy.focused().should('contain.text', 'My Coupons');
      cy.pressTab();
      cy.focused().should('contain.text', 'Sign Out');
    });

    it('should close menu with space key', () => {
      cy.focused().trigger('keydown', { key: 'Space' });
      cy.get('cx-generic-link')
        .contains('Order History')
        .should('not.be.visible');
    });
  });

  describe('Search Bar', () => {
    before(() => {
      cy.server();
      cy.route(
        `${Cypress.env('API_URL')}/rest/v2/electronics-spa/cms/components*`
      ).as('getComponents');
      cy.visit('/');
      cy.wait('@getComponents');
    });

    it('should make search suggestions', () => {
      cy.server();
      cy.route(
        'GET',
        `${Cypress.env('API_URL')}/rest/v2/electronics-spa/products/search?**`
      ).as('query');
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
      cy.focused().should('contain.text', 'DSC-HX1');
      cy.focused().trigger('keydown', { key: 'ArrowDown' });
      cy.focused().should('contain.text', 'DSC-W270');
      cy.focused().trigger('keydown', { key: 'ArrowDown' });
      cy.focused().should('contain.text', 'DSC-W270');
      cy.focused().trigger('keydown', { key: 'ArrowDown' });
      cy.focused().should('contain.text', 'dsa');
    });

    it('should navigate through suggestions with ArrowUp key', () => {
      cy.focused().should('contain.text', 'dsa');
      cy.focused().trigger('keydown', { key: 'ArrowUp' });
      cy.focused().should('contain.text', 'DSC-W270');
      cy.focused().trigger('keydown', { key: 'ArrowUp' });
      cy.focused().should('contain.text', 'DSC-W270');
      cy.focused().trigger('keydown', { key: 'ArrowUp' });
      cy.focused().should('contain.text', 'DSC-HX1');
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

  describe('Item Counter', () => {
    before(() => {
      cy.server();
      cy.route(
        `${Cypress.env('API_URL')}/rest/v2/electronics-spa/cms/components*`
      ).as('getComponents');
      cy.visit(testProductUrl);
      cy.wait('@getComponents');
    });

    it('should increment counter with ArrowUp key', () => {
      cy.get('cx-item-counter input')
        .should('have.value', '1')
        .focus();
      cy.focused().trigger('keydown', { key: 'ArrowUp', code: 'ArrowUp' });
      cy.get('cx-item-counter input').should('have.value', '2');
      cy.focused().trigger('keydown', { key: 'ArrowUp', code: 'ArrowUp' });
      cy.get('cx-item-counter input').should('have.value', '3');
    });

    it('should decrement counter with ArrowDown key', () => {
      cy.focused().trigger('keydown', { key: 'ArrowDown', code: 'ArrowDown' });
      cy.get('cx-item-counter input').should('have.value', '2');
      cy.focused().trigger('keydown', { key: 'ArrowDown', code: 'ArrowDown' });
      cy.get('cx-item-counter input').should('have.value', '1');
    });
  });

  describe('Skip Links', () => {
    before(() => {
      cy.server();
      cy.route(
        `${Cypress.env('API_URL')}/rest/v2/electronics-spa/cms/components*`
      ).as('getComponents');
      cy.visit('/');
      cy.wait('@getComponents');
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
