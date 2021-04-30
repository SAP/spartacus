import { AssertionError } from 'assert';
import { user } from '../sample-data/checkout-flow';
import * as authentication from './auth-forms';
import {
  AddressData,
  fillPaymentDetails,
  fillShippingAddress,
  PaymentDetails,
} from './checkout-forms';
import * as globalMessage from './global-message';
import { navigation } from './navigation';
import Chainable = Cypress.Chainable;

const shippingAddressData: AddressData = user;
const billingAddress: AddressData = user;
const paymentDetailsData: PaymentDetails = user;

const nextBtnSelector =
  'cx-configurator-previous-next-buttons button:contains("Next")';
const previousBtnSelector =
  'cx-configurator-previous-next-buttons button:contains("Previous")';
const addToCartButtonSelector = 'cx-configurator-add-to-cart-button button';

const conflictDetectedMsgSelector = '.cx-conflict-msg';
const conflictHeaderGroupSelector =
  'cx-configurator-group-menu li.cx-menu-conflict';

const resolveIssuesLinkSelector =
  'cx-configure-cart-entry button.cx-action-link';

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

/**
 * bundle types
 */
export type cardType = 'radioGroup' | 'dropdown' | 'checkBoxList';

export function defineAliases(backendUrl: string) {
  cy.intercept('POST', backendUrl).as('createConfig');
  cy.intercept('PATCH', backendUrl).as('updateConfig');
  cy.intercept('GET', backendUrl).as('readConfig');
}

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

