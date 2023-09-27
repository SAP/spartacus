/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as authentication from './auth-forms';
import * as common from './common';

/** alias for GET Quote Route */
export const GET_QUOTE_ALIAS = '@GET_QUOTE';
export const STATUS_SUBMITTED = 'Submitted';
export const STATUS_CANCELED = 'Cancelled';
const STATUS_DRAFT = 'Draft';
const CARD_TITLE_QUOTE_INFORMATION = 'Quote Information';
const SUBMIT_BTN = 'Submit Quote';
const EXPIRY_DATE: Date = createValidExpiryDate();

/**
 * Sets quantity.
 */
export function setQuantity(quantity: string): void {
  log('Sets quantity', setQuantity.name);
  cy.get('cx-item-counter input').clear().type(quantity);
}

/**
 * Clicks on 'Request Quote' button on the cart page.
 */
export function clickOnRequestQuote(): void {
  log(
    'Clicks on "Request Quote" button on the cart page.',
    clickOnRequestQuote.name
  );
  cy.get('cx-quote-request-button button').click();
}

/**
 * Uses a cx-login-form to login a user.
 *
 * @param email Email for the login
 * @param password Password for the login
 * @param name Name of the user
 */
export function login(email: string, password: string, name: string): void {
  log('Uses a cx-login-form to login a user', login.name);
  cy.get('cx-login [role="link"]')
    .click()
    .then(() => {
      cy.get('cx-login-form').should('be.visible');
    });
  authentication.login(email, password);
  cy.get('.cx-login-greet').should('contain', name);
  cy.get('cx-login').should('not.contain', 'Sign In');
}

/**
 * Requests a quote and verifies if it is in draft state.
 *
 * @param shopName Name of the given shop
 * @param productId Id of the product added to the quote
 * @param productAmount Amount of the product added to the quote
 * @param submitThresholdMet Defines wether the $25.000 threshold is met and the submit button is available
 */
export function prepareQuote(
  shopName: String,
  productId: String,
  productAmount: number,
  submitThresholdMet: boolean
) {
  log(
    'Requests a quote and verifies if it is in draft state',
    prepareQuote.name
  );
  this.requestQuote(shopName, productId, productAmount.toString());
  this.checkQuoteInDraftState(submitThresholdMet, productId);
}

/**
 * Requests a quote from cart and verifies the quote page is visible.
 *
 * @param shopName Name of the given shop
 * @param productName Name of the product that should be used for the quote
 * @param quantity Quantity of the product used for the quote
 */
export function requestQuote(
  shopName,
  productName: string,
  quantity: string
): void {
  log('Requests a quote from cart', requestQuote.name);
  this.addProductToCart(shopName, productName, quantity);
  this.clickOnRequestQuote();
  cy.location('pathname').should('contain', '/quote');
  cy.get('cx-quote-details-overview').should('be.visible');
  cy.get('cx-quote-actions-by-role').should('be.visible');
  cy.url().should('contain', '/quote').as('quoteURL');
}

/**
 * Adds a product to the cart.
 *
 * @param shopName Name of the given shop
 * @param productName Name of the product that should be used for the quote
 * @param quantity Quantity of the product used for the quote
 */
export function addProductToCart(
  shopName,
  productName: string,
  quantity: string
): void {
  log('Adds a product to the cart', addProductToCart.name);
  common.goToPDPage(shopName, productName);
  this.setQuantity(quantity);
  common.clickOnAddToCartBtnOnPD();
  common.clickOnViewCartBtnOnPD();
}

/**
 * Submits a quote via clicking "Yes" button in the confirmation popover.
 */
export function submitQuote(): void {
  log(
    'Submits a quote via clicking "Yes" button in the confirmation popover',
    submitQuote.name
  );
  this.clickSubmitQuoteBtn();
  this.clickOnYesBtnWithinRequestPopUp();
  gotToQuoteDetailsOverviewPage();
}

/**
 * Clicks on 'Submit Quote' button on the quote overview page.
 */
