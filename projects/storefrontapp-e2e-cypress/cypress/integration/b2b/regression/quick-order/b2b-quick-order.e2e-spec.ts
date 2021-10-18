import * as quickOrder from '../../../../helpers/b2b/b2b-quick-order';
import { viewportContext } from '../../../../helpers/viewport-context';
import * as sampleData from '../../../../sample-data/b2b-checkout';
import * as alerts from '../../../../helpers/global-message';

context('B2B - Quick Order', () => {
  viewportContext(['mobile', 'desktop'], () => {
    beforeEach(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.window().then((win) => win.localStorage.clear());
      cy.clearLocalStorageMemory();
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

      it('should add product to the list', () => {
        quickOrder.addProductToTheList(sampleData.b2bProduct.code);
        quickOrder.verifyQuickOrderListQuantity(1);
      });

      it('should add 2 different products to the list', () => {
        quickOrder.addManyProductsToTheList(sampleData.products);
        quickOrder.verifyQuickOrderListQuantity(2);
      });

      it('should remove first product on the list', () => {
        quickOrder.addManyProductsToTheList(sampleData.products);
        quickOrder.removeFirstRow();
        quickOrder.verifyQuickOrderListQuantity(1);
        quickOrder.verifyQuickOrderPageShowEntryDeletionMessages(1);
      });

      it('should close deletion message after 5s after removal', () => {
        quickOrder.addManyProductsToTheList(sampleData.products);
        quickOrder.removeFirstRow();
        quickOrder.verifyQuickOrderListQuantity(1);
        quickOrder.verifyQuickOrderPageShowEntryDeletionMessages(1);
        cy.wait(5000);
        quickOrder.verifyQuickOrderPageHasNotDeletionMessage();
      });

      it('should remove 5 products and get 5 deletion messages', () => {
        quickOrder.addManyProductsToTheList(sampleData.b2bProducts);
        quickOrder.removeManyRows(5);
        quickOrder.verifyQuickOrderListQuantity(5);
        quickOrder.verifyQuickOrderPageShowEntryDeletionMessages(5);
      });

      it('should clear the list', () => {
        quickOrder.addManyProductsToTheList(sampleData.products);
        quickOrder.clearList();
        quickOrder.verifyQuickOrderListQuantity(0);
        alerts
          .getAlert()
          .should('contain', `Quick order list has been cleared`);
      });

      it('should limit the list and block form for adding more products', () => {
        quickOrder.addManyProductsToTheList(sampleData.b2bProducts);
        quickOrder.verifyQuickOrderFormIsDisabled();
      });

      it('should hide "Empty List" button if list has no entries', () => {
        quickOrder.verifyEmptyListButtonIsHidden();
      });

      it('should show error message after adding to cart with out of stock information', () => {
        quickOrder.addProductToTheListAndModifyQuantity(
          sampleData.b2bProduct.code,
          259
        );
        quickOrder.addToCart();
        quickOrder.verifyMiniCartQuantity(259);
        quickOrder.verifyQuickOrderListQuantity(0);
        quickOrder.addProductToTheList(sampleData.b2bProduct.code);
        quickOrder.addToCart();
        quickOrder.verifyQuickOrderPageShowErrorMessageOutOfStock();
      });

      it('should show warning message after adding to cart with reduced quantity', () => {
        quickOrder.addProductToTheList(sampleData.b2bProduct.code);
        quickOrder.addToCart();
        quickOrder.verifyMiniCartQuantity(1);
        quickOrder.verifyQuickOrderListQuantity(0);
        quickOrder.addProductToTheListAndModifyQuantity(
          sampleData.b2bProduct.code,
          10000
        );
        quickOrder.addToCart();
        quickOrder.verifyQuickOrderPageShowWarningMessageWasReduced();
      });

      it('should show success and error message after adding to cart successfully entry and another entry added with out of stock information', () => {
        quickOrder.addProductToTheListAndModifyQuantity(
          sampleData.b2bProduct.code,
          259
        );
        quickOrder.addToCart();
        quickOrder.verifyMiniCartQuantity(259);
        quickOrder.verifyQuickOrderListQuantity(0);
        quickOrder.addProductToTheList(sampleData.b2bProduct.code);
        quickOrder.addProductToTheList(sampleData.b2bProduct2.code);
        quickOrder.verifyQuickOrderListQuantity(2);
        quickOrder.addToCart();
        quickOrder.verifyQuickOrderPageShowErrorMessageOutOfStock();
        quickOrder.verifyQuickOrderPageShowSuccessMessageWasAdded();
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

      it('should reach product maximum stock level while adding product with quick form', () => {
        quickOrder.addProductToCartWithQuickForm(
          sampleData.b2bProduct2.code,
          9999
        );
        quickOrder.addProductToCartWithQuickForm(
          sampleData.b2bProduct2.code,
          9999
        );

        alerts
          .getWarningAlert()
          .should('contain', `The maximum stock level has been reached`);
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
