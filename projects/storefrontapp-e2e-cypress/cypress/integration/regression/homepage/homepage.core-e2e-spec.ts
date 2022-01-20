import { getViewport, viewportContext } from '../../helpers/viewport-context';

describe('Homepage', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.visit('/');
    });

    it('should display title', () => {
      cy.title().should('not.be.empty');
    });

    it('should have site logo', () => {
      cy.get('cx-page-slot.SiteLogo').should('be.visible');
    });

    it('should have splash banner', () => {
      cy.get('cx-page-slot.Section1 cx-banner');
    });

    it('should have footer with footer navigation and notice', () => {
      cy.get('cx-page-slot.Footer').within(() => {
        cy.get('cx-navigation-ui > nav').should('have.length', 3);
        cy.get('span').should('have.length', 3);
        cy.get('cx-generic-link').should('have.length', 8);
      });
      cy.get('cx-paragraph .cx-notice').should(
        'contain',
        'SAP SE or an SAP affiliate company. All rights reserved.'
      );
    });

    it('should check keyboard accessibility', () => {
      // Ensures carousel products are loaded before running checks
      cy.get('cx-carousel').find('img').should('have.length', 18);

      cy.tabScreenshot({ container: 'header', scenario: 'header' });
      cy.tabScreenshot({ container: 'main', scenario: 'content' });
      cy.tabScreenshot({
        container: 'cx-footer-navigation',
        scenario: 'footer',
      });

      // Open and check sub categories on menu
      getViewport((viewport: string) => {
        // TODO: Only desktop viewport is supported by keyboard, remove desktop-only condition when mobile gets supported.
        if (viewport === 'desktop') {
          ['brands', 'digital cameras', 'accessories'].forEach((type) => {
            // Open hamburger in mobile view.
            // if (viewport === 'mobile') {
            //   cy.get('header cx-hamburger-menu button').first().click();
            // }

            cy.get('cx-navigation-ui [tabindex="0"]')
              .contains(type, { matchCase: false })
              .should('be.visible')
              .click();

            cy.get('cx-navigation-ui .is-open .wrapper').should('be.visible');

            cy.tabScreenshot({
              container: 'cx-navigation-ui',
              scenario: type.replaceAll(' ', '-'),
            });
          });
        }
      });
    });
  });
});
