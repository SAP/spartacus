/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

<<<<<<< HEAD
export * from './customer-ticketing-helpers/customer-ticketing-commons';
export * from './customer-ticketing-helpers/ticket-listing';
export * from './customer-ticketing-helpers/create-tickets';
export * from './customer-ticketing-helpers/ticket-details';
=======
const HTTP_STATUS_OK = 200;
const FIRST_ROW = 1;
const SUBJECT_COLUMN = 1;
const CATEGORY_COLUMN = 2;
const STATUS_COLUMN = 5;

const CUSTOMER_SUPPORT_MENU_OPTION_INDEX = 14;
const TICKET_ID_COLUMN_INDEX = 1;

const TICKET_NOT_FOUND = 'Ticket not found.';

export enum TestCategory {
  enquiry = "Enquiry",
  complaint = "Complaint",
  problem = "Problem",
}

export interface TestTicketDetails {
  subject: string;
  message: string;
  category: TestCategory;
  associatedTo?: string;
  filename?: string;
}

export function loginRegisteredUser() {
  login();
}

export function clickMyAccountMenuOption(){
  cy.visit('/');
  cy.get('#cx-header', { timeout: 10000 }).should('be.visible');
  cy.onMobile(() => {
    clickHamburger();
  });
  cy.get('.accNavComponent button').click();
}

export function clickCustomerSupportMenuOption(){
  cy.get(`.accNavComponent li:nth-child(${CUSTOMER_SUPPORT_MENU_OPTION_INDEX})`).should('contain.text', 'Customer Service');
  cy.get(`.accNavComponent li:nth-child(${CUSTOMER_SUPPORT_MENU_OPTION_INDEX}) a`).click();
}

export function verifyTicketListingPageVisit(){
  cy.url().should('include','/my-account/support-tickets');
  cy.get('cx-customer-ticketing-list').should('exist');
}

export function clickTicketFromTicketListing(ticketRowIndex: number){
  cy.get(`#ticketing-list-table tbody tr:nth-child(${ticketRowIndex}) .cx-ticketing-list-data:nth-child(${TICKET_ID_COLUMN_INDEX}) a.cx-ticketing-list-value`).click();
}

export function verifyTicketDetailsPageVisit(){
  cy.url().should('match',/http:\/\/.+\/my\-account\/support\-ticket\/[0-9]+/);
  cy.get('cx-customer-ticketing-messages').should('exist');
}

export function visitPage(page: string, alias?: string){
  cy.intercept(page).as(alias? alias : page);
  cy.visit(page);
  cy.wait(`@${alias? alias : page}`).its('response.statusCode').should('eq', HTTP_STATUS_OK);
}

export function visitElectronicTicketListingPage() {
  visitPage('/my-account/support-tickets', 'ticketListingPage');
}

export function openCreateTicketPopup() {
  cy.get('cx-customer-ticketing-list').should('exist');
  cy.get('cx-customer-ticketing-create button').click();
  cy.get('cx-customer-ticketing-create-dialog').should('exist');
}

export function fillTicketDetails(ticketDetails: TestTicketDetails){
  const CATEGORY_SELECT = 0;

  cy.get('cx-customer-ticketing-create-dialog').within(() => {
    cy.get('.cx-customer-ticket-form-container').should('contain', 'Add New Request');
    cy.get('textarea').first().type(ticketDetails.subject);
    cy.contains('.cx-customer-ticket-label', 'Category').get('select').eq(CATEGORY_SELECT).select(ticketDetails.category);
    cy.get('textarea').last().type(ticketDetails.message);
    cy.get('cx-form-errors').should('not.be.visible');
  });
}

export function addFile(filename: string){
  cy.get('cx-file-upload input[type="file"]').attachFile({filePath: '../helpers/customer-ticketing/files-to-upload/' + filename}, { allowEmpty: true });
  cy.get('p').contains(filename);
}

export function verifyFileAttachedToMessage(filename: string){
  cy.get('cx-messaging').contains(filename);
}

export function clickSubmit(){
  cy.contains('[type="button"]', 'Submit').click();
}

export function verifyRequestCompleted(){
  cy.get('cx-global-message').contains('Request Created');
}

export function clickCancel(){
  cy.contains('[type="button"]', 'Cancel').click();
}

export function clickClose(){
  cy.get('cx-customer-ticketing-create-dialog').within(() => {
    cy.get('.cx-customer-ticket-form-container').should('contain', 'Add New Request');
    cy.get('button[aria-label="Close"]').click();
  });
}

export function verifyFileTooLargeErrorIsShown(){
  cy.get('cx-form-errors').should('be.visible');
  cy.get('cx-form-errors').get('p').contains('File size should not exceed 10 MB');

}

export function verifyCreatedTicketDetails(ticketDetails: TestTicketDetails) {
   const row = cy.get('cx-customer-ticketing-list').get('tbody').get('tr').eq(FIRST_ROW);
   row.get('td').eq(SUBJECT_COLUMN).contains(ticketDetails.subject);
   row.get('td').eq(CATEGORY_COLUMN).contains(ticketDetails.category);
   row.get('td').eq(STATUS_COLUMN).contains("Open");

   row.click();
   cy.get('cx-messaging').contains(ticketDetails.message);
}

export function verifyFieldValidationErrorShown(){
  cy.get('cx-form-errors').should('be.visible');
}


export function verifyTicketDoesNotExist(ticketDetails: TestTicketDetails) {
  cy.get('cx-customer-ticketing-list').then( ticketListingElement => {
    if(ticketListingElement.find('tbody').length > 0) {
      cy.get('cx-customer-ticketing-list').get('tbody').get('tr').eq(FIRST_ROW).get('td').eq(SUBJECT_COLUMN).should('not.contain', ticketDetails.subject);
    }
    else {
      cy.get('cx-customer-ticketing-list').find('h3').contains("You don't have any request");
    }
  });
}

export function visitApparelUKTicketListingPage(){
  visitPage('apparel-uk-spa/en/GBP/my-account/support-tickets', 'apparelTicketListingPage');
}

export function visitTicketDetailsPageForTicketId(ticketId: string) {
  const ticketDetailsPageUrl = `/my-account/support-ticket/${ticketId}`;
  visitPage(ticketDetailsPageUrl);
}

export function visitTicketDetailsPageForTicketInPosition(ticketRowIndex: number){
  cy.get(`#ticketing-list-table tbody tr:nth-child(${ticketRowIndex}) .cx-ticketing-list-data:nth-child(${TICKET_ID_COLUMN_INDEX}) a.cx-ticketing-list-value`).then( ($ticketIdElement) => {
    const ticketId = $ticketIdElement.text().trim();
    visitTicketDetailsPageForTicketId(ticketId);
    cy.get('cx-customer-ticketing-messages', { timeout: 10000 }).should('be.visible');
    cy.url().should('include',`/my-account/support-ticket/${ticketId}`);
  });
}

export function visitTicketDetailsPageForNonExistentTicket(nonExistentTicketId: string){
  const ticketDetailsPageUrl = `/my-account/support-ticket/${nonExistentTicketId}`;
  visitPage(ticketDetailsPageUrl);
  cy.get('cx-global-message .alert-danger', { timeout: 10000 }).should('be.visible');
  cy.get('cx-global-message .alert-danger span').should('include.text', TICKET_NOT_FOUND);
  cy.url().should('include','/my-account/support-ticket');
}
>>>>>>> fbfb638410 (Some more changes as per PR review)
