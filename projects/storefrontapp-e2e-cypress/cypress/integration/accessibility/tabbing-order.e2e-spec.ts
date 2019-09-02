import { checkAllElements } from '../../helpers/accessibility/tabbing-order';
import { tabbingOrderConfig } from '../../helpers/accessibility/tabbing-order.config';

context('Verify Tabbing Order', () => {
  describe('Tabbing Order', () => {
    describe('footer', () => {
      before(() => {
        cy.visit('/');
        cy.get('cx-footer-navigation > cx-navigation-ui a')
          .first()
          .focus();
      });
      checkAllElements(tabbingOrderConfig.footer);
    });
  });
});
