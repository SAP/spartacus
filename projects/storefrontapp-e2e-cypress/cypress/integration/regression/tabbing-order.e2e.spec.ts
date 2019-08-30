import { verifyTabOrder, tabOrderContent } from '../../helpers/tabbing-order';

function tabOrderTest() {
  describe('Footer Tab Order', () => {
    before(() => {});

    it('should focus elements in correct order when pressing tab key', () => {
      cy.visit('/');
      verifyTabOrder(
        'cx-footer-navigation > cx-navigation-ui a',
        tabOrderContent.footer
      );
    });
  });
}

context('Check Tabbing Order', () => {
  tabOrderTest();
});
