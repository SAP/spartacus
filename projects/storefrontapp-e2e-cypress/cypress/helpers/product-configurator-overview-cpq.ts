/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as configurationOverview from './product-configurator-overview';

/**
 * Verifies whether the group header displayed.
 */
export function checkGroupHeaderDisplayed(
  groupName: string,
  groupIdx: number
): void {
  configurationOverview.checkGroupHeaderDisplayed(groupName, groupIdx);
}

/**
 * Verifies whether the group header is not displayed.
 */
export function checkGroupHeaderNotDisplayed(groupName: string): void {
  configurationOverview.checkGroupHeaderNotDisplayed(groupName);
}

/**
 * Verifies whether the attribute name and value are displayed at the given position.
 */
export function checkAttrDisplayed(
  attributeName: string,
  valueName: string,
  attributeIdx: number
): void {
  configurationOverview.checkAttrDisplayed(
    attributeName,
    valueName,
    attributeIdx
  );
}

/**
 * Verifies whether the attribute price is displayed at the given position.
 */
export function checkAttrPriceDisplayed(
  priceString: string,
  attributeIdx: number
): void {
  configurationOverview.checkAttrPriceDisplayed(priceString, attributeIdx);
}

/**
 * Verifies whether the attribute name and value are displayed at the given position.
 */
export function checkAttrType(
  attributeType: 'product' | 'simple',
  attributeIdx: number
): void {
  const expected =
    attributeType === 'product' ? 'have.class' : 'not.have.class';
  cy.get('.cx-attribute-value-pair')
    .eq(attributeIdx)
    .should(expected, 'bundle');
}
