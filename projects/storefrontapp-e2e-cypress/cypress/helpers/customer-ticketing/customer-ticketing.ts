import { clickHamburger } from '../checkout-flow';
import { loginRegisteredUser as login } from "../cart";

const HTTP_STATUS_OK = 200;
const COLUMN_HEADER_TICKET_LIST = 0;
const FIRST_ROW_TICKET_LIST = 1;
const ID_COLUMN = 1;
const SUBJECT_COLUMN = 1;
const CATEGORY_COLUMN = 2;
const CREATED_ON_COLUMN = 3;
const CHANGED_ON_COLUMN = 4;
const STATUS_COLUMN = 5;
const CUSTOMER_SUPPORT_MENU_OPTION_INDEX = 14;

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
  cy.get(`#ticketing-list-table tbody tr:nth-child(${FIRST_ROW_TICKET_LIST}) .cx-ticketing-list-data:nth-child(${SUBJECT_COLUMN}) a.cx-ticketing-list-value`).click();
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
  cy.get('cx-global-message').contains('Request created.');
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
   const row = cy.get('cx-customer-ticketing-list').get('tbody').get('tr').eq(FIRST_ROW_TICKET_LIST);
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
      cy.get('cx-customer-ticketing-list')
        .get('tbody')
        .get('tr').eq(FIRST_ROW_TICKET_LIST)
        .get('td').eq(SUBJECT_COLUMN)
      .should('not.contain', ticketDetails.subject);
    }
    else {
      cy.get('cx-customer-ticketing-list').find('h3').contains("You don't have any request");
    }
  });
}

export function visitApparelUKTicketListingPage(){
  visitPage('apparel-uk-spa/en/GBP/my-account/support-tickets', 'apparelTicketListingPage');
}

export function verifyTicketListingTableContent(): number{
  let numberOfTickets = 0;
  cy.get('cx-customer-ticketing-list').then( ticketListingElement => {
    if(ticketListingElement.find('tbody').length > 0) {
      const headerRow = cy.get('cx-customer-ticketing-list').get('tbody').get('tr').eq(COLUMN_HEADER_TICKET_LIST).get('td');
      const allRowColumns = headerRow.get('td');
      allRowColumns.eq(ID_COLUMN).should('contain', 'ID');
      allRowColumns.eq(SUBJECT_COLUMN).should('contain', 'Subject');
      allRowColumns.eq(CATEGORY_COLUMN).should('contain', 'Category');
      allRowColumns.eq(CREATED_ON_COLUMN).should('contain', 'Created On');
      allRowColumns.eq(CHANGED_ON_COLUMN).should('contain', 'Changed On');
      allRowColumns.eq(STATUS_COLUMN).should('contain', 'Status');
      numberOfTickets = ticketListingElement.find('tbody').length;
    }
    else {
      cy.get('cx-customer-ticketing-list').find('h3').contains("You don't have any request");
    }
  });

  return numberOfTickets;
}

export function createTicket(ticketDetails: TestTicketDetails){
  openCreateTicketPopup();
  fillTicketDetails(ticketDetails);
  clickSubmit();
  verifyRequestCompleted();
}

export function shouldNowHave(expectedNumberOfTickets: number) {
  cy.get('cx-customer-ticketing-list').get('tbody').should('have.length', expectedNumberOfTickets);
}

export function openLastCreatedTicket() {
  const row = cy.get('cx-customer-ticketing-list').get('tbody').get('tr').eq(FIRST_ROW_TICKET_LIST);
  row.click();
}

export function closeTicketRequest() {
  cy.get('cx-customer-ticketing-close').click()
  cy.get('textarea').last().type("closing the ticket, bye");
  clickSubmit();
}

export function verifyClosedTicketIsStillInTicketListing() {
  const row = cy.get('cx-customer-ticketing-list').get('tbody').get('tr').eq(FIRST_ROW_TICKET_LIST);
  row.get('td').eq(STATUS_COLUMN).contains("Closed");
}

