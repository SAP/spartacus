/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as authentication from '../../auth-forms';

export const READ_QUOTE = '@READ_QUOTE';
export const READ_VENDOR_QUOTE = '@READ_VENDOR_QUOTE';
export const DOWNLOAD_ATTACHMENT = '@DOWNLOAD_ATTACHMENT';
const SHOP_NAME = Cypress.env('BASE_SITE'); //Powertools-spa

/**
 * Uses a cx-login-form to login a user.
 *
 * @param email Email for the login
 * @param password Password for the login
 * @param name Name of the user
 */
export function login(email: string, password: string, name: string): void {
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
    cy.visit(`${SHOP_NAME}/en/USD/logout`).then(() => {
      cy.get('cx-login [role="link"]');
    });
  }

/**
 * Navigates to the vendor quote list via my account.
 */
export function navigateToVendorQuoteListFromMyAccount() {
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
            cy.wait(READ_VENDOR_QUOTE);
            cy.url().should('include', 'quotes');
          });
      });
  }

  /**
   * Verifies whether the quote list is displayed.
   */
  export function checkQuoteListDisplayed() {
    cy.get('cx-quote-list').should('be.visible');
  }

/**
 * Navigates to the quote with status as Vendor Quote.
 */
export function navigateToVendorQuote() {
    cy.get('.cx-status .quote-offer')
      .should('contain.text', 'Vendor Quote').first()
      .and('be.visible')
      .click()
      .then(() => {
        cy.wait(READ_QUOTE);
        cy.get('h1')
          .should('contain.text', 'Quote Details')
      });
  }
  
  /**
   * Downloads the proposal document attached to the quote.
   */
  export function downloadVendorQuoteAttachment() {
    cy.get('#downloadBtn')
      .scrollIntoView()
      .should('contain.text', 'Download Proposal')
      .and('be.visible')
      .click()
      .then(() => {
        cy.wait(DOWNLOAD_ATTACHMENT)
          .its('response.statusCode')
          .should('eq', 200);
      });
  }

  /**
   * Registers read quote route.
   */
  export function registerReadQuoteRoute() {
    cy.intercept({
      method: 'GET',
      path: `${Cypress.env('OCC_PREFIX')}/${SHOP_NAME}/users/*/quotes/*`,
    }).as(READ_QUOTE.substring(1)); // strip the '@'
  }

/**
 * Registers read vendor quote route.
 */
export function registerReadVendorQuoteRoute() {
    cy.intercept({
      method: 'GET',
      path: `${Cypress.env('OCC_PREFIX')}/${SHOP_NAME}/users/*/quotes*`,
    }).as(READ_VENDOR_QUOTE.substring(1)); // strip the '@'
  }
  
  /**
   * Registers download attachment route.
   */
  export function registerDownloadAttachmentRoute() {
    cy.intercept({
      method: 'GET',
      path: `${Cypress.env('OCC_PREFIX')}/${SHOP_NAME}/users/*/quotes/*/attachments/*`,
    }).as(DOWNLOAD_ATTACHMENT.substring(1)); // strip the '@'
  }