export function clickSubmitQuoteBtn(): void {
  log(
    'Submits a quote via clicking "Submit" button on the quote details overview page',
    clickSubmitQuoteBtn.name
  );
  cy.get('cx-quote-actions-by-role button.btn-primary')
    .click()
    .then(() => {
      cy.get('cx-quote-confirm-action-dialog').should('be.visible');
    });
}

/**
 * Increases or decreases the quantity of a cart item using the quantity stepper.
 *
 * @param itemIndex Index of the item in the QDP cart list
 * @param changeType '+' for increase and '-' for decrease
 */
export function changeItemQuantityByStepper(
  itemIndex: number,
  changeType: string
): void {
  if (changeType === '+') {
    log(
      'Increases the quantity of the item in the quote details overview using the quantity stepper',
      changeItemQuantityByStepper.name
    );
  } else if (changeType === '-') {
    log(
      'Decreases the quantity of the item in the quote details overview using the quantity stepper',
      changeItemQuantityByStepper.name
    );
  }
  cy.get(
    `cx-quote-details-cart .cx-item-list-row:nth-child(${itemIndex})`
  ).within(() => {
    cy.get('cx-item-counter button').contains(changeType).click();
  });
}

/**
 * Changes the quantity of the cart item using the quantity counter.
 *
 * @param itemIndex Index of the Item in the QDP cart list
 * @param newQuantity Quantity that should be set
 */
export function changeItemQuantityByCounter(
  itemIndex: number,
  newQuantity: string
): void {
  log(
    'Changes the quantity of the cart item in the quote details overview using the quantity counter',
    changeItemQuantityByCounter.name
  );
  cy.get(
    `cx-quote-details-cart .cx-item-list-row:nth-child(${itemIndex})`
  ).within(() => {
    cy.get('cx-item-counter input')
      .type('{selectall}' + newQuantity)
      .pressTab();
  });
}

/**
 * Verifies if the quantity of an item at the given index equals the expected quantity given.
 *
 * @param itemIndex Index of the Item in the QDP cart list
 * @param expectedQuantity Expected quantity of the item
 */
export function checkItemQuantity(
  itemIndex: number,
  expectedQuantity: string
): void {
  log(
    'Verifies if the quantity of an item at the given index equals the expected quantity given',
    checkItemQuantity.name
  );
  cy.get(
    `cx-quote-details-cart .cx-item-list-row:nth-child(${itemIndex})`
  ).within(() => {
    cy.get('cx-item-counter input').should('have.value', expectedQuantity);
  });
}

/**
 * Click the 'Remove' button for the item at the given index to remove a cart item.
 *
 * @param itemIndex Index of the Item in the QDP cart list
 */
export function removeItem(itemIndex: number): void {
  log('Removes the item at index', removeItem.name);
  cy.get(
    `cx-quote-details-cart .cx-item-list-row:nth-child(${itemIndex})`
  ).within(() => {
    cy.get('button').contains('Remove').click();
  });
  gotToQuoteDetailsOverviewPage();
}

/**
 * Verifies if the item is visible within the QDP at the given index.
 *
 * @param itemIndex Index of the Item in the QDP cart list
 * @param productID Id of the product
 */
export function checkItemVisible(itemIndex: number, productID: string): void {
  log(
    'Verifies the given item is visible within the QDP at the given index',
    checkItemVisible.name
  );
  cy.get(`cx-quote-details-cart .cx-item-list-row:nth-child(${itemIndex})`)
    .should('be.visible')
    .contains(productID);
}

/**
 * Verifies if the item at the given index exists.
 *
 * @param itemIndex Index of the Item in the QDP cart list
 * @param productID Id of the product
 */
export function checkItemExists(itemIndex: number, productID: string): void {
  log('Verifies if the item at the given index exists', checkItemExists.name);
  if (itemIndex === 1) {
    cy.get(
      `cx-quote-details-cart .cx-item-list-row:nth-child(${itemIndex})`
    ).should('not.exist');
  } else {
    cy.get(`cx-quote-details-cart .cx-item-list-row:nth-child(${itemIndex})`)
      .contains(productID)
      .should('not.exist');
  }
}

