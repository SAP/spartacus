import { viewportContext } from '../../../helpers/viewport-context';
import * as customerTicketing from '../../../helpers/customer-ticketing/customer-ticketing';
import {
  TestTicketDetails,
  TestCategory,
  TestStatus
} from '../../../helpers/customer-ticketing/customer-ticketing';

describe('ticket details', () => {
  viewportContext(['desktop', 'mobile'], () => {
    context('Registered User', () => {
      before(() => {
        cy.window().then((win) => {
          win.sessionStorage.clear();
        });
      });
      it('should be able to view ticket details page for an existing ticket', () => {
        customerTicketing.loginRegisteredUser();
        customerTicketing.clickMyAccountMenuOption();
        customerTicketing.clickCustomerSupportMenuOption();
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.createTicket({
          subject: 'ticket details',
          message: 'ticket details',
          category: customerTicketing.TestCategory.complaint,
        });
        customerTicketing.clickTicketInRow();
        customerTicketing.verifyTicketDetailsPageVisit();
      });

      it('clicking a ticket should open its corresponding ticket details', () => {
        customerTicketing.loginRegisteredUser();
        customerTicketing.clickMyAccountMenuOption();
        customerTicketing.clickCustomerSupportMenuOption();
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.createTicket({
          subject: 'First ticket',
          message: 'First ticket',
          category: TestCategory.complaint,
        });
        customerTicketing.visitElectronicTicketListingPage();
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.createTicket({
          subject: 'Second ticket',
          message: 'Second ticket',
          category: TestCategory.complaint,
        });
        customerTicketing.visitElectronicTicketListingPage();
        customerTicketing.verifyTicketListingPageVisit();
        let ticketDetails = customerTicketing.extractTicketDetailsFromFirstRowInTicketListingPage();
        customerTicketing.clickTicketInRow();
        customerTicketing.verifyTicketDetailsByComparingTicketHeaderToExtractedDetails(ticketDetails);
      });

      it('closing a ticket should not let user interact with the ticket anymore', () => {
        customerTicketing.loginRegisteredUser();
        customerTicketing.visitElectronicTicketListingPage();
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.createTicket({
          subject: 'First ticket',
          message: 'First ticket',
          category: TestCategory.complaint,
        });
        customerTicketing.clickTicketInRow();
        customerTicketing.verifyTicketDetailsPageVisit();
        customerTicketing.verifyStatusOfTicketInDetailsPage(TestStatus.open);
        customerTicketing.closeTicketRequest("Closing ticket");
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.verifyStatusOfTicketInList();
        customerTicketing.clickTicketInRow();
        customerTicketing.verifyMessageBoxIsDisabled();
      });

      it('reopening a ticket should let user make more interaction with the ticket', () => {
        customerTicketing.loginRegisteredUser();
        customerTicketing.visitElectronicTicketListingPage();
        customerTicketing.createTicket({
          subject: 'First ticket',
          message: 'First ticket',
          category: TestCategory.complaint,
        });
        customerTicketing.clickTicketInRow();
        customerTicketing.closeTicketRequest("Closing ticket");
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.verifyStatusOfTicketInList();
        customerTicketing.clickTicketInRow();
        customerTicketing.verifyStatusOfTicketInDetailsPage(TestStatus.closed);
        customerTicketing.reopenTicketRequest("Reopening ticket");
        customerTicketing.verifyStatusOfTicketInDetailsPage(TestStatus.in_process);
        customerTicketing.verifyMessageBoxIsEnabled();
      });


      it('ticket should always have atleast one message in it', () => {
        const testTicketDetails: TestTicketDetails = {
          subject: 'Ticket should always have atleast one message',
          message: 'Ticket should always have atleast one message',
          category: TestCategory.complaint,
          filename: 'fileNotSupported.xls',
        };
        customerTicketing.sendMessage("Update ticket with comments");
        customerTicketing.verifyMessageWasPosted("Update ticket with comments");
        customerTicketing.navigateBackToPreviousPage();
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.createTicket(testTicketDetails);
        customerTicketing.clickTicketInRow();
        customerTicketing.verifyTicketDetailsPageVisit();
        customerTicketing.verifyMessageWasPosted("Update ticket with comments");
      });

      it('pressing send should publish message without attachment', () => {
        customerTicketing.verifyTicketDetailsPageVisit();
        customerTicketing.sendMessage("Update ticket with comments");
        customerTicketing.verifyMessageWasPosted("Update ticket with comments");
      });

      it('pressing send should publish message with attachment', () => {
        let file_name = "test.docx";
        customerTicketing.verifyTicketDetailsPageVisit();
        customerTicketing.addFile(file_name);
        customerTicketing.sendMessage("Update ticket with comments");
        customerTicketing.verifyMessageWasPosted("Update ticket with comments");
        customerTicketing.verifyFileAttachedToMessage(file_name);
      });
    });
  });
});
