/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { visitHomePage } from '../../../helpers/checkout-flow';
import * as login from '../../../helpers/login';
import { waitForPage } from '../../../helpers/navigation';
import * as wishList from '../../../helpers/wish-list';
import * as wishListV2 from '../../../helpers/wish-list-v2';
import { clearAllStorage } from '../../../support/utils/clear-all-storage';

describe('Wish list V2', () => {
  before(() => {
    cy.window().then((win) => {
      win.localStorage.clear();
    });
    cy.whenJDK17(() => {
      visitHomePage();
      cy.getLoginRegisterLink().click();
      cy.get('cx-login-register .btn-register').click();
    });
    cy.whenJDK21(() => {
      // JDK21 uses Authorization Code Flow: clicking Sign In triggers OAuth redirect.
      // Navigate directly to the registration page to avoid the OAuth redirect loop.
      const registerPage = waitForPage('/login/register', 'getRegisterPage');
      cy.visit('/login/register');
      cy.wait(`@${registerPage}`).its('response.statusCode').should('eq', 200);
    });
    wishList.registerWishListUser();
  });

  beforeEach(() => {
    clearAllStorage();
  });

  describe('Logged in flows', () => {
    afterEach(() => {
      const tokenRevocationAlias = login.listenForTokenRevocationRequest();
      login.signOutUser();
      cy.wait(tokenRevocationAlias);
    });

    describe('Add to Wish List', () => {
      beforeEach(() => {
        visitHomePage();
        cy.getLoginRegisterLink().click();
        wishList.loginWishListUser();
        // In JDK21 Auth Code Flow, loginWishListUser() returns as soon as the OAuth
        // redirect changes the URL away from '/login'. At that point, Spartacus is
        // still exchanging the auth code for a token asynchronously.
        // Wait for the user greeting to confirm the token exchange is fully complete.
        cy.get(login.userGreetSelector).should('exist');
      });

      it('should add product via POST /wishlists/{id}/entries and show remove button on PDP', () => {
        wishListV2.addToWishListV2(wishList.products[0].code);
        wishListV2.verifyProductInWishListPdp();
      });

      it('should display added product on Wish List page with correct product code', () => {
        wishListV2.verifyProductInWishList(
          wishList.products[0].code,
          wishList.products[0].name
        );
      });

      it('should show product name as link and product code on Wish List page', () => {
        wishListV2.goToWishList();

        cy.get('cx-wish-list')
          .contains('.cx-item-list-row', wishList.products[0].name)
          .within(() => {
            cy.get('.cx-name .cx-link').should(
              'contain',
              wishList.products[0].name
            );
            cy.get('.cx-code').should('contain', wishList.products[0].code);
          });
      });
    });

    describe('Remove from Wish List', () => {
      beforeEach(() => {
        visitHomePage();
        cy.getLoginRegisterLink().click();
        wishList.loginWishListUser();
        cy.get(login.userGreetSelector).should('exist');
        wishListV2.addToWishListV2(wishList.products[1].code);
      });

      it('should remove product via DELETE /wishlists/{id}/entries/{entryId}', () => {
        wishListV2.interceptRemoveEntry();
        wishListV2.interceptGetWishlists();

        wishListV2.goToWishList();

        cy.get('cx-wish-list')
          .contains('.cx-item-list-row', wishList.products[1].name)
          .within(() => {
            cy.get('button.cx-remove-btn').click();
          });

        cy.wait('@removeWishlistEntry')
          .its('request.method')
          .should('eq', 'DELETE');
      });

      it('should remove product from PDP and update button state', () => {
        wishListV2.visitProduct(wishList.products[1].code);

        wishListV2.interceptRemoveEntry();
        wishListV2.interceptGetWishlists();

        cy.get('cx-add-to-wishlist .button-remove').click();

        wishListV2.verifyProductNotInWishListPdp();
      });

      it('should disappear from Wish List page after removal', () => {
        wishListV2.goToWishList();
        wishListV2.removeFromWishListV2(wishList.products[1].name);

        cy.get('cx-wish-list')
          .contains('.cx-item-list-row', wishList.products[1].name)
          .should('not.exist');
      });

      it('should show add button on PDP after removing product from Wish List page', () => {
        // Remove via Wish List page, then verify PDP reflects the updated state.
        wishListV2.goToWishList();
        wishListV2.removeFromWishListV2(wishList.products[1].name);

        wishListV2.visitProduct(wishList.products[1].code);
        wishListV2.verifyProductNotInWishListPdp();
      });
    });

    describe('Multiple products in Wish List', () => {
      beforeEach(() => {
        visitHomePage();
        cy.getLoginRegisterLink().click();
        wishList.loginWishListUser();
        cy.get(login.userGreetSelector).should('exist');
      });

      it('should display all added products on Wish List page', () => {
        wishListV2.addToWishListV2(wishList.products[2].code);
        wishListV2.goToWishList();

        cy.get('cx-wish-list')
          .contains('.cx-item-list-row', wishList.products[2].name)
          .should('exist');
        cy.get('cx-wish-list')
          .contains('.cx-item-list-row', wishList.products[0].name)
          .should('exist');

        // cleanup — remove both to restore clean state for subsequent tests
        wishListV2.removeFromWishListV2(wishList.products[2].name);
        wishListV2.removeFromWishListV2(wishList.products[0].name);
      });

      it('should remove one product while keeping the other on Wish List page', () => {
        wishListV2.addToWishListV2(wishList.products[2].code);
        wishListV2.addToWishListV2(wishList.products[0].code);
        wishListV2.goToWishList();

        wishListV2.removeFromWishListV2(wishList.products[2].name);

        cy.get('cx-wish-list')
          .contains('.cx-item-list-row', wishList.products[2].name)
          .should('not.exist');
        cy.get('cx-wish-list')
          .contains('.cx-item-list-row', wishList.products[0].name)
          .should('exist');

        wishListV2.removeFromWishListV2(wishList.products[0].name);
      });

      it('should show correct product codes for each entry on Wish List page', () => {
        wishListV2.addToWishListV2(wishList.products[2].code);
        wishListV2.addToWishListV2(wishList.products[0].code);
        wishListV2.goToWishList();

        cy.get('cx-wish-list')
          .contains('.cx-item-list-row', wishList.products[2].name)
          .within(() => {
            cy.get('.cx-code').should('contain', wishList.products[2].code);
          });
        cy.get('cx-wish-list')
          .contains('.cx-item-list-row', wishList.products[0].name)
          .within(() => {
            cy.get('.cx-code').should('contain', wishList.products[0].code);
          });

        wishListV2.removeFromWishListV2(wishList.products[2].name);
        wishListV2.removeFromWishListV2(wishList.products[0].name);
      });
    });

    describe('Wish List page navigation', () => {
      beforeEach(() => {
        visitHomePage();
        cy.getLoginRegisterLink().click();
        wishList.loginWishListUser();
        cy.get(login.userGreetSelector).should('exist');
        wishListV2.addToWishListV2(wishList.products[2].code);
      });

      it('should navigate to product PDP by clicking product name link on Wish List page', () => {
        wishListV2.goToWishList();

        cy.get('cx-wish-list')
          .contains('.cx-item-list-row', wishList.products[2].name)
          .within(() => {
            cy.get('.cx-name .cx-link').click();
          });

        cy.url().should('include', `/product/${wishList.products[2].code}`);

        // cleanup: product is in wishlist, remove it from PDP
        wishListV2.interceptRemoveEntry();
        cy.get('cx-add-to-wishlist .button-remove').click();
        cy.wait('@removeWishlistEntry');
      });

      it('should show add button on PDP after removing product from Wish List page', () => {
        wishListV2.goToWishList();
        wishListV2.removeFromWishListV2(wishList.products[2].name);

        wishListV2.visitProduct(wishList.products[2].code);
        wishListV2.verifyProductNotInWishListPdp();
      });

      it('should retain remove button on PDP when navigating back from Wish List page', () => {
        // Navigate to Wish List page and back to PDP — wishlist button state should persist.
        wishListV2.goToWishList();
        cy.get('cx-wish-list')
          .contains('.cx-item-list-row', wishList.products[2].name)
          .should('exist');

        wishListV2.visitProduct(wishList.products[2].code);
        wishListV2.verifyProductInWishListPdp();

        // cleanup
        wishListV2.interceptRemoveEntry();
        cy.get('cx-add-to-wishlist .button-remove').click();
        cy.wait('@removeWishlistEntry');
      });
    });
  });
});
