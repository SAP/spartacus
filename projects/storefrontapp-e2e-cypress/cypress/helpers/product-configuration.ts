import * as authentication from './auth-forms';

const nextBtnSelector = 'cx-config-previous-next-buttons div div:last button';
const previousBtnSelector =
  'cx-config-previous-next-buttons div div:first button';
const addToCartButtonSelector = 'cx-config-add-to-cart-button button';

const email = 'cpq02@sap.com';
const password = 'welcome';

const conflictDetectedMsgSelector = '.cx-config-attribute-conflict-container';
const conflictHeaderGroupSelector =
  'cx-config-group-menu li.cx-config-menu-conflict';

const resolveIssuesLinkSelector =
  'cx-configure-cart-entry button.cx-action-link';

/**
 * Navigates to the product configuration page.
 *
 * @param {string} configuratorType - Configuration type
 * @param {string} productId - Product ID
 */
export function goToConfigurationPage(
  configuratorType: string,
  productId: string
) {
  cy.visit(
    `/electronics-spa/en/USD/configure${configuratorType}/product/entityKey/${productId}`
  ).then(() => {
    this.isConfigPageDisplayed();
  });
}

/**
 * Verifies whether the global message is not displayed on the top of the configuration.
 */
function isGlobalMessageNotDisplayed() {
  cy.get('cx-global-message').should('not.be.visible');
}

/**
 * Verifies whether the updating configuration message is not displayed on the top of the configuration.
 */
function isUpdatingMessageNotDisplayed() {
  cy.get('.cx-config-update-message').should('not.be.visible');
}

/**
 * Clicks on 'Add to Cart' button
 */
export function clickOnConfigureBtn() {
  cy.get('cx-configure-product a')
    .click()
    .then(() => {
      this.isConfigPageDisplayed();
    });
}

/**
 * Clicks on the 'Edit Configuration' link in cart for a certain cart item.
 *
 * @param {number} cartItemIndex - Index of cart item
 */
export function clickOnEditConfigurationLink(cartItemIndex: number) {
  cy.get('cx-cart-item-list .cx-item-list-row')
    .eq(cartItemIndex)
    .find('cx-configure-cart-entry')
    .within(() => {
      cy.get('button:contains("Edit")').click();
    });
}

/**
 * Verifies whether the current group is active.
 *
 * @param {string} currentGroup - Active group
 */
function isCurrentGroupActive(currentGroup: string) {
  cy.get(
    'cx-config-group-title .cx-config-group-title:contains(' +
      `${currentGroup}` +
      ')'
  ).should('be.visible');
  cy.get('a.active:contains(' + `${currentGroup}` + ')').should('be.visible');
}

/**
 * Clicks on 'previous' or 'next' button.
 *
 * @param {string} btnSelector - Button selector
 * @param {string} activeGroup - Name of the group that should be active after click
 */
