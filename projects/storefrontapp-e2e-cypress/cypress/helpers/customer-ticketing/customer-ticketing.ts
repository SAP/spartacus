import { clickHamburger } from '../checkout-flow';
import { loginRegisteredUser as login } from "../cart";

const HTTP_STATUS_OK = 200;
const COLUMN_HEADER_TICKET_LIST = 0;
const FIRST_ROW_TICKET_LIST = 1;
const ID_COLUMN = 0;
const SUBJECT_COLUMN = 1;
const CATEGORY_COLUMN = 2;
const CREATED_ON_COLUMN = 3;
const CHANGED_ON_COLUMN = 4;
const STATUS_COLUMN = 5;
const CUSTOMER_SUPPORT_MENU_OPTION_INDEX = 14;
const MAX_TICKETS_PER_PAGE = 5;

export enum TestSortingTypes {
  changedOn = 'Changed On',
  id = 'ID'
}

export enum TestStatus {
  closed = 'Closed',
  open = 'Open',
}

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
  cy.get('cx-customer-ticketing-create-dialog').contains('Add New Request');
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

export function verifyGlobalMessage(globalMessage = 'Request created.'){
  cy.get('cx-global-message').contains(globalMessage);
  cy.get('cx-global-message').contains(globalMessage).should('not.exist', { timeout: 10000 });
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

export function clickTicketInRow(rowNumber = FIRST_ROW_TICKET_LIST){
  cy.get('cx-customer-ticketing-list').get('tbody').get('tr').eq(rowNumber).click();
}

export function verifyCreatedTicketDetails(ticketDetails: TestTicketDetails, rowNumber = FIRST_ROW_TICKET_LIST) {
   const row = cy.get('cx-customer-ticketing-list').get('tbody').get('tr').eq(rowNumber);
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

export function verifyTicketListingTableContent(){
  cy.get('cx-customer-ticketing-list').then( ticketListingElement => {
    if(ticketListingElement.find('tbody').length > 0) {
      const headerRow = cy.get('cx-customer-ticketing-list').get('table').get('tbody').get('tr').eq(COLUMN_HEADER_TICKET_LIST);
      headerRow.eq(ID_COLUMN).get('td').should('contain', ' Ticket ID ');
      headerRow.eq(SUBJECT_COLUMN).get('td').should('contain', ' Subject ');
      headerRow.eq(CATEGORY_COLUMN).get('td').should('contain', 'Category');
      headerRow.eq(CREATED_ON_COLUMN).get('td').should('contain', 'Created On');
      headerRow.eq(CHANGED_ON_COLUMN).get('td').should('contain', 'Changed On');
      headerRow.eq(STATUS_COLUMN).get('td').should('contain', 'Status');
    }
    else {
      cy.get('cx-customer-ticketing-list').find('h3').contains("You don't have any request");
    }
  });
}

export function getNumberOfTicket(): number {
  let numberOfTikcets = 0;
  cy.get('cx-customer-ticketing-list').then(ticketListingElement => {
    numberOfTikcets = ticketListingElement.find('tbody').length;
  });
  return numberOfTikcets;
}

export function createTicket(ticketDetails: TestTicketDetails){
  openCreateTicketPopup();
  fillTicketDetails(ticketDetails);
  clickSubmit();
  verifyGlobalMessage();
}

export function createMultipleTickets(numberOfTicket: number, ticketDetails: TestTicketDetails){
  for (let i = 0; i < numberOfTicket; i++){
    createTicket(ticketDetails);
  }
}

export function shouldHaveNumberOfTicketsListed(expectedNumberOfTickets: number) {
  cy.get('cx-customer-ticketing-list').get('tbody').should('have.length', expectedNumberOfTickets);
}

export function openTicketOnSepcifiedRowNumber(rowNumber: number) {
  const row = cy.get('cx-customer-ticketing-list').get('tbody').get('tr').eq(rowNumber);
  row.click();
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

export function verifyClosedTicketIsStillInTicketListing(rowNumber = FIRST_ROW_TICKET_LIST, status = TestStatus.closed) {
  const row = cy.get('cx-customer-ticketing-list').get('tbody').get('tr').eq(rowNumber);
  row.get('td').eq(STATUS_COLUMN).contains(status);
}

export function verifyPaginationDoesNotExist() {
  cy.get('cx-pagination').should('not.exist');
}

export function verifyPaginationExists() {
  cy.get('cx-pagination').should('exist');
}


export function verifyPaginationExistBasedOnTheNumberOfTicketsCreated(numberOfTicketCreated: number) {
  if(numberOfTicketCreated > MAX_TICKETS_PER_PAGE) {
    verifyPaginationExists();
  }
  else {
    verifyPaginationDoesNotExist();
  }
}

export function verifyNumberOfPagesBasedOnTotalNumberOfTicket(totalNumberOfTicketCreated: number) {
  const LEFT_RIGHT_ARROWS = 2;
  const FIRST_PAGE = 1;
  const expectedNumberOfPages = Math.floor(totalNumberOfTicketCreated / MAX_TICKETS_PER_PAGE) + FIRST_PAGE + LEFT_RIGHT_ARROWS;
  verifyPaginationExistBasedOnTheNumberOfTicketsCreated(totalNumberOfTicketCreated);
  cy.get('cx-pagination').find('a').should('have.length', expectedNumberOfPages);
}

export function selectSortBy(sort: TestSortingTypes) {
  cy.get('cx-sorting').click();
  cy.get('[aria-label="Sort orders"]').get('.ng-value-label').then(box => {
    if(box.is(sort)){
      cy.get('cx-sorting').click();
    }
    else{
      cy.get('cx-sorting').get('ng-dropdown-panel').get('span[ng-reflect-ng-item-label="'+sort+'"]').click();
    }
  });
}

export function sendMessage(message: string){
  cy.get('.form-control').type(message);
  cy.get('button').contains('Send').click();
  cy.wait(1000);
}

export function verifyCertainNumberOfTicketsSortedById(numberOfTicketsToVerify: number){
  for(let row = 1; row < numberOfTicketsToVerify; row++) {
    getIdInRow(row).then(id => {
      const smallerId = parseInt(id.text(), 10);
      getIdInRow(row + 1).invoke('text').then(parseFloat).should('be.lt', smallerId);
    });
  }
}

function getIdInRow(rowNumber: number){
  return cy.get('cx-customer-ticketing-list').get('tbody').get('tr').eq(rowNumber).find('td').eq(ID_COLUMN).find('a');
}
