import * as authentication from './auth-forms';

const nextGroupButtonSelector =
  'cx-config-previous-next-buttons div div:last button';
const previousGroupButtonSelector =
  'cx-config-previous-next-buttons div div:first button';
const addToCartButtonSelector = 'cx-config-add-to-cart-button button';

const email = 'cpq02@sap.com';
const password = 'welcome';

export function clickOnConfigureBtn() {
  cy.get('cx-configure-product a').click({ force: true });
}

export function clickOnConfigureCartEntryBtn() {
  cy.get('cx-configure-cart-entry a').click({ force: true });
}

/**
 * Click on the next group Button and verifies that an element of the next group is displayed
 *
 * @param attributeName Attribute name of a attribute of the target group. Will be used to verify that the next group is displayed
 * @param uiType UI Type of the attribute of the target group. Will be used to verify that the next group is displayed
 */
export function clickOnNextGroupBtn(attributeName: string, uiType: string) {
  cy.get(nextGroupButtonSelector)
    .click({
      force: true,
    })
    .debug();
  verifyAttributeIsDisplayed(attributeName, uiType);
}

/**
 * Click on the previous group Button and verifies that an element of the previous group is displayed
 *
 * @param attributeName Attribute name of a attribute of the target group. Will be used to verify that the previous group is displayed
 * @param uiType UI Type of the attribute of the target group. Will be used to verify that the previous group is displayed
 */
export function clickOnPreviousGroupBtn(attributeName: string, uiType: string) {
  cy.get(previousGroupButtonSelector).click({
    force: true,
  });
  verifyAttributeIsDisplayed(attributeName, uiType);
}

export function verifyConfigurationPageIsDisplayed() {
  cy.get('cx-config-form').should('be.visible');
}

export function verifyOverviewPageIsDisplayed() {
  cy.get('cx-config-overview-form').should('be.visible');
}

export function verifyPreviousGroupBtnIsEnabled() {
  cy.get(previousGroupButtonSelector).should('be.not.disabled');
}

export function verifyPreviousGroupBtnIsDisabled() {
  cy.get(previousGroupButtonSelector).should('be.disabled');
}

export function verifyNextGroupBtnIsEnabled() {
  cy.get(nextGroupButtonSelector).should('be.not.disabled');
}

export function verifyNextGroupBtnIsDisabled() {
  cy.get(nextGroupButtonSelector).should('be.disabled');
}

export function verifyNoStatusIconDisplayed(groupName: string) {
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

export function verifyStatusIconDisplayed(groupName: string, status: string) {
  cy.get(
    '.' +
      `${status}` +
      '.cx-config-menu-item>a:contains(' +
      `${groupName}` +
      ')'
  ).should('exist');
}

export function verifyAttributeIsDisplayed(
  attributeName: string,
  uiType: string
) {
  const attributeId = getAttributeId(attributeName, uiType);
  cy.get(`#${attributeId}`).should('be.visible');
}

export function verifyAttributeIsNotDisplayed(
  attributeName: string,
  uiType: string
) {
  const attributeId = getAttributeId(attributeName, uiType);
  cy.get(`#${attributeId}`).should('be.not.visible');
}

export function verifyAttributeValueIsDisplayed(
  attributeName: string,
  uiType: string,
  valueName: string
) {
  const attributeId = getAttributeId(attributeName, uiType);
  const valueId = `${attributeId}--${valueName}`;
  cy.get(`#${valueId}`).should('be.visible');
}

export function verifyAttributeValueIsNotDisplayed(
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
      cy.get(`#${valueId}`).click({ force: true });
      break;
    case 'dropdown':
      cy.get(`#${attributeId} ng-select`).ngSelect(valueName);
      break;
    case 'input':
      cy.get(`#${valueId}`).clear().type(value);
  }
}

