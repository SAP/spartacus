import {
  configureDefaultProduct,
  verifyTabbingOrder,
} from '../../../../helpers/vendor/epd-visualization/visual-picking-tab';

context("Tabbing order - tests don't require user to be logged in", () => {
  describe('Spare Parts Tab', () => {
    before(configureDefaultProduct);

    it('should allow to navigate with tab key', () => {
      verifyTabbingOrder();
    });
  });
});
