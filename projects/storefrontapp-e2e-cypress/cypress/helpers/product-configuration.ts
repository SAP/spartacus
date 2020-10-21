import * as authentication from './auth-forms';
import Chainable = Cypress.Chainable;
import { navigation } from './navigation';

const nextBtnSelector =
  'cx-configurator-previous-next-buttons button:contains("Next")';
const previousBtnSelector =
  'cx-configurator-previous-next-buttons button:contains("Previous")';
const addToCartButtonSelector = 'cx-configurator-add-to-cart-button button';

const email = 'test-user-for-variant-configuration@ydev.hybris.com';
const password = 'Password123.';
const user = 'Variant Configuration';

const conflictDetectedMsgSelector = '.cx-conflict-msg';
const conflictHeaderGroupSelector =
  'cx-configurator-group-menu li.cx-menu-conflict';

const resolveIssuesLinkSelector =
  'cx-configure-cart-entry button.cx-action-link';

/**
 * Navigates to the product configuration page.
 *
 * @param {string} productId - Product ID
 * @return {Chainable<Window>} - New configuration window
 */
export function goToConfigurationPage(productId: string): Chainable<Window> {
  const location = `/electronics-spa/en/USD/configure/vc/product/entityKey/${productId}`;
  return cy.visit(location).then(() => {
    cy.location('pathname').should('contain', location);
    this.isConfigPageDisplayed();
  });
}

/**
 * Verifies whether the global message is not displayed on the top of the configuration.
 *
 * @return - 'True' if the global message component is not visible, otherwise 'false'
 */
export function isGlobalMessageNotDisplayed() {
  cy.get('cx-global-message').should('not.be.visible');
}

/**
 * Verifies whether the updating configuration message is not displayed on the top of the configuration.
 *
 * @return - 'True' if the updating message component is not visible, otherwise 'false'
 */
export function isUpdatingMessageNotDisplayed() {
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
      this.isConfigPageDisplayed();
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
      cy.get('button:contains("Edit")')
        .click()
        .then(() => {
          cy.location('pathname').should('contain', '/cartEntry/entityKey/');
        });
    });
}

/**
 * Verifies whether the corresponding value ID is focused.
 *
 * @param {string} attributeName - Attribute name
 * @param {string} uiType - UI type
 * @param {string} valueName - Value name
 * @return - 'True' if attribute ID is focused, otherwise 'false'
 */
export function checkFocus(
  attributeName: string,
  uiType: string,
  valueName: string
) {
  const attributeId = getAttributeId(attributeName, uiType);
  const valueId = `${attributeId}--${valueName}`;
  cy.focused().should('have.attr', 'id', valueId);
}

/**
 * Verifies whether the current group is active.
 *
 * @param {string} currentGroup - Active group
 * @return - 'True' if the current group is active, otherwise 'false'
 */
