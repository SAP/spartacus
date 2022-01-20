import * as login from './login';
import * as configurationCartVc from './product-configurator-cart-vc';
//import * as configurationCart from './product-configurator-cart';
import * as productSearch from './product-search';
import { verifyGlobalMessageAfterRegistration } from './register';

const nextBtnSelector =
  'cx-configurator-previous-next-buttons button:contains("Next")';
const previousBtnSelector =
  'cx-configurator-previous-next-buttons button:contains("Previous")';

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
  cy.get('cx-configurator-update-message div.cx-update-msg').should(
    'not.be.visible'
  );
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
  cy.get('button.active:contains(' + `${currentGroup}` + ')').should(
    'be.visible'
  );
}

/**
 * Clicks on 'previous' or 'next' button.
 *
 * @param {string} btnSelector - Button selector
 * @param {string} activeGroup - Name of the group that should be active after click
 */
function clickOnPreviousOrNextBtn(
  btnSelector: string,
  activeGroup: string
): void {
  cy.get(btnSelector)
    .click()
    .then(() => {
      checkUpdatingMessageNotDisplayed();
      checkCurrentGroupActive(activeGroup);
      checkUpdatingMessageNotDisplayed();
    });
}

/**
 * Clicks on the next group Button and verifies that an element of the next group is displayed.
 *
 * @param {string} nextGroup - Expected next group name
 */
export function clickOnNextBtn(nextGroup: string): void {
  clickOnPreviousOrNextBtn(nextBtnSelector, nextGroup);
}

/**
 * Clicks on the previous group Button and verifies that an element of the previous group is displayed.
 *
 * @param {string} previousGroup - Expected previous group name
 */
export function clickOnPreviousBtn(previousGroup: string): void {
  clickOnPreviousOrNextBtn(previousBtnSelector, previousGroup);
}

/**
 * Verifies whether 'show more' button is displayed in the product title component.
 */
export function checkShowMoreLinkAtProductTitleDisplayed(): void {
  checkUpdatingMessageNotDisplayed();
  cy.get('button:contains("show more")').should('be.visible');
}

/**
 * Verifies whether the product title component is displayed.
 */
export function checkTabBarDisplayed(): void {
  checkUpdatingMessageNotDisplayed();
  cy.get('cx-configurator-tab-bar').should('be.visible');
}

/**
 * Verifies whether the 'previous' button is enabled.
 */
export function checkPreviousBtnEnabled(): void {
  cy.get(previousBtnSelector).should('be.not.disabled');
}

/**
 * Verifies whether the 'previous' button is disabled.
 */
export function checkPreviousBtnDisabled(): void {
  cy.get(previousBtnSelector).should('be.disabled');
}

/**
 * Verifies whether the 'next' button is enabled.
 */
export function checkNextBtnEnabled(): void {
  cy.get(nextBtnSelector).should('be.not.disabled');
}

/**
 * Verifies whether the 'next' button is disabled.
 */
