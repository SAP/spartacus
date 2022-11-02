import { standardUser } from '../../sample-data/shared-users';
import { generateMail, randomString } from '../user';
import { clickHamburger } from '../checkout-flow';

const CUSTOMER_SUPPORT_MENU_OPTION_INDEX = 14;
const FIRST_TICKET_COLUMN_INDEX = 1;
const FIRST_TICKET_ROW_INDEX = 1;

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
  standardUser.registrationData.email = generateMail(randomString(), true);
  cy.requireLoggedIn(standardUser);
  cy.reload();
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

export function clickFirstTicketFromTicketListing(){
  cy.get(`#ticketing-list-table tbody tr:nth-child(${FIRST_TICKET_ROW_INDEX}) .cx-ticketing-list-data:nth-child(${FIRST_TICKET_COLUMN_INDEX}) a.cx-ticketing-list-value`).should('exist');
  cy.get(`#ticketing-list-table tbody tr:nth-child(${FIRST_TICKET_ROW_INDEX}) .cx-ticketing-list-data:nth-child(${FIRST_TICKET_COLUMN_INDEX}) a.cx-ticketing-list-value`).click();
}

export function verifyTicketDetailsPageVisit(){
  cy.url().should('match',/http:\/\/.+\/my\-account\/support\-ticket\/[0-9]+/);
  cy.get('cx-customer-ticketing-messages').should('exist');
}


export function visitElectronicSupportTicketPage() {
  cy.intercept('/my-account/support-tickets').as('getElectronicSupportTicketPage');
  cy.visit('/my-account/support-tickets');
  cy.wait(`@getElectronicSupportTicketPage`).its('response.statusCode').should('eq', 200);
}


export function openCreateTicketModal() {
  cy.get('cx-customer-ticketing-list').should('exist');
  cy.get('cx-customer-ticketing-create button').click();
  cy.get('cx-customer-ticketing-create-dialog').should('exist');
}

export function fillTicketDetails(ticketDetails: TestTicketDetails){

  // subject
  cy.get('textarea').first().type(ticketDetails.subject);

  // category dropdown
  cy.contains('.cx-customer-ticket-label', 'Category').get('select').eq(2).select(ticketDetails.category); // TODO

  // AssociatedTo dropdown
  // cy.contains('.cx-customer-ticket-label', 'Associated To').get('select').eq(3).select('');

  // Message
  cy.get('textarea').last().type(ticketDetails.message);

  // validation
  cy.get('cx-form-errors').should('not.be.visible');
}

export function addFile(filename: string){
  cy.get('cx-file-upload input[type="file"]').attachFile({filePath: '../helpers/customer-ticketing/files-to-upload/' + filename});
  cy.get('p').contains(filename);
}

export function verifyFileAttachedToMessage(filename: string){
  cy.get('cx-messaging').contains(filename);
}

export function clickSubmit(){
  cy.contains('[type="button"]', 'Submit').click();
}

export function clickSubmitAndVerifyRequestCompleted(){
  cy.contains('[type="button"]', 'Submit').click();
  cy.get('cx-global-message').contains('Request Created');
}

export function clickCancel(){
  cy.contains('[type="button"]', 'Cancel').click();
}

export function clickClose(){
  cy.get('button[aria-label="Close"]').click();
}

export function verifyFileToLartErrorShown(){
  cy.get('cx-form-errors').should('be.visible');
  cy.get('cx-form-errors').get('p').contains('File size should not exceed 10 MB');

}

export function verifyCreatedTicketDetails(ticketDetails: TestTicketDetails) {
   const row = cy.get('cx-customer-ticketing-list').find('tbody').get('tr').eq(1);
   row.get('td').eq(1).contains(ticketDetails.subject);
   row.get('td').eq(2).contains(ticketDetails.category);
   row.get('td').eq(5).contains("Open");

   row.click();
   cy.wait(1000);
   cy.get('cx-messaging').contains(ticketDetails.message);
}