function isCurrentGroupActive(currentGroup: string) {
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
      isUpdatingMessageNotDisplayed();
      isCurrentGroupActive(activeGroup);
      isUpdatingMessageNotDisplayed();
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
 *
 * @return - 'True' if the configuration page is visible, otherwise 'false'
 */
export function isConfigPageDisplayed() {
  isGlobalMessageNotDisplayed();
  isUpdatingMessageNotDisplayed();
  isUpdatingMessageNotDisplayed();
  isConfigTabBarDisplayed();
  isGroupTitleDisplayed();
  isGroupFormDisplayed();
  isPreviousAndNextBtnsDispalyed();
  isPriceSummaryDisplayed();
  isAddToCartBtnDisplayed();
  isProductTitleDisplayed();
  isShowMoreLinkAtProductTitleDisplayed();
  isUpdatingMessageNotDisplayed();
}

/**
 * Verifies whether the product title component is displayed.
 *
 * @return - 'True' if the product title is visible, otherwise 'false'
 */
export function isProductTitleDisplayed() {
  cy.get('cx-configurator-product-title').should('be.visible');
}

/**
 * Verifies whether 'show more' link is displayed in the product title component.
 *
 * @return - 'True' if show more' link is visible, otherwise 'false'
 */
export function isShowMoreLinkAtProductTitleDisplayed() {
  cy.get('a:contains("show more")').should('be.visible');
}

/**
 * Verifies whether the product title component is displayed.
 *
 * @return - 'True' if the product title is visible, otherwise 'false'
 */
function isConfigTabBarDisplayed() {
  cy.get('cx-configurator-tab-bar').should('be.visible');
}

/**
 * Verifies whether the 'previous' button is enabled.
 *
 * @return - 'True' if the 'previous' button is not disabled, otherwise 'false'
 */
export function isPreviousBtnEnabled() {
  cy.get(previousBtnSelector).should('be.not.disabled');
}

/**
 * Verifies whether the 'previous' button is disabled.
 *
 * @return - 'True' if the 'previous' button is disabled, otherwise 'false'
 */
export function isPreviousBtnDisabled() {
  cy.get(previousBtnSelector).should('be.disabled');
}

/**
 * Verifies whether the 'next' button is enabled.
 *
 * @return - 'True' if the 'next' button is not disabled, otherwise 'false'
 */
export function isNextBtnEnabled() {
  cy.get(nextBtnSelector).should('be.not.disabled');
}

/**
 * Verifies whether the 'next' button is disabled.
 *
 * @return - 'True' if the 'next' button is disabled, otherwise 'false'
 */
export function isNextBtnDisabled() {
  cy.get(nextBtnSelector).should('be.disabled');
}

/**
 * Verifies whether status icon is not displayed.
 *
 * @param {string} groupName - Group name
 * @return - 'True' if the status icon does not exist, otherwise 'false'
 */
export function isStatusIconNotDisplayed(groupName: string) {
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
 * @return - 'True' if the status icon exists, otherwise 'false'
 */
export function isStatusIconDisplayed(groupName: string, status: string) {
  cy.get(
    '.' + `${status}` + '.cx-menu-item>a:contains(' + `${groupName}` + ')'
  ).should('exist');
}

/**
 * Verifies whether the attribute is displayed.
 *
 * @param {string} attributeName - Attribute name
 * @param {string} uiType - UI type
 * @return - 'True' if the attribute is displayed, otherwise 'false'
 */
export function isAttributeDisplayed(attributeName: string, uiType: string) {
  const attributeId = getAttributeId(attributeName, uiType);
  cy.get(`#${attributeId}`).should('be.visible');
}

/**
 * Verifies whether the attribute is not displayed.
 *
 * @param {string} attributeName - Attribute name
 * @param {string} uiType - UI type
 * @return - 'True' if the attribute is not displayed, otherwise 'false'
 */
export function isAttributeNotDisplayed(attributeName: string, uiType: string) {
  const attributeId = getAttributeId(attributeName, uiType);
  cy.get(`#${attributeId}`).should('be.not.visible');
}

/**
 * Verifies whether the attribute value is displayed.
 *
 * @param {string} attributeName - Attribute name
 * @param {string} uiType - UI type
 * @param {string} valueName - Value name
 * @return - 'True' if the attribute value is visible, otherwise 'false'
 */
export function isAttributeValueDisplayed(
  attributeName: string,
  uiType: string,
  valueName: string
) {
  const attributeId = getAttributeId(attributeName, uiType);
  const valueId = `${attributeId}--${valueName}`;
  cy.get(`#${valueId}`).should('be.visible');
}

/**
 * Verifies whether the attribute value is not displayed.
 *
 * @param {string} attributeName - Attribute name
 * @param {string} uiType - UI type
 * @param {string} valueName - Value name
 * @return - 'True' if the attribute value is not visible, otherwise 'false'
 */
export function isAttributeValueNotDisplayed(
  attributeName: string,
  uiType: string,
  valueName: string
) {
  const attributeId = getAttributeId(attributeName, uiType);
  const valueId = `${attributeId}--${valueName}`;
  cy.get(`#${valueId}`).should('be.not.visible');
}

/**
 * Retrieves attribute ID.
 *
 * @param {string} attributeName - Attribute name
 * @param {string} uiType - UI type
 * @return {string} - Attribute ID
 */
export function getAttributeId(attributeName: string, uiType: string): string {
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
 * @param {string} uiType - UI type
 * @param {string} valueName - Value name
 * @param {string} value - Value
 */
export function selectAttribute(
  attributeName: string,
  uiType: string,
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
          isUpdatingMessageNotDisplayed();
          cy.get(`#${valueId}-input`).should('be.checked');
        });
      break;
    case 'dropdown':
      cy.get(`#${attributeId} ng-select`).ngSelect(valueName);
      break;
    case 'input':
      cy.get(`#${valueId}`).clear().type(value);
  }

  isUpdatingMessageNotDisplayed();
}

