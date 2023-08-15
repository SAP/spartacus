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
export const STATUS_DRAFT = 'Draft';

/**
 * Sets quantity on PDP
 */
export function setQtyOnPD(quantity: string): void {
  log(setQtyOnPD.name);
  cy.get('input.ng-pristine').clear().type(quantity);
}

/**
 * Clicks on 'Request Quote' on the cart page and checks for quote page
 */
export function clickOnRequestQuoteInCartAndExpectQuotePage(): void {
  log(clickOnRequestQuoteInCartAndExpectQuotePage.name);
  cy.get('cx-quote-request-button button')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/quote');
      cy.get('cx-quote-details-overview').should('be.visible');
    })
    .then(() => {
      cy.get('cx-quote-actions-by-role').should('be.visible');
    });
}

/**
 * Clicks on 'Request Quote' on the cart page.
 */
export function clickOnRequestQuoteInCart(): void {
  log(clickOnRequestQuoteInCart.name);
  cy.get('cx-quote-request-button button').click();
}
/**
 * Use a cx-login-form to login a user
 * @param email Email for the login
 * @param password Password for the login
 * @param name Name of the user
 */
export function login(email: string, password: string, name: string): void {
  log(login.name);
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
 * logs out the buyer
 * @param shopName Name of the current shop (Powertools)
 */
export function logoutBuyer(shopName: string): void {
  log(logoutBuyer.name);
  cy.visit(`${shopName}/en/USD/logout`);
  cy.get('cx-login [role="link"]');
}

/**
 * Enables the asm mode for the given shop
 * @param shopName Name of the shop (Powertools)
 */
export function enableASMMode(shopName: string) {
  log(enableASMMode.name);
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
  log(loginASM.name);
  cy.visit(`${shopName}/en/USD/`);
  cy.get('cx-csagent-login-form form').within(() => {
    cy.get('[formcontrolname="userId"]').clear().type(sellerEmail);
    cy.get('[formcontrolname="password"]').clear().type(sellerPassword);
    cy.get('button[type=submit]').click();
  });
  cy.get('cx-customer-selection').should('be.visible');
}

/**
 * Request a quote from cart
 * @param shopName Name of the given shop (Powertools)
 * @param productName Name of the product that should be used for the quote
 * @param quantity Quantity of the product used for the quote
 */
export function requestQuote(
  shopName,
  productName: string,
  quantity: string
): void {
  log(requestQuote.name);
  this.addProductToCartForQuotePreparation(shopName, productName, quantity);
  this.clickOnRequestQuoteInCartAndExpectQuotePage();
}

/**
 * Adds a product to the cart
 * @param shopName Name of the given shop (Powertools)
 * @param productName Name of the product that should be used for the quote
 * @param quantity Quantity of the product used for the quote
 */
export function addProductToCartForQuotePreparation(
  shopName,
  productName: string,
  quantity: string
): void {
  log(addProductToCartForQuotePreparation.name);
  common.goToPDPage(shopName, productName);
  this.setQtyOnPD(quantity);
  common.clickOnAddToCartBtnOnPD();
  common.clickOnViewCartBtnOnPD();
}

/**
 * Submits a quote and clicks 'yes' at the submit quote popup
 */
export function submitQuote(): void {
  log(submitQuote.name);
  clickOnSubmitQuoteBtnOnQD();
  clickOnYesBtnOnQuoteSubmitPopUp();
}

/**
 * Clicks on 'Submit Quote' on the quote overview page.
 */
export function clickOnSubmitQuoteBtnOnQD(): void {
  log(clickOnSubmitQuoteBtnOnQD.name);
  cy.get('cx-quote-actions-by-role button.btn-primary')
    .click()
    .then(() => {
      cy.get('cx-quote-confirm-request-dialog').should('be.visible');
    });
}

/**
 * Increases or decreases the quantity of an item in the QDP cart using the quantity stepper
 * @param itemIndex Index of the item in the QDP cart list
 * @param changeType '+' for increase and '-' for decrease
 */
export function changeItemQuantityOnClick(
  itemIndex: number,
  changeType: string
): void {
  log(changeItemQuantityOnClick.name);
  cy.get(
    `cx-quote-details-cart .cx-item-list-row:nth-child(${itemIndex})`
  ).within(() => {
    cy.get('cx-item-counter button').contains(changeType).click();
  });
}

/**
 * Uses the input field to change the quantity of the Item at the given index to the given amount
 * @param itemIndex Index of the Item in the QDP cart list
 * @param newQuantity Quantity that should be set
 */
export function changeItemQuantityWithInputField(
  itemIndex: number,
  newQuantity: string
): void {
  log(changeItemQuantityWithInputField.name);
  cy.get(
    `cx-quote-details-cart .cx-item-list-row:nth-child(${itemIndex})`
  ).within(() => {
    cy.get('cx-item-counter input').clear().type(newQuantity).pressTab();
  });
}

/**
 * Checks if the quantity of an item at the given index equals the expected quantity given
 * @param itemIndex Index of the Item in the QDP cart list
 * @param expectedQuantity Expected quantity of the item
 */
export function validateItemQuantity(
  itemIndex: number,
  expectedQuantity: string
): void {
  log(validateItemQuantity.name);
  cy.get(
    `cx-quote-details-cart .cx-item-list-row:nth-child(${itemIndex})`
  ).within(() => {
    cy.get('cx-item-counter input').should('have.value', expectedQuantity);
  });
}

/**
 * Click the 'Remove' button for the item at the given index in the QDP cart
 * @param itemIndex Index of the Item in the QDP cart list
 */
export function removeItemOnClick(itemIndex: number): void {
  log(removeItemOnClick.name);
  cy.get(
    `cx-quote-details-cart .cx-item-list-row:nth-child(${itemIndex})`
  ).within(() => {
    cy.get('button').contains('Remove').click();
  });
  cy.get<string>('@quoteURL').then(cy.visit);
}

/**
 * Checks if the given Item exists within the QDP cart at the given index.
 * @param itemIndex Index of the Item in the QDP cart list
 * @param productID Id of the product
 * @param itemExpected 'true' if the item should be there, 'false' if no item should exist.
 */
export function checkItemAtIndexExists(
  itemIndex: number,
  productID: string,
  itemExpected: boolean
): void {
  log(checkItemAtIndexExists.name);
  if (itemExpected) {
    cy.get(`cx-quote-details-cart .cx-item-list-row:nth-child(${itemIndex})`)
      .should('be.visible')
      .contains(productID);
  }
  if (itemIndex === 1 && !itemExpected) {
    cy.get(
      `cx-quote-details-cart .cx-item-list-row:nth-child(${itemIndex})`
    ).should('not.exist');
  }
}

/**
 * Clicks on 'Yes' on the quote confirm request dialog  popup.
 */
export function clickOnYesBtnOnQuoteSubmitPopUp(): void {
  log(clickOnYesBtnOnQuoteSubmitPopUp.name);
  cy.get('div.cx-dialog-item button.btn-primary').click();
  cy.wait(GET_QUOTE_ALIAS);
}

/**
 * Checks on the global message on the top of the page.
 */
export function checkGlobalMessageDisplayed(isDisplayed: boolean): void {
  log(checkGlobalMessageDisplayed.name);
  if (isDisplayed) {
    cy.get('cx-global-message').should('be.visible');
  } else {
    cy.get('cx-global-message').should('not.be.visible');
  }
}

/**
 * Checks submit button on quote page.
 */
export function checkSubmitButton(isEnabled: boolean): void {
  log(checkSubmitButton.name);
  if (isEnabled) {
    cy.get('button.btn-primary').contains('Submit Quote').should('be.enabled');
  } else {
    cy.get('button.btn-primary').contains('Submit Quote').should('be.disabled');
  }
}

/**
 * Checks that comments are no longer editable and the input field doesnt exist anymore.
 */
export function checkCommentsNotEditable(): void {
  log(checkCommentsNotEditable.name);
  cy.get('cx-quote-details-comment .cx-message-input').should('not.exist');
}

/**
 * Checks presence of quote list
 */
export function checkQuoteListPresent() {
  log(checkQuoteListPresent.name);
  cy.get('cx-quote-list').should('exist');
}

/**
 * Navigates to quote list via my account
 */
export function navigateToQuoteListFromMyAccount() {
  log(navigateToQuoteListFromMyAccount.name);
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
 * Navigates to quote list via quote details
 */
export function navigateToQuoteListFromQuoteDetails() {
  log(navigateToQuoteListFromQuoteDetails.name);
  cy.get('cx-quote-action-links').within(() => {
    cy.get('section > ul > li')
      .next()
      .within(() => {
        cy.get('button').contains('Quotes').first().click();
      });
  });
}

/**
 * Checks the displayed quote, assuming that it is in draft state.
 * @param meetsThreshold Does the quote meet the threshold
 * @param productId Product id of a product which is part of the quote
 */
export function checkQuoteInDraftState(
  meetsThreshold: boolean,
  productId: string
) {
  log(checkQuoteInDraftState.name);
  checkQuoteState(STATUS_DRAFT);
  checkGlobalMessageDisplayed(!meetsThreshold);
  checkSubmitButton(meetsThreshold);
  checkItemInQuoteCart(productId);
}

/**
 * Checks if the given item exists within the quote cart
 * @param productId Product ID of the item that should exist in the cart
 */
export function checkItemInQuoteCart(productId: string) {
  log(checkItemInQuoteCart.name);
  cy.get('cx-quote-details-cart .cx-table-item-container .cx-info').contains(
    productId
  );
}

/**
 * Checks if the quote has the given status
 * @param status Expected Status of the quote
 */
export function checkQuoteState(status: string) {
  log(checkQuoteState.name);
  if (status === STATUS_SUBMITTED) {
    cy.get<string>('@quoteURL').then(cy.visit);
  }
  cy.get('cx-quote-details-overview h3.status').contains(status);
}

/**
 * Adds a header comment to the quote assuming that the quote is currently in edit mode
 * @param text Text to add
 */
export function addCommentAndWait(text: string) {
  log(addCommentAndWait.name);
  cy.get('cx-quote-details-comment .cx-message-input').within(() => {
    cy.get('input').type(text);
    cy.get('button').click();
  });
  cy.wait(GET_QUOTE_ALIAS);
}

/**
 * Checks whether the given header comment is displayed on the given position
 * @param index Position of the comment, starting with 0 for the first comment.
 * @param text Text to be displayed
 */
export function checkComment(index: number, text: string) {
  log(checkComment.name);
  cy.get(
    `cx-quote-details-comment .cx-message-card:nth-child(${index})`
  ).should('contain.text', text);
}

/**
 * Adds a header comment with a selected item to the quote assuming that the quote is currently in edit mode
 * @param item Name of the item
 * @param text Text to add
 */
export function addItemCommentAndWait(item: string, text: string) {
  log(addItemCommentAndWait.name);
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
 * Checks whether the given header comment with item link is displayed on the given position
 * @param index Index of the comment containing the link within the comment section
 * @param item Name of the item
 * @param text Text to be displayed
 */
export function checkItemComment(index: number, item: string, text: string) {
  log(checkItemComment.name);
  cy.get(
    `cx-quote-details-comment .cx-message-card:nth-child(${index})`
  ).should('contain.text', text);
  cy.get(
    `cx-quote-details-comment .cx-message-card:nth-child(${index}) .cx-message-item-link`
  ).contains(item);
}

/**
 * Clicks on the item link provided in the comment.
 * @param index Index of the comment containing the link within the comment section
 * @param item Name of the item
 */
export function clickItemLinkInComment(index: number, item: string) {
  log(clickItemLinkInComment.name);
  cy.get(
    `cx-quote-details-comment .cx-message-card:nth-child(${index}) .cx-message-item-link`
  )
    .contains(item)
    .click();
}

/**
 * Checks if the item at the given index in the quote details cart is visible within the viewport
 * @param index Index of the quote details cart row.
 */
export function checkLinkedItemInViewport(index: number) {
  log(checkLinkedItemInViewport.name);
  cy.get(`cx-quote-details-cart .cx-item-list-row:nth-child(${index})`).should(
    'be.visible'
  );
}

/**
 * Register GET quote route.
 */
export function registerGetQuoteRoute(shopName: string) {
  log(registerGetQuoteRoute.name);
  cy.intercept({
    method: 'GET',
    path: `${Cypress.env('OCC_PREFIX')}/${shopName}/users/current/quotes/*`,
  }).as(GET_QUOTE_ALIAS.substring(1)); // strip the '@'
}
/**
 * Creates a Cypress log output
 * @param functionName Name of the function that should be logged
 * @param title Title of the test
 */
export function log(functionName: string, title?: string) {
  if (title) {
    cy.log(`########## ${title} // ${functionName} ##########`);
  } else {
    cy.log(`********** function: ${functionName} **********`);
  }
}
