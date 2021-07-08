import * as quickOrder from '../../../../helpers/b2b/b2b-quick-order';
import { viewportContext } from '../../../../helpers/viewport-context';
import * as sampleData from '../../../../sample-data/b2b-quick-order';

context('B2B - Quick Order', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.window().then((win) => win.localStorage.clear());
      cy.clearLocalStorageMemory();
    });

    describe('Accessibility - keyboarding', () => {
      describe('Quick Order Page', () => {
        beforeEach(() => {
          quickOrder.visitQuickOrderPage();
        });

        it('should add product to the list', () => {
          quickOrder.addProductToTheList(sampleData.products[0].code);
          quickOrder.verifyQuickOrderListQuantity(1);
          quickOrder.clearList();
        });

        it('should add 2 different products to the list', () => {
          quickOrder.addMultipleProductsToTheList(sampleData.products);
          quickOrder.verifyQuickOrderListQuantity(2);
          quickOrder.clearList();
        });

        it('should remove first product on the list', () => {
          quickOrder.addMultipleProductsToTheList(sampleData.products);
          quickOrder.removeFirstRow();
          quickOrder.verifyQuickOrderListQuantity(1);
          quickOrder.clearList();
        });

        it('should add product to the cart', () => {
          quickOrder.addProductToTheList(sampleData.products[0].code);
          quickOrder.addToCart();
          quickOrder.verifyMiniCartQuantity(1);
          quickOrder.verifyQuickOrderListQuantity(0);
        });

        it('should clear the list', () => {
          quickOrder.addMultipleProductsToTheList(sampleData.products);
          quickOrder.clearList();
          quickOrder.verifyQuickOrderListQuantity(0);
        });

        it('should show message if product code is invalid', () => {
          quickOrder.addProductToTheList('invalidCode');

          cy.get('cx-global-message .alert-danger').should('exist');
        });
      });

      describe('Cart Page', () => {
        beforeEach(() => {
          quickOrder.visitQuickOrderPage();
          quickOrder.addProductToTheList(sampleData.products[0].code);
          quickOrder.addToCart();
          cy.wait(1000);
          quickOrder.visitCartPage();
        });

        it('should add product with quick form', () => {
          quickOrder.addProductToCartWithQuickForm(sampleData.products[1].code);
          quickOrder.verifyMiniCartQuantity(2);
        });
      });
    });
  });
});
