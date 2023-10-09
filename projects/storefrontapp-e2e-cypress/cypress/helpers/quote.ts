/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as authentication from './auth-forms';
import * as common from './common';
import * as productConfigurator from './product-configurator';
import * as asm from './asm';

/** aliases for Quote Routes */
export const GET_QUOTE_ALIAS = '@GET_QUOTE';
export const PATCH_QUOTE_ALIAS = '@PATCH_QUOTE';
export const POST_QUOTE_ALIAS = '@POST_QUOTE';

export const STATUS_SUBMITTED = 'Submitted';
export const STATUS_REQUESTED = 'Requested';
export const STATUS_CANCELED = 'Cancelled';
export const STATUS_VENDOR_QUOTE = 'Vendor Quote';
export const STATUS_BUYER_SUBMIT = 'status_buyer_submit';
export const STATUS_BUYER_CANCEL = 'status_buyer_cancel';
export const STATUS_BUYER_CHECKOUT = 'status_buyer_checkout';
export const STATUS_SALES_REPORTER_SUBMIT = 'status_sales_reporter_submit';
const STATUS_DRAFT = 'Draft';
const CARD_TITLE_QUOTE_INFORMATION = 'Quote Information';
const SUBMIT_BTN = 'Submit Quote';
const EXPIRY_DATE: Date = createValidExpiryDate();

/**
 * Sets quantity.
 */
export function setQuantity(quantity: string): void {
  log('Sets quantity', setQuantity.name);
  cy.get('cx-item-counter input').clear().type(`{selectall}${quantity}`);
}

/**
 * Verifies whether the quote list is displayed.
 */
export function isQuoteListDisplayed() {
  log(
    'Verifies whether the quote list page is displayed',
    isQuoteListDisplayed.name
  );
  cy.get('cx-quote-list').should('be.visible');
}

/**
 * Verifies whether the quote list contains a certain quote ID.
 */
export function checkQuoteListContainsQuoteId() {
  log(
    'Verifies whether the quote list contains a certain quote ID',
    checkQuoteListContainsQuoteId.name
  );
  cy.get('@quoteId').then((quoteId) => {
    cy.get('cx-quote-list tr')
      .contains('td.cx-code', `${quoteId}`)
      .should('be.visible');
  });
}

/**
 * Verifies the status of a certain quote in the quote list.
 *
 * @param status - Quote status
 */
export function checkQuoteStatusInQuoteList(status: string) {
  log(
    'Verifies the status of a certain quote in the quote list',
    checkQuoteStatusInQuoteList.name
  );
  cy.get('@quoteId').then((quoteId) => {
    cy.get('cx-quote-list tr')
      .contains('td.cx-code', `${quoteId}`)
      .parent()
      .within(() => {
        cy.get('td.cx-status').contains('td.cx-status', status);
      });
  });
}

/**
 * Verifies whether the quote overview page is displayed.
 */
function isQuoteHeaderOverviewPageDisplayed() {
  log(
    'Verifies whether the quote overview page is displayed',
    isQuoteHeaderOverviewPageDisplayed.name
  );
  cy.get('.QuoteDetailsPageTemplate').should('be.visible');

  isQuoteActionsLinkDisplayed();
  isQuoteHeaderOverviewDisplayed();
  isQuoteItemsDisplayed();
  isQuoteHeaderPriceDisplayed();
  isQuoteActionsByRoleDisplayed();
}

/**
 * Verifies whether the quote actions link component is displayed.
 */
export function isQuoteActionsLinkDisplayed() {
  log(
    'Verifies whether the quote actions link component is displayed.',
    isQuoteActionsLinkDisplayed.name
  );
  cy.get('cx-quote-actions-link').should('be.visible');
}

/**
 * Verifies whether the quote header overview component is displayed.
 */
export function isQuoteHeaderOverviewDisplayed() {
  log(
    'Verifies whether the quote header overview component is displayed',
    isQuoteHeaderOverviewDisplayed.name
  );
  cy.get('cx-quote-header-overview').should('be.visible');
}

/**
 * Verifies whether the quote comments component is displayed.
 */
export function isQuoteCommentsDisplayed() {
  log(
    'Verifies whether the quote comments component is displayed',
    isQuoteCommentsDisplayed.name
  );
  cy.get('cx-quote-comments').should('be.visible');
}

