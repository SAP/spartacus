
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


export function visitElectronicSupportTicketPage() {
  cy.visit('/my-account/support-tickets');
  cy.wait(1000);
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
  cy.visit(`/apparel-uk-spa/en/GBP/my-account/support-tickets`);
  cy.wait(5000);
}
