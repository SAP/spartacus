import { checkAllElements } from '../../../helpers/accessibility/tabbing-order';
import { tabbingOrderConfig } from '../../../helpers/accessibility/tabbing-order.config';

context('Footer', () => {
  describe('tabbing order', () => {
    before(() => {
      cy.visit('/');
      cy.get('cx-footer-navigation > cx-navigation-ui a')
        .first()
        .focus();
    });

    checkAllElements(tabbingOrderConfig.footer);
  });
});