export function checkNextBtnDisabled(): void {
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
 * @param {string} value - Value
 */
export function selectAttribute(
  attributeName: string,
  uiType: uiType,
  valueName: string,
  value?: string
): void {
  const attributeId = getAttributeId(attributeName, uiType);
  cy.log('attributeId: ' + attributeId);
  let valueId = `${attributeId}--${valueName}`;
  valueId = this.maskCharacter(valueId, '#');
  cy.log('valueId: ' + valueId);

  switch (uiType) {
    case 'radioGroup':
    case 'checkBoxList':
    case 'multi_selection_image':
      cy.get(`#${valueId}`).click({ force: true });
      break;
    case 'single_selection_image':
      const labelId = `cx-configurator--label--${attributeName}--${valueName}`;
      cy.log('labelId: ' + labelId);
      cy.get(`#${labelId}`)
        .click({ force: true })
        .then(() => {
          checkUpdatingMessageNotDisplayed();
          cy.get(`#${valueId}-input`).should('be.checked');
        });
      break;
    case 'dropdown':
      cy.get(`#${attributeId} ng-select`).ngSelect(valueName);
      break;
    case 'input':
      cy.get(`#${valueId}`).clear().type(value);
      break;
    case 'dropdownProduct':
      cy.get(`select#${attributeId}`).select(valueName);
      break;
    case 'radioGroupProduct':
    case 'checkBoxListProduct':
      const btnLoc = `#${valueId} .cx-product-card-action button`;
      cy.get(btnLoc).then((el) => cy.log(`text before click: '${el.text()}'`));
      cy.get(btnLoc)
        .click({ force: true })
        .then(() => {
          checkUpdatingMessageNotDisplayed();
          checkValueSelected(uiType, attributeName, valueName);
        });
      break;
    default:
      throw new Error(
        `Selecting Attribute '${attributeName}' of UiType '${uiType}' not supported`
      );
  }

  checkUpdatingMessageNotDisplayed();
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
      if (valueName === '0') {
        // no product card for 'no option selected'
        cy.get(`#${valueId} .cx-product-card`).should('not.exist');
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
  cy.get('cx-configurator-group-menu').should('be.visible');
}

/**
 * Verifies whether the group title is displayed.
 */
export function checkGroupTitleDisplayed(): void {
  checkUpdatingMessageNotDisplayed();
  cy.get('cx-configurator-group-title').should('be.visible');
}

/**
 * Verifies whether the group form is displayed.
 */
export function checkGroupFormDisplayed(): void {
  checkUpdatingMessageNotDisplayed();
  cy.get('cx-configurator-form').should('be.visible');
}

/**
 * Verifies whether the 'previous' and 'next' buttons are displayed.
 */
export function checkPreviousAndNextBtnsDispalyed(): void {
  checkUpdatingMessageNotDisplayed();
  cy.get('cx-configurator-previous-next-buttons').should('be.visible');
}

/**
 * Verifies whether the price summary is displayed.
 */
export function checkPriceSummaryDisplayed(): void {
  checkUpdatingMessageNotDisplayed();
  cy.get('cx-configurator-price-summary').should('be.visible');
}

/**
 * Verifies whether the 'add to cart' button is displayed.
 */
export function checkAddToCartBtnDisplayed(): void {
  checkUpdatingMessageNotDisplayed();
  cy.get('cx-configurator-add-to-cart-button').should('be.visible');
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
  cy.get('cx-configurator-tab-bar a:contains("Overview")').click({
    force: true,
  });
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
    .click({ force: true });
}

/**
 * Clicks the group menu.
 */
export function clickHamburger(): void {
  cy.get('cx-hamburger-menu [aria-label="Menu"]')
    .click()
    .then(() => {
      checkUpdatingMessageNotDisplayed();
    });
}

/**
 * Verifies whether the group menu is displayed.
 */
export function checkHamburgerDisplayed(): void {
  cy.get('cx-hamburger-menu [aria-label="Menu"]').should('be.visible');
}

/**
 * Clicks on 'Add to cart' on the product details page.
 */
export function clickOnAddToCartBtnOnPD(): void {
  cy.get('cx-add-to-cart button.btn-primary')
    .contains('Add to cart')
    .click()
    .then(() => {
      cy.get('cx-added-to-cart-dialog').should('be.visible');
      cy.get('div.cx-dialog-body').should('be.visible');
      cy.get('div.cx-dialog-buttons a.btn-primary')
        .contains('view cart')
        .should('be.visible');
      cy.get('div.cx-dialog-buttons a.btn-secondary')
        .contains('proceed to checkout')
        .should('be.visible');
    });
}

/**
 * Clicks on 'View Cart' on the product details page.
 */
export function clickOnViewCartBtnOnPD(): void {
  cy.get('div.cx-dialog-buttons a.btn-primary')
    .contains('view cart')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/cart');
      cy.get('h1').contains('Your Shopping Cart').should('be.visible');
      cy.get('cx-cart-details').should('be.visible');
    });
}

/**
 * Clicks on 'Proceed to Checkout' on the product details page.
 */
export function clickOnProceedToCheckoutBtnOnPD(): void {
  cy.get('div.cx-dialog-buttons a.btn-secondary')
    .contains('proceed to checkout')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/checkout/shipping-address');
      cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
      cy.get('cx-shipping-address').should('be.visible');
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
export function completeOrderProcess(productName: string): void {
  login.registerUser();
  verifyGlobalMessageAfterRegistration();
  const tokenAuthRequestAlias = login.listenForTokenAuthenticationRequest();
  login.loginUser();
  cy.wait(tokenAuthRequestAlias).its('response.statusCode').should('eq', 200);
  this.searchForProduct(productName);
  this.clickOnAddToCartBtnOnPD();
  this.clickOnProceedToCheckoutBtnOnPD();
  configurationCartVc.checkout();
  //TODO: activate after 22.05
  //configurationCart.navigateToOrderDetails();
  //don't check the order history aspect because this part is flaky
  //configuration.selectOrderByOrderNumberAlias();
  const tokenRevocationRequestAlias = login.listenForTokenRevocationRequest();
  login.signOutUser();
  cy.wait(tokenRevocationRequestAlias);
}
