/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as configuration from './product-configurator';
import * as configurationVc from './product-configurator-vc';

/**
 * Verifies that the conflict solver dialog is currently opened.
 */
export function checkIsOpen() {
  cy.get('cx-configurator-conflict-solver-dialog').should('be.visible');
}

/**
 * Verifies that the conflict solver dialog is currently closed.
 */
export function checkIsClosed() {
  cy.get('cx-configurator-conflict-solver-dialog').should('not.exist');
}

/**
 * Verifies the content of the conflict solver dialog.
 * @param conflictingAttributes expected involved attributes for the currently visible conflict
 */
export function checkDisplayedConflict(
  conflictingAttributes: {
    name: string;
    selectedValueNames: string[];
    uiType: configuration.uiType;
  }[]
) {
  checkTitleDisplayed();
  checkCloseButtonDisplayed();
  checkResolveMessageDisplayed();
  checkDescriptionDisplayed();
  checkNumberOfSuggestions(conflictingAttributes.length);
  conflictingAttributes.forEach((attr) =>
    checkConflictingAttributeDisplayed(
      attr.name,
      attr.selectedValueNames,
      attr.uiType
    )
  );
}

/**
 * Verifies that the conflict solver dialog has a title.
 */
export function checkTitleDisplayed() {
  cy.get('.cx-dialog-title').should('be.visible');
}

/**
 * Verifies that the conflict solver dialog has a close button.
 */
export function checkCloseButtonDisplayed() {
  cy.get('button.close').should('be.visible');
}

/**
 * Verifies that the conflict solver dialog displays the resole issues message.
 */
export function checkResolveMessageDisplayed() {
  cy.get('.cx-dialog-body .cx-msg-warning').should('be.visible');
}

/**
 * Verifies that the conflict solver dialog displays the conflict description.
 */
export function checkDescriptionDisplayed() {
  cy.get('cx-configurator-conflict-description').should('be.visible');
}

/**
 * Verifies that the conflict solver dialog displays the given number of suggestions.
 * @param {number} expectedNumber number of expected suggestions
 */
export function checkNumberOfSuggestions(expectedNumber: number) {
  cy.get('cx-configurator-conflict-suggestion').should(
    'have.length',
    expectedNumber
  );
}

/**
 * Verifies if the given attribute is involved in the conflict.
 * @param {string} attributeName name of attribute
 * @param {string} selectedValues list of expected selected values
 * @param {uiType} uiType uiType of the attribute
 */
export function checkConflictingAttributeDisplayed(
  attributeName: string,
  selectedValues: string[],
  uiType: configuration.uiType
) {
  cy.get('cx-configurator-conflict-solver-dialog').within(() => {
    configuration.checkAttributeDisplayed(attributeName, uiType);
    selectedValues.forEach((valueName) =>
      configuration.checkValueSelected(uiType, attributeName, valueName)
    );
  });
}
/**
 * Change the attribute value within the conflict solver dialog
 * @param {sting} attributeName attribute name
 * @param {string} value value name to select / value to set
 * @param {uiType} uiType uiType o attribute
 */
export function selectAttributeAndWait(
  attributeName: string,
  uiType: configuration.uiType,
  value: string
) {
  cy.get('cx-configurator-conflict-solver-dialog').within(() =>
    configurationVc.selectAttributeAndWait(attributeName, uiType, value)
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
