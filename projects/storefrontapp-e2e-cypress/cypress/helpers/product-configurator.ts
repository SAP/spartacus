/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as common from './common';
import * as login from './login';
import * as configurationCart from './product-configurator-cart';
import * as configurationCartVc from './product-configurator-cart-vc';
import * as productSearch from './product-search';
import * as authentication from './auth-forms';
import { SampleUser } from '../sample-data/checkout-flow';
import { verifyGlobalMessageAfterRegistration } from './register';

const nextBtnSelector =
  'cx-configurator-previous-next-buttons button:contains("Next")';
const previousBtnSelector =
  'cx-configurator-previous-next-buttons button:contains("Previous")';

const quantityStepperSelector =
  '.cx-add-to-cart-btn-container .cx-quantity cx-item-counter';

const quantitySelector = '.cx-add-to-cart-btn-container .cx-quantity-value';

const variantCarouselSelector = '.cx-variant-carousel-container';

/**
 * ui types
 */
export type uiType =
  | 'radioGroup'
  | 'checkBoxList'
  | 'multi_selection_image'
  | 'single_selection_image'
  | 'dropdown'
  | 'input'
  | 'dropdownProduct'
  | 'radioGroupProduct'
  | 'checkBoxListProduct';

export function defineAliases(backendUrl: string) {
  cy.intercept('POST', backendUrl).as('createConfig');
  cy.intercept('PATCH', backendUrl).as('updateConfig');
  cy.intercept('GET', backendUrl).as('readConfig');
}

/**
 * Verifies whether the updating configuration message is not displayed on the top of the configuration.
 */
export function checkUpdatingMessageNotDisplayed(): void {
  const updatingMsgSelector =
    'cx-configurator-update-message div.cx-update-msg';
  cy.get(updatingMsgSelector).should('not.be.visible');
}

/**
 * Verifies whether the corresponding value ID is focused.
 *
 * @param {string} attributeName - Attribute name
 * @param {uiType} uiType - UI type
 * @param {string} valueName - Value name
 */
export function checkFocus(
  attributeName: string,
  uiType: uiType,
  valueName: string
): void {
  const attributeId = getAttributeId(attributeName, uiType);
  const valueId = `${attributeId}--${valueName}`;
  cy.focused().should('have.attr', 'id', valueId);
}

/**
 * Verifies whether the current group is active.
 *
 * @param {string} currentGroup - Active group
 */
export function checkCurrentGroupActive(currentGroup: string): void {
  cy.get(
    'cx-configurator-group-title:contains(' + `${currentGroup}` + ')'
  ).should('be.visible');
  const activeGroupSelector =
    'button.active:contains(' + `${currentGroup}` + ')';
  cy.get(activeGroupSelector).scrollIntoView();
  cy.get(activeGroupSelector).should('be.visible');
}

/**
 * Clicks on 'previous' or 'next' button.
 *
 * @param {string} btnSelector - Button selector
 * @param {string} activeGroup - optional - name of the group that should be active after click
 */
function clickOnPreviousOrNextBtn(
  btnSelector: string,
  activeGroup?: string
): void {
  cy.get(btnSelector)
    .should('be.visible')
    .should('have.length', 1) // This waits until exactly one matching element is found. This guarantees the click happens only when a single visible element is present
    .click() // is performed only when a single, unambiguous element is available, helping to avoid flaky tests caused by duplicate or missing elements
    .then(() => {
      checkUpdatingMessageNotDisplayed();
      if (activeGroup) {
        checkCurrentGroupActive(activeGroup);
        checkUpdatingMessageNotDisplayed();
      }
    });
}

/**
 * Clicks on the next group Button and verifies that an element of the next group is displayed.
 *
 * @param {string} nextGroup - optional - expected next group name
 */
export function clickOnNextBtn(nextGroup?: string): void {
  clickOnPreviousOrNextBtn(nextBtnSelector, nextGroup);
}

/**
 * Clicks on the previous group Button and verifies that an element of the previous group is displayed.
 *
 * @param {string} previousGroup - optional - expected previous group name
 */
export function clickOnPreviousBtn(previousGroup?: string): void {
  clickOnPreviousOrNextBtn(previousBtnSelector, previousGroup);
}

/**
 * Verifies whether 'show more' button is displayed in the product title component.
 */
export function checkShowMoreLinkAtProductTitleDisplayed(): void {
  checkUpdatingMessageNotDisplayed();
  const showMoreLinkSelector = 'button:contains("show more")';
  cy.get(showMoreLinkSelector).scrollIntoView();
  cy.get(showMoreLinkSelector).should('be.visible');
}

