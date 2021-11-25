import { viewportContext } from '../../../helpers/viewport-context';
import * as savedCart from '../../../helpers/saved-cart';
import {
  addProductToCart,
  clickSavedCartButtonsFromCartPage,
  restoreCart,
  verifyModalTabbingOrder,
  visitCartPage,
  visitSavedCartListingPage,
  waitForCartPageData,
  waitForSavedCartDetailsPageData,
  waitForSavedCartListingPageData,
  verifyCartDetails,
  updateSavedCartAndDelete,
  updateSavedCartAndRestore,
  saveActiveCart,
} from '../../../helpers/b2b/b2b-saved-cart';
import * as sampleData from '../../../sample-data/saved-cart';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

context('B2C - Saved Cart', () => {
  viewportContext(['mobile', 'desktop'], () => {
    before(() => {
      clearAllStorage();
    });

    describe('Accessibility - keyboarding', () => {
      describe('Cart page', () => {
        it('should conform to tabbing order', () => {
          savedCart.verifyCartPageTabbingOrder();
        });
      });

      describe('Modal', () => {
        before(() => {
          savedCart.login();
          waitForCartPageData(sampleData.products[1]);
          visitCartPage();
        });

        it('should conform to tabbing order', () => {
          verifyModalTabbingOrder();
        });
      });

      describe('Saved Cart Listing Page', () => {
        before(() => {
          savedCart.login();
          waitForSavedCartListingPageData(sampleData.products[0]);
          visitSavedCartListingPage();
        });

        it('should conform to tabbing order', () => {
          savedCart.verifyListingTabbingOrder();
        });
      });

      describe('Saved Cart Details Page', () => {
        before(() => {
          savedCart.login();
          waitForSavedCartDetailsPageData(sampleData.products[0]);
        });

        it('should conform to tabbing order', () => {
          savedCart.verifyDetailsTabbingOrder();
        });
      });
    });

    describe('Restricted pages to anonymous user', () => {
      afterEach(() => {
        cy.location('pathname').should('contain', '/login');
      });

      it('should redirect to login page when trying to visit the saved cart "listing" page through url', () => {
        cy.visit(`/my-account/saved-carts`);
      });

      it('should redirect to login page when trying to visit the saved cart "details" page through url', () => {
        cy.visit(`/my-account/saved-cart/${sampleData.MOCK_ACTIVE_CART_CODE}`);
      });
    });

    describe('Cart page', () => {
      describe('Anonymous user', () => {
        beforeEach(() => {
          addProductToCart(sampleData.products[0], 2);
        });

        afterEach(() => {
          cy.location('pathname').should('contain', '/login');
        });

        it('should redirect to login page when clicking "Saved Cart"', () => {
          clickSavedCartButtonsFromCartPage(0);
        });

        it('should redirect to login page when clicking "Save Cart For Later"', () => {
          clickSavedCartButtonsFromCartPage(1);
        });
      });

      describe('Logged in user', () => {
        beforeEach(() => {
          savedCart.login();
          waitForCartPageData(sampleData.products[1]);
          visitCartPage();
        });

        it('should be able to visit the saved cart listing page', () => {
          clickSavedCartButtonsFromCartPage(0);
          cy.location('pathname').should('contain', '/my-account/saved-carts');
        });

        it('should be able to save the active cart and view it in the listing page', () => {
          saveActiveCart(
            true,
            sampleData.savedActiveCartForm,
            sampleData.savedCarts
          );
        });
      });
    });

    describe('Saved Cart Listing Page', () => {
      beforeEach(() => {
        clearAllStorage();
        savedCart.login();
      });

      it('should make cart active and not swap cart when active cart is empty', () => {
        restoreCart(
          sampleData.products[1],
          sampleData.savedActiveCartForm[2],
          true,
          true,
          sampleData.savedCarts
        );
      });

      it('should make cart active and swap cart when active cart has entries', () => {
        waitForCartPageData(sampleData.products[1]);
        visitCartPage();

        verifyCartDetails(sampleData.savedCarts.carts[0]);

        restoreCart(
          sampleData.products[1],
          sampleData.savedActiveCartForm[2],
          false,
          true,
          sampleData.savedCarts
        );
      });
    });

    describe('Saved Cart Details Page', () => {
      beforeEach(() => {
        clearAllStorage();
        savedCart.login();
      });

      it('should update saved cart name and description, and delete it from the modal', () => {
        updateSavedCartAndDelete(
          sampleData.products[1],
          sampleData.savedActiveCartForm[3]
        );
      });

      it('should update saved cart name and description, and delete it from 0 entries', () => {
        updateSavedCartAndDelete(
          sampleData.products[1],
          sampleData.savedActiveCartForm[0],
          true
        );
      });

      it('should update saved cart name and description, and restore it', () => {
        updateSavedCartAndRestore(
          sampleData.products[1],
          sampleData.savedActiveCartForm[0]
        );
      });
    });
  });
});
