/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { WishListUser } from './wish-list';

function occBase(): string {
  return `${Cypress.env('OCC_PREFIX')}/${Cypress.env('BASE_SITE')}`;
}

export const WISHLISTS_PATH = `${occBase()}/users/*/wishlists`;

export const WISHLIST_ENTRIES_PATH = `${occBase()}/users/*/wishlists/*/entries`;

export const ADD_ENTRY_PATH = WISHLIST_ENTRIES_PATH;

export const REMOVE_ENTRY_PATH = `${occBase()}/users/*/wishlists/*/entries/*`;

export function interceptGetWishlists(): void {
  cy.intercept('GET', WISHLISTS_PATH).as('getWishlists');
}

export function interceptGetWishlistEntries(): void {
  cy.intercept('GET', WISHLIST_ENTRIES_PATH).as('getWishlistEntries');
}

export function interceptAddEntry(): void {
  cy.intercept('POST', ADD_ENTRY_PATH).as('addWishlistEntry');
}

export function interceptRemoveEntry(): void {
  cy.intercept('DELETE', REMOVE_ENTRY_PATH).as('removeWishlistEntry');
}

export function visitProduct(productCode: string): void {
  cy.visit(`/product/${productCode}`);
}

export function goToWishList(): void {
  cy.selectUserMenuOption({ option: 'Wish List' });
}

export function addToWishListV2(productCode: string): void {
  visitProduct(productCode);

  interceptGetWishlists();
  interceptAddEntry();

  cy.get('cx-add-to-wishlist .button-add').should('not.be.disabled').click();
}

export function removeFromWishListV2(productName: string): void {
  interceptRemoveEntry();
  interceptGetWishlists();

  cy.get('cx-wish-list')
    .contains('.cx-item-list-row', productName)
    .within(() => {
      cy.get('button.cx-remove-btn').click();
    });

  cy.wait('@removeWishlistEntry').its('response.statusCode').should('eq', 204);

  cy.get('cx-wish-list')
    .contains('.cx-item-list-row', productName)
    .should('not.exist');
}

export function verifyProductInWishList(
  productCode: string,
  productName: string
): void {
  goToWishList();
  interceptGetWishlists();
  interceptGetWishlistEntries();

  cy.get('cx-wish-list')
    .contains('.cx-item-list-row', productName)
    .within(() => {
      cy.get('.cx-code').should('contain', productCode);
    });
}

export function verifyProductInWishListPdp(): void {
  cy.get('cx-add-to-wishlist .button-remove').should('exist');
}

export function verifyProductNotInWishListPdp(): void {
  cy.get('cx-add-to-wishlist .button-add').should('exist');
}

export function verifyV2ApiCalled(): void {
  cy.get('@getWishlists').its('request.url').should('include', '/wishlists');
}

export function verifySavedCartApiNotCalled(): void {
  cy.get('@getSavedCarts').should('be.null');
}

export { WishListUser };
