/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { tabbingOrderConfig as config } from '../../helpers/accessibility/b2b/tabbing-order.config';
import * as alerts from '../../helpers/global-message';
import * as sampleData from '../../sample-data/b2b-saved-cart';
import { SampleProduct } from '../../sample-data/checkout-flow';
import { verifyTabbingOrder as tabbingOrder } from '../accessibility/tabbing-order';
import { addProductToCart as addToCart } from '../applied-promotions';
import { waitForProductPage } from '../checkout-flow';
import {
  interceptAddToCartEndpoint,
  interceptCartPageEndpoint,
  waitForResponse,
} from '../order-history';
import * as SavedCart from '../saved-cart';
import { loginB2bUser as login } from './b2b-checkout';

export function verifyCartPageTabbingOrder() {
  addProductToCart(sampleData.products[0], 1);

  cy.get(
    'cx-cart-item-list cx-item-counter input[type=number]:not([disabled])'
  ); // wait until counter is accessible

  tabbingOrder('cx-page-layout.CartPageTemplate', config.cart);
}

export function verifyModalTabbingOrder() {
  cy.get(
    'cx-cart-item-list cx-item-counter input[type=number]:not([disabled])'
  ); // wait until counter is accessible

  clickSavedCartButtonsFromCartPage(1);

  cy.get('cx-saved-cart-form-dialog').within(() => {
    cy.get('[formcontrolname="name"]').type(
      sampleData.savedActiveCartForm[1].name
    );
    cy.get('[formcontrolname="description"]').type(
      sampleData.savedActiveCartForm[1].description
    );
  });

  tabbingOrder('cx-saved-cart-form-dialog', config.savedCartModal);
}

export function verifyListingTabbingOrder() {
  // page rendering
  cy.wait(1000);
  tabbingOrder('cx-page-layout.AccountPageTemplate', config.savedCartListing);
}

export function verifyDetailsTabbingOrder() {
  // page rendering
  cy.wait(1000);
  tabbingOrder('cx-page-layout.AccountPageTemplate', config.savedCartDetails);
}

export function interceptSaveCartEndpoint(cartCode: string) {
  return SavedCart.interceptSaveCartEndpoint(cartCode);
}

export function interceptGetAllSavedCartEndpoint() {
  return SavedCart.interceptGetAllSavedCartEndpoint();
}

export function interceptRestoreSavedCartEndpoint(cartCode: string) {
  return SavedCart.interceptRestoreSavedCartEndpoint(cartCode);
}

export function interceptGetSavedCartEndpoint(cartCode: string) {
  return SavedCart.interceptGetSavedCartEndpoint(cartCode);
}

export function interceptDeleteCartEndpoint(cartCode: string) {
  return SavedCart.interceptDeleteCartEndpoint(cartCode);
}

export function interceptCloneSavedCartEndpoint(cartCode: string) {
  return SavedCart.interceptCloneSavedCartEndpoint(cartCode);
}

export function clickOn(position: any): void {
  cy.get(position).click();
}

export function visitCartPage() {
  SavedCart.visitCartPage();
}

export function visitSavedCartListingPage() {
  SavedCart.visitSavedCartListingPage();
}

export function visitSavedCartDetailsPage(cartCode: string) {
  SavedCart.visitSavedCartDetailsPage(cartCode);
}

export function loginB2bUser() {
  login();
}

export function addProductToCart(product: SampleProduct, quantity: number) {
  const alias = waitForProductPage(product.code, 'getProductPage');

  cy.visit(`/product/${product.code}`);

  cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200);

  cy.get('cx-item-counter input').type(`{selectall}${quantity.toString()}`);
  addToCart();
  cy.get('cx-added-to-cart-dialog').within(() => {
    cy.get('.cx-name .cx-link').should('contain', product.name);
    cy.findByText(/view cart/i).click();
  });
}

export function clickSavedCartButtonsFromCartPage(position: number) {
  SavedCart.clickSavedCartButtonsFromCartPage(position);
}

