/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as authentication from './auth-forms';
import * as common from './common';

/** alias for GET Quote Route */
export const GET_QUOTE_ALIAS = '@GET_QUOTE';

/**
 * Sets quantity on PDP
 */
export function setQtyOnPD(quantity: string): void {
  cy.get('input.ng-pristine').clear().type(quantity);
}

/**
 * Clicks on 'Request Quote' on the cart page and checks for quote page
 */
export function clickOnRequestQuoteInCartAndExpectQuotePage(): void {
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
  cy.get('cx-quote-request-button button').click();
}

export function login(email: string, password: string, name: string): void {
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
  cy.get('.cx-login-greet').should('contain', name);
  cy.get('cx-login').should('not.contain', 'Sign In');
}

export function requestQuote(
  shopName,
  productName: string,
  quantity: string
): void {
  this.addProductToCartForQuotePreparation(shopName, productName, quantity);
  this.clickOnRequestQuoteInCartAndExpectQuotePage();
}

export function addProductToCartForQuotePreparation(
  shopName,
  productName: string,
  quantity: string
): void {
  common.goToPDPage(shopName, productName);
  this.setQtyOnPD(quantity);
  common.clickOnAddToCartBtnOnPD();
  common.clickOnViewCartBtnOnPD();
}

export function submitQuote(): void {
  clickOnSubmitQuoteBtnOnQD();
  clickOnYesBtnOnQuoteSubmitPopUp();
}

/**
 * Clicks on 'Submit Quote' on the quote overview page.
 */
export function clickOnSubmitQuoteBtnOnQD(): void {
  cy.get('cx-quote-actions-by-role button.btn-primary')
    .click()
    .then(() => {
      cy.get('cx-quote-confirm-action-dialog').should('be.visible');
    });
}

/**
 * Clicks on 'Yes' on the quote confirm request dialog  popup.
 */
export function clickOnYesBtnOnQuoteSubmitPopUp(): void {
  cy.get('cx-quote-confirm-action-dialog button.btn-primary').click();
  cy.wait(GET_QUOTE_ALIAS);
}

/**
 * Checks on the global message on the top of the page.
 */
export function checkGlobalMessageDisplayed(isDisplayed: boolean): void {
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
  if (isEnabled) {
    cy.get('button.btn-primary').should('be.enabled');
  } else {
    cy.get('button.btn-primary').should('be.disabled');
  }
}

export function checkCommentsNotEditable(): void {
  cy.get('cx-quote-details-comment .cx-message-input').should('not.exist');
}

/**
 * Checks presence of quote list
 */
export function checkQuoteListPresent() {
  cy.get('cx-quote-list').should('exist');
}

/**
 * Navigates to quote list via my account
 */
export function navigateToQuoteListFromMyAccount() {
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
 * @param meetsThreshold does the quote meet the threshold
 * @param productId product id of a product which is part of the quote
 */
export function checkQuoteInDraftState(
  meetsThreshold: boolean,
  productId: string
) {
  checkQuoteState('Draft');
  this.checkGlobalMessageDisplayed(!meetsThreshold);
  this.checkSubmitButton(meetsThreshold);
  cy.get('.cx-code').should('contain.text', productId);
}

export function checkQuoteState(status: string) {
  cy.get('cx-quote-details-overview h3.cx-status').contains(status);
}

/**
 * Adds a header comment to the quote assuming that the quote is currently in edit mode
 * @param text text to add
 */
export function addCommentAndWait(text: string) {
  cy.get('cx-quote-details-comment .cx-message-input').within(() => {
    cy.get('input').type(text);
    cy.get('button').click();
  });
  cy.wait(GET_QUOTE_ALIAS);
}

/**
 * checks whether the given header comment is displayed on the given position
 * @param index position of the comment, starting with 0 for the first comment.
 * @param text text to be displayed
 */
export function checkComment(index: number, text: string) {
  cy.get(
    `cx-quote-details-comment .cx-message-card:nth-child(${index})`
  ).should('contain.text', text);
}

/**
 * Adds a header comment with a selected item to the quote assuming that the quote is currently in edit mode
 * @param item name of the item
 * @param text text to add
 */
export function addItemCommentAndWait(item: string, text: string) {
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
 * checks whether the given header comment with item link is displayed on the given position
 * @param index index of the comment containing the link within the comment section
 * @param item name of the item
 * @param text text to be displayed
 */
export function checkItemComment(index: number, item: string, text: string) {
  cy.get(
    `cx-quote-details-comment .cx-message-card:nth-child(${index})`
  ).should('contain.text', text);
  cy.get(
    `cx-quote-details-comment .cx-message-card:nth-child(${index}) .cx-message-item-link`
  ).contains(item);
}

/**
 * clicks on the item link provided in the comment.
 * @param index index of the comment containing the link within the comment section
 * @param item name of the item
 */
export function clickItemLinkInComment(index: number, item: string) {
  cy.get(
    `cx-quote-details-comment .cx-message-card:nth-child(${index}) .cx-message-item-link`
  )
    .contains(item)
    .click();
}

/**
 * checks if the item at the given index in the quote details cart is visible within the viewport
 * @param index index of the quote details cart row.
 */
export function checkLinkedItemInViewport(index: number) {
  cy.get(`cx-quote-details-cart .cx-item-list-row:nth-child(${index})`).should(
    'be.visible'
  );
}

/**
 * Register GET quote route.
 */
export function registerGetQuoteRoute(shopName: string) {
  cy.intercept({
    method: 'GET',
    path: `${Cypress.env('OCC_PREFIX')}/${shopName}/users/current/quotes/*`,
  }).as(GET_QUOTE_ALIAS.substring(1)); // strip the '@'
}
