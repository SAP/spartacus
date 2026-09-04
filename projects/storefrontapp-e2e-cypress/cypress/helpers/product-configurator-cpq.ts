/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import Chainable = Cypress.Chainable;
import * as authentication from './auth-forms';
import * as globalMessage from './global-message';
import * as configuration from './product-configurator';
import * as configurationVc from './product-configurator-vc';
import * as productSearch from './product-search';

const REQUIRED_ERROR_MSG_SELECTOR = '.cx-required-error-msg';
const VALIDATION_MSG_SELECTOR = '.cx-validation-msg';
const GLOBAL_CONFLICT_AND_ERROR_MESSAGES_SELECTOR =
  'cx-configuration-conflict-and-error-messages';
const GLOBAL_CONFLICT_AND_ERROR_MESSAGE_SELECTOR = `${GLOBAL_CONFLICT_AND_ERROR_MESSAGES_SELECTOR} .cx-warning-message, ${GLOBAL_CONFLICT_AND_ERROR_MESSAGES_SELECTOR} .cx-error-message`;

/**
 * bundle types
 */
export type cardType = 'radioGroup' | 'dropdown' | 'checkBoxList';

const addToCartButtonSelector = 'cx-configurator-add-to-cart-button button';

/**
 * Navigates to the product configuration page.
 *
 * @param {string} shopName - shop name
 * @param {string} productId - Product ID
 * @param {"vc" | "cpq"} configurationType - configuration type used in configurator URL, default is "vc"
 * @return {Chainable<Window>} - New configuration window
 */
export function goToConfigurationPage(
  shopName: string,
  productId: string,
  configurationType: 'vc' | 'cpq' = 'vc'
): Chainable<Window> {
  const location = `/${shopName}/en/USD/configure/${configurationType}/product/entityKey/${productId}`;
  return cy.visit(location).then(() => {
    cy.location('pathname').should('contain', location);
    this.checkConfigPageDisplayed();
  });
}

/**
 * Navigates to the CPQ product configuration page.
 *
 * @param {string} shopName - shop name
 * @param {string} productId - Product ID
 * @return {Chainable<Window>} - New configuration window
 */
export function goToCPQConfigurationPage(
  shopName: string,
  productId: string
): Chainable<Window> {
  const location = `/${shopName}/en/USD/configure/cpq/product/entityKey/${productId}`;
  return cy.visit(location).then(() => {
    cy.location('pathname').should('contain', location);
    this.checkConfigPageDisplayed();
  });
}

/**
 * Clicks on 'Add to Cart' button in catalog list.
 */
export function clickOnConfigureBtnInCatalog(): void {
  cy.get('cx-configure-product button')
    .contains('Configure')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/product/entityKey/');
      this.checkConfigPageDisplayed();
    });
}

/**
 * Verifies whether the configuration page is displayed.
 */
export function checkConfigPageDisplayed(): void {
  checkSuccessMessageNotDisplayed();
  configurationVc.checkGhostAnimationNotDisplayed();
  configuration.checkTabBarDisplayed();
  configuration.checkGroupTitleDisplayed();
  configuration.checkGroupFormDisplayed();
  configuration.checkGroupMenuDisplayed();
  configuration.checkPriceSummaryDisplayed();
  configuration.checkAddToCartBtnDisplayed();
  checkProductTitleDisplayed();
  configuration.checkShowMoreLinkAtProductTitleDisplayed();
}

/**
 * Verifies whether the product title component is displayed.
 */
export function checkProductTitleDisplayed(): void {
  configuration.checkUpdatingMessageNotDisplayed();
  cy.get('cx-configurator-product-title').should('be.visible');
}

/**
 * Verifies if all passed attribute headers are displayed
 *
 * @param {string[]} attributeHeaders - List of attribute headers to check
 */
export function checkAttributeHeaderDisplayed(
  attributeHeaders: string[]
): void {
  attributeHeaders.forEach((header) => {
    cy.get(`cx-configurator-attribute-header`)
      .contains(header)
      .should('be.visible');
  });
}

/**
 * Selects a product card and waits until it's state changes.
 * @param {cardType} cardType - card type
 * @param {string} attributeName - Attribute name
 * @param {string} valueName - Value name
 */
export function selectProductCard(
  cardType: cardType,
  attributeName: string,
  valueName: string
) {
  const uiType: configuration.uiType = convertCardTypeToUiType(cardType);
  selectAttributeAndWait(attributeName, uiType, valueName);
  configuration.checkValueSelected(uiType, attributeName, valueName);
}

/**
 * DeSelects a product card and waits until it's state changes.
 * @param {cardType} cardType - card type
 * @param {string} attributeName - Attribute name
 * @param {string} valueName - Value name
 */
export function deSelectProductCard(
  cardType: cardType,
  attributeName: string,
  valueName: string
) {
  const uiType: configuration.uiType = convertCardTypeToUiType(cardType);
  selectAttributeAndWait(attributeName, uiType, valueName);
  checkValueNotSelected(uiType, attributeName, valueName);
}

