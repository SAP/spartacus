/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as configurationVc from './product-configurator-vc';

const COMPONENT_SELECTOR = 'cx-configurator-restart-dialog';
/**
 * Verifies that the restart dialog is currently opened
 */
export function checkIsOpen() {
  cy.get(COMPONENT_SELECTOR).should('be.visible');
}

/**
 * Verifies that the restart dialog is currently closed
 */
export function checkIsClosed() {
  cy.get(COMPONENT_SELECTOR).should('not.exist');
}

/**
 * Verifies the content of the restart dialog
 */
export function checkDialog() {
  checkTitleDisplayed();
  checkCloseButtonDisplayed();
  checkDescriptionDisplayed();
  checkResumeButtonDisplayed();
  checkRestartButtonDisplayed();
}

/**
 * Verifies that the restart dialog has a title
 */
export function checkTitleDisplayed() {
  cy.get(COMPONENT_SELECTOR).within(() =>
    cy.get('.cx-dialog-title').should('be.visible')
  );
}

/**
 * Verifies that the restart dialog has a close button
 */
export function checkCloseButtonDisplayed() {
  cy.get(COMPONENT_SELECTOR).within(() =>
    cy.get('button.close').should('be.visible')
  );
}

/**
 * Verifies that the restart dialog displays a description
 */
export function checkDescriptionDisplayed() {
  cy.get('#cx-configurator-restart-dialog-description').should('be.visible');
}

/**
 * Verifies that the restart dialog has a resume button
 */
export function checkResumeButtonDisplayed() {
  cy.get(COMPONENT_SELECTOR).within(() =>
    cy.get('button.btn-primary').should('be.visible')
  );
}

/**
 * Verifies that the restart dialog has a restart button
 */
export function checkRestartButtonDisplayed() {
  cy.get(COMPONENT_SELECTOR).within(() =>
    cy.get('button.btn-secondary').should('be.visible')
  );
}

/**
 * Clicks the close button
 */
export function close(productId: string) {
  cy.get(COMPONENT_SELECTOR).within(() => cy.get('button.close').click());
  const pdpUrl = `/${Cypress.env('BASE_SITE')}/en/USD/product/${productId}/`;
  cy.location('pathname').should('contain', pdpUrl);
  cy.get('.ProductDetailsPageTemplate').should('be.visible');
}

/**
 * Clicks the resume button
 */
export function resume() {
  cy.get(COMPONENT_SELECTOR).within(() => cy.get('button.btn-primary').click());
  checkIsClosed();
}

/**
 * Clicks the restart button
 */
export function restart(isPricingEnabled?: boolean) {
  cy.get(COMPONENT_SELECTOR).within(() =>
    cy.get('button.btn-secondary').click()
  );
  configurationVc.waitForRequest(
    configurationVc.CREATE_CONFIG_ALIAS,
    isPricingEnabled
  );
}