/**
 * Verifies if the "Quote Information" card tile is in edit mode.
 *
 * @param isEditModeActive Indicates if the card is in edit mode
 */
export function checkQuoteInformationCard(isEditModeActive: boolean): void {
  log(
    'Verifies if the "Quote Information" card tile is in edit mode',
    checkQuoteInformationCard.name
  );
  cy.get(`cx-quote-details-overview .cx-container .card-body`)
    .contains(CARD_TITLE_QUOTE_INFORMATION)
    .should('exist')
    .then(() => {
      if (isEditModeActive) {
        cy.get('button').contains('Save').should('exist');
      } else {
        cy.get('button').contains('Save').should('not.exist');
      }
    });
}

/**
 * Edits the "Quote Information" card tile with given values.
 *
 * @param newQuoteName New quote name
 * @param newQuoteDescription New quote description
 */
export function editQuoteInformationCard(
  newQuoteName?: string,
  newQuoteDescription?: string
): void {
  log(
    'Edits the "Quote Information" card tile with given values',
    editQuoteInformationCard.name
  );
  cy.get(`cx-quote-details-overview .cx-container .card-body`)
    .contains(CARD_TITLE_QUOTE_INFORMATION)
    .then(() => {
      if (newQuoteName) {
        cy.get(`cx-quote-details-overview .cx-container .card-body input`)
          .clear()
          .type(newQuoteName);
      }
      if (newQuoteDescription) {
        cy.get(`cx-quote-details-overview .cx-container .card-body textarea`)
          .clear()
          .type(newQuoteDescription);
      }
    });
}

/**
 * Saves the edited date (quote name and its description) within the Quote Information card tile.
 */
export function saveEditedData(): void {
  log(
    'Saves the edited date (quote name and its description) within the Quote Information card tile...',
    saveEditedData.name
  );
  checkQuoteInformationCard(true);
  cy.get(`cx-quote-details-overview .cx-container .card-body`)
    .contains(CARD_TITLE_QUOTE_INFORMATION)
    .then(() => {
      cy.get('button').contains('Save').should('exist').click();
    });
}

/**
 * Verifies if the expected quote name equals the current quote name.
 *
 * @param expectedQuoteInformationContent expected quote name
 */
export function checkQuoteInformationCardContent(
  expectedQuoteInformationContent: string
): void {
  log(
    'Verifies if the expected quote name equals the current quote name',
    checkQuoteInformationCardContent.name
  );
  cy.get('cx-quote-details-overview .cx-container .card-body')
    .find('.cx-card-paragraph-text')
    .contains(expectedQuoteInformationContent);
}

/**
 * Clicks on the pencil to change the quote information within the "Quote Information" card tile.
 */
export function clickEditPencil(): void {
  log(
    'Clicks on the pencil to change the quote information within the "Quote Information" card tile.',
    clickEditPencil.name
  );
  cy.get(`cx-quote-details-overview .cx-container .card-body`)
    .contains(CARD_TITLE_QUOTE_INFORMATION)
    .should('exist')
    .then(() => {
      cy.get('.cx-edit-btn')
        .should('exist')
        .click()
        .then(() => {
          checkQuoteInformationCard(true);
        });
    });
}

/**
 * Clicks on 'Yes' button within the quote confirmation popover.
 */
export function clickOnYesBtnWithinRequestPopUp(): void {
  log(
    'Clicks on "Yes" button within the quote confirmation popover',
    clickOnYesBtnWithinRequestPopUp.name
  );
  cy.get('cx-quote-confirm-action-dialog button.btn-primary').click();
  cy.wait(GET_QUOTE_ALIAS);
}

/**
 * Verifies if the global message is displayed on the top of the page.
 */
export function checkGlobalMessageDisplayed(isDisplayed: boolean): void {
  log(
    'Verifies if the global message is displayed on the top of the page.',
    checkGlobalMessageDisplayed.name
  );
  if (isDisplayed) {
    cy.get('cx-global-message').should('be.visible');
  } else {
    cy.get('cx-global-message').should('not.be.visible');
  }
}

