import {
  AddressData,
  fillBillingAddress,
  PaymentDetails,
} from './checkout-forms';
import { user } from '../sample-data/checkout-flow';

const nextGroupButtonSelector =
  'cx-config-previous-next-buttons div div:last button';
const previousGroupButtonSelector =
  'cx-config-previous-next-buttons div div:first button';
const addToCartButtonSelector = 'cx-config-add-to-cart-button button';

export function clickOnConfigureBtn() {
  cy.get('cx-configure-product a')
    .click()
    .then(() => {
      this.isConfigPageDisplayed();
    });
}

export function clickOnConfigureCartEntryBtn() {
  cy.get('cx-configure-cart-entry a')
    .click()
    .then(() => {
      this.isConfigPageDisplayed();
    });
}

/**
 * Click on the next group Button and verifies that an element of the next group is displayed
 *
 * @param attributeName Attribute name of a attribute of the target group. Will be used to verify that the next group is displayed
 * @param uiType UI Type of the attribute of the target group. Will be used to verify that the next group is displayed
 */
export function clickOnNextBtn(attributeName: string, uiType: string) {
  cy.get(nextGroupButtonSelector)
    .click()
    .then(() => {
      this.isAttributeDisplayed(attributeName, uiType);
    });
}

/**
 * Click on the previous group Button and verifies that an element of the previous group is displayed
 *
 * @param attributeName Attribute name of a attribute of the target group. Will be used to verify that the previous group is displayed
 * @param uiType UI Type of the attribute of the target group. Will be used to verify that the previous group is displayed
 */
export function clickOnPreviousBtn(attributeName: string, uiType: string) {
  cy.get(previousGroupButtonSelector)
    .click()
    .then(() => {
      this.isAttributeDisplayed(attributeName, uiType);
    });
}

export function isConfigPageDisplayed() {
  cy.get('cx-config-form').should('be.visible');
}

export function isOverviewPageDisplayed() {
  cy.get('cx-config-overview-form').should('be.visible');
}

export function isPreviousBtnEnabled() {
  cy.get(previousGroupButtonSelector).should('be.not.disabled');
}

export function isPreviousBtnDisabled() {
  cy.get(previousGroupButtonSelector).should('be.disabled');
}

export function isNextBtnEnabled() {
  cy.get(nextGroupButtonSelector).should('be.not.disabled');
}

export function isNextBtnDisabled() {
  cy.get(nextGroupButtonSelector).should('be.disabled');
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
    .debug()
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
    .click({
      force: true,
    })
    .then(() => {
      this.isOverviewPageDisplayed();
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

function fillAddressForm(shippingAddress: AddressData = user) {
  cy.get('.cx-checkout-title').should('contain', 'Shipping Address');
  cy.get('cx-address-form').within(() => {
    cy.get('.country-select[formcontrolname="isocode"]').ngSelect(
      shippingAddress.address.country
    );
    cy.get('[formcontrolname="titleCode"]').ngSelect('Mr.');
    cy.get('[formcontrolname="firstName"]')
      .clear()
      .type(shippingAddress.firstName);
    cy.get('[formcontrolname="lastName"]')
      .clear()
      .type(shippingAddress.lastName);
    cy.get('[formcontrolname="line1"]')
      .clear()
      .type(shippingAddress.address.line1);
    if (shippingAddress.address.line2) {
      cy.get('[formcontrolname="line2"]')
        .clear()
        .type(shippingAddress.address.line2);
    }
    cy.get('[formcontrolname="town"]')
      .clear()
      .type(shippingAddress.address.city);
    if (shippingAddress.address.state) {
      cy.get('.region-select[formcontrolname="isocode"]').ngSelect(
        shippingAddress.address.state
      );
    }
    cy.get('[formcontrolname="postalCode"]')
      .clear()
      .type(shippingAddress.address.postal);
    cy.get('[formcontrolname="phone"]').clear().type(shippingAddress.phone);
    cy.get('button.btn-primary').click({ force: true });
    cy.wait(30000);
  });
}

function fillPaymentDetails(
  paymentDetails: PaymentDetails,
  billingAddress?: AddressData
) {
  cy.get('cx-payment-form').within(() => {
    cy.get('[bindValue="code"]').ngSelect(paymentDetails.payment.card);
    cy.get('[formcontrolname="accountHolderName"]')
      .clear()
      .type(paymentDetails.fullName);
    cy.get('[formcontrolname="cardNumber"]')
      .clear()
      .type(paymentDetails.payment.number);
    cy.get('[formcontrolname="expiryMonth"]').ngSelect(
      paymentDetails.payment.expires.month
    );
    cy.get('[formcontrolname="expiryYear"]').ngSelect(
      paymentDetails.payment.expires.year
    );
    cy.get('[formcontrolname="cvn"]').clear().type(paymentDetails.payment.cvv);
    if (billingAddress) {
      fillBillingAddress(billingAddress);
    } else {
      cy.get('input.form-check-input').check();
    }
    cy.wait(30000);
    cy.get('button.btn.btn-block.btn-primary')
      .contains('Continue')
      .click({ force: true });
  });
}

export function checkout() {
  // Fill shipping address
  fillAddressForm(user);
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
  // Fill payment details
  fillPaymentDetails(user);
  cy.get('cx-review-submit').should('be.visible');
  cy.get('cx-checkout-progress a.cx-link.active').should(
    'contain',
    'Review order'
  );

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
