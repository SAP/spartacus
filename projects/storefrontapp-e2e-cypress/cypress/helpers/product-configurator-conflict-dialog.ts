/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

//import * as configurationVc from './product-configurator-vc';

import * as configuration from './product-configurator';
import * as configurationVc from './product-configurator-vc';

export function checkIsOpen() {
  cy.get('cx-configurator-conflict-solver-dialog').should('be.visible');
}

export function checkIsClosed() {
  cy.get('cx-configurator-conflict-solver-dialog').should('not.exist');
}

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

export function selectAttributeAndWait(
  attributeName: string,
  uiType: configuration.uiType,
  valueName: string
) {
  cy.get('cx-configurator-conflict-solver-dialog').within(() =>
    configurationVc.selectAttributeAndWait(attributeName, uiType, valueName)
  );
}

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