/**
 * Verifies if "Submit" button on the quote details overview page.
 */
export function checkSubmitBtn(isEnabled: boolean): void {
  log(
    'Verifies if "Submit" button on the quote details overview page',
    checkSubmitBtn.name
  );
  if (isEnabled) {
    cy.get('button.btn-primary').contains(SUBMIT_BTN).should('be.enabled');
  } else {
    cy.get('button.btn-primary').contains(SUBMIT_BTN).should('be.disabled');
  }
}

/**
 * Verifies if the comments are no longer editable and the input field does not exist anymore.
 */
export function checkCommentsNotEditable(): void {
  log(
    'Verifies if the comments are no longer editable and the input field does not exist anymore',
    checkCommentsNotEditable.name
  );
  cy.get('cx-quote-details-comment .cx-message-input').should('not.exist');
}

/**
 * Verifies if the quote list exists.
 */
export function checkQuoteListPresent() {
  log('Verifies if the quote list exists', checkQuoteListPresent.name);
  cy.get('cx-quote-list').should('exist');
}

/**
 * Navigates to the quote list via my account.
 */
export function navigateToQuoteListFromMyAccount() {
  log(
    'Navigates to quote list via my account',
    navigateToQuoteListFromMyAccount.name
  );
  cy.get('cx-page-layout[section="header"]').within(() => {
    cy.get('cx-navigation-ui.accNavComponent')
      .should('contain.text', 'My Account')
      .and('be.visible')
      .within(() => {
        cy.get('nav > ul > li > button').first().focus().trigger('keydown', {
          key: ' ',
          code: 'Space',
          force: true,
        });
        cy.get('cx-generic-link')
          .contains('Quotes')
          .should('be.visible')
          .click({ force: true });
      });
  });
}

/**
 * Navigates to the quote list via the quote details.
 */
export function navigateToQuoteListFromQuoteDetails() {
  log(
    'Navigates to the quote list from the quote details overview page',
    navigateToQuoteListFromQuoteDetails.name
  );
  cy.get('cx-quote-action-links').within(() => {
    cy.get('section > ul > li')
      .next()
      .within(() => {
        cy.get('button').contains('Quotes').first().click();
      });
  });
}

/**
 * Verifies if the displayed quote is in draft state.
 *
 * @param submitThreshold Does the quote meet the threshold
 * @param productId Product id of a product which is part of the quote
 */
export function checkQuoteInDraftState(
  submitThreshold: boolean,
  productId: string
) {
  log(
    'Verifies if the displayed quote is in draft state',
    checkQuoteInDraftState.name
  );
  checkQuoteState(STATUS_DRAFT);
  checkGlobalMessageDisplayed(!submitThreshold);
  checkSubmitBtn(submitThreshold);
  checkItem(productId);
}

/**
 * Verifies if the given item exists within the quote cart.
 *
 * @param productId Product ID of the item that should exist in the cart
 */
export function checkItem(productId: string) {
  log(
    'Verifies if the given item exists within the quote cart',
    checkItem.name
  );
  cy.get('cx-quote-details-cart .cx-table-item-container .cx-info').contains(
    productId
  );
}

/**
 * Verifies the quote state.
 *
 * @param status Expected Status of the quote
 */
export function checkQuoteState(status: string) {
  log('Verifies the quote state', checkQuoteState.name);
  cy.get('cx-quote-details-overview h3.cx-status').contains(status);
}

/**
 * Adds a header comment to the quote.
 *
 * @param text Text to add
 */
export function addHeaderComment(text: string) {
  log('Adds a header comment to the quote', addHeaderComment.name);
  cy.get('cx-quote-details-comment .cx-message-input').within(() => {
    cy.get('input').type(text);
    cy.get('button').click();
  });
  cy.wait(GET_QUOTE_ALIAS);
}

/**
 * Verifies if the header comment is displayed on the given position.
 *
 * @param index Position of the comment, starting with 0 for the first comment.
 * @param text Text to be displayed
 */