export function registerConfigurationRoute() {
  cy.intercept(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/products/*/configurators/ccpconfigurator?lang=en&curr=USD`
  ).as('configure_product');
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
 * Navigates to the cart page.
 *
 * @param {string} shopName - shop name
 */
export function goToCart(shopName: string) {
  const location = `/${shopName}/en/USD/cart`;
  cy.visit(`/${shopName}/en/USD/cart`).then(() => {
    cy.location('pathname').should('contain', location);
    cy.get('h1').contains('Your Shopping Cart').should('be.visible');
    cy.get('cx-cart-details').should('be.visible');
  });
}

/**
 * Verifies whether the loading message is not displayed.
 */
export function checkLoadingMsgNotDisplayed(): void {
  cy.log('Wait until the loading notification is not displayed anymore');
  cy.get('cx-storefront').contains('Loading').should('not.be.visible');
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
 * Clicks on the 'Edit Configuration' link in cart for a certain cart item.
 *
 * @param {number} cartItemIndex - Index of cart item
 */
export function clickOnEditConfigurationLink(cartItemIndex: number): void {
  cy.get('cx-cart-item-list .cx-item-list-row')
    .eq(cartItemIndex)
    .find('cx-configure-cart-entry')
    .within(() => {
      cy.get('a:contains("Edit")')
        .click()
        .then(() => {
          cy.location('pathname').should('contain', '/cartEntry/entityKey/');
        });
    });
}

/**
 * Clicks on the 'Remove' link in cart for a certain cart item to remove a cart item.
 *
 * @param {number} cartItemIndex - Index of cart item
 */
export function clickOnRemoveLink(cartItemIndex: number): void {
  cy.get('cx-cart-item-list .cx-item-list-row')
    .eq(cartItemIndex)
    .not('disabled')
    .find('.cx-remove-btn')
    .within(() => {
      cy.log('One cart item will be removed under index: ' + cartItemIndex);
      cy.get('button:contains("Remove")').click();
    });
}

/**
 * Verifies whether the mini-cart displays zero cart items.
 */
export function checkCartEmpty() {
  cy.get('cx-paragraph h2').contains('Your shopping cart is empty');
  cy.get('cx-mini-cart .count').contains('0');
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
  cy.get('a.active:contains(' + `${currentGroup}` + ')').should('be.visible');
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
 * Verifies whether the configuration page is displayed.
 */
export function checkConfigPageDisplayed(): void {
  checkSuccessMessageNotDisplayed();
  checkTabBarDisplayed();
  checkGroupTitleDisplayed();
  checkGroupFormDisplayed();
  checkGroupMenuDisplayed();
  checkPreviousAndNextBtnsDispalyed();
  checkPriceSummaryDisplayed();
  checkAddToCartBtnDisplayed();
  checkProductTitleDisplayed();
  checkShowMoreLinkAtProductTitleDisplayed();
}

/**
 * Verifies whether the product title component is displayed.
 */
export function checkProductTitleDisplayed(): void {
  checkUpdatingMessageNotDisplayed();
  cy.get('cx-configurator-product-title').should('be.visible');
}

/**
 * Verifies whether 'show more' link is displayed in the product title component.
 */
export function checkShowMoreLinkAtProductTitleDisplayed(): void {
  checkUpdatingMessageNotDisplayed();
  cy.get('button:contains("show more")').should('be.visible');
}

/**
 * Verifies whether the product title component is displayed.
 */
function checkTabBarDisplayed(): void {
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
 * Verifies whether status icon is not displayed.
 *
 * @param {string} groupName - Group name
 */
export function checkStatusIconNotDisplayed(groupName: string): void {
  cy.get(
    '.' + `${'ERROR'}` + '.cx-menu-item>a:contains(' + `${groupName}` + ')'
  ).should('not.exist');

  cy.get(
    '.' + `${'COMPLETE'}` + '.cx-menu-item>a:contains(' + `${groupName}` + ')'
  ).should('not.exist');
}

/**
 * Verifies whether status icon is displayed.
 *
 * @param {string} groupName - Group name
 * @param {string} status - Status
 */
export function checkStatusIconDisplayed(
  groupName: string,
  status: string
): void {
  cy.get(
    '.' + `${status}` + '.cx-menu-item>a:contains(' + `${groupName}` + ')'
  ).should('exist');
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
    valueLocator = `#${attributeId}--${valueName}`;
  }
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
 * Selects a product card and waits until it's state changes.
 * @param {'radioGroup' | 'dropdown' | 'checkbox'} cardType - card type
 * @param {string} attributeName - Attribute name
 * @param {string} valueName - Value name
 */
export function selectProductCard(
  cardType: cardType,
  attributeName: string,
  valueName: string
) {
  const uiType: uiType = convertCardTypeToUiType(cardType);
  selectAttribute(attributeName, uiType, valueName);
  checkValueSelected(uiType, attributeName, valueName);
}

/**
 * converts the given card/bundle type to the corresponding ui type
 * @param cardType card type
 */
export function convertCardTypeToUiType(cardType: cardType) {
  let uiType: uiType;
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
 * DeSelects a product card and waits until it's state changes.
 * @param {'radioGroup' | 'dropdown' | 'checkbox'} cardType - card type
 * @param {string} attributeName - Attribute name
 * @param {string} valueName - Value name
 */
export function deSelectProductCard(
  cardType: 'radioGroup' | 'dropdown' | 'checkBoxList',
  attributeName: string,
  valueName: string
) {
  const uiType: uiType = convertCardTypeToUiType(cardType);
  selectAttribute(attributeName, uiType, valueName);
  checkValueNotSelected(uiType, attributeName, valueName);
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
  const valueId = `${attributeId}--${valueName}`;
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
      cy.get(`#${attributeId} select`).select(valueName);
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
      throw new AssertionError({
        message: `Selecting Attribute '${attributeName}' of UiType '${uiType}' not supported`,
      });
  }

  checkUpdatingMessageNotDisplayed();
  cy.wait('@updateConfig');
  cy.wait('@readConfig');
}

/**
 * Selects a corresponding attribute value.
 *
 * @param {uiType} uiType - UI type
 * @param {number} quantity - quantity
 * @param {string} attributeName - attribute name
 * @param {string} valueName - value name
 */
export function setQuantity(
  uiType: uiType,
  quantity: number,
  attributeName: string,
  valueName?: string
): void {
  let containerId = getAttributeId(attributeName, uiType);
  if (valueName) {
    containerId = `${containerId}--${valueName}`;
  }
  cy.log('conatinerId: ' + containerId);
  cy.get(`#${containerId} cx-configurator-attribute-quantity input`).type(
    '{selectall}' + quantity
  );
  checkUpdatingMessageNotDisplayed();
  cy.wait('@updateConfig');
  cy.wait('@readConfig');
}

/**
 * Selects a corresponding attribute value.
 *
 * @param {uiType} uiType - UI type
 * @param {string} priceFormula - quantity
 * @param {string} attributeName - attribute name
 * @param {string} valueName - value name
 */
export function checkPrice(
  uiType: uiType,
  priceFormula: string,
  attributeName: string,
  valueName?: string
): void {
  let containerId = getAttributeId(attributeName, uiType);
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
 * Verifies whether the image value is selected.
 *
 * @param {string} attributeName - Attribute name
 * @param {uiType} uiType - UI type
 * @param {string} valueName - Value name
 */
export function checkImageSelected(
  uiType: uiType,
  attributeName: string,
  valueName: string
): void {
  const attributeId = getAttributeId(attributeName, uiType);
  const valueId = `${attributeId}--${valueName}-input`;
  cy.log('valueId: ' + valueId);
  cy.get(`#${valueId}`).should('be.checked');
}

/**
 * Verifies whether the image value is not selected.
 *
 * @param {uiType} uiType - UI type
 * @param {string} attributeName - Attribute name
 * @param {string} valueName - Value name
 */
export function checkImageNotSelected(
  uiType: uiType,
  attributeName: string,
  valueName: string
): void {
  const attributeId = getAttributeId(attributeName, uiType);
  const valueId = `${attributeId}--${valueName}-input`;
  cy.get(`#${valueId}`).should('not.be.checked');
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
        // no product card for 'no option slected'
        cy.get(`#${valueId} .cx-product-card`).should('not.exist');
      } else {
        cy.get(`#${valueId} .cx-product-card`).should('be.visible');
      }
    }
    if (uiType.startsWith('dropdown')) {
      valueId = `${attributeId} [value="${valueName}"]`;
    }
    cy.get(`#${valueId}`).should('be.checked');
  }
}

/**
 * Verifies whether a corresponding UI type not selected.
 *
 * @param {uiType} uiType - UI type
 * @param {string} attributeName - Attribute name
 * @param {string} valueName - Value name
 */
export function checkValueNotSelected(
  uiType: uiType,
  attributeName: string,
  valueName: string
) {
  const attributeId = getAttributeId(attributeName, uiType);
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
 * Verifies whether the conflict detected under the attribute name is displayed.
 *
 * @param {string} attributeName - Attribute name
 */
export function checkConflictDetectedMsgDisplayed(attributeName: string): void {
  const parent = cy.get(conflictDetectedMsgSelector).parent();
  const attributeId = this.getAttributeLabelId(attributeName);
  parent.children(`#${attributeId}`).should('be.visible');
}

/**
 * Verifies whether the conflict detected under the attribute name is not displayed.
 *
 * @param {string} attributeName - Attribute name
 */
export function checkConflictDetectedMsgNotDisplayed(
  attributeName: string
): void {
  const attributeId = this.getAttributeLabelId(attributeName);
  cy.get(`#${attributeId}`).next().should('not.exist');
}

/**
 * Verifies whether the conflict description is displayed.
 *
 * @param {string} description - Conflict description
 */
export function checkConflictDescriptionDisplayed(description: string): void {
  cy.get('cx-configurator-conflict-description').should(($div) => {
    expect($div).to.contain(description);
  });
}

/**
 * Verifies whether the conflict header group is displayed.
 */
function checkConflictHeaderGroupDisplayed(): void {
  cy.get(conflictHeaderGroupSelector).should('be.visible');
}

/**
 * Verifies whether the conflict header group is not displayed.
 */
function checkConflictHeaderGroupNotDisplayed(): void {
  cy.get(conflictHeaderGroupSelector).should('not.exist');
}

/**
 * Verifies whether the expected number of conflicts is accurate.
 *
 * @param {number} numberOfConflicts - Expected number of conflicts
 */
function checkNumberOfConflicts(numberOfConflicts: number): void {
  cy.get('cx-configurator-group-menu .conflictNumberIndicator').contains(
    '(' + numberOfConflicts.toString() + ')'
  );
}

/**
 * Selects a conflicting value, namely selects a value.
 * Then verifies whether the conflict detected message under the attribute name is displayed,
 * The conflict header group in the group menu is displayed and
 * Finally verifies whether the expected number of conflicts is accurate.
 *
 * @param {string} attributeName - Attribute name
 * @param {uiType} uiType - UI type
 * @param {string} valueName - Value name
 * @param {number} numberOfConflicts - Expected number of conflicts
 */
export function selectConflictingValue(
  attributeName: string,
  uiType: uiType,
  valueName: string,
  numberOfConflicts: number
): void {
  this.selectAttribute(attributeName, uiType, valueName);
  this.checkConflictDetectedMsgDisplayed(attributeName);
  checkConflictHeaderGroupDisplayed();
  checkNumberOfConflicts(numberOfConflicts);
}

/**
 * Deselects a conflicting value, namely deselects a value.
 * Then verifies whether the conflict detected message under the attribute name is not displayed anymore and
 * the conflict header group in the group menu is not displayed either.
 *
 * @param {string} attributeName - Attribute name
 * @param {uiType} uiType - UI type
 * @param {string} valueName - Value name
 */
export function deselectConflictingValue(
  attributeName: string,
  uiType: uiType,
  valueName: string
): void {
  this.selectAttribute(attributeName, uiType, valueName);
  this.checkConflictDetectedMsgNotDisplayed(attributeName);
  checkConflictHeaderGroupNotDisplayed();
}

/**
 * Verifies whether the issues banner is displayed.
 *
 * @param element - HTML element
 * @param {number} numberOfIssues - Expected number of conflicts
 */
export function checkNotificationBanner(
  element,
  numberOfIssues?: number
): void {
  const resolveIssuesText =
    'issues must be resolved before checkout.  Resolve Issues';
  element
    .get('.cx-error-msg')
    .first()
    .invoke('text')
    .then((text) => {
      expect(text).contains(resolveIssuesText);
      if (numberOfIssues > 1) {
        const issues = text.replace(resolveIssuesText, '').trim();
        expect(issues).match(/^[0-9]/);
        expect(issues).eq(numberOfIssues.toString());
      }
    });
}

/**
 * Verifies whether the issues banner is displayed in the cart for a certain cart item.
 *
 * @param {number} cartItemIndex - Index of cart item
 * @param {number} numberOfIssues - Expected number of conflicts
 */
export function checkNotificationBannerInCart(
  cartItemIndex: number,
  numberOfIssues?: number
): void {
  const element = cy
    .get('cx-cart-item-list .cx-item-list-row')
    .eq(cartItemIndex)
    .find('cx-configurator-issues-notification');

  if (numberOfIssues) {
    checkNotificationBanner(element, numberOfIssues);
  } else {
    element.should('not.be.visible');
  }
}

/**
 * Clicks on 'Resolve Issues' link in the cart.
 *
 * @param {number} cartItemIndex - Index of cart item
 */
export function clickOnResolveIssuesLinkInCart(cartItemIndex: number): void {
  cy.get('cx-cart-item-list .cx-item-list-row')
    .eq(cartItemIndex)
    .find('cx-configurator-issues-notification')
    .within(() => {
      cy.get(resolveIssuesLinkSelector)
        .click()
        .then(() => {
          cy.location('pathname').should('contain', ' /cartEntry/entityKey/');
        });
    });
  cy.wait('@readConfig');
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
function checkGroupTitleDisplayed(): void {
  checkUpdatingMessageNotDisplayed();
  cy.get('cx-configurator-group-title').should('be.visible');
}

/**
 * Verifies whether the group form is displayed.
 */
function checkGroupFormDisplayed(): void {
  checkUpdatingMessageNotDisplayed();
  cy.get('cx-configurator-form').should('be.visible');
}

/**
 * Verifies whether the 'previous' and 'next' buttons are displayed.
 */
function checkPreviousAndNextBtnsDispalyed(): void {
  checkUpdatingMessageNotDisplayed();
  cy.get('cx-configurator-previous-next-buttons').should('be.visible');
}

/**
 * Verifies whether the price summary is displayed.
 */
function checkPriceSummaryDisplayed(): void {
  checkUpdatingMessageNotDisplayed();
  cy.get('cx-configurator-price-summary').should('be.visible');
}

/**
 * Verifies whether the 'add to cart' button is displayed.
 */
function checkAddToCartBtnDisplayed(): void {
  checkUpdatingMessageNotDisplayed();
  cy.get('cx-configurator-add-to-cart-button').should('be.visible');
}

/**
<<<<<<< HEAD
 * Verifies whether the group menu is not displayed.
 */
export function checkConfigProductTitleDisplayed(): void {
  cy.get('button:contains("show more")').should('be.visible');
}

/**
 * Verifies whether the Add To Cart Button component is displayed.
 */
export function checkConfigAddToCartBtnDisplayed(): void {
  cy.get('.cx-configurator-add-to-cart-btn').should('be.visible');
}

/**
 * Verifies whether the overview content is displayed.
 */
export function checkOverviewContentDisplayed(): void {
  cy.get('.cx-configurator-group-attribute').should('be.visible');
}

/**
 * Verifies whether the category navigation is displayed.
 */
export function checkCategoryNavigationDisplayed(): void {
  cy.get('cx-category-navigation').should('be.visible');
}

/**
 * Verifies whether the category navigation is displayed.
 */
export function checkCategoryNavigationNotDisplayed(): void {
  cy.get('cx-category-navigation').should('not.be.visible');
}

/**
=======
>>>>>>> develop
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
  cy.get('cx-configurator-group-menu ul>li.cx-menu-item')
    .not('.cx-menu-conflict')
    .eq(groupIndex)
    .children('a')
    .click({ force: true });
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
    .within(() =>
      cy.get('ul>li.cx-menu-item').not('.cx-menu-conflict').eq(index)
    );
}

/**
 * Clicks on the group via its index in the group menu.
 *
 * @param {number} groupIndex - Group index
 */
export function clickOnGroup(groupIndex: number): void {
  getNthGroupMenu(groupIndex).within(() => {
    cy.get('a')
      .children()
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
      clickOnGroupByGroupIndex(groupIndex);
    } else {
      clickOnGroupByGroupIndex(groupIndex);
      clickOnGroupByGroupIndex(0);
    }
  });

  cy.wait('@readConfig');
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
 * Clicks on the 'Add to cart' button.
 */
export function clickAddToCartBtn(): void {
  cy.get(addToCartButtonSelector)
    .click()
    .then(() => {
      cy.location('pathname').should('contain', 'cartEntry/entityKey/');
      //checkUpdatingMessageNotDisplayed();
    });
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
 * Clicks on 'Proceed to Checkout' in the cart
 */
export function clickOnProceedToCheckoutBtnInCart(): void {
  cy.findByText(/proceed to checkout/i)
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/checkout/payment-type');
      cy.get('.cx-payment-type-container').should('contain', 'Payment method');
      cy.get('cx-payment-type').should('be.visible');
    });
}

/**
 * Navigates to the order details page.
 */
export function navigateToOrderDetails(): void {
  cy.log('Navigate to order detail page');
  // Verify whether the ordered product is displayed in the order list
  cy.get('cx-cart-item-list cx-configure-cart-entry a')
    .first()
    .click()
    .then(() => {
      cy.get('cx-configurator-overview-form').should('be.visible');
    });
}

/**
 * Navigates to the oder history page.
 *
 * @param {string} shopName - shop name
 *
 * @return {Chainable<Window>} - New order history window
 */
export function goToOrderHistory(shopName: string): Chainable<Window> {
  cy.log('Navigate to order history');
  return cy.visit(`/${shopName}/en/USD/my-account/orders`).then(() => {
    cy.get('cx-order-history h3').should('contain', 'Order history');
  });
}

/**
 * Verifies whether the searched order exists in the order history and
 * sets the '@isFound' alias accordingly.
 *
 * @param {string} orderNumber - Order number
 */
function searchForOrder(orderNumber: string): void {
  cy.get('cx-order-history')
    .get('td.cx-order-history-code a.cx-order-history-value')
    .each((elem) => {
      const order = elem.text().trim();
      cy.log('order number: ' + order);
      cy.log('searched order number: ' + orderNumber);
      if (order === orderNumber) {
        cy.wrap(true).as('isFound');
        return false;
      } else {
        cy.wrap(false).as('isFound');
      }
    });
}

/**
 * Selects the order by the oder number alias.
 *
 * @param {string} shopName - shop name
 *
 */
export function selectOrderByOrderNumberAlias(shopName: string): void {
  cy.get('@orderNumber').then((orderNumber) => {
    cy.log('Searched order number: ' + orderNumber);
    // To refresh the order history content, navigate to the home page and back to the order history
    cy.log('Navigate to home page');
    navigation.visitHomePage({});
    this.goToOrderHistory(shopName);

    // Verify whether the searched order exists
    searchForOrder(orderNumber.toString());
    cy.get('@isFound').then((isFound) => {
      let found = isFound ? ' ' : ' not ';
      cy.log("Order with number '" + orderNumber + "' is" + found + 'found');
      if (!isFound) {
        cy.waitForOrderToBePlacedRequest(
          shopName,
          'USD',
          orderNumber.toString()
        );

        searchForOrder(orderNumber.toString());
        cy.get('@isFound').then((isOFound) => {
          found = isOFound ? ' ' : ' not ';
          cy.log(
            "Order with number '" + orderNumber + "' is" + found + 'found'
          );
          if (!isFound) {
            // To refresh the order history content, navigate to the home page and back to the order history
            cy.log('Navigate to home page');
            navigation.visitHomePage({});
            this.goToOrderHistory(shopName);
          }
        });
      }
      // Navigate to the order details page of the searched order
      cy.get(
        'cx-order-history a.cx-order-history-value:contains(' +
          `${orderNumber}` +
          ')'
      )
        .click()
        .then(() => {
          navigateToOrderDetails();
        });
    });
  });
}

/**
 * Defines the order number alias.
 */
export function defineOrderNumberAlias(): void {
  const orderConfirmationText = 'Confirmation of Order:';

  cy.get('cx-order-confirmation-thank-you-message h1.cx-page-title')
    .first()
    .invoke('text')
    .then((text) => {
      expect(text).contains(orderConfirmationText);
      const orderNumber = text.replace(orderConfirmationText, '').trim();
      expect(orderNumber).match(/^[0-9]+$/);
      cy.wrap(orderNumber).as('orderNumber');
    });
}

/**
 * Conducts the checkout.
 */
export function checkout(): void {
  cy.log('Complete checkout process');
  cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
  cy.log('Fulfill shipping address form');
  fillShippingAddress(shippingAddressData, false);

  cy.log("Navigate to the next step 'Delivery mode' tab");
  cy.get('button.btn-primary')
    .contains('Continue')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/checkout/delivery-mode');
      cy.get('.cx-checkout-title').should('contain', 'Shipping Method');
      cy.get('cx-delivery-mode').should('be.visible');
    });

  cy.log("Navigate to the next step 'Payment details' tab");
  cy.get('button.btn-primary')
    .contains('Continue')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/checkout/payment-details');
      cy.get('.cx-checkout-title').should('contain', 'Payment');
      cy.get('cx-payment-method').should('be.visible');
    });

  cy.log('Fulfill payment details form');
  fillPaymentDetails(paymentDetailsData, billingAddress);

  cy.log("Check 'Terms & Conditions'");
  cy.get('input[formcontrolname="termsAndConditions"]')
    .check()
    .then(() => {
      cy.get('cx-place-order form').should('have.class', 'ng-valid');
    });

  cy.log('Place order');
  cy.get('cx-place-order button.btn-primary')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/order-confirmation');
      cy.get('cx-breadcrumb').should('contain', 'Order Confirmation');
    });

  cy.log('Define order number alias');
  defineOrderNumberAlias();
}

