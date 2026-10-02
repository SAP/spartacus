/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as cart from './cart';
import * as common from './common';
import * as configurationCpq from './product-configurator-cpq';
import * as configurationOverview from './product-configurator-overview';
import * as configurationOverviewCpq from './product-configurator-overview-cpq';
import Chainable = Cypress.Chainable;

/**
 * Search for a corresponding bundle item.
 *
 * @param cartItemIndex - Index of cart item
 * @returns Corresponding bundle item
 */
export function findBundleItem(
  cartItemIndex: number
): Chainable<JQuery<HTMLElement>> {
  return cy
    .get('cx-cart-item-list .cx-item-list-row')
    .eq(cartItemIndex)
    .find('cx-configurator-cart-entry-bundle-info');
}

/**
 * Verifies the name of bundle item.
 *
 * @param cartItemIndex - Index of cart item
 * @param bundleItemIndex - Index of bundle item
 * @param name - Expected name of bundle item
 */
export function checkBundleItemName(
  cartItemIndex: number,
  bundleItemIndex: number,
  name: string
) {
  findBundleItem(cartItemIndex).within(() => {
    cy.get('.cx-item-info')
      .eq(bundleItemIndex)
      .within(() => {
        cy.get('.cx-item-name').should('contain', name);
      });
  });
}

/**
 * Verifies the price of bundle item.
 *
 * @param cartItemIndex - Index of cart item
 * @param bundleItemIndex - Index of bundle item
 * @param price - Expected price of bundle item
 */
export function checkBundleItemPrice(
  cartItemIndex: number,
  bundleItemIndex: number,
  price: string
) {
  findBundleItem(cartItemIndex).within(() => {
    if (price) {
      cy.get('.cx-item-info')
        .eq(bundleItemIndex)
        .within(() => {
          cy.get('.cx-item-price .cx-item').should('contain', price);
        });
    }
  });
}

/**
 * Verifies the quantity of bundle item.
 *
 * @param cartItemIndex - Index of cart item
 * @param bundleInfoIndex - Index of bundle item
 * @param quantity - Expected quantity of bundle item
 */
export function checkBundleItemQuantity(
  cartItemIndex: number,
  bundleInfoIndex: number,
  quantity: string
) {
  findBundleItem(cartItemIndex).within(() => {
    if (quantity) {
      cy.get('.cx-item-info')
        .eq(bundleInfoIndex)
        .within(() => {
          cy.get('.cx-item-quantity .cx-item').should('contain', quantity);
        });
    }
  });
}

/**
 * Toggle bundle items via 'show' or 'hide' link within a cart entry.
 *
 * @param cartItemIndex - Index of cart item
 * @param linkName - Name of the toggled link
 */
function toggleBundleItems(cartItemIndex: number, linkName: string) {
  findBundleItem(cartItemIndex).within(() => {
    cy.get('.cx-toggle-hide-items')
      .should('contain', linkName)
      .click()
      .then(() => {
        let expectedLinkName = 'hide';
        if (linkName !== 'show') {
          expectedLinkName = linkName;
        }
        cy.get('.cx-toggle-hide-items').should('contain', expectedLinkName);
      });
  });
}

/**
 * Verifies the amount of bundle items for a certain cart item.
 *
 * @param cartItemIndex - Index of cart item
 * @param itemsAmount - Expected amount of bundle items
 */
export function checkAmountOfBundleItems(
  cartItemIndex: number,
  itemsAmount: number
) {
  findBundleItem(cartItemIndex).within(() => {
    cy.get('.cx-number-items').should('contain', itemsAmount);
  });
  toggleBundleItems(cartItemIndex, 'show');
}

/**
 * Verifies that bundle items are represented by an overview link instead of
 * being rendered inline.
 *
 * @param cartItemIndex - Index of cart item
 * @param itemsAmount - Expected amount of bundle items
 */
export function checkBundleOverviewLink(
  cartItemIndex: number,
  itemsAmount: number
): void {
  findBundleItem(cartItemIndex).within(() => {
    cy.get('.cx-number-items').should('contain', itemsAmount);
    cy.get('button').should('not.exist');
    cy.get('.cx-item-infos').should('not.exist');
    cy.get('.cx-item-info').should('not.exist');
    cy.get('.cx-toggle-hide-items a')
      .should('contain', 'show')
      .and('be.visible');
  });
}

/**
 * Navigates from a cart bundle to its read-only configuration overview.
 *
 * @param cartItemIndex - Index of cart item
 */
export function clickOnBundleOverviewLink(cartItemIndex: number): void {
  findBundleItem(cartItemIndex).within(() => {
    cy.get('.cx-toggle-hide-items a').contains('show').click();
  });
}

/**
 * Verifies that bundle line items are toggled inline (show/hide button) rather
 * than via the overview navigation link.
 *
 * @param cartItemIndex - Index of cart item
 */
export function checkBundleInlineShowToggleDisplayed(
  cartItemIndex: number
): void {
  findBundleItem(cartItemIndex).within(() => {
    cy.get('button .cx-toggle-hide-items').should('contain', 'show');
    cy.get('.cx-toggle-hide-items a.link').should('not.exist');
  });
}

/**
 * Expands inline bundle line items via the show toggle button.
 *
 * @param cartItemIndex - Index of cart item
 */
export function clickBundleInlineShowToggle(cartItemIndex: number): void {
  toggleBundleItems(cartItemIndex, 'show');
  findBundleItem(cartItemIndex).within(() => {
    cy.get('.cx-item-infos').should('have.class', 'open');
  });
}

/**
 * Verifies that a bundle line item shows the product name as a link and the
 * product code beneath it.
 *
 * @param cartItemIndex - Index of cart item
 * @param productName - Expected product name
 */