export function waitForCartPageData(product: SampleProduct) {
  SavedCart.waitForCartPageData(product);
}

export function waitForSavedCartListingPageData(product: SampleProduct) {
  SavedCart.waitForSavedCartListingPageData(product);
}

export function waitForSavedCartDetailsPageData(product: SampleProduct) {
  SavedCart.waitForSavedCartDetailsPageData(product);
}

export function saveActiveCart() {
  clickSavedCartButtonsFromCartPage(1);

  cy.window()
    .then((win) =>
      JSON.parse(win.localStorage.getItem('spartacus⚿powertools-spa⚿cart'))
    )
    .then(({ active }) => {
      const alias = interceptSaveCartEndpoint(active);

      // open modal to save the cart

      cy.get('cx-saved-cart-form-dialog').within(() => {
        cy.get('[formcontrolname="name"]').type(
          sampleData.savedActiveCartForm[0].name
        );
        cy.get('[formcontrolname="description"]').type(
          sampleData.savedActiveCartForm[0].description
        );

        cy.get('button.btn-primary').click();
      });

      cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200);

      alerts
        .getSuccessAlert()
        .should(
          'contain',
          `Your cart items have been successfully saved for later in the "${sampleData.savedActiveCartForm[0].name}" cart`
        );

      cy.get('cx-paragraph').should('contain', 'Your shopping cart is empty');

      // assert the cart was saved in the listing page
      verifyActiveCartWasSaved(active);
    });
}

export function verifyActiveCartWasSaved(cartCode: string) {
  const getAllSavedCartAlias = interceptGetAllSavedCartEndpoint();

  cy.selectUserMenuOption({
    option: 'Saved Carts',
  });

  cy.wait(`@${getAllSavedCartAlias}`)
    .its('response.statusCode')
    .should('eq', 200);

  cy.get(`@${getAllSavedCartAlias}`).should((xhr) => {
    const body = xhr.response.body;

    expect(body.carts).to.have.length(1);

    expect(body.carts[0].code).to.equal(cartCode);
    expect(body.carts[0].name).to.equal(sampleData.savedActiveCartForm[0].name);
    expect(body.carts[0].description).to.equal(
      sampleData.savedActiveCartForm[0].description
    );
  });

  cy.get(
    'cx-saved-cart-list .cx-saved-cart-list-cart-name > .cx-saved-cart-list-value'
  ).should('contain', sampleData.savedActiveCartForm[0].name);

  cy.get(
    'cx-saved-cart-list .cx-saved-cart-list-cart-id > .cx-saved-cart-list-value'
  ).should('contain', cartCode);

  cy.get(
    'cx-saved-cart-list .cx-saved-cart-list-quantity > .cx-saved-cart-list-value'
  ).should('contain', sampleData.savedCarts.carts[0].totalUnitCount);

  cy.get(
    'cx-saved-cart-list .cx-saved-cart-list-total > .cx-saved-cart-list-value'
  ).should('contain', sampleData.savedCarts.carts[0].totalPrice.formattedValue);
}

export function verifyMiniCartQuantity(quantity: number) {
  SavedCart.verifyMiniCartQuantity(quantity);
}

export function verifyCartDetails(cart: any) {
  cy.get('cx-cart-item-list')
    .contains('tr[cx-cart-item-list-row]', cart.entries[0].product.code)
    .within(() => {
      cy.get('.cx-name').should('contain', cart.entries[0].product.name);
    });
}

export function getCartItem(name: string) {
  return cy.get('cx-cart-item-list').contains('.cx-item-list-row', name);
}

export function clickOnSubmitButton() {
  cy.get('cx-saved-cart-details-action .btn-primary').click();
}

export function clickOnRestoreButton() {
  cy.get('cx-saved-cart-form-dialog').within(() => {
    cy.get('button.btn-primary').click();
  });
}

export function waitForSuccessfulServerResponse(alias: string) {
  cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200);
}

function verifySuccessfullAlertMessage(message: string) {
  alerts.getSuccessAlert().should('contain', message);
}

