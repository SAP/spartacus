import { visitHomePage } from '../../../helpers/checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';

describe('Scroll Back to Top', () => {
  viewportContext(['desktop', 'mobile'], () => {
    context('Scroll back to the top of page', () => {
      before(() => {
        visitHomePage();
        cy.findByText(/Allow All/i).click();
      });

      it('should be hidden at the top of the page', () => {
        cy.get('cx-scroll-to-top').should('not.be.visible');
      });

      it('should be visible at the bottom of the page', () => {
        cy.scrollTo('bottom').window().its('scrollY').should('not.equal', 0);
        cy.get('cx-scroll-to-top').should('be.visible');
      });

      it('should scroll back to the top of the page', () => {
        cy.get('cx-scroll-to-top > .scroll-to-top-btn').click();
        cy.window().its('scrollY').should('equal', 0);
      });
    });
  });
});