export function checkComment(index: number, text: string) {
  log('Verifies a comment', checkComment.name);
  cy.get(
    `cx-quote-details-comment .cx-message-card:nth-child(${index})`
  ).should('contain.text', text);
}

/**
 * Adds a item comment to the quote.
 *
 * @param item Name of the item
 * @param text Text to add
 */
export function addItemComment(item: string, text: string) {
  log('Adds an item comment to the quote', addItemComment.name);
  cy.get('cx-quote-details-comment .cx-footer-label').within(() => {
    cy.get('select').select(item);
  });
  cy.get('cx-quote-details-comment .cx-message-input').within(() => {
    cy.get('input').type(text);
    cy.get('button').click();
  });
  cy.wait(GET_QUOTE_ALIAS);
}

/**
 * Verifies if the item comment is displayed.
 *
 * @param index Index of the comment containing the link within the comment section
 * @param item Name of the item
 * @param text Text to be displayed
 */
export function checkItemComment(index: number, item: string, text: string) {
  log('Verifies an item comment', checkItemComment.name);
  cy.get(
    `cx-quote-details-comment .cx-message-card:nth-child(${index})`
  ).should('contain.text', text);
  cy.get(
    `cx-quote-details-comment .cx-message-card:nth-child(${index}) .cx-message-item-link`
  ).contains(item);
}

/**
 * Clicks on the item link provided in the comment.
 *
 * @param index Index of the comment containing the link within the comment section
 * @param item Name of the item
 */
export function clickItemLinkInComment(index: number, item: string) {
  log(
    'Clicks on the item link provided in the comment',
    clickItemLinkInComment.name
  );
  cy.get(
    `cx-quote-details-comment .cx-message-card:nth-child(${index}) .cx-message-item-link`
  )
    .contains(item)
    .click();
}

/**
 * Verifies if the item at the given index in the quote details cart is visible within the viewport.
 *
 * @param index Index of the quote details cart row.
 */
export function checkLinkedItemInViewport(index: number) {
  log('Verifies if the item in the viewport', checkLinkedItemInViewport.name);
  cy.get(`cx-quote-details-cart .cx-item-list-row:nth-child(${index})`).should(
    'be.visible'
  );
}

/**
 * Cancels the quote.
 */
export function cancelQuote() {
  log('Cancels the quote', cancelQuote.name);
  clickCancelQuoteBtn();
  clickOnYesBtnWithinRequestPopUp();
}

/**
 * Clicks on "Cancel Quote" button.
 */
function clickCancelQuoteBtn() {
  log('Clicks on "Cancel Quote" button', clickCancelQuoteBtn.name);
  cy.get('cx-quote-actions-by-role button.btn-secondary')
    .click()
    .then(() => {
      cy.get('cx-quote-confirm-action-dialog').should('be.visible');
    });
}

/**
 * Go to the quote details overview page.
 */
export function gotToQuoteDetailsOverviewPage() {
  log(
    'Go to the quote details overview page',
    gotToQuoteDetailsOverviewPage.name
  );
  cy.get<string>('@quoteURL').then(cy.visit);
}

/**
 * Logout buyer user
 * @param shopName Name of the current shop (Powertools)
 */
export function logoutBuyer(shopName: string): void {
  log('Logout buyer user', logoutBuyer.name);
  cy.visit(`${shopName}/en/USD/logout`);
  cy.get('cx-login [role="link"]');
}

/**
 * Enables the asm mode for the given shop
 * @param shopName Name of the shop (Powertools)
 */
export function enableASMMode(shopName: string) {
  log('Enables the asm mode for the given shop', enableASMMode.name);
  cy.visit(`${shopName}/en/USD/?asm=true`);
}

/**
 * Use the cx-login-form to login into the asm mode
 * @param shopName Name of the given shop (Powertools)
 * @param sellerEmail Email address of the seller; used for the login
 * @param sellerPassword  Password of the seller; used for the login
 */