/**
 * converts the given card/bundle type to the corresponding ui type
 * @param {cardType} cardType card type
 */
export function convertCardTypeToUiType(cardType: cardType) {
  let uiType: configuration.uiType;
  switch (cardType) {
    case 'radioGroup':
      uiType = 'radioGroupProduct';
      break;
    case 'dropdown':
      uiType = 'dropdownProduct';
      break;
    case 'checkBoxList':
      uiType = 'checkBoxListProduct';
      break;
  }
  return uiType;
}

/**
 * Selects a corresponding attribute value and wait.
 *
 * @param {string} attributeName - Attribute name
 * @param {configuration.uiType} uiType - UI type
 * @param {string} valueName - Value name
 */
export function selectAttributeAndWait(
  attributeName: string,
  uiType: configuration.uiType,
  valueName: string
): void {
  configuration.selectAttribute(attributeName, uiType, valueName);
  cy.wait('@updateConfig');
}

/**
 * Selects an attribute value, waits for the OCC update, and verifies it is selected.
 *
 * @param {string} attributeName - Attribute name
 * @param {configuration.uiType} uiType - UI type
 * @param {string} valueName - Value name
 */
export function selectAttributeAndCheck(
  attributeName: string,
  uiType: configuration.uiType,
  valueName: string
): void {
  selectAttributeAndWait(attributeName, uiType, valueName);
  configuration.checkValueSelected(uiType, attributeName, valueName);
}

/**
 * Verifies whether a corresponding UI type not selected.
 *
 * @param {configuration.uiType} uiType - UI type
 * @param {string} attributeName - Attribute name
 * @param {string} valueName - Value name
 */
export function checkValueNotSelected(
  uiType: configuration.uiType,
  attributeName: string,
  valueName: string
) {
  const attributeId = configuration.getAttributeId(attributeName, uiType);
  let valueId = `${attributeId}--${valueName}`;
  if (uiType === 'radioGroupProduct' || uiType === 'checkBoxListProduct') {
    cy.get(`#${valueId} .cx-product-card`).should(
      'not.have.class',
      'cx-product-card-selected'
    );
  } else {
    if (uiType.startsWith('dropdown')) {
      valueId = `${attributeId} [value="${valueName}"]`;
    }
    cy.get(`#${valueId}`).should('not.be.checked');
  }
}

/**
 * Selects a corresponding attribute value.
 *
 * @param {configuration.uiType} uiType - UI type
 * @param {number} quantity - quantity
 * @param {string} attributeName - attribute name
 * @param {string} valueName - value name
 */
export function setQuantity(
  uiType: configuration.uiType,
  quantity: number,
  attributeName: string,
  valueName?: string
): void {
  let containerId = configuration.getAttributeId(attributeName, uiType);
  if (valueName) {
    containerId = `${containerId}--${valueName}`;
  }
  cy.log('conatinerId: ' + containerId);
  cy.get(`#${containerId} cx-configurator-attribute-quantity input`).type(
    '{selectall}' + quantity
  );
  configuration.checkUpdatingMessageNotDisplayed();
  cy.wait('@updateConfig');
}

/**
 * Selects a corresponding attribute value.
 *
 * @param {configuration.uiType} uiType - UI type
 * @param {string} priceFormula - quantity
 * @param {string} attributeName - attribute name
 * @param {string} valueName - value name
 */
export function checkPrice(
  uiType: configuration.uiType,
  priceFormula: string,
  attributeName: string,
  valueName?: string
): void {
  let containerId = configuration.getAttributeId(attributeName, uiType);
  if (valueName) {
    containerId = `${containerId}--${valueName}`;
  }
  cy.log('conatinerId: ' + containerId);
  cy.get(`#${containerId} cx-configurator-price`).should(
    'contain.text',
    priceFormula
  );
}

/**
 * Clicks on the group via its index in the group menu.
 *
 * @param {number} groupIndex - Group index
 */
export function clickOnGroup(groupIndex: number): void {
  cy.get('cx-configurator-group-menu:visible').within(() => {
    cy.get('.cx-menu-item')
      .not('.cx-menu-conflict')
      .eq(groupIndex)
      .within(() => {
        cy.get('div.subGroupIndicator').within(($list) => {
          cy.log('$list.children().length: ' + $list.children().length);
          cy.wrap($list.children().length).as('subGroupIndicator');
        });
      });
  });

  cy.get('@subGroupIndicator').then((subGroupIndicator) => {
    cy.log('subGroupIndicator: ' + subGroupIndicator);
    if (!subGroupIndicator) {
      configuration.clickOnGroupByGroupIndex(groupIndex);
    } else {
      configuration.clickOnGroupByGroupIndex(groupIndex);
      configuration.clickOnGroupByGroupIndex(0);
    }
  });
}

/**
 * Clicks on the 'Add to cart' button.
 */
export function clickAddToCartBtn(): void {
  cy.get(addToCartButtonSelector)
    .click()
    .then(() => {
      cy.location('pathname').should('contain', 'cartEntry/entityKey/');
    });
}

/**
 * Logs in.
 */