export function verifyNotSavedCartListMessage() {
  cy.get('cx-saved-cart-list .cx-saved-cart-list-no-saved-carts').should(
    'contain',
    'No Saved Carts Found'
  );
}

export function verifySavedCartCodeIsDisplayed(code) {
  cy.get('.cart-details-wrapper .cx-total').should('contain', `Cart #${code}`);
}

export function restoreSavedCart(cart: any) {
  const restoreSavedCartAlias = interceptRestoreSavedCartEndpoint(cart.code);
  const getAllSavedCartAlias = interceptGetAllSavedCartEndpoint();

  clickOnSubmitButton();

  clickOnRestoreButton();

  waitForSuccessfulServerResponse(restoreSavedCartAlias);

  verifySuccessfullAlertMessage(
    `Existing cart is activated by ${cart.code} successfully`
  );

  waitForSuccessfulServerResponse(getAllSavedCartAlias);

  verifyNotSavedCartListMessage();

  verifyMiniCartQuantity(1);

  visitCartPage();

  verifySavedCartCodeIsDisplayed(cart.code);

  verifyCartDetails(cart);
}

export function clickOnFirstLinkInCart() {
  cy.get('cx-saved-cart-details-items tr[cx-cart-item-list-row] .btn-tertiary')
    .first()
    .click();
}

export function clickOnPrimaryDialogButton() {
  cy.get('cx-added-to-cart-dialog').within(() => {
    clickOn('.cx-dialog-buttons>.btn-primary');
  });
}

export function verifyProductIsDisplayed(name: string, code: string) {
  getCartItem(name).within(() => {
    cy.get('.cx-code').should('contain', code);
    cy.get('cx-item-counter input').should('have.value', '1');
  });
}

export function verifyAddToCart(cart: any, product: SampleProduct) {
  const addToCartAlias = interceptAddToCartEndpoint();

  const cartPageAlias = interceptCartPageEndpoint();

  clickOnFirstLinkInCart();

  waitForResponse(addToCartAlias);

  clickOnPrimaryDialogButton();

  waitForResponse(cartPageAlias);

  verifyProductIsDisplayed(product.name, product.code);

  verifyCartDetails(cart);
}