export function loginASM(
  shopName: string,
  sellerEmail: string,
  sellerPassword: string
) {
  log('Login salesrep in ASM mode', loginASM.name);
  cy.visit(`${shopName}/en/USD/`);
  cy.get('cx-csagent-login-form form').within(() => {
    cy.get('[formcontrolname="userId"]').clear().type(sellerEmail);
    cy.get('[formcontrolname="password"]').clear().type(sellerPassword);
    cy.get('button[type=submit]').click();
  });
  cy.get('cx-customer-selection').should('be.visible');
}

/**
 * Selects the customer/buyer and opens the last quote while logged in as sales reporter in asm mode
 * @param shopName Name of the given shop (Powertools)
 * @param buyerEmail Email address of the customer/buyer
 */
export function selectCustomerAndOpenQuote(
  shopName: string,
  buyerEmail: string
) {
  log(
    'Select the customer and open the last quote',
    selectCustomerAndOpenQuote.name
  );
  cy.visit(`${shopName}/en/USD/login`);
  cy.get('cx-customer-selection input').clear().type(buyerEmail);
  cy.get('cx-customer-selection .asm-results button').click();
  cy.get('cx-customer-selection button[type=submit]').click();
  cy.wait(5000);
  cy.get<string>('@quoteURL').then(cy.visit);
}

/**
 * Enables the edit mode for the quote
 */
export function enableEditQuoteMode() {
  log('Enables the edit mode for the quote', enableEditQuoteMode.name);
  cy.get('cx-quote-actions-by-role button.btn-secondary').click();
}

/**
 * Creates an expiry date for the quote (2 months and 2 days in the future from today)
 * @returns Expiry date for the quote
 */
function createValidExpiryDate(): Date {
  let expiryDate: Date = new Date();
  expiryDate.setDate(expiryDate.getDate() + 2);
  expiryDate.setMonth(expiryDate.getMonth() + 2);
  if (expiryDate.getMonth() >= 12) {
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  }
  return expiryDate;
}

/**
 * Sets the expiry date to the given value
 */
export function setExpiryDate() {
  log('Sets the expiry date to a given value', setExpiryDate.name);
  let dayStringSingleDigitDay: string = '';
  if (EXPIRY_DATE.getDate() < 10) {
    dayStringSingleDigitDay = '0';
  }
  let monthStringSingleDigitMonth: string = '';
  if (EXPIRY_DATE.getMonth() + 1 < 10) {
    monthStringSingleDigitMonth = '0';
  }
  let expiryDateString: string =
    EXPIRY_DATE.getFullYear() +
    '-' +
    (monthStringSingleDigitMonth + (EXPIRY_DATE.getMonth() + 1)) +
    '-' +
    (dayStringSingleDigitDay + EXPIRY_DATE.getDate());
  cy.get('cx-quote-seller-edit cx-date-picker input')
    .type(expiryDateString)
    .trigger('change');
}

/**
 * Verifies if the shown expiry date matches the given expiry date
 */
export function checkExpiryDate() {
  log(
    'Verifies if the shown expiry date matches the given expiry date',
    checkExpiryDate.name
  );

  cy.get(
    'cx-quote-details-overview .cx-container .card-body .cx-card-paragraph-title'
  )
    .contains('Expiry Date')
    .parent()
    .within(() => {
      cy.get('.cx-card-paragraph-text').contains(createFormattedExpiryDate());
    });
}
/**
 *Creates the formatted expiry date string
 * @returns Formatted date string (Jan 01,2023)
 */
function createFormattedExpiryDate(): string {
  log(
    'Create the formatted expiry date string',
    createFormattedExpiryDate.name
  );
  let expiryDateMonthString: string = '';

  switch (Number(EXPIRY_DATE.getMonth())) {
    case 0: {
      expiryDateMonthString = 'Jan';
      break;
    }
    case 1: {
      expiryDateMonthString = 'Feb';
      break;
    }
    case 2: {
      expiryDateMonthString = 'Mar';
      break;
    }
    case 3: {
      expiryDateMonthString = 'Apr';
      break;
    }
    case 4: {
      expiryDateMonthString = 'May';
      break;
    }
    case 5: {
      expiryDateMonthString = 'Jun';
      break;
    }
    case 6: {
      expiryDateMonthString = 'Jul';
      break;
    }
    case 7: {
      expiryDateMonthString = 'Aug';
      break;
    }
    case 8: {
      expiryDateMonthString = 'Sep';
      break;
    }
    case 9: {
      expiryDateMonthString = 'Oct';
      break;
    }
    case 10: {
      expiryDateMonthString = 'Nov';
      break;
    }
    default: {
      expiryDateMonthString = 'Dec';
      break;
    }
  }
  let returnString: string =
    expiryDateMonthString +
    ' ' +
    EXPIRY_DATE.getDate() +
    ', ' +
    EXPIRY_DATE.getFullYear();
  return returnString;
}

