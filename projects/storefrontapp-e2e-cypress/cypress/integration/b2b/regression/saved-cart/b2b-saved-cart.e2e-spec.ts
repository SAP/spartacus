import * as savedCart from '../../../../helpers/b2b/b2b-saved-cart';
import { viewportContext } from '../../../../helpers/viewport-context';
import * as sampleData from '../../../../sample-data/b2b-saved-cart';
import { clearAllStorage } from '../../../../support/utils/clear-all-storage';

context('B2B - Saved Cart', () => {
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
          savedCart.loginB2bUser();
          savedCart.waitForCartPageData(sampleData.products[1]);
          savedCart.visitCartPage();
        });

        it('should conform to tabbing order', () => {
          savedCart.verifyModalTabbingOrder();
        });
      });

      describe('Saved Cart Listing Page', () => {
        before(() => {
          savedCart.loginB2bUser();
          savedCart.waitForSavedCartListingPageData(sampleData.products[0]);
          savedCart.visitSavedCartListingPage();
        });

        it('should conform to tabbing order', () => {
          savedCart.verifyListingTabbingOrder();
        });
      });

      describe('Saved Cart Details Page', () => {
        before(() => {
          savedCart.loginB2bUser();
          savedCart.waitForSavedCartDetailsPageData(sampleData.products[0]);
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
          savedCart.addProductToCart(sampleData.products[0], 2);
        });

        afterEach(() => {
          cy.location('pathname').should('contain', '/login');
        });

        it('should redirect to login page when clicking "Saved Cart"', () => {
          savedCart.clickSavedCartButtonsFromCartPage(0);
        });

        it('should redirect to login page when clicking "Save Cart For Later"', () => {
          savedCart.clickSavedCartButtonsFromCartPage(1);
        });
      });

      describe('Logged in user', () => {
        beforeEach(() => {
          savedCart.loginB2bUser();
          savedCart.waitForCartPageData(sampleData.products[1]);
          savedCart.visitCartPage();
        });

        it('should be able to visit the saved cart listing page', () => {
          savedCart.clickSavedCartButtonsFromCartPage(0);
          cy.location('pathname').should('contain', '/my-account/saved-carts');
        });

        it('should be able to save the active cart and view it in the listing page', () => {
          savedCart.saveActiveCart();
        });
      });
    });

    describe('Saved Cart Listing Page', () => {
      beforeEach(() => {
        savedCart.loginB2bUser();
      });

      it('should make cart active and not swap cart when active cart is empty', () => {
        savedCart.restoreCart(
          sampleData.products[1],
          sampleData.savedActiveCartForm[2],
          true
        );
      });

      it('should make cart active and not swap cart when active cart is empty, and clone saved cart with new cart name', () => {
        savedCart.restoreCart(
          sampleData.products[1],
          sampleData.savedActiveCartForm[2],
          true,
          { isCloneCartActive: true, cloneName: 'newClonedName' }
        );
      });

      it('should make cart active and swap cart when active cart has entries', () => {
        savedCart.waitForCartPageData(sampleData.products[2]);
        savedCart.visitCartPage();

        savedCart.verifyCartDetails(sampleData.savedCarts.carts[1]);

        savedCart.restoreCart(
          sampleData.products[1],
          sampleData.savedActiveCartForm[2]
        );
      });

      it('should make cart active and swap cart when active cart has entries, and clone saved cart', () => {
        savedCart.waitForCartPageData(sampleData.products[2]);
        savedCart.visitCartPage();

        savedCart.verifyCartDetails(sampleData.savedCarts.carts[1]);

        savedCart.restoreCart(
          sampleData.products[1],
          sampleData.savedActiveCartForm[2],
          false,
          { isCloneCartActive: true }
        );
      });
    });

    describe('Saved Cart Details Page', () => {
      beforeEach(() => {
        savedCart.loginB2bUser();
      });

      it('should update saved cart name and description, and delete it from the modal', () => {
        savedCart.updateSavedCartAndDelete(
          sampleData.products[1],
          sampleData.savedActiveCartForm[3]
        );
      });

      it('should update saved cart name and description, and delete it from 0 entries', () => {
        savedCart.updateSavedCartAndDelete(
          sampleData.products[1],
          sampleData.savedActiveCartForm[0],
          true
        );
      });

      it('should update saved cart name and description, and restore it', () => {
        savedCart.updateSavedCartAndRestore(
          sampleData.products[1],
          sampleData.savedActiveCartForm[0]
        );
      });
    });
  });
});