export function restoreCart(
  product: SampleProduct,
  savedCartForm: any,
  isEmptyCart: boolean = false,
  cloneSavedCart: { isCloneCartActive: boolean; cloneName?: string } = {
    isCloneCartActive: false,
  }
) {
  cy.window()
    .then((win) => JSON.parse(win.localStorage.getItem('spartacus⚿⚿auth')))
    .then(({ token }) => {
      cy.requireSavedCart(token, product, savedCartForm).then((cart) => {
        visitSavedCartListingPage();

        if (isEmptyCart) {
          verifyMiniCartQuantity(0);
        } else {
          verifyMiniCartQuantity(1);
        }

        // asserts the cart matches what is shown in the table

        cy.get(
          'cx-saved-cart-list .cx-saved-cart-list-cart-name > .cx-saved-cart-list-value'
        ).should('contain', cart.code);

        cy.get(
          'cx-saved-cart-list .cx-saved-cart-list-cart-id > .cx-saved-cart-list-value'
        ).should('contain', cart.code);

        cy.get(
          'cx-saved-cart-list .cx-saved-cart-list-quantity > .cx-saved-cart-list-value'
        ).should('contain', sampleData.savedCarts.carts[0].totalUnitCount);

        cy.get(
          'cx-saved-cart-list .cx-saved-cart-list-total > .cx-saved-cart-list-value'
        ).should(
          'contain',
          sampleData.savedCarts.carts[0].totalPrice.formattedValue
        );

        const cloneSavedCartAlias = interceptCloneSavedCartEndpoint(cart.code);

        const restoreSavedCartAlias = interceptRestoreSavedCartEndpoint(
          cart.code
        );

        //get the previous active cart before it gets replaced
        //maybe there's a better way
        cy.window()
          .then((win) =>
            JSON.parse(
              win.localStorage.getItem('spartacus⚿powertools-spa⚿cart')
            )
          )
          .then(({ active }) => {
            cy.get('cx-saved-cart-list button:first').should('exist').click();

            cy.get('cx-saved-cart-form-dialog').within(() => {
              if (cloneSavedCart.isCloneCartActive) {
                cy.get('input[type="checkbox"]').check();

                if (cloneSavedCart?.cloneName) {
                  cy.get('input[type="text"]').type(cloneSavedCart.cloneName);
                }
              }

              cy.get('button.btn-primary').click();
            });

            if (cloneSavedCart.isCloneCartActive) {
              cy.wait(`@${cloneSavedCartAlias}`)
                .its('response.statusCode')
                .should('eq', 200);
            }

            cy.wait(`@${restoreSavedCartAlias}`)
              .its('response.statusCode')
              .should('eq', 200);

            if (isEmptyCart) {
              alerts
                .getSuccessAlert()
                .should(
                  'contain',
                  `Existing cart is activated by ${cart.code} successfully`
                );
            } else {
              alerts
                .getSuccessAlert()
                .should(
                  'contain',
                  `Existing cart is activated by ${cart.code} successfully. Your previous items were saved in a cart ${active}.`
                );
            }
          });

        verifyMiniCartQuantity(1);

        if (cloneSavedCart.isCloneCartActive) {
          if (cloneSavedCart?.cloneName) {
            cy.get(
              'cx-saved-cart-list .cx-saved-cart-list-cart-name > .cx-saved-cart-list-value'
            ).should('contain', cloneSavedCart.cloneName);
          } else {
            cy.get(
              'cx-saved-cart-list .cx-saved-cart-list-cart-name > .cx-saved-cart-list-value'
            ).should('contain', 'Copy of');
          }
        }

        // assert that the cart was properly swapped / made active
        visitCartPage();

        cy.get('.cart-details-wrapper .cx-total').should(
          'contain',
          `Cart #${cart.code}`
        );

        verifyCartDetails(cart);
      });
    });
}

export function updateSavedCartAndDelete(
  product: SampleProduct,
  savedCartForm: any,
  deleteEntry: boolean = false
) {
  cy.window()
    .then((win) => JSON.parse(win.localStorage.getItem('spartacus⚿⚿auth')))
    .then(({ token }) => {
      cy.requireSavedCart(token, product, savedCartForm).then((cart) => {
        visitSavedCartDetailsPage(cart.code);

        // assert some cart details
        verifyCartDetails(cart);

        // asserts the name and description is the current one
        cy.get('cx-saved-cart-details-overview .cx-card-title')
          .parent()
          .find('.cx-card-label')
          .should('contain', savedCartForm.name);

        cy.get('cx-truncate-text-popover .cx-action-link')
          .should('contain', 'more')
          .click();

        cy.get('cx-popover').within(() => {
          cy.get(' .popover-body').should('contain', savedCartForm.description);
          cy.get('button[class="close"]').click();
        });

        // open modal to update name and description
        cy.get('cx-saved-cart-details-overview .cx-edit-cart').click();

        const updatedSavedCartAlias = interceptSaveCartEndpoint(cart.code);

        cy.get('cx-saved-cart-form-dialog').within(() => {
          cy.get('[formcontrolname="name"]').type(`
          {selectall}${sampleData.savedActiveCartForm[4].name}`);
          cy.get('[formcontrolname="description"]').type(`
          {selectall}${sampleData.savedActiveCartForm[4].description}`);

          cy.get('button.btn-primary').click();
        });

        cy.wait(`@${updatedSavedCartAlias}`)
          .its('response.statusCode')
          .should('eq', 200);

        // asserts the name and description was updated to the new one
        cy.get('cx-saved-cart-details-overview .cx-card-title')
          .parent()
          .find('.cx-card-label')
          .should('contain', sampleData.savedActiveCartForm[4].name);

        cy.get('cx-saved-cart-details-overview .cx-card-title')
          .parent()
          .find('cx-truncate-text-popover')
          .should('contain', sampleData.savedActiveCartForm[4].description);

        alerts.getSuccessAlert().should('contain', `Cart Edited Successfully`);

        // open modal to delete cart or delete cart from removing the last entry product

        const getAllSavedCartAlias = interceptGetAllSavedCartEndpoint();
        const deleteCartAlias = interceptDeleteCartEndpoint(cart.code);

        if (deleteEntry) {
          cy.get(
            'cx-saved-cart-details-items tr[cx-cart-item-list-row] .cx-remove-btn'
          )
            .then((element) => element.get(1))
            .click();
        } else {
          cy.get('cx-saved-cart-details-action .btn-secondary').click();

          cy.get('cx-saved-cart-form-dialog').within(() => {
            cy.get('.cx-saved-cart-value').should(
              'contain',
              sampleData.savedActiveCartForm[4].name
            );
            cy.get('.cx-saved-cart-value').should(
              'contain',
              sampleData.savedActiveCartForm[4].description
            );
            cy.get('button.btn-primary').click();
          });
        }

        cy.wait(`@${deleteCartAlias}`)
          .its('response.statusCode')
          .should('eq', 200);
        cy.wait(`@${getAllSavedCartAlias}`)
          .its('response.statusCode')
          .should('eq', 200);

        alerts.getSuccessAlert().should('contain', `Cart Deleted Successfully`);

        cy.get('cx-saved-cart-list .cx-saved-cart-list-no-saved-carts').should(
          'contain',
          'No Saved Carts Found'
        );
      });
    });
}

