/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { POWERTOOLS_BASESITE } from '../../sample-data/b2b-checkout';
import { agentLoginForJDK21 } from '../auth-forms';
import { b2bUserAccount } from '../../sample-data/b2b-subsequent-documents';

export function loginB2bUser() {
  cy.visit('/login');
  agentLoginForJDK21(
    b2bUserAccount.registrationData.email,
    b2bUserAccount.registrationData.password
  );
}

export function openSubsequentDocumentList(orderCode: string) {
  cy.visit(`${POWERTOOLS_BASESITE}/en/USD/my-account/order/${orderCode}`);
  cy.get('cx-order-document-flow div div button').first().click();
}

export function clickOnFirstRowNavigation() {
  cy.get('cx-order-subsequent-document-list table tbody tr')
    .first()
    .find('td')
    .last()
    .find('button')
    .click();
}

export function navigateBack() {
  cy.get('button.back').click();
}