/**
 * Verifies whether the product title component is displayed.
 */
export function checkTabBarDisplayed(): void {
  checkUpdatingMessageNotDisplayed();
  const tabBarSelector = 'cx-configurator-tab-bar';
  cy.get(tabBarSelector).scrollIntoView();
  cy.get(tabBarSelector).should('be.visible');
}

/**
 * Verifies whether the 'previous' button is enabled.
 */
export function checkPreviousBtnEnabled(): void {
  cy.get(previousBtnSelector).scrollIntoView();
  cy.get(previousBtnSelector).should('be.not.disabled');
}

/**
 * Verifies whether the 'previous' button is disabled.
 */
export function checkPreviousBtnDisabled(): void {
  cy.get(previousBtnSelector).scrollIntoView();
  cy.get(previousBtnSelector).should('be.disabled');
}

/**
 * Verifies whether the 'next' button is enabled.
 */
export function checkNextBtnEnabled(): void {
  cy.get(nextBtnSelector).scrollIntoView();
  cy.get(nextBtnSelector).should('be.not.disabled');
}

/**
 * Verifies whether the 'next' button is disabled.
 */
export function checkNextBtnDisabled(): void {
  cy.get(nextBtnSelector).scrollIntoView();
  cy.get(nextBtnSelector).should('be.disabled');
}

/**
 * Verifies whether the attribute is displayed.
 *
 * @param {string} attributeName - Attribute name
 * @param {uiType} uiType - UI type
 */
export function checkAttributeDisplayed(
  attributeName: string,
  uiType: uiType
): void {
  const attributeId = getAttributeId(attributeName, uiType);
  cy.get(`#${attributeId}`).scrollIntoView();
  cy.get(`#${attributeId}`).should('be.visible');
}

/**
 * Verifies whether the attribute is not displayed.
 *
 * @param {string} attributeName - Attribute name
 * @param {uiType} uiType - UI type
 */
export function checkAttributeNotDisplayed(
  attributeName: string,
  uiType: uiType
): void {
  const attributeId = getAttributeId(attributeName, uiType);
  cy.get(`#${attributeId}`).should('be.not.visible');
}

export function maskCharacter(searchValue: string, character: string): string {
  if (searchValue.indexOf(character) !== -1) {
    const replaceValue = '\\' + character;
    searchValue = searchValue.replaceAll(character, replaceValue);
  }
  cy.log('searched value: ' + searchValue);
  return searchValue;
}

/**
 * Verifies whether the attribute value is displayed.
 *
 * @param {string} attributeName - Attribute name
 * @param {uiType} uiType - UI type
 * @param {string} valueName - Value name
 */
export function checkAttrValueDisplayed(
  attributeName: string,
  uiType: uiType,
  valueName: string
): void {
  const attributeId = getAttributeId(attributeName, uiType);
  let valueLocator: string;
  if (uiType.startsWith('dropdown')) {
    valueLocator = `#${attributeId} [value="${valueName}"]`;
  } else {
    valueName = this.maskCharacter(valueName, '#');
    valueLocator = `#${attributeId}--${valueName}`;
  }
  cy.log('value locator: ' + valueLocator);
  cy.get(`${valueLocator}`).scrollIntoView();
  cy.get(`${valueLocator}`).should('be.visible');
}

/**
 * Verifies whether the attribute value is not displayed.
 *
 * @param {string} attributeName - Attribute name
 * @param {uiType} uiType - UI type
 * @param {string} valueName - Value name
 */
export function checkAttrValueNotDisplayed(
  attributeName: string,
  uiType: uiType,
  valueName: string
): void {
  const attributeId = getAttributeId(attributeName, uiType);
  let valueLocator: string;
  if (uiType.startsWith('dropdown')) {
    valueLocator = `#${attributeId} [value="${valueName}"]`;
  } else {
    valueLocator = `#${attributeId}--${valueName}`;
  }
  cy.get(`${valueLocator}`).should('not.exist');
}

export function checkVariantCarouselDisplayed(): void {
  cy.get(variantCarouselSelector).scrollIntoView();
  cy.get(variantCarouselSelector).should('be.visible');
}

export function checkVariantCarouselNotDisplayed(): void {
  cy.get(variantCarouselSelector).should('not.exist');
}

