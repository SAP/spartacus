/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  TestTicketDetails,
  TICKET_MESSAGE_MAX_LENGTH,
  TICKET_SUBJECT_MAX_LENGTH,
  verifyGlobalMessage,
} from './customer-ticketing-commons';

export function openCreateTicketPopup() {
  cy.get('cx-customer-ticketing-list').should('exist');
  cy.get('cx-customer-ticketing-create button').click();
  cy.get('cx-customer-ticketing-create-dialog').contains('Add New Request');
}

export function fillTicketDetails(ticketDetails: TestTicketDetails) {
  const CATEGORY_SELECT = 0;
  const SUBJECT_CONTROL = 'subject';
  const MESSAGE_CONTROL = 'message';

  cy.get('cx-customer-ticketing-create-dialog').within(() => {
    cy.get('.cx-customer-ticket-form-container').should(
      'contain',
      'Add New Request'
    );
    cy.get(`textarea[formcontrolname="${SUBJECT_CONTROL}"]`).type(
      ticketDetails.subject
    );
    cy.contains('.cx-customer-ticket-label', 'Category')
      .get('select')
      .eq(CATEGORY_SELECT)
      .select(ticketDetails.ticketCategory.name);
    cy.get(`textarea[formcontrolname="${MESSAGE_CONTROL}"]`).type(
      ticketDetails.message
    );
    cy.get('cx-form-errors').should('not.be.visible');
  });
}

export function verifyTicketSubjectAndMessageDoNotExceedCharacterLimit() {
  const SUBJECT_CONTROL = 'subject';
  const MESSAGE_CONTROL = 'message';

  cy.get('cx-customer-ticketing-create-dialog').within(() => {
    cy.get(`textarea[formcontrolname="${SUBJECT_CONTROL}"]`)
      .invoke('text')
      .then((text) => {
        expect(text.length).to.be.lte(TICKET_SUBJECT_MAX_LENGTH);
      });
    cy.get(`textarea[formcontrolname="${MESSAGE_CONTROL}"]`)
      .invoke('text')
      .then((text) => {
        expect(text.length).to.be.lte(TICKET_MESSAGE_MAX_LENGTH);
      });
    cy.get('cx-form-errors').should('not.be.visible');
  });
}

export function addFile(filename: string) {
  cy.get('cx-file-upload input[type="file"]').attachFile(
    { filePath: '../helpers/customer-ticketing/files-to-upload/' + filename },
    { allowEmpty: true }
  );
  cy.get('p').contains(filename);
}

export function clickSubmit() {
  cy.contains('[type="button"]', 'Submit').click();
}

export function clickCancel() {
  cy.contains('[type="button"]', 'Cancel').click();
}

export function clickClose() {
  cy.get('cx-customer-ticketing-create-dialog').within(() => {
    cy.get('.cx-customer-ticket-form-container').should(
      'contain',
      'Add New Request'
    );
    cy.get('button[aria-label="Close"]').click();
  });
}

export function verifyFileTooLargeErrorIsShown() {
  cy.get('cx-form-errors').should('be.visible');
  cy.get('cx-form-errors')
    .get('p')
    .contains('File size should not exceed 10 MB');
}

export function verifyFieldValidationErrorShown() {
  cy.get('cx-form-errors').should('be.visible');
}

export function createTicket(ticketDetails: TestTicketDetails) {
  openCreateTicketPopup();
  fillTicketDetails(ticketDetails);
  clickSubmit();
  verifyGlobalMessage();
}

export function createMultipleTickets(
  numberOfTicket: number,
  ticketDetails: TestTicketDetails
) {
  for (let i = 0; i < numberOfTicket; i++) {
    createTicket(ticketDetails);
  }
}

export function verifyCreateTicketPopupIsClosed() {
  cy.get('cx-customer-ticketing-create-dialog').should('not.exist');
}
