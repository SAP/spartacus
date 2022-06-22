import * as savedCart from '../../../../helpers/b2b/b2b-saved-cart';
import { viewportContext } from '../../../../helpers/viewport-context';
import * as sampleData from '../../../../sample-data/b2b-saved-cart';
import { clearAllStorage } from '../../../../support/utils/clear-all-storage';

context('B2B - Saved Cart', () => {
  viewportContext(['desktop'], () => {
    before(() => {
      clearAllStorage();
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
  });
});
