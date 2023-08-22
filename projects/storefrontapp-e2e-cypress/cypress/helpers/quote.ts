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
const STATUS_DRAFT = 'Draft';
const CARD_TITLE_QUOTE_INFORMATION = 'Quote Information';
const SUBMIT_BTN = 'Submit Quote';
/**
 * Sets quantity on PDP
 */
export function setQtyOnPD(quantity: string): void {
  log('Sets quantity on PDP', setQtyOnPD.name);
  cy.get('input.ng-pristine').clear().type(quantity);
}

/**
 * Clicks on 'Request Quote' on the cart page and checks for quote page
 */
export function clickOnRequestQuoteInCartAndExpectQuotePage(): void {
  log(
    'Click on "Request Quote" button in the cart and check whether the quote page is displayed.',
    clickOnRequestQuoteInCartAndExpectQuotePage.name
  );
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
  log(
    'Click on "request Quote" button in the cart',
    clickOnRequestQuoteInCart.name
  );
  cy.get('cx-quote-request-button button').click();
}
/**
 * Use a cx-login-form to login a user
 * @param email Email for the login
 * @param password Password for the login
 * @param name Name of the user
 */
export function login(email: string, password: string, name: string): void {
  trace(
    login.name,
    () => {
      cy.get('cx-login [role="link"]')
        .click()
        .then(() => {
          cy.get('cx-login-form').should('be.visible');
        });
      authentication.login(email, password);
      cy.get('.cx-login-greet').should('contain', name);
      cy.get('cx-login').should('not.contain', 'Sign In');
    },
    { email: email, password: password, name: name }
  );
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
  trace(
    requestQuote.name,
    () => {
      this.addProductToCartForQuotePreparation(shopName, productName, quantity);
      this.clickOnRequestQuoteInCartAndExpectQuotePage();
    },
    { shopName: shopName, productName: productName, quantity: quantity }
  );
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
  log('Add product to the cart', addProductToCartForQuotePreparation.name);
  common.goToPDPage(shopName, productName);
  this.setQtyOnPD(quantity);
  common.clickOnAddToCartBtnOnPD();
  common.clickOnViewCartBtnOnPD();
}

/**
 * Submit a quote via clicking "Yes" button in the confirmation popover
 */
export function submitQuote(): void {
  log(
    'Submit a quote via clicking "Yes" button in the confirmation popover',
    submitQuote.name
  );
  clickOnSubmitQuoteBtnOnQD();
  clickOnYesBtnWithinRequestPopUp();
  cy.get<string>('@quoteURL').then(cy.visit);
}

/**
 * Clicks on 'Submit Quote' on the quote overview page.
 */
export function clickOnSubmitQuoteBtnOnQD(): void {
  log(
    'Submit a quote via clicking "Submit" button on the quote details overview page',
    clickOnSubmitQuoteBtnOnQD.name
  );
  cy.get('cx-quote-actions-by-role button.btn-primary')
    .click()
    .then(() => {
      cy.get('cx-quote-confirm-action-dialog').should('be.visible');
    });
}

/**
 * Increases or decreases the quantity of an item in the QDP cart using the quantity stepper
 * @param itemIndex Index of the item in the QDP cart list
 * @param changeType '+' for increase and '-' for decrease
 */
export function changeItemQuantityByStepper(
  itemIndex: number,
  changeType: string
): void {
  log(
    'Increase the quantity of the item in the quote details overview using the quantity stepper',
    changeItemQuantityByStepper.name
  );
  cy.get(
    `cx-quote-details-cart .cx-item-list-row:nth-child(${itemIndex})`
  ).within(() => {
    cy.get('cx-item-counter button').contains(changeType).click();
  });
}

/**
 * Increase the quantity of the item in the quote details overview using the quantity counter
 * @param itemIndex Index of the Item in the QDP cart list
 * @param newQuantity Quantity that should be set
 */
export function changeItemQuantityByCounter(
  itemIndex: number,
  newQuantity: string
): void {
  log(
    'Increase the quantity of the item in the quote details overview using the quantity counter',
    changeItemQuantityByCounter.name
  );
  cy.get(
    `cx-quote-details-cart .cx-item-list-row:nth-child(${itemIndex})`
  ).within(() => {
    cy.get('cx-item-counter input').clear().type(newQuantity).pressTab();
  });
}

/**
 * Validates if the quantity of an item at the given index equals the expected quantity given
 * @param itemIndex Index of the Item in the QDP cart list
 * @param expectedQuantity Expected quantity of the item
 */
