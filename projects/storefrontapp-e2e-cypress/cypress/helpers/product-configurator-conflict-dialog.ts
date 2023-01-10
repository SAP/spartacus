/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

//import * as configurationVc from './product-configurator-vc';

export function checkIsOpen() {
  cy.get('cx-configurator-conflict-solver-dialog').should('be.visible');
}

export function checkIsClosed() {
  cy.get('cx-configurator-conflict-solver-dialog').should('not.exist');
}

export function checkDisplayedConflict() {
  //checkHasTitle();
  //checkHasCloseButton();
  checkHasResolveMessage();
  checkHasDescription();
}

export function checkHasTitle() {
  cy.get('.cx-dialog-title').should('be.visible');
}

export function checkHasCloseButton() {
  cy.get('button.close').should('be.visible');
}

export function checkHasResolveMessage() {
  cy.get('.cx-dialog-body .cx-msg-warning').should('be.visible');
}

export function checkHasDescription() {
  cy.get('cx-configurator-conflict-description').should('be.visible');
}

export function checkNumberOfSuggestions(number: number) {
  cy.get('cx-configurator-conflict-suggestion').should('have.length', number);
}
