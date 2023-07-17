/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { POWERTOOLS_BASESITE } from '../sample-data/b2b-checkout';
import * as authentication from './auth-forms';
import * as common from './common';

export const GET_QUOTE_ALIAS = '@GET_QUOTE';

/**
 * Sets quantity on PDP
 */
export function setQtyOnPD(quantity: string): void {
  cy.get('input.ng-pristine').clear().type(quantity);
}

/**
 * Clicks on 'Request Quote' on the cart page.
 */
export function clickOnRequestQuoteInCart(): void {
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
  common.goToPDPage(shopName, productName);
  this.setQtyOnPD(quantity);
  common.clickOnAddToCartBtnOnPD();
  common.clickOnViewCartBtnOnPD();
  this.clickOnRequestQuoteInCart();
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
 *
 * @param meetsThreshold
 * @param productId
 */
export function checkQuoteInDraftState(
  meetsThreshold: boolean,
  productId: string
) {
  cy.get('.cx-quote-details-header-status').should('contain.text', 'Draft');
  this.checkGlobalMessageDisplayed(!meetsThreshold);
  this.checkSubmitButton(meetsThreshold);
  cy.get('.cx-code').should('contain.text', productId);
}

export function addCommentAndWait(text: string) {
  cy.get('cx-quote-details-comment .cx-message-input').within(() => {
    cy.get('input').type(text);
    cy.get('button').click();
  });
  cy.wait(GET_QUOTE_ALIAS);
}

export function checkComment(index: number, text: string){
  cy.get('cx-quote-details-comment .cx-message-card div[role="listitem"]').eq(index).should('contain.text', text);
}
/**
 * Register quote route.
 */
export function registerGetQuoteRoute(shopName: string) {
  cy.intercept({
    method: 'GET',
    path: `${Cypress.env('OCC_PREFIX')}/${shopName}/users/current/quotes/*`,
  }).as(GET_QUOTE_ALIAS.substring(1)); // strip the '@'
}