function clickOnPreviousOrNextBtn(btnSelector: string, activeGroup: string) {
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
export function clickOnNextBtn(nextGroup: string) {
  clickOnPreviousOrNextBtn(nextBtnSelector, nextGroup);
}

/**
 * Clicks on the previous group Button and verifies that an element of the previous group is displayed.
 *
 * @param {string} previousGroup - Expected previous group name
 */
export function clickOnPreviousBtn(previousGroup: string) {
  clickOnPreviousOrNextBtn(previousBtnSelector, previousGroup);
}

/**
 * Verifies whether the configuration page is displayed.
 */
export function isConfigPageDisplayed() {
  isUpdatingMessageNotDisplayed();
  cy.get('cx-config-form').should('be.visible');
  isUpdatingMessageNotDisplayed();
}

/**
 * Verifies whether the 'previous' button is enabled.
 */
export function isPreviousBtnEnabled() {
  cy.get(previousBtnSelector).should('be.not.disabled');
}

/**
 * Verifies whether the 'previous' button is disabled.
 */
export function isPreviousBtnDisabled() {
  cy.get(previousBtnSelector).should('be.disabled');
}

/**
 * Verifies whether the 'next' button is enabled.
 */
export function isNextBtnEnabled() {
  cy.get(nextBtnSelector).should('be.not.disabled');
}

/**
 * Verifies whether the 'next' button is disabled.
 */
export function isNextBtnDisabled() {
  cy.get(nextBtnSelector).should('be.disabled');
}

/**
 * Verifies whether status icon is not displayed.
 *
 * @param {string} groupName - Group name
 */
export function isStatusIconNotDisplayed(groupName: string) {
  cy.get(
    '.' +
      `${'ERROR'}` +
      '.cx-config-menu-item>a:contains(' +
      `${groupName}` +
      ')'
  ).should('not.exist');

  cy.get(
    '.' +
      `${'COMPLETE'}` +
      '.cx-config-menu-item>a:contains(' +
      `${groupName}` +
      ')'
  ).should('not.exist');
}

/**
 * Verifies whether status icon is displayed.
 *
 * @param {string} groupName - Group name
 * @param {string} status - Status
 */
export function isStatusIconDisplayed(groupName: string, status: string) {
  cy.get(
    '.' +
      `${status}` +
      '.cx-config-menu-item>a:contains(' +
      `${groupName}` +
      ')'
  ).should('exist');
}

/**
 * Verifies whether the attribute is displayed.
 *
 * @param {string} attributeName - Attribute name
 * @param {string} uiType - UI type
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
 */
export function getAttributeId(attributeName: string, uiType: string) {
  return `cx-config--${uiType}--${attributeName}`;
}

/**
 * Retrieves the attribute label id.
 *
 * @param {string} attributeName - Attribute name
 */
export function getAttributeLabelId(attributeName: string) {
  return `cx-config--label--${attributeName}`;
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
) {
  const attributeId = getAttributeId(attributeName, uiType);
  const valueId = `${attributeId}--${valueName}`;

  switch (uiType) {
    case 'radioGroup':
    case 'checkBoxList':
    case 'multi_selection_image':
    case 'single_selection_image':
      cy.get(`#${valueId}`)
        .click({ force: true })
        .then(() => {
          cy.get(`#${valueId}`).should('be.checked');
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
 */
export function isImageSelected(
  attributeName: string,
  uiType: string,
  valueName: string
) {
  const attributeId = getAttributeId(attributeName, uiType);
  const valueId = `${attributeId}--${valueName}-input`;
  cy.get(`#${valueId}`).should('be.checked');
}

/**
 * Verifies whether the image value is not selected.
 *
 * @param {string} attributeName - Attribute name
 * @param {string} uiType - UI type
 * @param {string} valueName - Value name
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
 */
export function isConflictDetectedMsgNotDisplayed(attributeName: string) {
  const parent = cy.get(conflictDetectedMsgSelector).parent();
  const attributeId = this.getAttributeLabelId(attributeName);
  parent.children(`#${attributeId}`).should('not.exist');
}

/**
 * Verifies whether the conflict description is displayed.
 *
 * @param {string} description - Conflict description
 */
export function isConflictDescriptionDisplayed(description: string) {
  cy.get('.cx-config-conflict-description').should(($div) => {
    expect($div).to.contain(description);
  });
}

/**
 * Verifies whether the conflict header group is displayed.
 */
function isConflictHeaderGroupDisplayed() {
  cy.get(conflictHeaderGroupSelector).should('be.visible');
}

/**
 * Verifies whether the conflict header group is not displayed.
 */
function isConflictHeaderGroupNotDisplayed() {
  cy.get(conflictHeaderGroupSelector).should('not.exist');
}

/**
 * Verifies whether the expected number of conflicts is accurate.
 *
 * @param {number} numberOfConflicts - Expected number of conflicts
 */
function verifyNumberOfConflicts(numberOfConflicts: number) {
  cy.get('cx-config-group-menu .conflictNumberIndicator').contains(
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
) {
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
) {
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
export function checkNotificationBanner(element, numberOfIssues?: number) {
  const resolveIssuesText =
    'issues must be resolved before checkout.  Resolve Issues';
  element
    .get('.cx-error-msg-container')
    .first()
    .invoke('text')
    .then((text) => {
      expect(text).contains(resolveIssuesText);
      const issues = text.replace(resolveIssuesText, '').trim();
      expect(issues).match(/^[0-9]/);
      expect(issues).eq(numberOfIssues.toString());
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
) {
  const element = cy
    .get('cx-cart-item-list .cx-item-list-row')
    .eq(cartItemIndex)
    .find('cx-configure-issues-notification');

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
export function clickOnResolveIssuesLinkInCart(cartItemIndex: number) {
  cy.get('cx-cart-item-list .cx-item-list-row')
    .eq(cartItemIndex)
    .find('cx-configure-issues-notification')
    .within(() => {
      cy.get(resolveIssuesLinkSelector).click();
    });
}

/**
 * Verifies whether the group menu is displayed.
 */
export function isGroupMenuDisplayed() {
  cy.get('cx-config-group-menu').should('be.visible');
}

/**
 * Verifies whether the group menu is not displayed.
 */
export function isGroupMenuNotDisplayed() {
  cy.get('cx-config-group-menu').should('not.be.visible');
}

/**
 * Verifies whether the category navigation is displayed.
 */
export function isCategoryNavigationDisplayed() {
  cy.get('cx-category-navigation').should('be.visible');
}

/**
 * Verifies whether the category navigation is displayed.
 */
export function isCategoryNavigationNotDisplayed() {
  cy.get('cx-category-navigation').should('not.be.visible');
}

/**
 * Verifies the accuracy of the formatted price.
 *
 * @param {string} formattedPrice - Formatted price
 */
export function isTotalPrice(formattedPrice: string) {
  cy.get('cx-price-summary-total-price cx-summary-amount').should(($div) => {
    expect($div).to.contain(formattedPrice);
  });
}

/**
 * Navigates to the overview page via the overview tab.
 */
export function navigateToOverviewPage() {
  cy.get('cx-config-tab-bar div div:last a').click({
    force: true,
  });
}

/**
 * Clicks on the group via its index in the group menu.
 *
 * @param {number} groupIndex - Group index
 */
export function clickOnGroup(groupIndex: number) {
  cy.get('.cx-config-menu>li')
    .eq(groupIndex)
    .children('a')
    .click({ force: true });
}

/**
 * Clicks the group menu.
 */
export function clickHamburger() {
  cy.get('cx-hamburger-menu [aria-label="Menu"]')
    .click()
    .then(() => {
      isUpdatingMessageNotDisplayed();
    });
}

/**
 * Verifies whether the group menu is displayed.
 */
export function isHamburgerDisplayed() {
  cy.get('cx-hamburger-menu [aria-label="Menu"]').should('be.visible');
}

/**
 * Clicks on the 'Add to cart' button.
 */
export function clickAddToCartBtn() {
  cy.get(addToCartButtonSelector)
    .click()
    .then(() => {
      isUpdatingMessageNotDisplayed();
      isGlobalMessageNotDisplayed();
      isUpdatingMessageNotDisplayed();
      cy.get('cx-config-overview-form').should('be.visible');
    });
}

/**
 * Clicks on 'Add to cart' on the product details page.
 */
export function clickOnAddToCartBtnOnPD() {
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
export function clickOnViewCartBtnOnPD() {
  cy.get('div.cx-dialog-buttons a.btn-primary')
    .contains('view cart')
    .click()
    .then(() => {
      cy.get('h1').contains('Your Shopping Cart').should('be.visible');
      cy.get('cx-cart-details').should('be.visible');
    });
}

/**
 * Clicks on 'Proceed to Checkout' on the product details page.
 */
export function clickOnProceedToCheckoutBtnOnPD() {
  cy.get('div.cx-dialog-buttons a.btn-secondary')
    .contains('proceed to checkout')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/checkout/shipping-address');
      cy.get('cx-checkout-progress a.cx-link.active').should(
        'contain',
        'Shipping Address'
      );
      cy.get('cx-shipping-address').should('be.visible');
    });
}

/**
 * Logs in.
 */
export function login() {
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
  const user = email.split('@')[0];
  cy.get('.cx-login-greet').should('contain', user);
}

/**
 * Navigates to the order details page.
 */
export function navigateToOrderDetails() {
  // Verify whether the ordered product is displayed in the order list
  cy.get('cx-cart-item-list cx-configure-cart-entry button')
    .first()
    .click()
    .then(() => {
      cy.get('cx-config-overview-form').should('be.visible');
    });
}

/**
 * Navigates to the oder history page.
 */
export function goToOrderHistory() {
  cy.visit('/electronics-spa/en/USD/my-account/orders').then(() => {
    cy.get('cx-order-history').should('be.visible');
  });
}

/**
 * Selects the order by the oder number alias.
 */
export function selectOrderByOrderNumberAlias() {
  cy.get('@orderNumber').then((orderNumber) => {
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
}

/**
 * Defines the order number alias.
 */
export function defineOrderNumberAlias() {
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
export function checkout() {
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
      cy.get('cx-checkout-progress a.cx-link.active').should(
        'contain',
        'Delivery mode'
      );
      cy.get('cx-delivery-mode').should('be.visible');
    });

  // Click on 'Continue' button to navigate to the next step 'Payment details' of the order process
  cy.get('button.btn-primary')
    .contains('Continue')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/checkout/payment-details');
      cy.get('cx-checkout-progress a.cx-link.active').should(
        'contain',
        'Payment details'
      );
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
      cy.get('cx-checkout-progress a.cx-link.active').should(
        'contain',
        'Review order'
      );
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
