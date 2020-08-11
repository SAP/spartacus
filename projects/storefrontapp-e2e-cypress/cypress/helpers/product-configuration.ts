import * as authentication from './auth-forms';

const nextBtnSelector = 'cx-config-previous-next-buttons div div:last button';
const previousBtnSelector =
  'cx-config-previous-next-buttons div div:first button';
const addToCartButtonSelector = 'cx-config-add-to-cart-button button';

const email = 'cpq02@sap.com';
const password = 'welcome';

const editConfigurationSelector =
  'cx-configure-cart-entry button:contains("Edit")';

export function clickOnConfigureBtn() {
  cy.get('cx-configure-product a')
    .click()
    .then(() => {
      this.isConfigPageDisplayed();
    });
}

export function clickOnEditConfigurationLink() {
  cy.get(editConfigurationSelector)
    .click()
    .then(() => {
      this.isConfigPageDisplayed();
    });
}

/**
 * Verifies whether the updating configuration message is not displayed on the top of the configuration.
 */
function isUpdatingMessageNotDisplayed() {
  cy.get('cx-config-message').should('not.be.visible');
}

function clickOnPreviousOrNextBtn(btnSelector: string, followingGroup: string) {
  cy.get(btnSelector)
    .click()
    .then(() => {
      cy.get('a.active:contains(' + `${followingGroup}` + ')').should(
        'be.visible'
      );

      isUpdatingMessageNotDisplayed();
    });
}

/**
 * Click on the next group Button and verifies that an element of the next group is displayed.
 */
export function clickOnNextBtn(nextGroup: string) {
  clickOnPreviousOrNextBtn(nextBtnSelector, nextGroup);
}

/**
 * Click on the previous group Button and verifies that an element of the previous group is displayed.
 */
export function clickOnPreviousBtn(previousGroup: string) {
  clickOnPreviousOrNextBtn(previousBtnSelector, previousGroup);
}

export function isConfigPageDisplayed() {
  cy.get('cx-config-form').should('be.visible');
}

export function isPreviousBtnEnabled() {
  cy.get(previousBtnSelector).should('be.not.disabled');
}

export function isPreviousBtnDisabled() {
  cy.get(previousBtnSelector).should('be.disabled');
}

export function isNextBtnEnabled() {
  cy.get(nextBtnSelector).should('be.not.disabled');
}

export function isNextBtnDisabled() {
  cy.get(nextBtnSelector).should('be.disabled');
}

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

export function isStatusIconDisplayed(groupName: string, status: string) {
  cy.get(
    '.' +
      `${status}` +
      '.cx-config-menu-item>a:contains(' +
      `${groupName}` +
      ')'
  ).should('exist');
}

export function isAttributeDisplayed(attributeName: string, uiType: string) {
  const attributeId = getAttributeId(attributeName, uiType);
  cy.get(`#${attributeId}`).should('be.visible');
}

export function isAttributeNotDisplayed(attributeName: string, uiType: string) {
  const attributeId = getAttributeId(attributeName, uiType);
  cy.get(`#${attributeId}`).should('be.not.visible');
}

export function isAttributeValueDisplayed(
  attributeName: string,
  uiType: string,
  valueName: string
) {
  const attributeId = getAttributeId(attributeName, uiType);
  const valueId = `${attributeId}--${valueName}`;
  cy.get(`#${valueId}`).should('be.visible');
}

export function isAttributeValueNotDisplayed(
  attributeName: string,
  uiType: string,
  valueName: string
) {
  const attributeId = getAttributeId(attributeName, uiType);
  const valueId = `${attributeId}--${valueName}`;
  cy.get(`#${valueId}`).should('be.not.visible');
}

export function getAttributeId(attributeName: string, uiType: string) {
  return `cx-config--${uiType}--${attributeName}`;
}

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

export function isCheckboxSelected(attributeName: string, valueName: string) {
  const attributeId = getAttributeId(attributeName, 'checkBoxList');
  const valueId = `${attributeId}--${valueName}`;
  cy.get(`#${valueId}`).should('be.checked');
}

export function isImageSelected(
  attributeName: string,
  uiType: string,
  valueName: string
) {
  const attributeId = getAttributeId(attributeName, uiType);
  const valueId = `${attributeId}--${valueName}-input`;
  cy.get(`#${valueId}`).should('be.checked');
}

export function isImageNotSelected(
  attributeName: string,
  uiType: string,
  valueName: string
) {
  const attributeId = getAttributeId(attributeName, uiType);
  const valueId = `${attributeId}--${valueName}-input`;
  cy.get(`#${valueId}`).should('not.be.checked');
}

export function isGroupMenuDisplayed() {
  cy.get('cx-config-group-menu').should('be.visible');
}

export function isGroupMenuNotDisplayed() {
  cy.get('cx-config-group-menu').should('not.be.visible');
}

export function isCategoryNavigationDisplayed() {
  cy.get('cx-category-navigation').should('be.visible');
}

export function isCategoryNavigationNotDisplayed() {
  cy.get('cx-category-navigation').should('not.be.visible');
}

export function isConflictDescriptionDisplayed(description) {
  cy.get('.cx-config-conflict-description').should(($div) => {
    expect($div).to.contain(description);
  });
}

export function isTotalPrice(formattedPrice) {
  cy.get('cx-price-summary-total-price cx-summary-amount').should(($div) => {
    expect($div).to.contain(formattedPrice);
  });
}

export function navigateToOverviewPage() {
  cy.get('cx-config-tab-bar div div:last a').click({
    force: true,
  });
}

export function clickOnGroup(groupIndex: number) {
  cy.get('.cx-config-menu>li')
    .eq(groupIndex)
    .children('a')
    .click({ force: true });
}

export function clickHamburger() {
  cy.get('cx-hamburger-menu [aria-label="Menu"]').click();
}

export function isHamburgerDisplayed() {
  cy.get('cx-hamburger-menu [aria-label="Menu"]').should('be.visible');
}

export function clickAddToCartBtn() {
  cy.get(addToCartButtonSelector)
    .click()
    .then(() => {
      cy.get('cx-config-overview-form').should('be.visible');
    });
}

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

export function clickOnViewCartBtnOnPD() {
  cy.get('div.cx-dialog-buttons a.btn-primary').contains('view cart').click();
}

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

export function navigateToOrderDetails() {
  // Verify whether the ordered product is displayed in the order list
  cy.get('cx-cart-item-list cx-configure-cart-entry a')
    .first()
    .click()
    .then(() => {
      cy.get('cx-config-overview-form').should('be.visible');
    });
}

export function goToOrderHistory() {
  cy.visit('/electronics-spa/en/USD/my-account/orders').then(() => {
    cy.get('cx-order-history').should('be.visible');
  });
}

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
