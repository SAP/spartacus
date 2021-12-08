import * as quickOrder from '../../../../helpers/b2b/b2b-quick-order';
import * as alerts from '../../../../helpers/global-message';
import { viewportContext } from '../../../../helpers/viewport-context';
import * as sampleData from '../../../../sample-data/b2b-checkout';
import { clearAllStorage } from '../../../../support/utils/clear-all-storage';

context('B2B - Quick Order', () => {
  viewportContext(['mobile', 'desktop'], () => {
    beforeEach(() => {
      clearAllStorage();
    });

    describe('Quick Order Page', () => {
      beforeEach(() => {
        quickOrder.visitQuickOrderPage();
      });

      it('should show result box with 5 products', () => {
        quickOrder.getQuickOrderResultBox(sampleData.b2bProduct.code, 5);
      });

      it('should add product to the cart', () => {
        quickOrder.addProductToTheList(sampleData.b2bProduct.code);
        quickOrder.addToCart();
        quickOrder.verifyMiniCartQuantity(1);
        quickOrder.verifyQuickOrderListQuantity(0);
        alerts
          .getSuccessAlert()
          .should('contain', `Quick order list has been added to the cart`);
      });

      it('should fill the form with random string and get empty results information', () => {
        quickOrder.addWrongProductQuery('xxxxxxxxxxxxxxxxxx');
        quickOrder.verifyQuickOrderFormResultsBoxIsEmpty();
      });

      it('should delete entry and after that restore it', () => {
        quickOrder.addManyProductsToTheList(sampleData.products);
        quickOrder.removeFirstRow();
        quickOrder.verifyQuickOrderListQuantity(1);
        quickOrder.verifyQuickOrderPageShowEntryDeletionMessages(1);
        quickOrder.restoreDeletedEntry();
        quickOrder.verifyQuickOrderListQuantity(2);
        quickOrder.verifyQuickOrderPageDoNotShowEntryDeletionMessages();
      });
    });

    describe('Cart Page', () => {
      beforeEach(() => {
        quickOrder.prepareCartWithProduct();
      });

      it('should add product with quick form', () => {
        quickOrder.addProductToCartWithQuickForm(sampleData.b2bProduct2.code);
        quickOrder.verifyMiniCartQuantity(2);

        alerts
          .getSuccessAlert()
          .should(
            'contain',
            `${sampleData.b2bProduct2.name} has been added to the cart`
          );
      });
    });

    describe('Accessibility - keyboarding', () => {
      it('should conform to tabbing order for quick order page', () => {
        quickOrder.visitQuickOrderPage();
        quickOrder.addProductToTheList(sampleData.b2bProduct.code);
        quickOrder.verifyQuickOrderListQuantity(1);
        quickOrder.verifyQuickOrderPageTabbingOrder();
      });

      it('should conform to tabbing order for cart page', () => {
        quickOrder.prepareCartWithProduct();
        quickOrder.verifyCartPageTabbingOrder();
      });
    });
  });
});
