import * as tabbingOrder from '../../helpers/tabbing-order';

function tabbingOrderTest() {
  describe('Tabbing Order', () => {
    before(() => {});

    it('should focus elements in correct order when pressing tab key', () => {
      tabbingOrder.checkFooter();
    });
  });
}

context('Check Tabbing Order', () => {
  tabbingOrderTest();
});
