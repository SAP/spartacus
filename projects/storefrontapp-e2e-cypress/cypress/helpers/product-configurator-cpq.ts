import Chainable = Cypress.Chainable;
import * as authentication from './auth-forms';
import * as globalMessage from './global-message';
import * as configuration from './product-configurator';
import * as configurationVc from './product-configurator-vc';

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
 * Navigates to the product detail page.
 *
 * @param {string} shopName - shop name
 * @param {string} productId - Product ID
 */
export function goToPDPage(shopName: string, productId: string): void {
  const location = `${shopName}/en/USD/product/${productId}/${productId}`;
  cy.visit(location).then(() => {
    cy.location('pathname').should('contain', location);
    cy.get('.ProductDetailsPageTemplate').should('be.visible');
  });
}

/**
 * Clicks on 'Add to Cart' button in catalog list.
 */
export function clickOnConfigureBtnInCatalog(): void {
  cy.get('cx-configure-product a')
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
  configuration.checkPreviousAndNextBtnsDispalyed();
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
 * @param {string} value - Value
 */
export function selectAttributeAndWait(
  attributeName: string,
  uiType: configuration.uiType,
  valueName: string,
  value?: string
): void {
  configuration.selectAttribute(attributeName, uiType, valueName, value);
  cy.wait('@updateConfig');
  cy.wait('@readConfig');
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
  cy.wait('@readConfig');
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
 * Returns nth group menu link
 *
 * @param {number} index
 * @returns {Chainable<JQuery<HTMLElement>>}
 */
function getNthGroupMenu(index: number): Chainable<JQuery<HTMLElement>> {
  return cy
    .get('cx-configurator-group-menu:visible')
    .within(() => cy.get('.cx-menu-item').not('.cx-menu-conflict').eq(index));
}

/**
 * Clicks on the group via its index in the group menu.
 *
 * @param {number} groupIndex - Group index
 */
export function clickOnGroup(groupIndex: number): void {
  getNthGroupMenu(groupIndex).within(() => {
    cy.get('div.subGroupIndicator').within(($list) => {
      cy.log('$list.children().length: ' + $list.children().length);
      cy.wrap($list.children().length).as('subGroupIndicator');
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

  cy.wait('@readConfig');
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
  cy.get('cx-login [role="link"]')
    .click()
    .then(() => {
      cy.get('cx-login-form').should('be.visible');
    });
  // Login via authentication service
  authentication.login(email, password);
  // Verify whether the user logged in successfully,
  // namely the logged in user should be greeted
  cy.get('.cx-login-greet').should('contain', name);
  cy.get('cx-login').should('not.contain', 'Sign In');
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