export function checkBundleLineItemProductLinkAndCode(
  cartItemIndex: number,
  productName: string
): void {
  findBundleItem(cartItemIndex).within(() => {
    cy.contains('.cx-item-info', productName).within(() => {
      cy.get('.cx-item-name a.cx-link')
        .should('be.visible')
        .and('contain', productName);
      cy.get('.cx-item-name .cx-code')
        .should('be.visible')
        .invoke('text')
        .then((text) => {
          const productCode = text.replace(/ID\s*/i, '').trim();
          expect(productCode).to.match(/\S+/);
          cy.wrap(productCode).as('bundleLineItemProductCode');
        });
    });
  });
}

/**
 * Opens the product detail page from a bundle line item link in the cart.
 *
 * @param cartItemIndex - Index of cart item
 * @param productName - Product name shown on the line item
 */
export function clickBundleLineItemProductLink(
  cartItemIndex: number,
  productName: string
): void {
  findBundleItem(cartItemIndex).within(() => {
    cy.contains('.cx-item-info', productName)
      .find('.cx-item-name a.cx-link')
      .click();
  });
}

/**
 * Opens the product details page of a bundle line item via its product link and
 * returns to the cart. Requires `checkBundleLineItemProductLinkAndCode` to have
 * set the `@bundleLineItemProductCode` alias.
 *
 * @param cartItemIndex - Index of cart item
 * @param productName - Product name shown on the line item
 * @param productCode - Product code of the cart entry holding the bundle
 */
export function navigateToBundleLineItemPDPAndBackToCart(
  cartItemIndex: number,
  productName: string,
  productCode: string
): void {
  clickBundleLineItemProductLink(cartItemIndex, productName);
  const productNameSlug = productName.toLowerCase().replace(/\s+/g, '-');
  cy.get('@bundleLineItemProductCode').then((lineItemProductCode) => {
    cy.location('pathname').should(
      'contain',
      `/product/${lineItemProductCode}/${productNameSlug}`
    );
  });
  cy.get('.ProductDetailsPageTemplate').should('be.visible');

  cy.go('back');
  checkCartPageReady();
  waitForCartEntryBundleInfo(productCode);
}

/**
 * Clicks the nested product configuration link on a bundle line item.
 * Uses structural selectors only (no translated link text).
 *
 * @param cartItemIndex - Index of cart item
 * @param productName - Product name shown on the line item
 */
export function clickBundleLineItemEditProductConfiguration(
  cartItemIndex: number,
  productName: string
): void {
  findBundleItem(cartItemIndex).within(() => {
    cy.contains('.cx-item-info', productName)
      .find('.cx-item-link cx-configure-cart-entry a.link')
      .click();
  });
}

/**
 * Adds the currently open configuration to the cart and navigates from the
 * overview page to the cart, which then shows the bundle info.
 * Requires `registerCartRouteForBaseSite` to have been called.
 *
 * @param productCode - Product code of the configured product
 */
export function addConfigurableProductToCart(productCode: string): void {
  configurationCpq.clickAddToCartBtn();
  configurationOverviewCpq.checkOverviewPageReady();
  configurationOverview.clickContinueToCartBtnOnOP();
  cy.wait('@getCart');
  checkCartPageReady();
  cart.verifyCartNotEmpty();
  waitForCartEntryBundleInfo(productCode);
}

/**
 * Clicks the "Edit Bundle Configuration" link on a CPQ cart entry.
 *
 * @param cartItemIndex - Index of cart item
 */
export function clickOnEditBundleConfigurationLink(
  cartItemIndex: number
): void {
  cy.get('cx-cart-item-list .cx-item-list-row')
    .eq(cartItemIndex)
    .find('cx-configure-cart-entry')
    .find('a.link')
    .contains('Edit Bundle Configuration')
    .click({ force: true })
    .then(() => {
      cy.location('pathname').should('contain', '/cartEntry/entityKey/');
    });
}

/**
 * Leaves a configuration that was opened from a cart entry and returns to the
 * cart via the overview page.
 *
 * @param productCode - Product code of the cart entry holding the bundle
 */
export function returnToCartFromConfiguration(productCode: string): void {
  configurationCpq.clickAddToCartBtn();
  configurationOverviewCpq.checkOverviewPageReady();
  configurationOverview.clickContinueToCartBtnOnOP();
  checkCartPageReady();
  waitForCartEntryBundleInfo(productCode);
}

/**
 * Runs assertions for the cart row that contains the given product code.
 *
 * @param productCode - Product code shown in the cart row
 * @param fn - Callback with the row index
 */
export function withCartEntryIndexForProductCode(
  productCode: string,
  fn: (cartEntryIndex: number) => void
): void {
  cy.get('cx-cart-item-list .cx-item-list-row').then(($rows) => {
    let cartEntryIndex = -1;
    $rows.each((index, row) => {
      const codeText = Cypress.$(row).find('.cx-code').text();
      if (codeText.includes(productCode)) {
        cartEntryIndex = index;
        return false;
      }
    });
    expect(
      cartEntryIndex,
      `cart entry index for product ${productCode}`
    ).to.be.gte(0);
    fn(cartEntryIndex);
  });
}

/**
 * Waits until the cart page shows bundle info for the given product.
 *
 * @param productCode - Product code of the cart entry
 */
export function waitForCartEntryBundleInfo(productCode: string): void {
  withCartEntryIndexForProductCode(productCode, (cartEntryIndex) => {
    findBundleItem(cartEntryIndex).should('be.visible');
  });
}

/**
 * Verifies that the cart page is loaded after leaving the configurator overview.
 */
export function checkCartPageReady(): void {
  common.checkLoadingMsgNotDisplayed();
  cy.get('.CartPageTemplate').should('be.visible');
  cy.get('cx-cart-details').should('be.visible');
}