/**
 * Conducts the B2B checkout.
 */
export function checkoutB2B(): void {
  cy.log('Complete B2B checkout process');
  cy.log('Select Account Payment Method');
  cy.get(`#paymentType-ACCOUNT`).click({ force: true });
  cy.log("Navigate to the next step 'Shipping Address' tab");
  cy.get('button.btn-primary')
    .contains('Continue')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/checkout/shipping-address');
      cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
      cy.get('cx-shipping-address').should('be.visible');
    });
  cy.log("Navigate to the next step 'Delivery mode' tab");
  cy.get('button.btn-primary')
    .contains('Continue')
    .click()
    .then(() => {
      cy.wait('@deliveryMode');
      cy.location('pathname').should('contain', '/checkout/delivery-mode');
      cy.get('.cx-checkout-title').should('contain', 'Shipping Method');
      cy.get('cx-delivery-mode').should('be.visible');
    });

  cy.log("Navigate to the next step 'Review Order' tab");
  cy.get('button.btn-primary')
    .contains('Continue')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/checkout/review-order');
      cy.get('.cx-review').should('contain', 'Review');
      cy.get('cx-review-submit').should('be.visible');
    });

  cy.log("Check 'Terms & Conditions'");
  cy.get('input[formcontrolname="termsAndConditions"]')
    .check()
    .then(() => {
      cy.get('cx-place-order form').should('have.class', 'ng-valid');
    });

  cy.log('Place order');
  cy.get('cx-place-order button.btn-primary')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/order-confirmation');
      cy.get('cx-breadcrumb').should('contain', 'Order Confirmation');
    });

  cy.log('Define order number alias');
  defineOrderNumberAlias();
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
 * Check for global error message to be shown
 */
