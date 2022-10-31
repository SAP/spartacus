import { standardUser } from '../../sample-data/shared-users';
import { generateMail, randomString } from '../user';
import { clickHamburger } from '../checkout-flow';

const CUSTOMER_SUPPORT_MENU_OPTION_INDEX = 14;
const FIRST_TICKET_COLUMN_INDEX = 1;
const FIRST_TICKET_ROW_INDEX = 1;

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

export function visitTicketDetailsPageForFirstTicket(){
  cy.get(`#ticketing-list-table tbody tr:nth-child(${FIRST_TICKET_ROW_INDEX}) .cx-ticketing-list-data:nth-child(${FIRST_TICKET_COLUMN_INDEX}) a.cx-ticketing-list-value`).should('exist');
  cy.get(`#ticketing-list-table tbody tr:nth-child(${FIRST_TICKET_ROW_INDEX}) .cx-ticketing-list-data:nth-child(${FIRST_TICKET_COLUMN_INDEX}) a.cx-ticketing-list-value`).then( ($ticketIdElement) => {
    const ticketId = $ticketIdElement.text().trim();
    cy.visit(`/my-account/support-ticket/${ticketId}`);
    cy.get('cx-customer-ticketing-messages', { timeout: 10000 }).should('be.visible');
    cy.url().should('include',`/my-account/support-ticket/${ticketId}`);
  });
}

export function visitTicketDetailsPageForNonExistingTicket(){
  cy.visit('/my-account/support-ticket/XYZ01234');
  cy.get('cx-global-message .alert-danger', { timeout: 10000 }).should('be.visible');
  cy.get('cx-global-message .alert-danger span').should('include.text', 'Ticket not found.');
  cy.url().should('include','/my-account/support-ticket');
}