/**
 *Sets the discount (sales reporter perspective) and applies it to the total estimated price
 * @param discount Discount which is applied to the total estimated price
 */
export function setDiscount(discount: string) {
  log('Sets the discount (sales reporter perspective', setDiscount.name);
  cy.get('cx-quote-seller-edit input[name="discount"]').type(discount);
  cy.get('cx-quote-seller-edit button.btn-secondary').click();
}

/**
 *Verifies if the estimated total price shown equals the estimate total price given
 * @param newEstimatedTotalPrice The given estimated total price
 */
export function checkTotalEstimatedPrice(newEstimatedTotalPrice: string) {
  log(
    'Verifies the discount was applied correctly and the estimated total price is updated',
    checkTotalEstimatedPrice.name
  );
  cy.get(
    'cx-quote-details-overview .cx-container .card-body .cx-card-paragraph-title'
  )
    .contains('Estimated Total')
    .parent()
    .within(() => {
      cy.get('.cx-card-paragraph-text').contains(newEstimatedTotalPrice);
    });
}

/**
 * Within the quote overview page edits the configuration for a VC configurable product
 *@param itemIndex Index of the item in the QDP cart list
 */
export function editVCConfigurableProduct(itemIndex: number) {
  log(
    'Edits the configurable product from quote overview page and navigates back to quote overview page',
    editVCConfigurableProduct.name
  );
  clickEditConfigurationVCProduct(itemIndex);
  //Change "Throat Width" attribute to 18"
  cy.get(
    `cx-configurator-form cx-configurator-group div[role=tabpanel]:nth-child(1)`
  );
  cy.get(`span`)
    .contains('Throat Width')
    .parent() //label
    .parent() //cx-configurator-attribute-header
    .parent() //cx-group-attribute
    .within(() => {
      cy.get('cx-configurator-attribute-radio-button').within(() => {
        cy.get(`label`)
          .contains('18"')
          .parent()
          .within(() => {
            cy.get('input').click();
          });
      });
    });

  //Click on "Done"
  cy.get(`cx-configurator-add-to-cart-button button.btn-primary`).click();
  //Click on "Continue to Cart"
  cy.get(`cx-configurator-add-to-cart-button button.btn-primary`).click();
}

/**
 * Within the quote details overview page click on 'Edit Configuration' for the VC configurable product
 *@param itemIndex Index of the item in the QDP cart list
 */
function clickEditConfigurationVCProduct(itemIndex: number) {
  log('click on "Edit Configuration"', clickEditConfigurationVCProduct.name);
  cy.get(
    `cx-quote-details-cart cx-cart-item-list .cx-item-list-row:nth-child(${itemIndex})`
  ).within(() => {
    cy.get('.cx-action-link').click();
  });
}

/**
 * Registers GET quote route.
 */
export function registerGetQuoteRoute(shopName: string) {
  log('Registers GET quote route.', registerGetQuoteRoute.name);
  cy.intercept({
    method: 'GET',
    path: `${Cypress.env('OCC_PREFIX')}/${shopName}/users/*/quotes/*`,
  }).as(GET_QUOTE_ALIAS.substring(1)); // strip the '@'
}

/**
 * Creates a simple log with ##### comment <functionName> ######
 *
 * @param comment Could be the description of the function
 * @param functionName Name of the called function
 */
function log(comment: string, functionName: string) {
  cy.log(`##### ${comment} <${functionName}> #####`);
}