/**
 * Retrieves attribute ID.
 *
 * @param {string} attributeName - Attribute name
 * @param {uiType} uiType - UI type
 * @return {string} - Attribute ID
 */
export function getAttributeId(attributeName: string, uiType: uiType): string {
  return `cx-configurator--${uiType}--${attributeName}`;
}

/**
 * Retrieves the attribute label id.
 *
 * @param {string} attributeName - Attribute name
 * @return {string} - Attribute label ID
 */
export function getAttributeLabelId(attributeName: string): string {
  return `cx-configurator--label--${attributeName}`;
}

/**
 * Selects a corresponding attribute value.
 *
 * @param {string} attributeName - Attribute name
 * @param {uiType} uiType - UI type
 * @param {string} valueName - Value name
 * @param {boolean} waitForUpdateMsg - optional, default is true. if set to false, will not wait for update message to disappear
 * @param {boolean} force - optional, default is false. if true, clicks with { force: true } and skips scrollIntoView
 *   (useful in modals where Angular re-renders can detach the element during actionability checks)
 */
export function selectAttribute(
  attributeName: string,
  uiType: uiType,
  valueName: string,
  waitForUpdateMsg: boolean = true,
  force: boolean = false
): void {
  const attributeId = getAttributeId(attributeName, uiType);
  cy.log('attributeId: ' + attributeId);
  let valueId = `${attributeId}--${valueName}`;
  valueId = this.maskCharacter(valueId, '#');
  cy.log('valueId: ' + valueId);
  const clickOptions = force ? { force: true } : undefined;

  switch (uiType) {
    case 'radioGroup':
    case 'checkBoxList':
    case 'multi_selection_image':
      // Break get → assert → click into separate commands so Cypress re-queries
      // after Angular re-renders (avoids "detached from DOM" on the subject).
      if (!force) {
        cy.get(`#${valueId}`).scrollIntoView();
      }
      cy.get(`#${valueId}`).should('be.visible');
      cy.get(`#${valueId}`)
        .click(clickOptions)
        .then(() => {
          if (waitForUpdateMsg) {
            checkUpdatingMessageNotDisplayed();
          }
        });
      break;
    case 'single_selection_image':
      const labelId = `cx-configurator--label--${attributeName}--${valueName}`;
      cy.log('labelId: ' + labelId);
      if (!force) {
        cy.get(`#${labelId}`).scrollIntoView();
      }
      cy.get(`#${labelId}`).should('be.visible');
      cy.get(`#${labelId}`)
        .click(clickOptions)
        .then(() => {
          if (waitForUpdateMsg) {
            checkUpdatingMessageNotDisplayed();
          }
        });
      break;
    case 'dropdown':
      cy.get(`#${attributeId} ng-select`).ngSelect(valueName);
      break;
    case 'input':
      cy.get(`#${valueId}`).clear().type(valueName);
      break;
    case 'dropdownProduct':
      cy.get(`select#${attributeId}`).select(valueName);
      break;
    case 'radioGroupProduct':
    case 'checkBoxListProduct':
      const btnLoc = `#${valueId} .cx-product-card-action button`;
      cy.get(btnLoc).then((el) => cy.log(`text before click: '${el.text()}'`));
      if (!force) {
        cy.get(btnLoc).scrollIntoView();
      }
      cy.get(btnLoc).should('be.visible');
      cy.get(btnLoc)
        .click(clickOptions)
        .then(() => {
          if (waitForUpdateMsg) {
            checkUpdatingMessageNotDisplayed();
          }
          //Here we cannot check if the value is selected, as this method is also used
          //for de-selecting items
        });
      break;
    default:
      throw new Error(
        `Selecting Attribute '${attributeName}' of UiType '${uiType}' not supported`
      );
  }

  if (waitForUpdateMsg) {
    checkUpdatingMessageNotDisplayed();
  }
}

/**
 * Verifies whether a corresponding UI type is selected.
 *
 * @param {uiType} uiType - UI type
 * @param {string} attributeName - Attribute name
 * @param {string} valueName - Value name
 */
