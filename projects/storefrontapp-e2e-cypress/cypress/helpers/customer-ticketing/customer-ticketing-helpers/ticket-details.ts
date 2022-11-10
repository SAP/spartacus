/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export function verifyFileAttachedToMessage(filename: string) {
  cy.get('cx-messaging').contains(filename);
}

export function clickCloseRequestButton() {
  cy.get('cx-customer-ticketing-close').click();
}

export function typeCloseTicketRequestMessage(message: string) {
  cy.get('textarea').last().type(message);
}

export function closeTicketRequest(message: string) {
  const SUBMIT_BUTTON_INDEX = 2;
  clickCloseRequestButton();
  cy.get('form').within(() => {
    typeCloseTicketRequestMessage(message);
    cy.get('button').eq(SUBMIT_BUTTON_INDEX).click();
  });
}

export function sendMessage(message: string) {
  cy.get('.form-control').type(message);
  cy.get('button').contains('Send').click();
  cy.wait(1000);
}