export function updateSavedCartAndRestore(
  product: SampleProduct,
  savedCartForm: any,
  addToActiveCart: boolean
) {
  cy.window()
    .then((win) => JSON.parse(win.localStorage.getItem('spartacus⚿⚿auth')))
    .then(({ token }) => {
      cy.requireSavedCart(token, product, savedCartForm).then((cart) => {
        visitSavedCartDetailsPage(cart.code);

        // assert that there's active cart with no entries
        verifyMiniCartQuantity(0);

        // assert some cart details
        verifyCartDetails(cart);

        // asserts the name and description is the current one
        cy.get('cx-saved-cart-details-overview .cx-card-title')
          .parent()
          .find('.cx-card-label')
          .should('contain', savedCartForm.name);

        cy.get('cx-truncate-text-popover .cx-action-link')
          .should('contain', 'more')
          .click();

        cy.get('cx-popover').within(() => {
          cy.get(' .popover-body').should('contain', savedCartForm.description);
          cy.get('button[class="close"]').click();
        });

        // open modal to update name and description
        cy.get('cx-saved-cart-details-overview .cx-edit-cart').click();

        const updatedSavedCartAlias = interceptSaveCartEndpoint(cart.code);

        cy.get('cx-saved-cart-form-dialog').within(() => {
          cy.get('[formcontrolname="name"]').type(`
          {selectall}${sampleData.savedActiveCartForm[4].name}`);
          cy.get('[formcontrolname="description"]').type(`
          {selectall}${sampleData.savedActiveCartForm[4].description}`);

          cy.get('button.btn-primary').click();
        });

        cy.wait(`@${updatedSavedCartAlias}`)
          .its('response.statusCode')
          .should('eq', 200);

        // asserts the name and description was updated to the new one
        cy.get('cx-saved-cart-details-overview .cx-card-title')
          .parent()
          .find('.cx-card-label')
          .should('contain', sampleData.savedActiveCartForm[4].name);

        cy.get('cx-saved-cart-details-overview .cx-card-title')
          .parent()
          .find('cx-truncate-text-popover')
          .should('contain', sampleData.savedActiveCartForm[4].description);

        alerts.getSuccessAlert().should('contain', `Cart Edited Successfully`);

        if (addToActiveCart) {
          verifyAddToCart(cart, product);
        } else {
          restoreSavedCart(cart);
        }
      });
    });
}