/**
 * Verifies whether the checkbox is selected.
 *
 * @param {string} attributeName - Attribute name
 * @param {string} valueName - Value name
 * @return - 'True' if the checkbox is selected, otherwise 'false'
 */
export function isCheckboxSelected(attributeName: string, valueName: string) {
  const attributeId = getAttributeId(attributeName, 'checkBoxList');
  const valueId = `${attributeId}--${valueName}`;
  cy.get(`#${valueId}`).should('be.checked');
}

/**
 * Verifies whether the image value is selected.
 *
 * @param {string} attributeName - Attribute name
 * @param {string} uiType - UI type
 * @param {string} valueName - Value name
 * @return - 'True' if the image element is selected, otherwise 'false'
 */
export function isImageSelected(
  attributeName: string,
  uiType: string,
  valueName: string
) {
  const attributeId = getAttributeId(attributeName, uiType);
  const valueId = `${attributeId}--${valueName}-input`;
  cy.log('valueId: ' + valueId);
  cy.get(`#${valueId}`).should('be.checked');
}

/**
 * Verifies whether the image value is not selected.
 *
 * @param {string} attributeName - Attribute name
 * @param {string} uiType - UI type
 * @param {string} valueName - Value name
 * @return - 'True' if the image element is not selected, otherwise 'false'
 */
export function isImageNotSelected(
  attributeName: string,
  uiType: string,
  valueName: string
) {
  const attributeId = getAttributeId(attributeName, uiType);
  const valueId = `${attributeId}--${valueName}-input`;
  cy.get(`#${valueId}`).should('not.be.checked');
}

/**
 * Verifies whether the conflict detected under the attribute name is displayed.
 *
 * @param {string} attributeName - Attribute name
 * @return - 'True' if the conflict detected message is visible, otherwise 'false'
 */
export function isConflictDetectedMsgDisplayed(attributeName: string) {
  const parent = cy.get(conflictDetectedMsgSelector).parent();
  const attributeId = this.getAttributeLabelId(attributeName);
  parent.children(`#${attributeId}`).should('be.visible');
}

/**
 * Verifies whether the conflict detected under the attribute name is not displayed.
 *
 * @param {string} attributeName - Attribute name
 * @return - 'True' if the conflict detected message does not exist, otherwise 'false'
 */
export function isConflictDetectedMsgNotDisplayed(attributeName: string) {
  const attributeId = this.getAttributeLabelId(attributeName);
  cy.get(`#${attributeId}`).next().should('not.exist');
}

/**
 * Verifies whether the conflict description is displayed.
 *
 * @param {string} description - Conflict description
 * @return - 'True' if the expected conflict description equals the actual one, otherwise 'false'
 */
export function isConflictDescriptionDisplayed(description: string) {
  cy.get('cx-configurator-conflict-description').should(($div) => {
    expect($div).to.contain(description);
  });
}

/**
 * Verifies whether the conflict header group is displayed.
 *
 * @return - 'True' if the conflict header group is visible, otherwise 'false'
 */
function isConflictHeaderGroupDisplayed() {
  cy.get(conflictHeaderGroupSelector).should('be.visible');
}

/**
 * Verifies whether the conflict header group is not displayed.
 *
 * @return - 'True' if the conflict header group is not visible, otherwise 'false'
 */
function isConflictHeaderGroupNotDisplayed() {
  cy.get(conflictHeaderGroupSelector).should('not.exist');
}

/**
 * Verifies whether the expected number of conflicts is accurate.
 *
 * @param {number} numberOfConflicts - Expected number of conflicts
 */
