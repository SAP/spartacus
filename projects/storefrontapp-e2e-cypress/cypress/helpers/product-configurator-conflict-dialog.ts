/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import * as configuration from './product-configurator';
import * as configurationVc from './product-configurator-vc';

/**
 * verifies that the conflict solver dialog is currently opened
 */
export function checkIsOpen() {
  cy.get('cx-configurator-conflict-solver-dialog').should('be.visible');
}

/**
 * verifies that the conflict solver dialog is currently closed
 */
export function checkIsClosed() {
  cy.get('cx-configurator-conflict-solver-dialog').should('not.exist');
}

/**
 * verifies the content of the conflict solver dialog
 * @param involvedAttributes expected involved attributes for the currently visible conflict
 */
export function checkDisplayedConflict(
  involvedAttributes: {
    name: string;
    selectedValueNames: string[];
    uiType: configuration.uiType;
  }[]
) {
  checkHasTitle();
  checkHasCloseButton();
  checkHasResolveMessage();
  checkHasDescription();
  checkNumberOfSuggestions(involvedAttributes.length);
  involvedAttributes.forEach((attr) =>
    checkAttributeInvolved(attr.name, attr.selectedValueNames, attr.uiType)
  );
}

/**
 * verifies that the conflict solver dialog has a title
 */
export function checkHasTitle() {
  cy.get('.cx-dialog-title').should('be.visible');
}

/**
 * verifies that the conflict solver dialog has a close button
 */
export function checkHasCloseButton() {
  cy.get('button.close').should('be.visible');
}

/**
 * verifies that the conflict solver dialog displays the resole issues message
 */
export function checkHasResolveMessage() {
  cy.get('.cx-dialog-body .cx-msg-warning').should('be.visible');
}

/**
 * verifies that the conflict solver dialog displays the conflict description
 */
export function checkHasDescription() {
  cy.get('cx-configurator-conflict-description').should('be.visible');
}

/**
 * verifies that the conflict solver dialog displays the given number of suggestions
 * @param {number} number number of expected suggestions
 */
export function checkNumberOfSuggestions(number: number) {
  cy.get('cx-configurator-conflict-suggestion').should('have.length', number);
}

/**
 * verifies if given attribute is involved in the conflict
 * @param {string} attributeName name of attribute
 * @param {string} selectedValueNames list of expected selected values
 * @param {uiType} uiType uiType of the attribute
 */
export function checkAttributeInvolved(
  attributeName: string,
  selectedValueNames: string[],
  uiType: configuration.uiType
) {
  cy.get('cx-configurator-conflict-solver-dialog').within(() => {
    configuration.checkAttributeDisplayed(attributeName, uiType);
    selectedValueNames.forEach((valueName) =>
      configuration.checkValueSelected(uiType, attributeName, valueName)
    );
  });
}
/**
 * Change the attribute value within the conflict solver dialog
 * @param {sting} attributeName attribute name
 * @param {uiType} uiType uiType o attribute
 * @param {string} valueName value name to select / value to set
 */
export function selectAttributeAndWait(
  attributeName: string,
  uiType: configuration.uiType,
  valueName: string
) {
  cy.get('cx-configurator-conflict-solver-dialog').within(() =>
    configurationVc.selectAttributeAndWait(attributeName, uiType, valueName)
  );
}
/**
 * closes the conflict solver dialog via the close button
 */
export function close() {
  cy.get('cx-configurator-conflict-solver-dialog').within(() =>
    cy.get('button.close').click()
  );
}

/**
 * Verifies whether the view in configuration link is NOT displayed.
 */
export function checkViewInConfigurationLinkNotDisplayed(
  attribute: string
): void {
  cy.get('cx-configurator-conflict-solver-dialog').within(() =>
    configurationVc.checkConflictLink(
      attribute,
      'View in Configuration Link',
      false
    )
  );
}