export function checkGlobalErrorMessageShown() {
  globalMessage.getErrorAlert().should('be.visible');
}

/**
 * Check for global warning message to be shown
 */
export function checkWarningMessageShown() {
  globalMessage.getAlert().should('be.visible');
}

/**
 * Verifies whether the global success message is not displayed on the top of the configuration.
 */
export function checkSuccessMessageNotDisplayed(): void {
  globalMessage.getSuccessAlert().should('not.exist');
}

/**
 * Close global error messages
 */
export function closeErrorMessages() {
  cy.get('.alert-danger .close').click({ multiple: true, force: true });
}

/**
 * Close global warning messages
 */
export function closeWarningMessages() {
  cy.get('.alert-warning .close').click({ multiple: true, force: true });
}

/**
 * Get number of cart items
 *
 * @returns number of cart items
 */
export function getNumberOfCartItems(): number {
  let numberOfCartItems = 0;
  cy.get('.cx-item-list-row').within((itemRows) => {
    numberOfCartItems = itemRows.length;
  });
  return numberOfCartItems;
}

/**
 * Search for a corresponding bundle item.
 *
 * @param {number} cartItemIndex - Index of cart item
 * @returns {Chainable<JQuery<HTMLElement>>} - Corresponding bundle item
 */
function findBundleItem(cartItemIndex: number): Chainable<JQuery<HTMLElement>> {
  return cy
    .get('cx-cart-item-list .cx-item-list-row')
    .eq(cartItemIndex)
    .find('cx-configurator-cart-entry-bundle-info');
}

