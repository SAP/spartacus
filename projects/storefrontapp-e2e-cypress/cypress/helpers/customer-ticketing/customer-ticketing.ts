import { clickHamburger } from '../checkout-flow';
import { loginRegisteredUser as login } from "../cart";

const HTTP_STATUS_OK = 200;
const FIRST_ROW = 1;
const ID_COLUMN = 0;
const SUBJECT_COLUMN = 1;
const CATEGORY_COLUMN = 2;
const STATUS_COLUMN = 5;

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

export function clickFirstTicketFromTicketListing(){
  cy.get(`#ticketing-list-table tbody tr:nth-child(${FIRST_TICKET_ROW_INDEX}) .cx-ticketing-list-data:nth-child(${FIRST_TICKET_COLUMN_INDEX}) a.cx-ticketing-list-value`).click();
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

export function visitTicketDetailsPageFromTicketListingPage(){
  let ticketDetails = [];
  const row = cy.get('cx-customer-ticketing-list').find('tbody').get('tr').eq(FIRST_ROW);
  row.get('td').eq(ID_COLUMN).invoke('text').then((x) => ticketDetails.push(x));
  row.get('td').eq(SUBJECT_COLUMN).invoke('text').then((x) => ticketDetails.push(x));
  row.get('td').eq(STATUS_COLUMN).invoke('text').then((x) => ticketDetails.push(x));

   return ticketDetails;
}

export function verifyTicketDetailsByComparingTIcketHeaderToTicketiListing(ticketDetails){
  //assert title when available

  cy.get('.cx-card-label').eq(0).contains(ticketDetails[1]);

  // cy.get(':nth-child(1) > cx-card > .cx-card > .card-body > .cx-card-container > .cx-card-label-container > :nth-child(1) > .cx-card-label').contains(ticketDetails[1]);
  // cy.get(':nth-child(4) > cx-card > .cx-card > .card-body > .cx-card-container > .cx-card-label-container > :nth-child(1) > .cx-card-label').contains(ticketDetails[2]);
}

export function createNewTicket(){
  const testTicketDetails: TestTicketDetails = {
    subject: 'Entering a subject',
    message: 'Typing a message',
    category: TestCategory.complaint,
  };

  loginRegisteredUser();
  visitElectronicTicketListingPage();
  openCreateTicketPopup();
  fillTicketDetails(testTicketDetails);
  clickSubmit();
  verifyRequestCompleted();
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

export function verifyCustomerMessagesAreBeingPopulatedInChatHistory(){
  cy.get('.cx-message-left-align-text').should('exist');
}

export function addFilesInChatBox(){
  cy.get('.cx-message-footer-text').attachFile({filePath: '../helpers/customer-ticketing/files-to-upload/test.docx'});
  cy.get('p').contains("test.docx");
}

export function clickSend(){
  cy.get('.cx-send').click();
}

export function postMessageAsCustomerIntoChatBox(){
  cy.get('.form-control').type("Update");
}
