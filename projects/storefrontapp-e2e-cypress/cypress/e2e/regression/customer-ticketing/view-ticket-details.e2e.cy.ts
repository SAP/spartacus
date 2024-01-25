/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as customerTicketing from '../../../helpers/customer-ticketing/customer-ticketing';
import {
  FIRST_ROW_TICKET_LIST,
  TestCategory,
  TestStatus,
  TestTicketDetails,
} from '../../../helpers/customer-ticketing/customer-ticketing';

describe('ticket details', () => {
  context('Registered User', () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
    });

    it('should be able to view ticket details page for an existing ticket (CXSPA-470)', () => {
      customerTicketing.loginRegisteredUser();
      customerTicketing.clickMyAccountMenuOption();
      customerTicketing.clickCustomerSupportMenuOption();
      customerTicketing.verifyTicketListingPageVisit();
      customerTicketing.createTicket({
        subject: 'ticket details',
        message: 'ticket details',
        ticketCategory: {
          id: TestCategory.complaint.toUpperCase(),
          name: TestCategory.complaint,
        },
      });
      customerTicketing.clickTicketInRow(FIRST_ROW_TICKET_LIST);
      customerTicketing.verifyTicketDetailsPageVisit();
    });

    it('clicking a ticket should open its corresponding ticket details (CXSPA-470)', () => {
      customerTicketing.loginRegisteredUser();
      customerTicketing.clickMyAccountMenuOption();
      customerTicketing.clickCustomerSupportMenuOption();
      customerTicketing.verifyTicketListingPageVisit();
      customerTicketing.createTicket({
        subject: 'First ticket',
        message: 'First ticket',
        ticketCategory: {
          id: TestCategory.complaint.toUpperCase(),
          name: TestCategory.complaint,
        },
      });
      customerTicketing.visitElectronicTicketListingPage();
      customerTicketing.verifyTicketListingPageVisit();
      customerTicketing.createTicket({
        subject: 'Second ticket',
        message: 'Second ticket',
        ticketCategory: {
          id: TestCategory.complaint.toUpperCase(),
          name: TestCategory.complaint,
        },
      });
      customerTicketing.visitElectronicTicketListingPage();
      customerTicketing.verifyTicketListingPageVisit();
      let ticketDetails =
        customerTicketing.extractTicketDetailsFromFirstRowInTicketListingPage();
      customerTicketing.clickTicketInRow(FIRST_ROW_TICKET_LIST);
      customerTicketing.verifyTicketDetailsAreDisplayedInTicketHeader(
        ticketDetails
      );
    });

    it('closing a ticket should not let user interact with the ticket anymore (CXSPA-470)', () => {
      customerTicketing.loginRegisteredUser();
      customerTicketing.visitElectronicTicketListingPage();
      customerTicketing.verifyTicketListingPageVisit();
      customerTicketing.createTicket({
        subject: 'First ticket',
        message: 'First ticket',
        ticketCategory: {
          id: TestCategory.complaint.toUpperCase(),
          name: TestCategory.complaint,
        },
      });
      customerTicketing.clickTicketInRow(FIRST_ROW_TICKET_LIST);
      customerTicketing.verifyTicketDetailsPageVisit();
      customerTicketing.verifyStatusOfTicketInDetailsPage(TestStatus.open);
      customerTicketing.closeTicketRequest('Closing ticket');
      customerTicketing.verifyTicketListingPageVisit();
      customerTicketing.verifyStatusOfTicketInList();
      customerTicketing.clickTicketInRow(FIRST_ROW_TICKET_LIST);
      customerTicketing.verifyMessageBoxIsDisabled();
    });

    it('reopening a ticket should let user make more interaction with the ticket (CXSPA-470)', () => {
      customerTicketing.loginRegisteredUser();
      customerTicketing.visitElectronicTicketListingPage();
      customerTicketing.createTicket({
        subject: 'First ticket',
        message: 'First ticket',
        ticketCategory: {
          id: TestCategory.complaint.toUpperCase(),
          name: TestCategory.complaint,
        },
      });
      customerTicketing.clickTicketInRow(FIRST_ROW_TICKET_LIST);
      customerTicketing.closeTicketRequest('Closing ticket');
      customerTicketing.verifyTicketListingPageVisit();
      customerTicketing.verifyStatusOfTicketInList();
      customerTicketing.clickTicketInRow(FIRST_ROW_TICKET_LIST);
      customerTicketing.verifyStatusOfTicketInDetailsPage(TestStatus.closed);
      customerTicketing.reopenTicketRequest('Reopening ticket');
      customerTicketing.verifyStatusOfTicketInDetailsPage(
        TestStatus.in_process
      );
      customerTicketing.verifyMessageBoxIsEnabled();
    });

    it('ticket should always have atleast one message in it (CXSPA-470)', () => {
      customerTicketing.loginRegisteredUser();
      customerTicketing.visitElectronicTicketListingPage();
      const testTicketDetails: TestTicketDetails = {
        subject: 'Ticket should always have atleast one message',
        message: 'Ticket should always have atleast one message',
        ticketCategory: {
          id: TestCategory.complaint.toUpperCase(),
          name: TestCategory.complaint,
        },
      };
      customerTicketing.createTicket(testTicketDetails);
      customerTicketing.clickTicketInRow(FIRST_ROW_TICKET_LIST);
      customerTicketing.verifyTicketDetailsPageVisit();
      customerTicketing.sendMessage('Update ticket with comments');
      customerTicketing.verifyMessageWasPosted('Update ticket with comments');
    });

    it('pressing send should publish message without attachment (CXSPA-470)', () => {
      customerTicketing.loginRegisteredUser();
      customerTicketing.visitElectronicTicketListingPage();
      const testTicketDetails: TestTicketDetails = {
        subject: 'Replies in tickets can be sent',
        message: 'Replies in tickets can be sent',
        ticketCategory: {
          id: TestCategory.complaint.toUpperCase(),
          name: TestCategory.complaint,
        },
      };
      customerTicketing.createTicket(testTicketDetails);
      customerTicketing.clickTicketInRow(FIRST_ROW_TICKET_LIST);
      customerTicketing.verifyTicketDetailsPageVisit();
      customerTicketing.sendMessage('Update ticket with comments');
      customerTicketing.verifyMessageWasPosted('Update ticket with comments');
    });

    it('pressing send should publish message with attachment (CXSPA-470)', () => {
      customerTicketing.loginRegisteredUser();
      customerTicketing.visitElectronicTicketListingPage();
      const testTicketDetails: TestTicketDetails = {
        subject: 'Replies in tickets can be sent',
        message: 'Replies in tickets can be sent',
        ticketCategory: {
          id: TestCategory.complaint.toUpperCase(),
          name: TestCategory.complaint,
        },
      };
      customerTicketing.createTicket(testTicketDetails);
      customerTicketing.clickTicketInRow(FIRST_ROW_TICKET_LIST);
      let file_name = 'test.docx';
      customerTicketing.verifyTicketDetailsPageVisit();
      customerTicketing.addFile(file_name);
      customerTicketing.sendMessage('Update ticket with comments');
      customerTicketing.verifyMessageWasPosted('Update ticket with comments');
      customerTicketing.verifyFileAttachedToMessage(file_name);
    });

    it('should be able to view ticket details page for an existing ticket (CXSPA-470)', () => {
      customerTicketing.loginRegisteredUser();
      customerTicketing.visitElectronicTicketListingPage();
      const testTicketDetails: TestTicketDetails = {
        subject: 'A test subject',
        message: 'A test message',
        ticketCategory: {
          id: TestCategory.complaint.toUpperCase(),
          name: TestCategory.complaint,
        },
      };
      customerTicketing.createTicket(testTicketDetails);
      customerTicketing.verifyTicketListingPageVisit();
      customerTicketing.clickTicketInRow(FIRST_ROW_TICKET_LIST);
      customerTicketing.verifyTicketDetailsPageVisit();
    });

    it('should be able to visit ticket details page for an existing ticket via url (CXSPA-470)', () => {
      customerTicketing.loginRegisteredUser();
      customerTicketing.visitElectronicTicketListingPage();
      const testTicketDetails: TestTicketDetails = {
        subject: 'A test subject',
        message: 'A test message',
        ticketCategory: {
          id: TestCategory.complaint.toUpperCase(),
          name: TestCategory.complaint,
        },
      };
      customerTicketing.createTicket(testTicketDetails);
      customerTicketing.visitTicketDetailsOfFirstTicketByItsIdThroughURL();
      customerTicketing.verifyTicketDetailsPageVisit();
    });

    it('should throw 404 error when trying to visit ticket details page for a non-existing ticket id via url (CXSPA-470)', () => {
      customerTicketing.loginRegisteredUser();
      customerTicketing.visitTicketDetailsPageForNonExistingTicket();
      customerTicketing.verifyTicketListingPageVisit();
      customerTicketing.verifyGlobalMessage('Ticket not found.');
    });
  });
});
