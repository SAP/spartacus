import * as quickOrder from '../../../../helpers/b2b/b2b-quick-order';
import { viewportContext } from '../../../../helpers/viewport-context';
import * as sampleData from '../../../../sample-data/b2b-checkout';

context('B2B - Quick Order', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      cy.window().then((win) => win.sessionStorage.clear());
      cy.window().then((win) => win.localStorage.clear());
      cy.clearLocalStorageMemory();
    });

    describe('Quick Order Page', () => {
      beforeEach(() => {
        quickOrder.visitQuickOrderPage();
      });

      it('should add product to the cart', () => {
        quickOrder.addProductToTheList(sampleData.b2bProduct.code);
        quickOrder.addToCart();
        quickOrder.verifyMiniCartQuantity(1);
        quickOrder.verifyQuickOrderListQuantity(0);
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
      });

      it('should clear the list', () => {
        quickOrder.addManyProductsToTheList(sampleData.products);
        quickOrder.clearList();
        quickOrder.verifyQuickOrderListQuantity(0);
      });

      it('should show message if product code is invalid', () => {
        quickOrder.addWrongProductToTheList('invalidCode');
        cy.get('cx-global-message .alert-danger').should('exist');
      });
    });

    describe('Cart Page', () => {
      beforeEach(() => {
        quickOrder.prepareCartWithProduct();
      });

      it('should add product with quick form', () => {
        quickOrder.addProductToCartWithQuickForm(sampleData.b2bProduct2.code);
        quickOrder.verifyMiniCartQuantity(2);
      });
    });

    describe('Accessibility - keyboarding', () => {
      beforeEach(() => {
        cy.window().then((win) => win.sessionStorage.clear());
      });

      it('should conform to tabbing order for quick order page', () => {
        quickOrder.visitQuickOrderPage();
        quickOrder.addProductToTheList(sampleData.b2bProduct.code);
        quickOrder.verifyQuickOrderPageTabbingOrder();
      });

      it('should conform to tabbing order for cart page', () => {
        quickOrder.prepareCartWithProduct();
        quickOrder.verifyCartPageTabbingOrder();
      });
    });
  });
});