export function isFieldValidationErrorShown(){
  cy.get('cx-form-errors').should('be.visible');
}


export function verifyTicketDoesNotExist() {
  cy.get('cx-customer-ticketing-list').find('h3').contains("You don't have any request");

}

export function visitApparelUKSupportPage(){
  cy.intercept('/apparel-uk-spa/en/GBP/my-account/support-tickets').as('getApparelUKSupportPage');
  cy.visit('/apparel-uk-spa/en/GBP/my-account/support-tickets');
  cy.wait(`@getApparelUKSupportPage`).its('response.statusCode').should('eq', 200);
}

export function verifyCreateTicketPopupIsClosed(){
  cy.get('cx-customer-ticketing-create-dialog').should('not.exist');
}

export function getTicketDetailsFromTicketListView(){
  let ticketDetails = [];
  const row = cy.get('cx-customer-ticketing-list').find('tbody').get('tr').eq(1);
  row.get('td').eq(0).invoke('text').then((x) => ticketDetails.push(x));
  row.get('td').eq(1).invoke('text').then((x) => ticketDetails.push(x));
  row.get('td').eq(5).invoke('text').then((x) => ticketDetails.push(x));

   return ticketDetails;
}

export function verifyTicketDetails(ticketDetails){
  //assert title when available
  cy.get(':nth-child(1) > cx-card > .cx-card > .card-body > .cx-card-container > .cx-card-label-container > :nth-child(1) > .cx-card-label').contains(ticketDetails[1]);
  cy.get(':nth-child(4) > cx-card > .cx-card > .card-body > .cx-card-container > .cx-card-label-container > :nth-child(1) > .cx-card-label').contains(ticketDetails[2]);
}

export function createNewTicket(){
  const testTicketDetails: TestTicketDetails = {
    subject: 'Entering a subject',
    message: 'Typing a message',
    category: TestCategory.complaint,
  };

  loginRegisteredUser();
  visitElectronicSupportTicketPage();
  openCreateTicketModal();
  fillTicketDetails(testTicketDetails);
  clickSubmitAndVerifyRequestCompleted();
  verifyCreatedTicketDetails(testTicketDetails);
}

export function clickCloseRequestButton(){
  cy.get(':nth-child(4) > cx-card > .cx-card > .card-body > .cx-card-container > .cx-card-label-container > :nth-child(1) > .cx-card-label').contains("Open");
  cy.get('.btn.btn-block.btn-action"').click();
  cy.get('.cx-customer-ticket-form-body').should('exist');
  cy.get('label > .form-control').last().type("Closing Ticket");
  cy.get('.cx-customer-ticket-form-footer > .btn-primary').click();
}

export function verifyStatusOnListingPage(status){
  const row = cy.get('cx-customer-ticketing-list').find('tbody').get('tr').eq(1);
  row.get('td').eq(5).contains(status);
}

export function verifyMessageBoxExists(doesExist){
  if(doesExist){
    cy.get('.form-control').should('exist');
  } else {
    cy.get('.form-control').should('not.exist');
  }
}

export function clickReopenRequestButton(){
  cy.get(':nth-child(4) > cx-card > .cx-card > .card-body > .cx-card-container > .cx-card-label-container > :nth-child(1) > .cx-card-label').contains("Closed");
  cy.get('.btn.btn-block.btn-action"').click();
  cy.get('.cx-customer-ticket-form-body').should('exist');
  cy.get('label > .form-control').last().type("Reopening Ticket");
  cy.get('.cx-customer-ticket-form-footer > .btn-primary').click();
}

export function verifyMessagesAreBeingPopulated(){
  cy.get('.cx-message-left-align-text').should('exist');
}

export function addFilesInChatBox(){
  cy.get('.cx-message-footer-text').attachFile({filePath: '../helpers/customer-ticketing/files-to-upload/test.docx'});
  cy.get('p').contains("test.docx");
}

export function sendMessageAsUser(){
  cy.get('.form-control').type("Update");
  cy.get('.cx-message-input > .btn').click();
}