export function checkItemQuantity(
  itemIndex: number,
  expectedQuantity: string
): void {
  log(
    'Validates if the quantity of an item at the given index equals the expected quantity given',
    checkItemQuantity.name
  );
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
export function removeItem(itemIndex: number): void {
  log('Remove item', removeItem.name);
  cy.get(
    `cx-quote-details-cart .cx-item-list-row:nth-child(${itemIndex})`
  ).within(() => {
    cy.get('button').contains('Remove').click();
  });
  cy.get<string>('@quoteURL').then(cy.visit);
}

/**
 * Checks if the given item is visible within the QDP cart at the given index.
 * @param itemIndex Index of the Item in the QDP cart list
 * @param productID Id of the product
 */
export function checkItemVisible(itemIndex: number, productID: string): void {
  log(
    'Checks if the given item is visible within the QDP cart at the given index',
    checkItemVisible.name
  );
  cy.get(`cx-quote-details-cart .cx-item-list-row:nth-child(${itemIndex})`)
    .should('be.visible')
    .contains(productID);
}

/**
 * Checks if the item at the given index exists
 * @param itemIndex Index of the Item in the QDP cart list
 * @param productID Id of the product
 */
export function checkItemExists(itemIndex: number, productID: string): void {
  log('Checks if the item at the given index exists', checkItemExists.name);
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
 * Checks if the "Quote Information" card is in edit mode
 * @param cardEditModeActive Indicates if the card is in edit mode
 */
export function verifyCardWithQuoteInformation(
  cardEditModeActive: boolean
): void {
  log(
    'Checks if the "Quote Information" card tile is in edit mode',
    verifyCardWithQuoteInformation.name
  );
  cy.get(`cx-quote-details-overview .cx-container .card-body`)
    .contains(CARD_TITLE_QUOTE_INFORMATION)
    .should('exist')
    .then(() => {
      if (cardEditModeActive) {
        cy.get('button').contains('Save').should('exist');
      } else {
        cy.get('button').contains('Save').should('not.exist');
      }
    });
}

/**
 * Changes the "Quote Name" and the "Quote description" to given values
 * @param newQuoteName New quote name
 * @param newQuoteDescription New quote description
 */
export function editQuoteInformationCard(
  newQuoteName?: string,
  newQuoteDescription?: string
): void {
  log(
    'Edit the "Quote Information" card tile with given values',
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
 * Saves the edited date (quote name and its description) within the Quote Information card tile
 */
export function saveEditedDataOnCard(): void {
  log(
    'Saves the edited date (quote name and its description) within the Quote Information card tile...',
    saveEditedDataOnCard.name
  );
  verifyCardWithQuoteInformation(true);
  cy.get(`cx-quote-details-overview .cx-container .card-body`)
    .contains(CARD_TITLE_QUOTE_INFORMATION)
    .then(() => {
      cy.get('button').contains('Save').should('exist').click();
    });
}

/**
 * Verifies the expected quote name equals the current quote name
 * @param expectedQuoteInformationContent expected quote name
 */
export function checkQuoteInformationCardContent(
  expectedQuoteInformationContent: string
): void {
  log(
    'Verifies the expected quote name equals the current quote name',
    checkQuoteInformationCardContent.name
  );
  cy.get('cx-quote-details-overview .cx-container .card-body')
    .find('.cx-card-paragraph-text')
    .contains(expectedQuoteInformationContent);
}

/**
 * Clicks on the edit button to change the quote information within the "Quote Information" card.
 */
export function clickEditQuoteInformationCard(): void {
  log(
    'Clicks on "Edit" button to change the quote information within the "Quote Information" card',
    clickEditQuoteInformationCard.name
  );
  cy.get(`cx-quote-details-overview .cx-container .card-body`)
    .contains(CARD_TITLE_QUOTE_INFORMATION)
    .should('exist')
    .then(() => {
      cy.get('.cx-edit-btn')
        .should('exist')
        .click()
        .then(() => {
          verifyCardWithQuoteInformation(true);
        });
    });
}

/**
 * Clicks on 'Yes' button within the quote confirmation popover
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
 * Verifies whether global message is displayed on the top of the page.
 */
export function checkGlobalMessageDisplayed(isDisplayed: boolean): void {
  log(
    'Verifies whether global message is displayed on the top of the page.',
    checkGlobalMessageDisplayed.name
  );
  if (isDisplayed) {
    cy.get('cx-global-message').should('be.visible');
  } else {
    cy.get('cx-global-message').should('not.be.visible');
  }
}

/**
 * Checks "Submit" button o n the quote details overview page
 */
export function checkSubmitBtn(isEnabled: boolean): void {
  log(
    'Checks "Submit" button o n the quote details overview page',
    checkSubmitBtn.name
  );
  if (isEnabled) {
    cy.get('button.btn-primary').contains(SUBMIT_BTN).should('be.enabled');
  } else {
    cy.get('button.btn-primary').contains(SUBMIT_BTN).should('be.disabled');
  }
}

/**
 * Checks that comments are no longer editable and the input field doesnt exist anymore.
 */
export function checkCommentsNotEditable(): void {
  trace(checkCommentsNotEditable.name, () =>
    cy.get('cx-quote-details-comment .cx-message-input').should('not.exist')
  );
}

/**
 * Checks presence of quote list
 */
export function checkQuoteListPresent() {
  trace(checkQuoteListPresent.name, () =>
    cy.get('cx-quote-list').should('exist')
  );
}

/**
 * Navigates to quote list via my account
 */
export function navigateToQuoteListFromMyAccount() {
  trace(navigateToQuoteListFromMyAccount.name, () => {
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
  });
}

/**
 * Navigates to quote list via quote details
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
 * Verifies the displayed quote assuming that it is in draft state.
 * @param meetsThreshold Does the quote meet the threshold
 * @param productId Product id of a product which is part of the quote
 */
export function checkQuoteInDraftState(
  meetsThreshold: boolean,
  productId: string
) {
  log('Verifies the displayed quote', checkQuoteInDraftState.name);
  checkQuoteState(STATUS_DRAFT);
  checkGlobalMessageDisplayed(!meetsThreshold);
  checkSubmitBtn(meetsThreshold);
  checkItemInQuoteCart(productId);
}

/**
 * Checks if the given item exists within the quote cart
 * @param productId Product ID of the item that should exist in the cart
 */
export function checkItemInQuoteCart(productId: string) {
  log(
    'Checks if the given item exists within the quote cart',
    checkItemInQuoteCart.name
  );
  cy.get('cx-quote-details-cart .cx-table-item-container .cx-info').contains(
    productId
  );
}

/**
 * Verifies the quote state
 * @param status Expected Status of the quote
 */
export function checkQuoteState(status: string) {
  log('Verifies the quote state', checkQuoteState.name);
  cy.get('cx-quote-details-overview h3.cx-status').contains(status);
}

/**
 * Adds a header comment to the quote assuming that the quote is currently in edit mode
 * @param text Text to add
 */
export function addCommentAndWait(text: string) {
  log('Adds a header comment to the quote', addCommentAndWait.name);
  cy.get('cx-quote-details-comment .cx-message-input').within(() => {
    cy.get('input').type(text);
    cy.get('button').click();
  });
  cy.wait(GET_QUOTE_ALIAS);
}

/**
 * Verifies whether the given header comment is displayed on the given position
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
 * Adds a header comment with a selected item to the quote assuming that the quote is currently in edit mode
 * @param item Name of the item
 * @param text Text to add
 */
export function addItemCommentAndWait(item: string, text: string) {
  log('Adds an item comment to the quote', addItemCommentAndWait.name);
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
 * Verifies whether the given header comment with item link is displayed on the given position
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
 * Verifies if the item at the given index in the quote details cart is visible within the viewport
 * @param index Index of the quote details cart row.
 */
export function checkLinkedItemInViewport(index: number) {
  log(
    'Verifies whether the item in the viewport',
    checkLinkedItemInViewport.name
  );
  cy.get(`cx-quote-details-cart .cx-item-list-row:nth-child(${index})`).should(
    'be.visible'
  );
}

/**
 * Register GET quote route.
 */
export function registerGetQuoteRoute(shopName: string) {
  trace(
    registerGetQuoteRoute.name,
    () => {
      cy.intercept({
        method: 'GET',
        path: `${Cypress.env('OCC_PREFIX')}/${shopName}/users/current/quotes/*`,
      }).as(GET_QUOTE_ALIAS.substring(1)); // strip the '@'
    },
    arguments
  );
}

/**
 * Creates a simple log with ##### comment <functionName> ######
 * @param comment Could be the description of the function
 * @param functionName Name of the called function
 */
function log(comment: string, functionName: string) {
  cy.log(`##### ${comment} <${functionName}> #####`);
}

/**
 * Creates a Cypress log before function gets executed printing out name
 * and args and another log after finishing the function.
 * @param functionName Name of the function that should be logged
 * @param func The function that is called
 * @param args Arguments the function will be called with
 */
export function trace(functionName: string, func: Function, args?: Object) {
  const argString = args ? JSON.stringify(args) : '';
  if (args) {
    log(`START function: `, `${functionName}(${argString})`);
  } else {
    log(`START function`, functionName);
  }
  func(); // execute the function
  log(`END function: `, functionName);
}
