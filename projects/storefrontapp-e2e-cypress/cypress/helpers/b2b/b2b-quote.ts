/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as asm from '../asm';
import * as authentication from '../auth-forms';
import * as cart from '../cart';
import * as common from '../common';
import * as productConfigurator from '../product-configurator';

export const READ_QUOTE = '@READ_QUOTE';
export const UPDATE_QUOTE_ITEM = '@UPDATE_QUOTE_ITEM';
export const UPDATE_CART_ITEM = '@UPDATE_CART_ITEM';
export const DELETE_QUOTE_ITEM = '@DELETE_QUOTE_ITEM';
export const ADD_QUOTE_COMMENT = '@ADD_QUOTE_COMMENT';
export const PERFORM_QUOTE_ACTION = '@PERFORM_QUOTE_ACTION';
export const STATUS_SUBMITTED = 'Submitted';
export const STATUS_REQUESTED = 'Requested';
export const STATUS_CANCELED = 'Cancelled';
export const STATUS_DRAFT = 'Draft';
export const STATUS_VENDOR_QUOTE = 'Vendor Quote';
export const STATUS_BUYER_SUBMIT = 'status_buyer_submit';
export const STATUS_BUYER_CANCEL = 'status_buyer_cancel';
export const STATUS_BUYER_CHECKOUT = 'status_buyer_checkout';
export const STATUS_SALES_REPORTER_SUBMIT = 'status_sales_reporter_submit';
const SHOP_NAME = Cypress.env('BASE_SITE'); //Powertools-spa
const QUOTE_LIST_PATH = `${SHOP_NAME}/en/USD/my-account/quotes`;
const CARD_TITLE_QUOTE_INFORMATION = 'Quote Information';
const SUBMIT_BTN = 'Submit Quote';
const EXPIRY_DATE: Date = createValidExpiryDate();
const SAVE_CART_POPUP_MSG =
  'Your current cart will be converted to a saved cart.';
const GLOBAL_MSG_QUOTE_REQUEST_NOT_POSSIBLE =
  'There are problems with your entries. Please review your cart.';
const GLOBAL_MSG_SAVED_CART_CREATED =
  'Your active cart was converted to saved cart';

/**
 * Selectors
 */

const defaultAddToCartComponentSelector = 'cx-add-to-cart';
const listComponentSelector = 'cx-quote-list';
const defaultSavedCartListComponentSelector = 'cx-saved-cart-list';
const linksComponentSelector = 'cx-quote-links';
const headerOverviewComponentSelector = 'cx-quote-header-overview';
const commentsComponentSelector = 'cx-quote-comments';
const itemsComponentSelector = 'cx-quote-items';
const summaryActionsComponentSelector = 'cx-quote-summary-actions';
const requestButtonComponentSelector = 'cx-quote-request-button';
const defaultItemCounterComponentSelector = 'cx-item-counter';
const confirmDialogComponentSelector = 'cx-quote-confirm-dialog';
const defaultMessagingComponentSelector = 'cx-messaging';
const summarySellerEditComponentSelector = 'cx-quote-summary-seller-edit';

/**
 * Sets quantity.
 */
export function setAddToCartQuantity(quantity: string): void {
  log('Sets quantity', setAddToCartQuantity.name);
  cy.get(defaultAddToCartComponentSelector).within(() => {
    cy.get('input').clear().type(`{selectall}${quantity}`);
  });
}

/**
 * Verifies whether the quote list is displayed.
 */
export function checkQuoteListDisplayed() {
  log(
    'Verifies whether the quote list page is displayed',
    checkQuoteListDisplayed.name
  );
  cy.get(listComponentSelector).should('be.visible');
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
    cy.get(listComponentSelector).within(() => {
      cy.get('tr').contains('.cx-code', `${quoteId}`).should('be.visible');
    });
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
    cy.get(listComponentSelector).within(() => {
      cy.get('tr')
        .contains('.cx-code', `${quoteId}`)
        .parent()
        .within(() => {
          cy.get('.cx-status').contains('.cx-status', status);
        });
    });
  });
}

/**
 * Verifies whether the quote overview page is displayed.
 */
function checkQuoteHeaderOverviewPageDisplayed() {
  log(
    'Verifies whether the quote overview page is displayed',
    checkQuoteHeaderOverviewPageDisplayed.name
  );
  cy.get('.QuoteDetailsPageTemplate').should('be.visible');

  checkQuoteLinksDisplayed();
  checkQuoteHeaderOverviewDisplayed();
  checkQuoteItemsDisplayed();
  checkQuoteSummaryPriceDisplayed();
}

/**
 * Verifies whether the quote links component is displayed.
 */
export function checkQuoteLinksDisplayed() {
  log(
    'Verifies whether the quote link component is displayed.',
    checkQuoteLinksDisplayed.name
  );
  cy.get(linksComponentSelector).should('be.visible');
}