export function verifyCheckboxIsSelected(
  attributeName: string,
  valueName: string
) {
  const attributeId = getAttributeId(attributeName, 'checkBoxList');
  const valueId = `${attributeId}--${valueName}`;
  cy.get(`#${valueId}`).should('be.checked');
}

export function verifyImageIsSelected(
  attributeName: string,
  uiType: string,
  valueName: string
) {
  const attributeId = getAttributeId(attributeName, uiType);
  const valueId = `${attributeId}--${valueName}-input`;
  cy.get(`#${valueId}`).should('be.checked');
}

export function verifyImageIsNotSelected(
  attributeName: string,
  uiType: string,
  valueName: string
) {
  const attributeId = getAttributeId(attributeName, uiType);
  const valueId = `${attributeId}--${valueName}-input`;
  cy.get(`#${valueId}`).should('not.be.checked');
}

export function verifyGroupMenuIsDisplayed() {
  cy.get('cx-config-group-menu').should('be.visible');
}

export function verifyGroupMenuIsNotDisplayed() {
  cy.get('cx-config-group-menu').should('not.be.visible');
}

export function verifyCategoryNavigationIsDisplayed() {
  cy.get('cx-category-navigation').should('be.visible');
}

export function verifyCategoryNavigationIsNotDisplayed() {
  cy.get('cx-category-navigation').should('not.be.visible');
}

export function verifyTotalPrice(formattedPrice) {
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
    .debug()
    .eq(groupIndex)
    .children('a')
    .click({ force: true });
}

export function clickHamburger() {
  cy.get('cx-hamburger-menu [aria-label="Menu"]').click();
}

export function verifyHamburgerIsDisplayed() {
  cy.get('cx-hamburger-menu [aria-label="Menu"]').should('be.visible');
}

export function clickAddToCartBtn() {
  cy.get(addToCartButtonSelector).click({
    force: true,
  });
}

export function clickOnAddToCartBtnOnPD() {
  cy.get('cx-add-to-cart button.btn-primary')
    .contains('Add to cart')
    .click()
    .then(() => {
      cy.get('div.cx-dialog-buttons').should('be.visible');
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
      cy.get('cx-checkout-progress a.cx-link.active').should(
        'contain',
        'Shipping Address'
      );
    });
}

export function waitForPage(page: string, alias: string): string {
  cy.server();
  cy.route(
    'GET',
    `${Cypress.env('OCC_PREFIX')}/${Cypress.env(
      'BASE_SITE'
    )}/cms/pages?*${page}*`
  ).as(alias);
  return alias;
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

export function checkout() {
  // Click on 'Ship to this address' link to enable 'Continue' button
  cy.get('cx-card a.cx-card-link')
    .contains('Ship to this address')
    .click()
    .then(() => {
      cy.get('button.btn-primary').should('not.be.disabled');
    });

  // Click on 'Continue' button to navigate to the next step 'Delivery mode' of the order process
  cy.get('button.btn-primary')
    .contains('Continue')
    .click()
    .then(() => {
      cy.get('cx-delivery-mode').should('be.visible');
      cy.get('cx-checkout-progress a.cx-link.active').should(
        'contain',
        'Delivery mode'
      );
    });

  // Click on 'Continue' button to navigate to the next step 'Payment details' of the order process
  cy.get('button.btn-primary')
    .contains('Continue')
    .click()
    .then(() => {
      cy.get('cx-payment-method').should('be.visible');
      cy.get('cx-checkout-progress a.cx-link.active').should(
        'contain',
        'Payment details'
      );
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
      cy.get('cx-review-submit').should('be.visible');
      cy.get('cx-checkout-progress a.cx-link.active').should(
        'contain',
        'Review order'
      );
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
      cy.get('cx-breadcrumb').should('contain', 'Order Confirmation');
    });

  // Verify whether the ordered product is displayed in the order list
  cy.get('cx-cart-item-list cx-configure-cart-entry a')
    .first()
    .click()
    .then(() => {
      cy.get('cx-config-overview-form').should('be.visible');
    });
}
