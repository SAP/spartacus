import { clickHamburger } from '../checkout-flow';
import { loginRegisteredUser as login } from "../cart";

const HTTP_STATUS_OK = 200;
const FIRST_ROW = 1;
const SUBJECT_COLUMN = 1;
const CATEGORY_COLUMN = 2;
const STATUS_COLUMN = 5;

const CUSTOMER_SUPPORT_MENU_OPTION_INDEX = 14;
const FIRST_TICKET_COLUMN_INDEX = 1;
const FIRST_TICKET_ROW_INDEX = 1;

const TICKET_SUBJECT_MAX_LENGTH = 255;
const TICKET_MESSAGE_MAX_LENGTH = 5000;

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

export function verifyCreateTicketPopupIsClosed(){
  cy.get('cx-customer-ticketing-create-dialog').should('not.exist');
}

export function verifyTicketSubjectAndMessageDoNotExceedCharacterLimit(){
  const SUBJECT_CONTROL = 'subject';
  const MESSAGE_CONTROL = 'message';
  cy.get('cx-customer-ticketing-create-dialog').within(() => {
    cy.get(`textarea[formcontrolname="${SUBJECT_CONTROL}"]`).invoke('text').then((text) => {
      expect(text.length).to.be.lte(TICKET_SUBJECT_MAX_LENGTH);
    });
    cy.get(`textarea[formcontrolname="${MESSAGE_CONTROL}"]`).invoke('text').then((text) => {
      expect(text.length).to.be.lte(TICKET_MESSAGE_MAX_LENGTH);
    });
    cy.get('cx-form-errors').should('not.be.visible');
  });
}

export function generateDummyStringOfLength(length: number): string {
  return new Array(length).join('a');
}