/**
 * Verifies whether the quote header overview component is displayed.
 */
export function checkQuoteHeaderOverviewDisplayed() {
  log(
    'Verifies whether the quote header overview component is displayed',
    checkQuoteHeaderOverviewDisplayed.name
  );
  cy.get(headerOverviewComponentSelector).should('be.visible');
}

/**
 * Verifies whether the quote items component is displayed.
 */
export function checkQuoteItemsDisplayed() {
  log(
    'Verifies whether the quote items component is displayed',
    checkQuoteItemsDisplayed.name
  );
  cy.get(itemsComponentSelector).should('be.visible');
}

/**
 * Verifies whether the quote summary price component is displayed.
 */
export function checkQuoteSummaryPriceDisplayed() {
  log(
    'Verifies whether the quote header price component is displayed',
    checkQuoteSummaryPriceDisplayed.name
  );
  cy.get('cx-quote-summary').should('exist');
}

/**
 * Clicks on 'Request Quote' button on the cart page.
 */
export function clickOnRequestQuote(cartHasIssues = false): void {
  log(
    'Clicks on "Request Quote" button on the cart page.',
    clickOnRequestQuote.name
  );
  cy.get(requestButtonComponentSelector)
    .within(() => {
      cy.get('button').click();
    })
    .then(() => {
      if (!cartHasIssues) {
        checkQuoteHeaderOverviewPageDisplayed();
      } else {
        // If there is a cart item with issues in the cart then display a corresponding global message and stay in the cart
        checkGlobalMessageDisplayed(
          true,
          GLOBAL_MSG_QUOTE_REQUEST_NOT_POSSIBLE
        );
        cy.get('cx-cart-details').should('exist');
      }
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
 */
export function logout(): void {
  log('Logout buyer user', logout.name);
  cy.visit(`${SHOP_NAME}/en/USD/logout`).then(() => {
    cy.get('cx-login [role="link"]');
  });
}

/**
 * Enables the asm mode for the given shop.
 */
export function enableASMMode() {
  log('Enables the asm mode for the given shop', enableASMMode.name);
  cy.visit(`${SHOP_NAME}/en/USD/?asm=true`).then(() => {
    cy.get('cx-asm-main-ui').should('be.visible');
  });
}

/**
 * Requests a quote and verifies if it is in draft state.
 *
 * @param productId Id of the product added to the quote
 * @param productAmount Amount of the product added to the quote
 * @param submitThresholdMet Defines wether the $25.000 threshold is met and the submit button is available
 */
export function prepareQuote(
  productId: string,
  productAmount: number,
  submitThresholdMet: boolean
) {
  log(
    'Requests a quote and verifies if it is in draft state',
    prepareQuote.name
  );
  requestQuote(productId, productAmount.toString());
  checkQuoteInDraftState(submitThresholdMet, productId);
}

/**
 * 'Requests a quote as buyer, starts asm mode and and verifies if it is in draft state.
 *
 * @param salesrep_email Email of the sales reporter
 * @param salesrep_password Password of the sales reporter
 * @param buyerUser Name  of the buyer
 * @param buyerEmail Email of the buyer
 */
export function prepareSellerQuote(
  salesrep_email: string,
  salesrep_password: string,
  buyerUser: string,
  buyerEmail: string
) {
  log(
    'Requests a quote as buyer, starts asm mode and and verifies if it is in draft state',
    prepareQuote.name
  );
  const buyer = {
    fullName: buyerUser,
    email: buyerEmail,
  };
  submitQuote(STATUS_BUYER_SUBMIT);
  checkQuoteState(STATUS_SUBMITTED);
  logout();
  enableASMMode();
  asm.agentLogin(salesrep_email, salesrep_password);
  asm.startCustomerEmulation(buyer, true);
  checkQuoteAvailableForSeller();
  goToQuoteOverviewPage();
}

/**
 * Verifies if the most recent created quote of the buyer is available for the seller.
 */
function checkQuoteAvailableForSeller() {
  cy.visit(QUOTE_LIST_PATH).then(() => {
    cy.location('pathname').should('contain', QUOTE_LIST_PATH);
    checkQuoteListDisplayed();
  });
  waitUntilQuoteExists(5, QUOTE_LIST_PATH);
}

/**
 * Reloads the quote list up to {remainingAttempt} times and and checks if the recently created quote is present.
 *
 * @param remainingAttempts Number of attempts to reload the quote list and search for the quoteid
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
    cy.get(listComponentSelector)
      .within(() => {
        cy.get('.cx-code').then((elem) => {
          if (elem.text().includes(`${quoteId}`)) {
            elementFound = true;
          }
        });
      })
      .then(() => {
        if (!elementFound) {
          if (--remainingAttempts > 0) {
            cy.log(
              'Quote not found yet. Remaining attempts: ' + remainingAttempts
            );
            cy.visit(quoteListPath).then(() => {
              cy.location('pathname')
                .should('contain', quoteListPath)
                .then(() => {
                  checkQuoteListDisplayed();
                });
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
 * @param productName Name of the product that should be used for the quote
 * @param quantity Quantity of the product used for the quote
 */
export function requestQuote(productName: string, quantity: string): void {
  log('Requests a quote from cart', requestQuote.name);
  addProductToCart(productName, quantity);
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
 * @param productName Name of the product that should be used for the quote
 * @param quantity Quantity of the product used for the quote
 */
export function addProductToCart(productName: string, quantity: string): void {
  log('Adds a product to the cart', addProductToCart.name);
  common.goToPDPage(SHOP_NAME, productName);
  setAddToCartQuantity(quantity);
  common.clickOnAddToCartBtnOnPD();
  common.clickOnViewCartBtnOnPD();
}

/**
 * Submits a quote via clicking "Yes" button in the confirmation popover.
 *
 * @param status Status of the submit within the quote process
 */
export function submitQuote(status: string): void {
  log(
    'Submits a quote via clicking "Yes" button in the confirmation popover',
    submitQuote.name
  );
  goToQuoteOverviewPage();
  clickSubmitQuoteBtn();
  clickOnYesBtnWithinRequestPopUp(status);
  goToQuoteOverviewPage();
}

/**
 * Verifies whether the quote confirm dialog is displayed.
 */
export function checkQuoteConfirmDialogDisplayed() {
  log(
    'Verifies whether the quote confirm dialog is displayed',
    checkQuoteConfirmDialogDisplayed.name
  );
  cy.get(confirmDialogComponentSelector).should('be.visible');
}

/**
 * Clicks on 'Submit Quote' button on the quote overview page.
 */
function clickSubmitQuoteBtn(): void {
  log(
    'Submits a quote via clicking "Submit" button on the quote details overview page',
    clickSubmitQuoteBtn.name
  );
  cy.get(summaryActionsComponentSelector)
    .within(() => {
      cy.get('button.btn-primary').click();
    })
    .then(() => {
      checkQuoteConfirmDialogDisplayed();
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
  cy.get(itemsComponentSelector).within(() => {
    cy.get(`.cx-item-list-row:nth-child(${itemIndex})`).within(() => {
      cy.get(defaultItemCounterComponentSelector)
        .within(() => {
          cy.get(' button').contains(changeType).click();
        })
        .then(() => {
          cy.wait(UPDATE_CART_ITEM)
            .its('response.statusCode')
            .should('eq', 200);
          cy.wait(READ_QUOTE).its('response.statusCode').should('eq', 200);
          comparePriceForQuantityStepperUpdate();
        });
    });
  });
}

/**
 * Saves the total price of an item for the current quantity as "oldPrice" alias.
 *
 * @param itemIndex Index of the item in the QDP cart list
 */
function getCurrentPriceForQuantityStepperUpdate(itemIndex: number) {
  cy.get(itemsComponentSelector).within(() => {
    cy.get(`.cx-item-list-row:nth-child(${itemIndex})`).within(() => {
      cy.get('td[class= cx-total]').within(() => {
        cy.get('div[class=cx-value]')
          .invoke('text')
          .then((text) => {
            cy.wrap(text).as('oldPrice');
          });
      });
    });
  });
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
  cy.get(itemsComponentSelector).within(() => {
    cy.get(`.cx-item-list-row:nth-child(${itemIndex})`)
      .within(() => {
        cy.get('input')
          .type('{selectall}' + newQuantity)
          .pressTab();
      })
      .then(() => {
        cy.wait(UPDATE_CART_ITEM).its('response.statusCode').should('eq', 200);
        cy.wait(READ_QUOTE).its('response.statusCode').should('eq', 200);
        comparePriceForQuantityStepperUpdate();
      });
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
  cy.get(itemsComponentSelector).within(() => {
    cy.get(`.cx-item-list-row:nth-child(${itemIndex})`).within(() => {
      cy.get('input').should('have.value', expectedQuantity);
    });
  });
}

/**
 * Click the 'Remove' button for the item at the given index to remove a cart item.
 *
 * @param itemIndex Index of the Item in the QDP cart list
 */
export function removeItem(itemIndex: number): void {
  log('Removes the item at index', removeItem.name);
  cy.get(itemsComponentSelector).within(() => {
    cy.get(`.cx-item-list-row:nth-child(${itemIndex})`)
      .within(() => {
        cy.get('button').contains('Remove').click();
      })
      .then(() => {
        cy.wait(DELETE_QUOTE_ITEM).its('response.statusCode').should('eq', 200);
        cy.get(`.cx-item-list-row:nth-child(${itemIndex})`).should('not.exist');
      });
  });
  goToQuoteOverviewPage();
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
  cy.get(itemsComponentSelector).within(() => {
    cy.get(`.cx-item-list-row:nth-child(${itemIndex})`)
      .should('be.visible')
      .contains(productID);
  });
}

/**
 * Verifies the quote cart does not contain any items.
 */
export function checkQuoteCartIsEmpty(): void {
  log(
    'Verifies the quote cart does not contain any items',
    checkQuoteCartIsEmpty.name
  );
  cy.get(itemsComponentSelector).within(() => {
    cy.get('.cx-item-list-row:nth-child(1)').should('not.exist');
  });
}

/**
 * Verifies if the "Quote Information" card tile is in edit mode.
 *
 * @param isEditModeActive Indicates if the card is in edit mode
 */
export function checkQuoteHeaderOverviewCardState(
  isEditModeActive: boolean
): void {
  log(
    'Verifies if the "Quote Information" card tile is in edit mode',
    checkQuoteHeaderOverviewCardState.name
  );
  cy.get(headerOverviewComponentSelector).within(() => {
    cy.get('.card-body')
      .contains(CARD_TITLE_QUOTE_INFORMATION)
      .should('exist')
      .then(() => {
        if (isEditModeActive) {
          cy.get('button').contains('Save').should('exist');
        } else {
          cy.get('button').contains('Save').should('not.exist');
        }
      });
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
  cy.get(headerOverviewComponentSelector).within(() => {
    cy.get('.card-body')
      .contains(CARD_TITLE_QUOTE_INFORMATION)
      .then(() => {
        if (newQuoteName) {
          cy.get('input').clear().type(newQuoteName);
        }
        if (newQuoteDescription) {
          cy.get('textarea').clear().type(newQuoteDescription);
        }
      });
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
  checkQuoteHeaderOverviewCardState(true);
  cy.get(headerOverviewComponentSelector)
    .within(() => {
      cy.get('.card-body')
        .contains(CARD_TITLE_QUOTE_INFORMATION)
        .then(() => {
          cy.get('button')
            .contains('Save')
            .should('exist')
            .click()
            .then(() => {
              cy.wait(UPDATE_QUOTE_ITEM);
            });
        });
    })
    .then(() => {
      checkQuoteHeaderOverviewPageDisplayed();
    });
}

/**
 * Verifies if the expected quote name equals the current quote name.
 *
 * @param expectedQuoteInformationContent expected quote name
 */
export function checkQuoteHeaderOverviewCardContent(
  expectedQuoteInformationContent: string
): void {
  log(
    'Verifies if the expected quote name equals the current quote name',
    checkQuoteHeaderOverviewCardContent.name
  );
  cy.get(headerOverviewComponentSelector).within(() => {
    cy.get('.cx-card-paragraph-text').contains(expectedQuoteInformationContent);
  });
}

/**
 * Clicks on the pencil to change the quote information within the "Quote Information" card tile.
 */
export function clickEditPencil(): void {
  log(
    'Clicks on the pencil to change the quote information within the "Quote Information" card tile.',
    clickEditPencil.name
  );
  cy.get(headerOverviewComponentSelector)
    .within(() => {
      cy.get('.card-body')
        .contains(CARD_TITLE_QUOTE_INFORMATION)
        .should('exist')
        .then(() => {
          cy.get('.cx-edit-btn').should('exist').click();
        });
    })
    .then(() => {
      checkQuoteHeaderOverviewCardState(true);
    });
}

/**
 * Clicks on 'Yes' button within the quote confirmation popover.
 *
 * @param quoteStatus Expected quote status
 */
export function clickOnYesBtnWithinRequestPopUp(quoteStatus: string): void {
  log(
    'Clicks on "Yes" button within the quote confirmation popover',
    clickOnYesBtnWithinRequestPopUp.name
  );
  cy.get(confirmDialogComponentSelector)
    .within(() => {
      cy.get('button.btn-primary').click();
    })
    .then(() => {
      checkQuoteStatus(quoteStatus);
    });
}

/**
 * Verifies the quote status.
 *
 * @param quoteStatus Expected quote status
 */
export function checkQuoteStatus(quoteStatus: string): void {
  switch (quoteStatus) {
    case STATUS_BUYER_SUBMIT: {
      checkQuoteListDisplayed();
      checkQuoteListContainsQuoteId();
      checkQuoteStatusInQuoteList(STATUS_SUBMITTED);
      break;
    }
    case STATUS_BUYER_CANCEL: {
      cy.wait(PERFORM_QUOTE_ACTION)
        .its('response.statusCode')
        .should('eq', 200);
      cy.url().should('include', 'quotes');
      break;
    }
    case STATUS_SALES_REPORTER_SUBMIT: {
      checkQuoteListDisplayed();
      checkQuoteListContainsQuoteId();
      checkQuoteStatusInQuoteList(STATUS_SUBMITTED);
      break;
    }
    case STATUS_BUYER_CHECKOUT: {
      cy.url()
        .should('include', '/checkout/')
        .then(() => {
          cy.get('cx-page-layout[class=MultiStepCheckoutSummaryPageTemplate]')
            .should('be.visible')
            .then(() => {
              goToQuoteListPage();
            })
            .then(() => {
              checkQuoteStatusInQuoteList(STATUS_VENDOR_QUOTE);
            });
        });
      break;
    }
  }
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
    if (message) cy.get('cx-global-message').contains(message);
  } else {
    cy.get('cx-global-message').should('not.be.visible');
  }
}

/**
 * Verifies if "Submit" button is on the quote details overview page.
 *
 * @param isEnabled States if the submit button should be enabled.
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
  cy.get(commentsComponentSelector).within(() => {
    cy.get('.cx-message-input').should('not.exist');
  });
}

/**
 * Navigates to the quote list via my account.
 */
export function navigateToQuoteListFromMyAccount() {
  log(
    'Navigates to quote list via my account',
    navigateToQuoteListFromMyAccount.name
  );
  cy.get('.accNavComponent')
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
          cy.wait(READ_QUOTE);
          cy.url().should('include', 'quotes');
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
  cy.get(linksComponentSelector).within(() => {
    cy.get('section > ul > li')
      .next()
      .within(() => {
        cy.get('a')
          .contains('Quotes')
          .first()
          .click()
          .then(() => {
            cy.wait(READ_QUOTE);
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
  goToQuoteOverviewPage();
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
  cy.get(itemsComponentSelector).within(() => {
    cy.get('.cx-info').contains(productId);
  });
}

/**
 * Verifies the quote state.
 *
 * @param status Expected Status of the quote
 */
export function checkQuoteState(status: string) {
  log('Verifies the quote state', checkQuoteState.name);
  cy.get(headerOverviewComponentSelector).within(() => {
    cy.get('.cx-status').contains(status);
  });
}

/**
 * Adds a header comment to the quote.
 *
 * @param text Text to add
 */
export function addHeaderComment(text: string) {
  log('Adds a header comment to the quote', addHeaderComment.name);
  getNumberOfComments();
  cy.get(commentsComponentSelector).within(() => {
    cy.get('.cx-message-input').within(() => {
      cy.get('input').type(text);
      cy.get('button')
        .click()
        .then(() => {
          cy.wait(ADD_QUOTE_COMMENT);
          checkNumberOfCommentsChanged();
        });
    });
  });
}

/**
 * Verifies the number of shown comments has changed.
 */
function checkNumberOfCommentsChanged() {
  cy.get('button')
    .parents(defaultMessagingComponentSelector)
    .within(($element) => {
      cy.get('.cx-message-card')
        .should('exist')
        .then(() => {
          cy.get('@NumberOfOldComments').then((NumberOfOldComments) => {
            cy.wrap($element.parent())
              .find('.cx-message-card')
              .should('not.have.length', NumberOfOldComments);
          });
        });
    });
}

/**
 * Gets the current number of displayed comments.
 */
function getNumberOfComments() {
  cy.get(defaultMessagingComponentSelector).then(($element) => {
    if ($element.find('.cx-message-card').length) {
      cy.wrap($element.find('.cx-message-card').length).as(
        'NumberOfOldComments'
      );
    } else {
      cy.wrap('0').as('NumberOfOldComments');
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
  cy.get(commentsComponentSelector).within(() => {
    cy.get(`.cx-message-card:nth-child(${index})`).should('contain.text', text);
  });
}

/**
 * Adds a item comment to the quote.
 *
 * @param item Name of the item
 * @param text Text to add
 */
export function addItemComment(item: string, text: string) {
  log('Adds an item comment to the quote', addItemComment.name);
  getNumberOfComments();
  cy.get(commentsComponentSelector).within(() => {
    cy.get('.cx-footer-label').within(() => {
      cy.get('select').select(item);
    });
    cy.get('.cx-message-input').within(() => {
      cy.get('input').type(text);
      cy.get('button')
        .click()
        .then(() => {
          cy.wait(ADD_QUOTE_COMMENT)
            .its('response.statusCode')
            .should('eq', 201);
          checkNumberOfCommentsChanged();
        });
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
  cy.get(commentsComponentSelector).within(() => {
    cy.get(`.cx-message-card:nth-child(${index})`).should('contain.text', text);
    cy.get(
      `.cx-message-card:nth-child(${index})` + ' .cx-message-item-link'
    ).contains(item);
  });
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
  cy.get(commentsComponentSelector)
    .within(() => {
      cy.get(`.cx-message-card:nth-child(${index})`).within(() => {
        cy.get(' .cx-message-item-link')
          .contains(item)
          .click()
          .then(() => {
            cy.get(READ_QUOTE);
          });
      });
    })
    .then(() => {
      cy.get(itemsComponentSelector).should('contain', item).focused();
    });
}

/**
 * Verifies if the item at the given index in the quote details cart is visible within the viewport.
 *
 * @param index Index of the quote details cart row.
 */
export function checkLinkedItemInViewport(index: number) {
  log('Verifies if the item in the viewport', checkLinkedItemInViewport.name);
  cy.get(itemsComponentSelector).within(() => {
    cy.get(`.cx-item-list-row:nth-child(${index})`).should('be.visible');
  });
}

/**
 * Cancels the quote.
 *
 * @param status Expected quote status
 * @param editMode States if the edit mode for the quote is active
 */
export function cancelQuote(status: string, editMode: boolean) {
  log('Cancels the quote', cancelQuote.name);
  clickCancelQuoteBtn(editMode);
  clickOnYesBtnWithinRequestPopUp(status);
}

/**
 * Clicks on "Cancel Quote" button.
 *
 * @param editModeis States if the edit mode for the quote is active
 */
function clickCancelQuoteBtn(editMode: boolean) {
  log('Clicks on "Cancel Quote" button', clickCancelQuoteBtn.name);
  cy.get(summaryActionsComponentSelector)
    .within(() => {
      if (editMode) {
        cy.get('button.btn-secondary').click();
      } else {
        cy.get('button.btn-tertiary').click();
      }
    })
    .then(() => {
      checkQuoteConfirmDialogDisplayed();
    });
}

/**
 * Navigates to the quote list page.
 */
export function goToQuoteListPage(): void {
  log('Go to the quote list page', goToQuoteListPage.name);
  const location = `${SHOP_NAME}/en/USD/my-account/quotes`;
  cy.visit(location).then(() => {
    cy.location('pathname').should('contain', location);
    checkQuoteListDisplayed();
  });
}

/**
 * Go to the quote overview page.
 */
export function goToQuoteOverviewPage() {
  log('Go to the quote overview page', goToQuoteOverviewPage.name);
  cy.get<string>('@quoteURL')
    .then(cy.visit)
    .then(() => {
      checkQuoteHeaderOverviewPageDisplayed();
    });
}

/**
 * Enables the edit mode for the quote.
 *
 * @param saveCartPopup states if the save active cart popup is shown
 * @param quoteStatus expected status of the quote
 */
export function enableEditQuoteMode(
  saveCartPopup?: boolean,
  quoteStatus?: string
) {
  log('Enables the edit mode for the quote', enableEditQuoteMode.name);
  if (saveCartPopup) {
    cy.get(summaryActionsComponentSelector)
      .within(() => {
        cy.get('button.btn-secondary').click();
      })
      .then(() => {
        isSaveActiveCartPopupShown(quoteStatus);
      });
  } else {
    cy.get(summaryActionsComponentSelector)
      .within(() => {
        cy.get('button.btn-secondary').click();
      })
      .then(() => {
        cy.get(summarySellerEditComponentSelector).should('exist');
      });
  }
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
  cy.get('cx-date-picker')
    .within(() => {
      cy.get('input').type(expiryDateString).trigger('change');
    })
    .then(() => {
      cy.wait(UPDATE_QUOTE_ITEM).its('response.statusCode').should('eq', 200);
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

  cy.get(headerOverviewComponentSelector).within(() => {
    cy.get('.cx-card-paragraph-title')
      .contains('Expiry Date')
      .parent()
      .within(() => {
        cy.get('.cx-card-paragraph-text').contains(createFormattedExpiryDate());
      });
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
  cy.get(summarySellerEditComponentSelector)
    .within(() => {
      cy.get(' input[name="discount"]')
        .type(discount)
        .then(() => {
          cy.get('button.btn-secondary')
            .click()
            .then(() => {
              cy.wait(UPDATE_QUOTE_ITEM)
                .its('response.statusCode')
                .should('eq', 200);
              cy.wait(READ_QUOTE);
            });
        });
    })
    .then(() => {
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
  cy.get(headerOverviewComponentSelector).within(() => {
    cy.get('.cx-card-paragraph-title')
      .contains('Estimated Total')
      .parent()
      .within(() => {
        cy.get('@priceBeforeDiscount').then(($priceBeforeDiscount) => {
          cy.get('.cx-card-paragraph-text')
            .invoke('text')
            .should('not.equal', $priceBeforeDiscount);
        });
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
  cy.get(headerOverviewComponentSelector).within(() => {
    cy.get('.cx-card-paragraph-title')
      .contains('Estimated Total')
      .parent()
      .within(() => {
        cy.get('.cx-card-paragraph-text')
          .invoke('text')
          .then(($text) => {
            cy.wrap($text).as('priceBeforeDiscount');
          });
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
  cy.get(headerOverviewComponentSelector).within(() => {
    cy.get('.cx-card-paragraph-title')
      .contains('Estimated Total')
      .parent()
      .within(() => {
        cy.get('.cx-card-paragraph-text').contains(newEstimatedTotalPrice);
      });
  });
}

/**
 * Clicks on 'Edit Configuration' for the configurable product.
 *
 * @param itemIndex Index of the item in the QDP cart list
 */
export function clickOnEditConfigurationLink(itemIndex: number) {
  log('click on "Edit Configuration"', clickOnEditConfigurationLink.name);
  cy.get(itemsComponentSelector).within(() => {
    cy.get(`.cx-item-list-row:nth-child(${itemIndex})`).within(() => {
      cy.get('.cx-action-link')
        .click({
          force: true,
        })
        .then(() => {
          cy.location('pathname').should('contain', '/cartEntry/entityKey/');
        });
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
  cy.get('.btn-primary')
    .contains('view cart')
    .click()
    .then(() => {
      cy.location('pathname').should('contain', '/quote');
      checkQuoteItemsDisplayed();
    });
}

/**
 * Try to add a product to the cart and verify the given global message is shown.
 *
 * @param productName Name of the product that should be added to the cart
 * @param globalMessage Global message which should be shown
 * @param shopName Name of the current shop
 */
export function addProductAndCheckForGlobalMessage(
  productName: string,
  globalMessage: string
) {
  productConfigurator.searchForProduct(productName);
  cy.get(defaultAddToCartComponentSelector)
    .first()
    .within(() => {
      cy.get('button.btn-primary').click();
    })
    .then(() => {
      checkGlobalMessageDisplayed(true, globalMessage);
    });
}

/**
 * Clear the active cart and verify the cart is empty.
 */
export function clearActiveCart() {
  cart.clearActiveCart();
  cart.validateEmptyCart();
}

/**
 * Creates, submits and approves a quote so its ready to be checked out.
 *
 * @param buyerEmail Email of the buyer
 * @param buyerPassword Password of the buyer
 * @param buyerUser Username of the buyer
 * @param salesrepEmail Email of the salesrep
 * @param salesrepPassword Password of the salesrep
 */
export function prepareQuoteForCheckout(
  buyerEmail: string,
  buyerPassword: string,
  buyerUser: string,
  salesrepEmail: string,
  salesrepPassword: string
) {
  prepareSellerQuote(salesrepEmail, salesrepPassword, buyerUser, buyerEmail);
  checkQuoteState(STATUS_REQUESTED);
  submitQuote(STATUS_SALES_REPORTER_SUBMIT);
  asm.agentSignOut();
  login(buyerEmail, buyerPassword, buyerUser);
  goToQuoteOverviewPage();
}

/**
 * Prepares a cart which contains one item. This cart is converted to a saved cart within several tests.
 *
 * @param testProduct Product which is added to the cart
 */
export function prepareSavedCartTemplate(testProduct: string) {
  goToQuoteOverviewPage();
  createNewCart();
  addProductToCart(testProduct, '1');
  goToQuoteOverviewPage();
}

/**
 * Verifies if a given number of saved carts exists.
 *
 * @param numberOfCarts Number of expected saved carts
 */
export function checkNumberOfSavedCarts(numberOfCarts: number) {
  log(
    'Verifies if a given number of saved carts exists',
    checkNumberOfSavedCarts.name
  );
  const location = `${SHOP_NAME}/en/USD/my-account/saved-carts`;
  cy.visit(location)
    .then(() => {
      cy.location('pathname').should('contain', location);
      isSavedCartListDisplayed();
    })
    .then(() => {
      if (numberOfCarts === 0) {
        cy.get(defaultSavedCartListComponentSelector).within(() => {
          cy.get('.cx-saved-cart-list-no-saved-carts');
        });
      } else {
        cy.get(defaultSavedCartListComponentSelector).within(() => {
          cy.get('table').find('tr').should('have.length', numberOfCarts);
        });
      }
    });
}

/**
 * Verifies whether the saved cart list is displayed.
 */
export function isSavedCartListDisplayed() {
  log(
    'Verifies whether the saved cart list page is displayed',
    isSavedCartListDisplayed.name
  );
  cy.get(defaultSavedCartListComponentSelector).should('be.visible');
}

/**
 * Request a new quote which is based on a canceled quote.
 *
 * @param quoteStatus Expected status of the quote
 */
export function requestNewQuote(quoteStatus: string) {
  cy.get(summaryActionsComponentSelector)
    .within(() => {
      cy.get('button.btn-primary').click();
    })
    .then(() => {
      isSaveActiveCartPopupShown(quoteStatus);
    });
}

/**
 * Click on create new cart link within a quote.
 */
export function createNewCart() {
  log('Click on create new cart link within a quote', createNewCart.name);
  cy.get('.cx-action-link')
    .contains('New Cart')
    .click()
    .then(() => {
      cy.get('.CartPageTemplate');
    });
}
/**
 * Verifies if the save active cart popup is shown.
 *
 * @param quoteStatus Expected status of the quote
 */
export function isSaveActiveCartPopupShown(quoteStatus: string) {
  log(
    'Verifies if the save active cart popup is shown',
    isSaveActiveCartPopupShown.name
  );
  cy.get(confirmDialogComponentSelector)
    .within(() => {
      cy.get('.cx-notes-container').contains(SAVE_CART_POPUP_MSG);
      cy.get('button.btn-primary').click();
    })
    .then(() => {
      cy.get(summarySellerEditComponentSelector).should('exist');
      checkQuoteState(quoteStatus);
      checkGlobalMessageDisplayed(true, GLOBAL_MSG_SAVED_CART_CREATED);
    });
}

/**
 * Clears all existing saved carts.
 */
export function clearSavedCarts() {
  log('Clears all existing saved carts', clearSavedCarts.name);
  const location = `${SHOP_NAME}/en/USD/my-account/saved-carts`;
  cy.visit(location)
    .then(() => {
      cy.location('pathname').should('contain', location);
      isSavedCartListDisplayed();
    })
    .then(() => {
      let savedCartsExist: boolean = true;
      cy.get('.cx-saved-cart-list-header')
        .then(($header) => {
          if ($header.text().includes('Saved Carts (0)')) {
            savedCartsExist = false;
            checkNumberOfSavedCarts(0);
          }
        })
        .then(() => {
          if (savedCartsExist) {
            cy.get(defaultSavedCartListComponentSelector)
              .within(() => {
                cy.get('.cx-saved-cart-list-make-cart-active')
                  .first()
                  .within(() => {
                    cy.get('button.btn-tertiary').click();
                  });
              })
              .then(() => {
                cy.get('.cx-saved-cart-form-dialog')
                  .within(() => {
                    cy.get('button.btn-primary').click();
                  })
                  .then(() => {
                    const location = `${SHOP_NAME}/en/USD/cart`;
                    cy.visit(location)
                      .then(() => {
                        cy.location('pathname').should('contain', location);
                      })
                      .then(() => {
                        cart.clearActiveCart();
                        clearSavedCarts();
                      });
                  });
              });
          }
        });
    });
}

/**
 * Registers read quote route.
 */
export function registerReadQuoteRoute() {
  log('Registers read quote route.', registerReadQuoteRoute.name);
  cy.intercept({
    method: 'GET',
    path: `${Cypress.env('OCC_PREFIX')}/${SHOP_NAME}/users/*/quotes/*`,
  }).as(READ_QUOTE.substring(1)); // strip the '@'
}

/**
 * Registers add quote comment route.
 */
export function registerAddQuoteCommentRoute() {
  log('Registers add quote comment route.', registerAddQuoteCommentRoute.name);
  cy.intercept({
    method: 'POST',
    path: `${Cypress.env(
      'OCC_PREFIX'
    )}/${SHOP_NAME}/users/**/quotes/**/comments*`,
  }).as(ADD_QUOTE_COMMENT.substring(1)); // strip the '@'
}

/**
 * Registers perform quote action route.
 */
export function registerPerformQuoteActionRoute() {
  log(
    'Registers perform quote action route.',
    registerPerformQuoteActionRoute.name
  );
  cy.intercept({
    method: 'POST',
    path: `${Cypress.env(
      'OCC_PREFIX'
    )}/${SHOP_NAME}/users/**/quotes/**/action*`,
  }).as(PERFORM_QUOTE_ACTION.substring(1)); // strip the '@'
}

/**
 * Registers update quote item route.
 */
export function registerUpdateQuoteItemRoute() {
  log('Registers update quote item route.', registerUpdateQuoteItemRoute.name);
  cy.intercept({
    method: 'PATCH',
    path: `${Cypress.env('OCC_PREFIX')}/${SHOP_NAME}/users/**/quotes/**`,
  }).as(UPDATE_QUOTE_ITEM.substring(1)); // strip the '@'
}

/**
 * Registers update cart item route.
 */
export function registerUpdateCartItemRoute() {
  log('Registers update cart item route.', registerUpdateCartItemRoute.name);
  cy.intercept({
    method: 'PATCH',
    path: `${Cypress.env('OCC_PREFIX')}/${SHOP_NAME}/users/current/carts/**`,
  }).as(UPDATE_CART_ITEM.substring(1)); // strip the '@'
}

/**
 * Registers delete quote item route.
 */
export function registerDeleteQuoteItemRoute() {
  log('Registers delete quote item route.', registerDeleteQuoteItemRoute.name);
  cy.intercept({
    method: 'DELETE',
    path: `${Cypress.env('OCC_PREFIX')}/${SHOP_NAME}/users/current/carts/**`,
  }).as(DELETE_QUOTE_ITEM.substring(1)); // strip the '@'
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
