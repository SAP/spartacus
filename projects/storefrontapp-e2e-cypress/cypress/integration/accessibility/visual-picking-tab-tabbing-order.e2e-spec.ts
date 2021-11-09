import { configureDefaultProduct, verifyTabbingOrder } from '../../helpers/vendor/epd-visualization/visual-picking-tab';

context('Spare Parts Tab', () => {
    describe('Electronics', () => {
      before(configureDefaultProduct);

      it('should contain spare parts tab', () => {
        verifyTabbingOrder();
      });
    });
  });