export function checkValueSelected(
  uiType: uiType,
  attributeName: string,
  valueName: string
): void {
  const attributeId = getAttributeId(attributeName, uiType);
  let valueId = `${attributeId}--${valueName}`;
  if (uiType === 'radioGroupProduct' || uiType === 'checkBoxListProduct') {
    cy.get(`#${valueId} .cx-product-card`).should(
      'have.class',
      'cx-product-card-selected'
    );
  } else {
    if (uiType === 'dropdownProduct') {
      if (valueName.includes('RETRACT_VALUE_CODE')) {
        // No product card for 'No option selected'
        // The RETRACT_VALUE_CODE constant contains special sing, namely `#`, that should be masked accordingly `\\#`
        const newValueId = valueId.replaceAll('#', '\\#');
        cy.get(`#${newValueId} .cx-product-card`).should('not.exist');
      } else {
        cy.get(`#${valueId} .cx-product-card`).should('be.visible');
      }
    }
    if (uiType.startsWith('dropdown')) {
      valueId = `${attributeId} [value="${valueName}"]`;
    }

    valueId = this.maskCharacter(valueId, '#');

    cy.get(`#${valueId}`).should('be.checked');
  }
}

/**
 * Verifies whether the group menu is displayed.
 */
export function checkGroupMenuDisplayed(): void {
  const groupMenuSelector = 'cx-configurator-group-menu';
  cy.get(groupMenuSelector).scrollIntoView();
  cy.get(groupMenuSelector).should('be.visible');
}

/**
 * Verifies whether the group title is displayed.
 */
export function checkGroupTitleDisplayed(): void {
  checkUpdatingMessageNotDisplayed();
  const groupTitleSelector = 'cx-configurator-group-title';
  cy.get(groupTitleSelector).scrollIntoView();
  cy.get(groupTitleSelector).should('be.visible');
}

/**
 * Verifies whether the group form is displayed.
 */
export function checkGroupFormDisplayed(): void {
  checkUpdatingMessageNotDisplayed();
  const groupFormSelector = 'cx-configurator-form';
  cy.get(groupFormSelector).should('be.visible');
}

/**
 * Verifies whether the 'previous' and 'next' buttons are displayed.
 */
export function checkPreviousAndNextBtnsDisplayed(): void {
  checkUpdatingMessageNotDisplayed();
  cy.get('cx-configurator-previous-next-buttons').should('be.visible');
}

/**
 * Verifies whether the price summary is displayed.
 */
export function checkPriceSummaryDisplayed(): void {
  checkUpdatingMessageNotDisplayed();
  const priceSummarySelector = 'cx-configurator-price-summary';
  cy.get(priceSummarySelector).scrollIntoView();
  cy.get(priceSummarySelector).should('be.visible');
}

/**
 * Verifies whether the 'add to cart' button is displayed.
 */
export function checkAddToCartBtnDisplayed(): void {
  checkUpdatingMessageNotDisplayed();
  const addToCartBtnSelector = 'cx-configurator-add-to-cart-button';
  cy.get(addToCartBtnSelector).scrollIntoView();
  cy.get(addToCartBtnSelector).should('be.visible');
}

/**
 * Verifies the accuracy of the formatted price.
 *
 * @param {string} formattedPrice - Formatted price
 */
export function checkTotalPrice(formattedPrice: string): void {
  cy.get(
    'cx-configurator-price-summary div.cx-total-price div.cx-amount'
  ).should(($div) => {
    expect($div).to.contain(formattedPrice);
  });
}

/**
 * Navigates to the overview page via the overview tab.
 */
export function navigateToOverviewPage(): void {
  const overviewPageSelector = 'cx-configurator-tab-bar a:contains("Overview")';
  cy.get(overviewPageSelector).scrollIntoView();
  cy.get(overviewPageSelector).should('be.visible').click();
}

/**
 * Clicks on the group via its index in the group menu.
 *
 * @param {number} groupIndex - Group index
 */
export function clickOnGroupByGroupIndex(groupIndex: number): void {
  cy.get('cx-configurator-group-menu .cx-menu-item')
    .not('.cx-menu-conflict')
    .eq(groupIndex)
    .should('be.visible')
    .click();
}

/**
 * Clicks the group menu.
 */
export function clickHamburger(): void {
  const hamburgerMenuSelector =
    'cx-configurator-group-title cx-hamburger-menu button';
  cy.get(hamburgerMenuSelector).scrollIntoView();
  cy.get(hamburgerMenuSelector)
    .should('be.visible')
    .click()
    .then(() => {
      checkUpdatingMessageNotDisplayed();
    });
}

/**
 * Verifies whether the group menu is displayed.
 */
export function checkHamburgerDisplayed(): void {
  const hamburgerMenuSelector =
    'cx-configurator-group-title cx-hamburger-menu button';
  cy.get(hamburgerMenuSelector).scrollIntoView();
  cy.get(hamburgerMenuSelector).should('be.visible');
}