/**
 * Verifies whether the quote items component is displayed.
 */
export function isQuoteItemsDisplayed() {
  log(
    'Verifies whether the quote items component is displayed',
    isQuoteItemsDisplayed.name
  );
  cy.get('cx-quote-items').should('be.visible');
}

/**
 * Verifies whether the quote header price component is displayed.
 */
export function isQuoteHeaderPriceDisplayed() {
  log(
    'Verifies whether the quote header price component is displayed',
    isQuoteHeaderPriceDisplayed.name
  );
  cy.get('cx-quote-header-price').should('be.visible');
}

/**
 * Verifies whether the quote actions by role component is displayed.
 */
export function isQuoteActionsByRoleDisplayed() {
  log(
    'Verifies whether the quote actions by role component is displayed',
    isQuoteActionsByRoleDisplayed.name
  );
  cy.get('cx-quote-actions-by-role').should('be.visible');
}

/**
 * Clicks on 'Request Quote' button on the cart page.
 */
export function clickOnRequestQuote(): void {
  log(
    'Clicks on "Request Quote" button on the cart page.',
    clickOnRequestQuote.name
  );
  cy.get('cx-quote-request-button button')
    .click()
    .then(() => {
      isQuoteHeaderOverviewPageDisplayed();
    });
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
 * Uses a cx-login-form to log out a user.
 *
 * @param shopName Name of the current shop (Powertools)
 */
export function logout(shopName: string): void {
  log('Logout buyer user', logout.name);
  cy.visit(`${shopName}/en/USD/logout`).then(() => {
    cy.get('cx-login [role="link"]');
  });
}

/**
 * Enables the asm mode for the given shop.
 *
 * @param shopName Name of the shop (Powertools)
 */
export function enableASMMode(shopName: string) {
  log('Enables the asm mode for the given shop', enableASMMode.name);
  cy.visit(`${shopName}/en/USD/?asm=true`).then(() => {
    cy.get('cx-asm-main-ui').should('be.visible');
  });
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
  shopName: string,
  productId: string,
  productAmount: number,
  submitThresholdMet: boolean
) {
  log(
    'Requests a quote and verifies if it is in draft state',
    prepareQuote.name
  );
  requestQuote(shopName, productId, productAmount.toString());
  checkQuoteInDraftState(submitThresholdMet, productId);
}

/**
 * 'Requests a quote as buyer, starts asm mode and and verifies if it is in draft state.
 *
 * @param shopName Name of the given shop
 * @param salesrep_email Email of the sales reporter
 * @param salesrep_password password of the sales reporter
 * @param buyer Buyer object, containing full name and email of the buyer
 */
export function prepareSellerQuote(
  shopName: string,
  salesrep_email: string,
  salesrep_password: string,
  buyer: object
) {
  log(
    'Requests a quote as buyer, starts asm mode and and verifies if it is in draft state',
    prepareQuote.name
  );
  submitQuote(STATUS_BUYER_SUBMIT);
  checkQuoteState(STATUS_SUBMITTED);
  logout(shopName);
  enableASMMode(shopName);
  asm.agentLogin(salesrep_email, salesrep_password);
  asm.startCustomerEmulation(buyer, true);
  isQuoteAvailableForSeller(shopName);
  gotToQuoteOverviewPage();
}

/**
 * Verifies if the most recent created quote of the buyer is available for the seller.
 *
 * @param shopName Name of the given shop
 */
function isQuoteAvailableForSeller(shopName: string) {
  const quoteListPath = `${shopName}/en/USD/my-account/quotes`;
  cy.visit(quoteListPath).then(() => {
    cy.location('pathname').should('contain', quoteListPath);
    cy.get('.AccountPageTemplate').should('be.visible');
  });
  waitUntilQuoteExists(5, quoteListPath);
}

/**
 * Reloads the quote list up to {remainingAttempt} times and and checks if the recently created quote is present.
 *
 * @param remainingAttempts Amount of attempts to reload the quote list and search for the quoteid
 * @param quoteListPath Path of the quote list
 */
function waitUntilQuoteExists(
  remainingAttempts: number,
  quoteListPath: string
) {
  log(
    `Loop till quote element exists, remaining attempts:  ${remainingAttempts} `,
    waitUntilQuoteExists.name
  );
  let elementFound: boolean = false;
  cy.get('@quoteId').then((quoteId) => {
    cy.get('cx-quote-list tr td.cx-code')
      .then((elem) => {
        if (elem.text().includes(`${quoteId}`)) {
          elementFound = true;
        }
      })
      .then(() => {
        if (elementFound === false) {
          if (--remainingAttempts > 0) {
            cy.log(
              'Quote not found yet. Remaining attempts: ' + remainingAttempts
            );
            cy.visit(quoteListPath).then(() => {
              cy.location('pathname').should('contain', quoteListPath);
              cy.get('.AccountPageTemplate').should('be.visible');
              return cy.wait(1000).then(() => {
                return waitUntilQuoteExists(remainingAttempts, quoteListPath);
              });
            });
          } else {
            cy.get('@quoteId').then(($quoteId) => {
              throw Error(`Quote for ${$quoteId} was not found.`);
            });
          }
        }
      });
  });
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
  addProductToCart(shopName, productName, quantity);
  clickOnRequestQuote();
  cy.url().should('contain', '/quote').as('quoteURL');
  cy.url().then((url) => {
    const currentURL = url.split('/');
    const quoteId = currentURL[currentURL.length - 1];
    cy.log('quote ID: ' + quoteId);
    cy.wrap(quoteId).as('quoteId');
  });
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
  setQuantity(quantity);
  common.clickOnAddToCartBtnOnPD();
  common.clickOnViewCartBtnOnPD();
}

/**
 * Submits a quote via clicking "Yes" button in the confirmation popover.
 *
 * @param status Status of the submit within the quote process
 * @param shopName Name of the given shop
 */
export function submitQuote(status: string, shopName?: string): void {
  log(
    'Submits a quote via clicking "Yes" button in the confirmation popover',
    submitQuote.name
  );
  gotToQuoteOverviewPage();
  clickSubmitQuoteBtn();
  clickOnYesBtnWithinRequestPopUp(status, shopName);
  gotToQuoteOverviewPage();
}

/**
 * Clicks on 'Submit Quote' button on the quote overview page.
 */
function clickSubmitQuoteBtn(): void {
  log(
    'Submits a quote via clicking "Submit" button on the quote details overview page',
    clickSubmitQuoteBtn.name
  );
  cy.get('cx-quote-actions-by-role button.btn-primary')
    .click()
    .then(() => {
      cy.get('cx-quote-actions-confirm-dialog').should('be.visible');
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
  getCurrentPriceForQuantityStepperUpdate(itemIndex);
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
  cy.get(`cx-quote-items .cx-item-list-row:nth-child(${itemIndex})`).within(
    () => {
      cy.get('cx-item-counter button')
        .contains(changeType)
        .click()
        .then(() => {
          cy.wait(PATCH_QUOTE_ALIAS)
            .its('response.statusCode')
            .should('eq', 200);
          cy.wait(GET_QUOTE_ALIAS).its('response.statusCode').should('eq', 200);
          comparePriceForQuantityStepperUpdate();
        });
    }
  );
}

/**
 * Saves the total price of an item for the current quantity as "oldPrice" alias.
 *
 * @param itemIndex Index of the item in the QDP cart list
 */
function getCurrentPriceForQuantityStepperUpdate(itemIndex: number) {
  cy.get(`cx-quote-items .cx-item-list-row:nth-child(${itemIndex})`).within(
    () => {
      cy.get('td[class= cx-total]').within(() => {
        cy.get('div[class=cx-value]')
          .invoke('text')
          .then((text) => {
            cy.wrap(text).as('oldPrice');
          });
      });
    }
  );
}

/**
 * Compares the currently shown total price to not equal the "oldPrice" alias to make sure the price has changed.
 */
function comparePriceForQuantityStepperUpdate() {
  cy.get('@oldPrice')
    .invoke('toString')
    .then((oldPrice) => {
      cy.get('td[class= cx-total]').within(() => {
        cy.get('div[class=cx-value]')
          .invoke('text')
          .should('not.equal', oldPrice);
      });
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
  getCurrentPriceForQuantityStepperUpdate(itemIndex);
  log(
    'Changes the quantity of the cart item in the quote details overview using the quantity counter',
    changeItemQuantityByCounter.name
  );
  cy.get(`cx-quote-items .cx-item-list-row:nth-child(${itemIndex})`).within(
    () => {
      cy.get('cx-item-counter input')
        .type('{selectall}' + newQuantity)
        .pressTab();
      cy.wait(PATCH_QUOTE_ALIAS).its('response.statusCode').should('eq', 200);
      cy.wait(GET_QUOTE_ALIAS).its('response.statusCode').should('eq', 200);
      comparePriceForQuantityStepperUpdate();
    }
  );
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
  cy.get(`cx-quote-items .cx-item-list-row:nth-child(${itemIndex})`).within(
    () => {
      cy.get('cx-item-counter input').should('have.value', expectedQuantity);
    }
  );
}

/**
 * Click the 'Remove' button for the item at the given index to remove a cart item.
 *
 * @param itemIndex Index of the Item in the QDP cart list
 */
export function removeItem(itemIndex: number): void {
  log('Removes the item at index', removeItem.name);
  cy.get(`cx-quote-items .cx-item-list-row:nth-child(${itemIndex})`).within(
    () => {
      cy.get('button')
        .contains('Remove')
        .click()
        .then(() => {
          cy.wait(PATCH_QUOTE_ALIAS)
            .its('response.statusCode')
            .should('eq', 200);
          cy.get(
            `cx-quote-items .cx-item-list-row:nth-child(${itemIndex})`
          ).should('not.exist');
        });
    }
  );
  gotToQuoteOverviewPage();
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
  cy.get(`cx-quote-items .cx-item-list-row:nth-child(${itemIndex})`)
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
    cy.get(`cx-quote-items .cx-item-list-row:nth-child(${itemIndex})`).should(
      'not.exist'
    );
  } else {
    cy.get(`cx-quote-items .cx-item-list-row:nth-child(${itemIndex})`)
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
  cy.get(`cx-quote-header-overview .cx-container .card-body`)
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
  cy.get(`cx-quote-header-overview .cx-container .card-body`)
    .contains(CARD_TITLE_QUOTE_INFORMATION)
    .then(() => {
      if (newQuoteName) {
        cy.get(`cx-quote-header-overview .cx-container .card-body input`)
          .clear()
          .type(newQuoteName);
      }
      if (newQuoteDescription) {
        cy.get(`cx-quote-header-overview .cx-container .card-body textarea`)
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
  cy.get(`cx-quote-header-overview .cx-container .card-body`)
    .contains(CARD_TITLE_QUOTE_INFORMATION)
    .then(() => {
      cy.get('button')
        .contains('Save')
        .should('exist')
        .click()
        .then(() => {
          cy.wait(POST_QUOTE_ALIAS);
          isQuoteHeaderOverviewPageDisplayed();
        });
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
  cy.get('cx-quote-header-overview .cx-container .card-body')
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
  cy.get(`cx-quote-header-overview .cx-container .card-body`)
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
export function clickOnYesBtnWithinRequestPopUp(
  status: string,
  shopName?: string
): void {
  log(
    'Clicks on "Yes" button within the quote confirmation popover',
    clickOnYesBtnWithinRequestPopUp.name
  );
  cy.get('cx-quote-actions-confirm-dialog button.btn-primary')
    .click()
    .then(() => {
      switch (status) {
        case STATUS_BUYER_SUBMIT: {
          isQuoteListDisplayed();
          checkQuoteListContainsQuoteId();
          checkQuoteStatusInQuoteList(STATUS_SUBMITTED);
          break;
        }
        case STATUS_BUYER_CANCEL: {
          cy.wait(POST_QUOTE_ALIAS)
            .its('response.statusCode')
            .should('eq', 200);
          cy.url().should('include', 'quotes');
          break;
        }
        case STATUS_SALES_REPORTER_SUBMIT: {
          isQuoteListDisplayed();
          checkQuoteListContainsQuoteId();
          checkQuoteStatusInQuoteList(STATUS_SUBMITTED);
          break;
        }
        case STATUS_BUYER_CHECKOUT: {
          cy.url()
            .should('include', '/checkout/')
            .then(() => {
              cy.get(
                'cx-page-layout[class=MultiStepCheckoutSummaryPageTemplate]'
              )
                .should('be.visible')
                .then(() => {
                  goToQuoteListPage(shopName);
                })
                .then(() => {
                  checkQuoteStatusInQuoteList(STATUS_VENDOR_QUOTE);
                });
            });
          break;
        }
      }
    });
}

/**
 * Verifies if the global message is displayed on the top of the page.
 *
 * @param isDisplayed Indicates if  the global message should be shown
 * @param message Explicit message text that should be shown.
 */
export function checkGlobalMessageDisplayed(
  isDisplayed: boolean,
  message?: string
): void {
  log(
    'Verifies if the global message is displayed on the top of the page.',
    checkGlobalMessageDisplayed.name
  );
  if (isDisplayed) {
    cy.get('cx-global-message').should('be.visible');
    if (message) cy.get('cx-global-message').contains(message);
  } else {
    cy.get('cx-global-message').should('not.be.visible');
  }
}

/**
 * Verifies if "Submit" button is on the quote details overview page.
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
  cy.get('cx-quote-comments .cx-message-input').should('not.exist');
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
          .click()
          .then(() => {
            cy.wait(GET_QUOTE_ALIAS);
            cy.url().should('include', 'quotes');
          });
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
  cy.get('cx-quote-actions-link').within(() => {
    cy.get('section > ul > li')
      .next()
      .within(() => {
        cy.get('button')
          .contains('Quotes')
          .first()
          .click()
          .then(() => {
            cy.wait(GET_QUOTE_ALIAS);
            cy.url().should('include', 'quotes');
          });
      });
  });
}

/**
 * Verifies if the displayed quote is in draft state.
 *
 * @param submitThresholdMet Does the quote meet the threshold
 * @param productId Product id of a product which is part of the quote
 */
export function checkQuoteInDraftState(
  submitThresholdMet: boolean,
  productId: string
) {
  log(
    'Verifies if the displayed quote is in draft state',
    checkQuoteInDraftState.name
  );
  gotToQuoteOverviewPage();
  checkQuoteState(STATUS_DRAFT);
  checkGlobalMessageDisplayed(!submitThresholdMet);
  checkSubmitBtn(submitThresholdMet);
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
  cy.get('cx-quote-items .cx-table-item-container .cx-info').contains(
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
  cy.get('cx-quote-header-overview h3.cx-status').contains(status);
}

/**
 * Adds a header comment to the quote.
 *
 * @param text Text to add
 */
export function addHeaderComment(text: string) {
  log('Adds a header comment to the quote', addHeaderComment.name);
  getCommentAmount();
  cy.get('cx-quote-comments .cx-message-input').within(() => {
    cy.get('input').type(text);
    cy.get('button')
      .click()
      .then(() => {
        cy.wait(POST_QUOTE_ALIAS);
        checkCommentAmountChanged();
      });
  });
}

/**
 * Verifies the amount of shown comments has changed.
 */
function checkCommentAmountChanged() {
  cy.get('button')
    .parents('cx-messaging')
    .within(($element) => {
      cy.get('.cx-message-card')
        .should('exist')
        .then(() => {
          cy.get('@oldCommentAmount').then((oldCommentAmount) => {
            cy.wrap($element.parent())
              .find('.cx-message-card')
              .should('not.have.length', oldCommentAmount);
          });
        });
    });
}

/**
 * Gets the current amount of displayed comments.
 */
function getCommentAmount() {
  cy.get('cx-messaging').then(($element) => {
    if ($element.find('.cx-message-card').length) {
      cy.wrap($element.find('.cx-message-card').length).as('oldCommentAmount');
    } else {
      cy.wrap('0').as('oldCommentAmount');
    }
  });
}

/**
 * Verifies if the header comment is displayed on the given position.
 *
 * @param index Position of the comment, starting with 0 for the first comment.
 * @param text Text to be displayed
 */
export function checkComment(index: number, text: string) {
  log('Verifies a comment', checkComment.name);
  cy.get(`cx-quote-comments  .cx-message-card:nth-child(${index})`).should(
    'contain.text',
    text
  );
}

/**
 * Adds a item comment to the quote.
 *
 * @param item Name of the item
 * @param text Text to add
 */
export function addItemComment(item: string, text: string) {
  log('Adds an item comment to the quote', addItemComment.name);
  getCommentAmount();
  cy.get('cx-quote-comments .cx-footer-label').within(() => {
    cy.get('select').select(item);
  });
  cy.get('cx-quote-comments  .cx-message-input').within(() => {
    cy.get('input').type(text);
    cy.get('button')
      .click()
      .then(() => {
        cy.wait(POST_QUOTE_ALIAS);
        checkCommentAmountChanged();
      });
  });
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
  cy.get(`cx-quote-comments .cx-message-card:nth-child(${index})`).should(
    'contain.text',
    text
  );
  cy.get(
    `cx-quote-comments  .cx-message-card:nth-child(${index}) .cx-message-item-link`
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
    `cx-quote-comments .cx-message-card:nth-child(${index}) .cx-message-item-link`
  )
    .contains(item)
    .click()
    .then(() => {
      cy.get(GET_QUOTE_ALIAS);
      cy.get(`cx-quote-items`).should('contain', item).focused();
    });
}

/**
 * Verifies if the item at the given index in the quote details cart is visible within the viewport.
 *
 * @param index Index of the quote details cart row.
 */
export function checkLinkedItemInViewport(index: number) {
  log('Verifies if the item in the viewport', checkLinkedItemInViewport.name);
  cy.get(`cx-quote-items .cx-item-list-row:nth-child(${index})`).should(
    'be.visible'
  );
}

/**
 * Cancels the quote.
 */
export function cancelQuote(status: string) {
  log('Cancels the quote', cancelQuote.name);
  clickCancelQuoteBtn();
  clickOnYesBtnWithinRequestPopUp(status);
}

/**
 * Clicks on "Cancel Quote" button.
 */
function clickCancelQuoteBtn() {
  log('Clicks on "Cancel Quote" button', clickCancelQuoteBtn.name);
  cy.get('cx-quote-actions-by-role button.btn-secondary')
    .click()
    .then(() => {
      cy.get('cx-quote-actions-confirm-dialog').should('be.visible');
    });
}

/**
 * Navigates to the quote list page.
 *
 * @param {string} shopName - shop name
 */
export function goToQuoteListPage(shopName: string): void {
  const location = `${shopName}/en/USD/my-account/quotes`;
  cy.visit(location).then(() => {
    cy.location('pathname').should('contain', location);
    cy.get('.AccountPageTemplate').should('be.visible');
  });
}

/**
 * Go to the quote overview page.
 */
export function gotToQuoteOverviewPage() {
  log('Go to the quote overview page', gotToQuoteOverviewPage.name);
  cy.get<string>('@quoteURL')
    .then(cy.visit)
    .then(() => {
      isQuoteHeaderOverviewPageDisplayed();
    });
}

/**
 * Enables the edit mode for the quote.
 */
export function enableEditQuoteMode() {
  log('Enables the edit mode for the quote', enableEditQuoteMode.name);
  cy.get('cx-quote-actions-by-role button.btn-secondary')
    .click()
    .then(() => {
      cy.get('cx-quote-header-seller-edit').should('be.visible');
    });
}

/**
 * Creates an expiry date for the quote (2 months and 2 days in the future from today).
 *
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
 * Sets the expiry date to the given value.
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
  cy.get('cx-quote-header-seller-edit cx-date-picker input')
    .type(expiryDateString)
    .trigger('change')
    .then(() => {
      cy.wait(PATCH_QUOTE_ALIAS).its('response.statusCode').should('eq', 200);
      checkExpiryDate();
    });
}

/**
 * Verifies if the shown expiry date matches the given expiry date.
 */
export function checkExpiryDate() {
  log(
    'Verifies if the shown expiry date matches the given expiry date',
    checkExpiryDate.name
  );

  cy.get(
    'cx-quote-header-overview .cx-container .card-body .cx-card-paragraph-title'
  )
    .contains('Expiry Date')
    .parent()
    .within(() => {
      cy.get('.cx-card-paragraph-text').contains(createFormattedExpiryDate());
    });
}

/**
 * Creates the formatted expiry date string.
 *
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
 * Sets the discount (sales reporter perspective) and applies it to the total estimated price.
 *
 * @param discount Discount which is applied to the total estimated price
 */
export function setDiscount(discount: string) {
  log('Sets the discount (sales reporter perspective', setDiscount.name);
  getEstimatedTotalPriceBeforeDiscount();
  cy.get('cx-quote-header-seller-edit input[name="discount"]').type(discount);
  cy.get('cx-quote-header-seller-edit button.btn-secondary')
    .click()
    .then(() => {
      cy.wait(POST_QUOTE_ALIAS).its('response.statusCode').should('eq', 200);
      cy.wait(GET_QUOTE_ALIAS);
      checkDiscountApplied();
    });
}

/**
 * Verifies the total value price is updated after applying a discount.
 */
function checkDiscountApplied() {
  log(
    'Verifies the total value price is updated after applying a discount',
    checkDiscountApplied.name
  );
  cy.get(
    'cx-quote-header-overview .cx-container .card-body .cx-card-paragraph-title'
  )
    .contains('Estimated Total')
    .parent()
    .within(() => {
      cy.get('@priceBeforeDiscount').then(($priceBeforeDiscount) => {
        cy.get('.cx-card-paragraph-text')
          .invoke('text')
          .should('not.equal', $priceBeforeDiscount);
      });
    });
}

/**
 * Creates an alias for the estimated total price before the discount is applied.
 */
function getEstimatedTotalPriceBeforeDiscount() {
  log(
    'Creates an alias for the estimated total price before the discount is applied',
    getEstimatedTotalPriceBeforeDiscount.name
  );
  cy.get(
    'cx-quote-header-overview .cx-container .card-body .cx-card-paragraph-title'
  )
    .contains('Estimated Total')
    .parent()
    .within(() => {
      cy.get('.cx-card-paragraph-text')
        .invoke('text')
        .then(($text) => {
          cy.wrap($text).as('priceBeforeDiscount');
        });
    });
}

/**
 * Verifies if the estimated total price shown equals the estimate total price given.
 *
 * @param newEstimatedTotalPrice The given estimated total price
 */
export function checkTotalEstimatedPrice(newEstimatedTotalPrice: string) {
  log(
    'Verifies the discount was applied correctly and the estimated total price is updated',
    checkTotalEstimatedPrice.name
  );
  cy.get(
    'cx-quote-header-overview .cx-container .card-body .cx-card-paragraph-title'
  )
    .contains('Estimated Total')
    .parent()
    .within(() => {
      cy.get('.cx-card-paragraph-text').contains(newEstimatedTotalPrice);
    });
}

/**
 * Clicks on 'Edit Configuration' for the configurable product.
 *
 * @param itemIndex Index of the item in the QDP cart list
 */
export function clickOnEditConfigurationLink(itemIndex: number) {
  log('click on "Edit Configuration"', clickOnEditConfigurationLink.name);
  cy.get(
    `cx-quote-items cx-cart-item-list .cx-item-list-row:nth-child(${itemIndex})`
  ).within(() => {
    cy.get('.cx-action-link')
      .click({
        force: true,
      })
      .then(() => {
        cy.location('pathname').should('contain', '/cartEntry/entityKey/');
      });
  });
}

/**
 * Clicks on 'View Cart' on the product details page.
 */
export function clickOnViewCartBtnOnPD(): void {
  log(
    'Clicks on "View Cart" on the product details page',
    clickOnViewCartBtnOnPD.name
  );
  cy.get('div.cx-dialog-buttons a.btn-primary')
    .contains('view cart')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/quote');
      cy.get('cx-quote-items').should('be.visible');
    });
}

/**
 * Try to add a product to the cart and verify the given global message is shown.
 *
 * @param productName Name of the product that should be added to the cart
 * @param globalMessage Global message which should be shown
 */
export function addProductAndCheckForGlobalMessage(
  productName: string,
  globalMessage: string
) {
  productConfigurator.searchForProduct(productName);
  cy.get('cx-add-to-cart button.btn-primary')
    .first()
    .click()
    .then(() => {
      this.checkGlobalMessageDisplayed(true, globalMessage);
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
 * Registers POST quote route.
 */
export function registerPostQuoteRoute() {
  log('Registers POST quote route.', registerPostQuoteRoute.name);
  cy.intercept({
    method: 'POST',
    path: `*`, //ToDo: specify the path
  }).as(POST_QUOTE_ALIAS.substring(1)); // strip the '@'
}

/**
 * Registers PATCH quote route.
 */
export function registerPatchQuoteRoute() {
  log('Registers PATCH quote route.', registerPatchQuoteRoute.name);
  cy.intercept({
    method: 'PATCH',
    path: `*`, //ToDo: specify the path
  }).as(PATCH_QUOTE_ALIAS.substring(1)); // strip the '@'
}

/**
 * Reloads the quote page.
 * This method is equal to F5.
 */
export function reload() {
  log('Reloads the quote page', reload.name);
  cy.reload();
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