/**
 * Verifies the name of bundle item.
 *
 * @param {number} cartItemIndex - Index of cart item
 * @param {number} bundleItemIndex - Index of bundle item
 * @param {string} name - Expected name of bundle item
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
 * @param {number} cartItemIndex - Index of cart item
 * @param {number} bundleItemIndex - Index of bundle item
 * @param {string} price - Expected price of bundle item
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
 * @param {number} cartItemIndex - Index of cart item
 * @param {number} bundleInfoIndex - Index of bundle item
 * @param {string} quantity - Expected quantity of bundle item
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
 * Toggle bundle items via 'show' or 'hide' link
 *
 * @param {string} linkName - Name of the toggled link
 */
function toggleBundleItems(linkName: string) {
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
}

/**
 * Verifies the amount of bundle items for a certain cart item.
 *
 * @param {number} cartItemIndex - Index of cart item
 * @param {number} itemsAmount - Expected amount of bundle items
 */
export function checkAmountOfBundleItems(
  cartItemIndex: number,
  itemsAmount: number
) {
  findBundleItem(cartItemIndex).within(() => {
    cy.get('.cx-number-items').should('contain', itemsAmount);
    toggleBundleItems('show');
  });
}

/**
 * Verifies the amount of cart entries.
 *
 * @param {number} expectedCount - Expected amount of cart entries
 */
export function verifyCartCount(expectedCount: number) {
  cy.log('expectedCount =' + expectedCount);
  cy.get('cx-mini-cart .count').contains(expectedCount);
}

/**
 * Define alias for deliveryMode API call.
 */
export function defineDeliveryModeAlias() {
  cy.intercept('PUT', '**/deliverymode*').as('deliveryMode');
}