/**
 * Clicks on 'Proceed to Checkout' on the product details page.
 */
export function clickOnProceedToCheckoutBtnOnPD(): void {
  cy.get('div.cx-dialog-buttons button.btn-secondary')
    .contains('proceed to checkout')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/checkout/delivery-address');
      cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
      cy.get('cx-delivery-address').should('be.visible');
    });
}

/**
 * Searches for a product by a product name.
 *
 * @param {string} productName - Product name
 */
export function searchForProduct(productName: string): void {
  cy.intercept({
    method: 'GET',
    path: `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/products/suggestions?term=${productName}*`,
  }).as('productSearch');

  productSearch.searchForProduct(productName);
  cy.wait('@productSearch');
}

/**
 * Orders a product:
 * (1) Registers a new user,
 * (2) Logs in with the credentials of the newly registered user,
 * (3) Searches for a corresponding product by a product name,
 * (4) Adds a searched product to the cart,
 * (5) Orders a product,
 * (6) Verifies whether the order history contains the ordered product and
 * (7) Navigates to the order details of the product via 'Display Configuration' link.
 *
 * @param {string} productName - Product name
 */
export function completeOrderProcess(
  productName: string,
  navigateToOrderDetails: boolean = false
): void {
  // Navigate to the registry page to register a new user
  cy.visit('/login/register');
  const user: SampleUser = login.registerUser(true);
  verifyGlobalMessageAfterRegistration();
  const tokenAuthRequestAlias = login.listenForTokenAuthenticationRequest();
  // Login via authentication service
  authentication.login(user.email, user.password);
  cy.wait(tokenAuthRequestAlias).its('response.statusCode').should('eq', 200);
  // Verify whether the user logged in successfully,
  // namely the logged-in user should be greeted
  cy.get('.cx-login-greet').should('contain', user.fullName);
  cy.getLoginRegisterLink().should('not.contain', 'Sign In');

  this.searchForProduct(productName);
  common.clickOnAddToCartBtnOnPD();
  this.clickOnProceedToCheckoutBtnOnPD();
  configurationCartVc.completeCheckout(user);
  if (navigateToOrderDetails) {
    configurationCart.navigateToOrderDetails();
  }
  //don't check the order history aspect because this part is flaky
  // configurationCart.selectOrderByOrderNumberAlias();

  const tokenRevocationRequestAlias = login.listenForTokenRevocationRequest();
  login.signOutUser();
  cy.wait(tokenRevocationRequestAlias);
}

/**
 * Clicks on the exit configuration button.
 */
export function clickExitConfigurationBtn(): void {
  cy.get('cx-configurator-exit-button button')
    .click()
    .then(() => {
      cy.location('pathname').should('not.contain', '/configure/');
    });
}

/**
 * Verifies whether the quantity stepper is not displayed next to the add-to-cart button.
 */
export function checkQuantityStepperNotDisplayed() {
  cy.get(quantityStepperSelector).should('not.exist');
}

/**
 * Verifies that quantity is not displayed.
 */
export function checkQuantityNotDisplayed() {
  cy.get(quantitySelector).should('not.exist');
}

/**
 * Verifies whether a quantity value that is entered into the quantity stepper is equal to the expected value.
 *
 * @param {number} expectedValue - expected quantity value
 */
export function checkQuantityStepper(expectedValue: number) {
  cy.get(quantityStepperSelector + ' input').should(
    'have.value',
    expectedValue.toString()
  );
}

/**
 * Verifies whether a quantity value that has been entered into the quantity stepper is equal to the expected value.
 *
 * @param {number} expectedValue - expected quantity value
 */
export function checkQuantity(expectedValue: number) {
  cy.get(quantitySelector).then((elem) => {
    expect(elem.text().trim()).to.equal(expectedValue.toString());
  });
}

function changeQuantityValue(sign: string) {
  cy.get(quantityStepperSelector + ' button')
    .contains(sign)
    .click();
}

/**
 * Increase a quantity value of the quantity stepper.
 */
export function increaseQuantity() {
  changeQuantityValue('+');
}

/**
 * Decrease a quantity value of the quantity stepper.
 */
export function decreaseQuantity() {
  changeQuantityValue('-');
}

/**
 * Enter a new quantity value into the quantity stepper.
 */
export function enterQuantityValue(quantity: number) {
  cy.get(quantityStepperSelector + ' input').type(
    `{selectall}${quantity.toString()}{enter}`
  );
}