function verifyNumberOfConflicts(numberOfConflicts: number): void {
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
 * @param {string} uiType - UI type
 * @param {string} valueName - Value name
 * @param {number} numberOfConflicts - Expected number of conflicts
 */
export function selectConflictingValue(
  attributeName: string,
  uiType: string,
  valueName: string,
  numberOfConflicts: number
): void {
  this.selectAttribute(attributeName, uiType, valueName);
  this.isConflictDetectedMsgDisplayed(attributeName);
  isConflictHeaderGroupDisplayed();
  verifyNumberOfConflicts(numberOfConflicts);
}

/**
 * Deselects a conflicting value, namely deselects a value.
 * Then verifies whether the conflict detected message under the attribute name is not displayed anymore and
 * the conflict header group in the group menu is not displayed either.
 *
 * @param {string} attributeName - Attribute name
 * @param {string} uiType - UI type
 * @param {string} valueName - Value name
 */
export function deselectConflictingValue(
  attributeName: string,
  uiType: string,
  valueName: string
): void {
  this.selectAttribute(attributeName, uiType, valueName);
  this.isConflictDetectedMsgNotDisplayed(attributeName);
  isConflictHeaderGroupNotDisplayed();
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
  const resolveIssuesText = 'must be resolved before checkout.  Resolve Issues';
  element
    .get('.cx-error-msg-container')
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
export function verifyNotificationBannerInCart(
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
}

/**
 * Verifies whether the group menu is displayed.
 *
 * @return - 'True' if the group menu is visible, otherwise 'false'
 */
export function isGroupMenuDisplayed() {
  cy.get('cx-configurator-group-menu').should('be.visible');
}

/**
 * Verifies whether the group title is displayed.
 *
 * @return - 'True' if the group title is visible, otherwise 'false'
 */
function isGroupTitleDisplayed() {
  cy.get('cx-configurator-group-title').should('be.visible');
}

/**
 * Verifies whether the group form is displayed.
 *
 * @return - 'True' if the group form is visible, otherwise 'false'
 */
function isGroupFormDisplayed() {
  cy.get('cx-configurator-form').should('be.visible');
}

/**
 * Verifies whether the 'previous' and 'next' buttons are displayed.
 *
 * @return - 'True' if the 'previous' and 'next' buttons are visible, otherwise 'false'
 */
function isPreviousAndNextBtnsDispalyed() {
  cy.get('cx-configurator-previous-next-buttons').should('be.visible');
}

/**
 * Verifies whether the price summary is displayed.
 *
 * @return - 'True' if the price summary is visible, otherwise 'false'
 */
function isPriceSummaryDisplayed() {
  cy.get('cx-configurator-price-summary').should('be.visible');
}

/**
 * Verifies whether the 'add to cart' button is displayed.
 *
 * @return - 'True' if the 'add to cart' button is visible, otherwise 'false'
 */
function isAddToCartBtnDisplayed() {
  cy.get('cx-configurator-add-to-cart-button').should('be.visible');
}

/**
 * Verifies whether the group menu is not displayed.
 *
 * @return - 'True' if the group menu is not visible, otherwise 'false'
 */
export function isConfigProductTitleDisplayed() {
  cy.get('a:contains("show more")').should('be.visible');
}

/**
 * Verifies whether the Add To Cart Button component is displayed.
 */
export function isConfigAddToCartButtonDisplayed() {
  cy.get('.cx-configurator-add-to-cart-btn').should('be.visible');
}

/**
 * Verifies whether the overview content is displayed.
 */
export function isOverviewContentDisplayed() {
  cy.get('.cx-configurator-group-attribute').should('be.visible');
}

/**
 * Verifies whether the category navigation is displayed.
 *
 * @return - 'True' if the category navigation is visible, otherwise 'false'
 */
export function isCategoryNavigationDisplayed() {
  cy.get('cx-category-navigation').should('be.visible');
}

/**
 * Verifies whether the category navigation is displayed.
 *
 * @return - 'True' if the category navigation is not visible, otherwise 'false'
 */
export function isCategoryNavigationNotDisplayed() {
  cy.get('cx-category-navigation').should('not.be.visible');
}

/**
 * Verifies the accuracy of the formatted price.
 *
 * @param {string} formattedPrice - Formatted price
 * @return - 'True' if the expected total price equals the actual one, otherwise 'false'
 */
export function isTotalPrice(formattedPrice: string) {
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
function clickOnGroupByGroupIndex(groupIndex: number): void {
  cy.get('cx-configurator-group-menu ul>li.cx-menu-item')
    .not('.cx-menu-conflict')
    .eq(groupIndex)
    .children('a')
    .click({ force: true });
}

/**
 * Clicks on the group via its index in the group menu.
 *
 * @param {number} groupIndex - Group index
 */
export function clickOnGroup(groupIndex: number): void {
  cy.get('cx-configurator-group-menu ul>li.cx-menu-item')
    .not('.cx-menu-conflict')
    .eq(groupIndex)
    .children('a')
    .children()
    .within(() => {
      cy.get('div.subGroupIndicator').within(($list) => {
        cy.log('$list.children().length: ' + $list.children().length);
        cy.wrap($list.children().length).as('subGroupIndicator');
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
}

/**
 * Clicks the group menu.
 */
export function clickHamburger(): void {
  cy.get('cx-hamburger-menu [aria-label="Menu"]')
    .click()
    .then(() => {
      isUpdatingMessageNotDisplayed();
    });
}

/**
 * Verifies whether the group menu is displayed.
 *
 * @return - 'True' if the group menu / hamburger menu is visible, otherwise 'false'
 */
export function isHamburgerDisplayed() {
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
      isUpdatingMessageNotDisplayed();
      isGlobalMessageNotDisplayed();
      isUpdatingMessageNotDisplayed();
      isGlobalMessageNotDisplayed();
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
 * Logs in.
 */
export function login(): void {
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
  cy.get('.cx-login-greet').should('contain', user);
}

/**
 * Navigates to the order details page.
 */
export function navigateToOrderDetails(): void {
  cy.log('Navigate to order detail page');
  // Verify whether the ordered product is displayed in the order list
  cy.get('cx-cart-item-list cx-configure-cart-entry button')
    .first()
    .click()
    .then(() => {
      cy.get('cx-configurator-overview-form').should('be.visible');
    });
}

/**
 * Navigates to the oder history page.
 *
 * @return {Chainable<Window>} - New order history window
 */
export function goToOrderHistory(): Chainable<Window> {
  cy.log('Navigate to order history');
  return cy.visit('/electronics-spa/en/USD/my-account/orders').then(() => {
    cy.get('cx-order-history h3').should('contain', 'Order history');
  });
}

/**
 * This method is a workaround as the login helper signout function did not work sometimes.
 * This works only on desktop mode and does not support mobile.
 */
export function signOutUser() {
  cy.get(
    'cx-login > cx-page-slot > cx-navigation > cx-navigation-ui > nav > div > div'
  )
    .findAllByText(new RegExp('Sign Out', 'i'))
    .click({ force: true, multiple: true });

  cy.get('cx-login .cx-login-greet').should('not.exist');
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
 */
export function selectOrderByOrderNumberAlias(): void {
  cy.get('@orderNumber').then((orderNumber) => {
    cy.log('Searched order number: ' + orderNumber);
    // To refresh the order history content, navigate to the home page and back to the order history
    cy.log('Navigate to home page');
    navigation.visitHomePage({});
    this.goToOrderHistory();

    // Verify whether the searched order exists
    searchForOrder(orderNumber.toString());
    cy.get('@isFound').then((isFound) => {
      let found = isFound ? ' ' : ' not ';
      cy.log("Order with number '" + orderNumber + "' is" + found + 'found');
      if (!isFound) {
        cy.waitForOrderToBePlacedRequest(
          'electronics-spa',
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
            this.goToOrderHistory();
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
  cy.log('Complete checkout');
  // If 'Continue' button is disable, click on 'Ship to this address' link to enable it
  cy.get('button.btn-primary')
    .contains('Continue')
    .then((btn) => {
      if (btn.is('.disabled')) {
        cy.get('cx-card a.cx-card-link')
          .contains('Ship to this address')
          .click();
      }
    });

  // Click on 'Continue' button to navigate to the next step 'Delivery mode' of the order process
  cy.get('button.btn-primary')
    .contains('Continue')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/checkout/delivery-mode');
      cy.get('.cx-checkout-title').should('contain', 'Shipping Method');
      cy.get('cx-delivery-mode').should('be.visible');
    });

  // Click on 'Continue' button to navigate to the next step 'Payment details' of the order process
  cy.get('button.btn-primary')
    .contains('Continue')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/checkout/payment-details');
      cy.get('.cx-checkout-title').should('contain', 'Payment');
      cy.get('cx-payment-method').should('be.visible');
    });

  // Click on 'Use this payment' link to enable 'Continue' button
  cy.get('div.cx-card-actions a.cx-card-link')
    .contains('Use this payment')
    .click()
    .then(() => {
      cy.get('button.btn-primary').should('not.be.disabled');
    });

  // Click on 'Continue' button to navigate to the next step 'Review order' of the order process
  cy.get('button.btn-primary')
    .contains('Continue')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/checkout/review-order');
      cy.get('.cx-review-title').should('contain', 'Review');
      cy.get('cx-review-submit').should('be.visible');
    });

  // Check 'Terms & Conditions'
  cy.get('input[formcontrolname="termsAndConditions"]')
    .check()
    .then(() => {
      cy.get('cx-place-order form').should('have.class', 'ng-valid');
    });

  // Place order
  cy.get('cx-place-order button.btn-primary')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/order-confirmation');
      cy.get('cx-breadcrumb').should('contain', 'Order Confirmation');
    });

  defineOrderNumberAlias();
}
