/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as quickOrder from '../../../../helpers/b2b/b2b-quick-order';
import * as alerts from '../../../../helpers/global-message';
import { viewportContext } from '../../../../helpers/viewport-context';
import * as sampleData from '../../../../sample-data/b2b-checkout';
import { clearAllStorage } from '../../../../support/utils/clear-all-storage';

context('B2B - Quick Order', () => {
  viewportContext(['mobile'], () => {
    beforeEach(() => {
      clearAllStorage();
    });
    describe('Quick Order Page', () => {
      beforeEach(() => {
        quickOrder.visitQuickOrderPage();
      });
      it('1. should add product to the list', () => {
        quickOrder.addProductToTheList(sampleData.b2bProduct.code);
        quickOrder.verifyQuickOrderListQuantity(1);
      });
    });
  });
});

context('B2B - Quick Order', () => {
  viewportContext(['desktop'], () => {
    beforeEach(() => {
      clearAllStorage();
    });
    describe('Quick Order Page', () => {
      beforeEach(() => {
        quickOrder.visitQuickOrderPage();
      });

      it('2. should show result box with 5 products and check error when searching for a non-existing product', () => {
        cy.log('SHOW RESULT BOX WITH 5 PRODUCTS:');
        quickOrder.getQuickOrderResultBox(sampleData.b2bProduct.code);
        cy.log('SEARCH FOR NON-EXISTING PRODUCT AND CHECK ERROR:');
        quickOrder.addWrongProductQuery('xxxxxxxxxxxxxxxxxx');
        quickOrder.verifyQuickOrderFormResultsBoxIsEmpty();
      });

      it('3. should check empty list error, add product to the list and to the cart', () => {
        cy.log('CHECK ERROR WHEN ADDING EMPTY LIST TO THE CART:');
        quickOrder.addToCartClick();
        quickOrder.verifyQuickOrderPageShowInfoMessageToAddProductBeforeClickingAddToCart();
        cy.log('ADD PRODUCT TO THE LIST:');
        quickOrder.addProductToTheList(sampleData.b2bProduct.code);
        quickOrder.verifyQuickOrderListQuantity(1);
        cy.log('ADD PRODUCT TO THE CART:');
        quickOrder.addToCart();
        quickOrder.verifyMiniCartQuantity(1);
        quickOrder.verifyQuickOrderListQuantity(0);
        alerts
          .getSuccessAlert()
          .should('contain', `Quick order list has been added to the cart`);
      });

      it('4. should remove first product on the list, verify and close deletion message after 5s after removal', () => {
        quickOrder.addManyProductsToTheList(sampleData.products);
        quickOrder.removeFirstRow();
        quickOrder.verifyQuickOrderListQuantity(1);
        quickOrder.verifyQuickOrderPageShowEntryDeletionMessages(1);
        cy.wait(5000);
        quickOrder.verifyQuickOrderPageHasNotDeletionMessage();
      });

      it('5. should remove 5 products and get 5 deletion messages', () => {
        quickOrder.addManyProductsToTheList(sampleData.b2bProducts);
        cy.log('LIMIT THE LIST AND SHOW ERROR:');
        quickOrder.verifyQuickOrderReachedListLimit();
        cy.log('REMOVE 5 PRODUCTS AND CHECK 5 DELETION MESSAGES:');
        quickOrder.removeManyRows(5);
        quickOrder.verifyQuickOrderListQuantity(5);
        quickOrder.verifyQuickOrderPageShowEntryDeletionMessages(5);
      });

      it('6. should hide "Empty List" button and clear the list', () => {
        cy.log('"Empty List" BUTTON IS HIDDEN IF THE LIST IS EMPTY:');
        quickOrder.verifyEmptyListButtonIsHidden();
        cy.log('CLEAR THE LIST AND CHECK THE MESSAGE:');
        quickOrder.addManyProductsToTheList(sampleData.products);
        quickOrder.clearList();
        quickOrder.verifyQuickOrderListQuantity(0);
        alerts
          .getAlert()
          .should('contain', `Quick order list has been cleared`);
      });

      it('7. should show error message after trying to add non purchasable product to the list', () => {
        quickOrder.addProductToTheList(
          sampleData.b2bNonPurchasableProduct.code
        );
        quickOrder.verifyQuickOrderListQuantity(0);
        quickOrder.verifyQuickOrderPageShowErrorMessageNonPurchasableProduct();
      });

      it('8. should show error message after adding to cart with out of stock information', () => {
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

      it('9. should show warning message after adding to cart with reduced quantity', () => {
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

      it('10. should show success and error message after adding to cart successfully entry and another entry added with out of stock information', () => {
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

      it('11. should delete entry and after that restore it', () => {
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

      it('12. should add product with quick form and reach its maximum stock level', () => {
        cy.log('ADD PRODUCT VIA QUICK FORM:');
        quickOrder.addProductToCartWithQuickForm(sampleData.b2bProduct2.code);
        quickOrder.verifyMiniCartQuantity(2);

        alerts
          .getSuccessAlert()
          .should(
            'contain',
            `${sampleData.b2bProduct2.name} has been added to the cart`
          );

        cy.log('CHECK MESSAGE FOR REACHING THE MAX STOCK LEVEL:');
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
  });
});
