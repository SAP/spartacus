/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ID_IN_HEADER,
  STATUS_IN_HEADER,
  TestStatus,
  TestTicketDetails,
} from './customer-ticketing-commons';
const TICKET_HEADER = '.cx-card-label';

export function verifyFileAttachedToMessage(filename: string) {
  cy.get('cx-messaging').contains(filename);
}

export function clickCloseRequestButton() {
  cy.get('cx-customer-ticketing-close button').click();
}

export function clickReopenRequestButton() {
  cy.get('cx-customer-ticketing-reopen button').click();
}

export function typeTicketRequestMessage(message: string) {
  cy.get('textarea').last().type(message);
}

export function closeTicketRequest(message: string) {
  const SUBMIT_BUTTON_INDEX = 2;
  clickCloseRequestButton();
  cy.get('form').within(() => {
    typeTicketRequestMessage(message);
    cy.get('button').eq(SUBMIT_BUTTON_INDEX).click();
  });
}

export function reopenTicketRequest(message: string) {
  const SUBMIT_BUTTON_INDEX = 3;
  clickReopenRequestButton();
  cy.get('form').within(() => {
    typeTicketRequestMessage(message);
    cy.get('button').eq(SUBMIT_BUTTON_INDEX).click();
  });
  cy.wait(1000);
}

export function sendMessage(message: string) {
  cy.get('.form-control').type(message);
  cy.get('button').contains('Send').click();
  cy.wait(1000);
}

export function verifyMessageWasPosted(message: string) {
  const COUNT_OF_MESSAGE_AFTER_POST = 2;
  const POSITION_OF_LAST_POSTED_MESSAGE = 1;
  cy.get('.cx-message-left-align-text', { timeout: 100000 }).should(
    'have.length',
    COUNT_OF_MESSAGE_AFTER_POST
  );
  cy.get('.cx-message-left-align-text')
    .eq(POSITION_OF_LAST_POSTED_MESSAGE)
    .contains(message);
}

export function verifyTicketDetailsAreDisplayedInTicketHeader(
  ticketDetails: TestTicketDetails
) {
  cy.get(TICKET_HEADER)
    .eq(ID_IN_HEADER)
    .then((id) => cy.wrap(id).should('include.text', ticketDetails.id));
  cy.get(TICKET_HEADER)
    .eq(STATUS_IN_HEADER)
    .then((status) =>
      cy.wrap(status).should('include.text', ticketDetails.status)
    );
}

export function verifyStatusOfTicketInDetailsPage(status = TestStatus.closed) {
  cy.get(TICKET_HEADER).eq(STATUS_IN_HEADER).contains(status);
}

export function visitTicketDetailsPageForNonExistingTicket() {
  cy.visit('/my-account/support-ticket/XYZ01234');
}