export function login(email: string, password: string, name: string): void {
  // Click on the 'Sign in / Register' link
  // & wait until the login-form is displayed
  cy.getLoginRegisterLink()
    .click()
    .then(() => {
      cy.get('cx-login-form').should('be.visible');
    });
  // Login via authentication service
  authentication.login(email, password);
  // Verify whether the user logged in successfully,
  // namely the logged in user should be greeted
  cy.get('.cx-login-greet').should('contain', name);
  cy.getLoginRegisterLink().should('not.contain', 'Sign In');
}

/**
 * Waiting for the product card to load correctly
 *
 * @export
 */
export function waitForProductCardsLoad(expectedLength: number) {
  cy.get('.cx-product-card').should('have.length', expectedLength);
}

/**
 * Verifies whether the global success message is not displayed on the top of the configuration.
 */
export function checkSuccessMessageNotDisplayed(): void {
  globalMessage.getSuccessAlert().should('not.exist');
}

/**
 * Searches for a product by a product name.
 *
 * @param {string} productName - Product name
 */
export function searchForProduct(productName: string): void {
  productSearch.searchForProduct(productName);
}

/**
 * Verifies that no required-field or validation messages are shown on the form.
 */
export function checkNoValidationMessagesDisplayed(): void {
  cy.get('cx-configurator-form').within(() => {
    cy.get(REQUIRED_ERROR_MSG_SELECTOR).should('not.exist');
    cy.get(VALIDATION_MSG_SELECTOR).should('not.exist');
  });
}

/**
 * Returns the attribute message element id prefix for a given attribute code.
 *
 * @param {string} attributeCode - Attribute code
 * @return {string} - Message id prefix
 */
function getAttributeMessageIdPrefix(attributeCode: string): string {
  //cx-configurator--attribute-msg--3157-required-msg-0
  return `#cx-configurator--attribute-msg--${attributeCode}-required-msg-0`;
}

/**
 * Verifies that the required-field message is displayed for an attribute.
 *
 * @param {string} attributeCode - Attribute code
 * @param {string} message - Optional expected message text
 */
export function checkRequiredFieldMessageDisplayed(
  attributeCode: string,
  message?: string
): void {
  const selector = getAttributeMessageIdPrefix(attributeCode);
  cy.get(selector).should('be.visible');
  if (message) {
    cy.get(selector).should('contain.text', message);
  }
}

/**
 * Verifies that the required-field message is not displayed for an attribute.
 *
 * @param {string} attributeCode - Attribute code
 */
export function checkRequiredFieldMessageNotDisplayed(
  attributeCode: string
): void {
  cy.get(getAttributeMessageIdPrefix(attributeCode)).should('not.exist');
}

/**
 * Verifies the container required-field message for an attribute.
 *
 * @param {string} attributeCode - Attribute code
 * @param {string} message - Expected message text
 */
export function checkContainerRequiredMessage(
  attributeCode: string,
  message: string
): void {
  checkRequiredFieldMessageDisplayed(attributeCode, message);
}

/**
 * Verifies that a global warning or error message is displayed.
 * CPQ may surface business messages as errors in
 * `cx-configuration-conflict-and-error-messages`.
 *
 * @param {string} text - Expected message text
 */
export function checkGlobalWarningMessageDisplayed(text: string): void {
  cy.get(GLOBAL_CONFLICT_AND_ERROR_MESSAGE_SELECTOR)
    .contains(text.trim())
    .should('be.visible');
}

/**
 * Verifies that no global warning or error message is displayed.
 */
export function checkGlobalWarningMessageNotDisplayed(): void {
  cy.get(GLOBAL_CONFLICT_AND_ERROR_MESSAGE_SELECTOR).should('not.exist');
}

/**
 * Verifies whether status icon is not displayed for a group.
 *
 * @param {string} groupName - Group name
 */
export function checkStatusIconNotDisplayed(groupName: string): void {
  configurationVc.checkStatusIconNotDisplayed(groupName);
}

/**
 * Verifies whether status icon is displayed for a group.
 *
 * @param {string} groupName - Group name
 * @param {string} status - Status class, e.g. ERROR
 */
export function checkStatusIconDisplayed(
  groupName: string,
  status: string
): void {
  configurationVc.checkStatusIconDisplayed(groupName, status);
}

/**
 * Selects a radio-group value by attribute label and visible value text.
 *
 * @param {string} attributeLabel - Attribute label shown in the UI
 * @param {string} valueText - Visible value text
 */
export function selectRadioByAttributeLabelAndWait(
  attributeLabel: string,
  valueText: string
): void {
  cy.contains('cx-configurator-attribute-header label span', attributeLabel)
    .invoke('attr', 'id')
    .then((labelId) => {
      const attributeCode = labelId?.replace('cx-configurator--label--', '');
      cy.get(`[id^="cx-configurator--radioGroup--${attributeCode}--"]`)
        .contains(valueText)
        .click();
      cy.wait('@updateConfig');
      configuration.checkUpdatingMessageNotDisplayed();
    });
}
