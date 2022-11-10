import { viewportContext } from "../../../helpers/viewport-context";
import * as customerTicketing from '../../../helpers/customer-ticketing/customer-ticketing';

describe('ticketing', () => {
  viewportContext(['desktop', 'mobile'], () => {
    context('Registered User', () => {
      before(() => {
        cy.window().then((win) => {
          win.sessionStorage.clear();
        });
        customerTicketing.loginRegisteredUser();
        customerTicketing.createNewTicket();
      });

      it('should be able to view ticket details page for an existing ticket', () => {
        customerTicketing.clickMyAccountMenuOption();
        customerTicketing.clickCustomerSupportMenuOption();
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.clickFirstTicketFromTicketListing();
        customerTicketing.verifyTicketDetailsPageVisit();
      });

      it('clicking a ticket should open its corresponding ticket details', () => {
        customerTicketing.clickMyAccountMenuOption();
        customerTicketing.clickCustomerSupportMenuOption();
        customerTicketing.verifyTicketListingPageVisit();
        let ticketDetails = customerTicketing.extractTicketDetailsFromFirstRowInTicketListingPage();
        customerTicketing.clickFirstTicketFromTicketListing();
        customerTicketing.verifyTicketDetailsByComparingTicketHeaderToExtractedDetails(ticketDetails);
      });

      it('closing a ticket should not let user interact with the ticket anymore', () => {
        customerTicketing.visitElectronicTicketListingPage();
        customerTicketing.clickMyAccountMenuOption();
        customerTicketing.clickCustomerSupportMenuOption();
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.clickFirstTicketFromTicketListing();
        customerTicketing.verifyTicketDetailsPageVisit();
        customerTicketing.verifyTicketStatusIsOpenInTicketDetailsPage();
        customerTicketing.closeTicket();
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.verifyTicketStatusIsClosedOnListingPage();
        customerTicketing.verifyMessageBoxExists(false);
        customerTicketing.clickFirstTicketFromTicketListing();
      });

      it('reopening a ticket should let user make more interaction with the ticket', () => {
        customerTicketing.closeTicket();
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.verifyTicketStatusIsClosedOnListingPage();
        customerTicketing.clickFirstTicketFromTicketListing();
        customerTicketing.verifyTicketDetailsPageVisit();
        customerTicketing.verifyTicketStatusIsClosedInTicketDetailsPage();
        customerTicketing.reopenTicket();
        customerTicketing.verifyTicketStatusIsOpenInTicketDetailsPage();
        customerTicketing.verifyMessageBoxExists(true);
      });


      it('ticket should always have atleast one message in it', () => {
        customerTicketing.postMessageAsCustomerIntoChatBox();
        customerTicketing.clickSend();
        customerTicketing.verifyLastMessageWasPosted();
        customerTicketing.navigateBackToPreviousPage();
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.createNewTicket();
        customerTicketing.clickSecondTicketFromTicketListing();
        customerTicketing.verifyTicketDetailsPageVisit();
        customerTicketing.verifyAllCustomerMessagesAreBeingPopulatedInChatHistory();
      });

      it('pressing send should publish message without attachment', () => {
        customerTicketing.verifyTicketDetailsPageVisit();
        customerTicketing.postMessageAsCustomerIntoChatBox();
        customerTicketing.clickSend();
        customerTicketing.verifyLastMessageWasPosted();
      });

      it('pressing send should publish message with attachment', () => {
        let file_name = "test.docx";
        customerTicketing.verifyTicketDetailsPageVisit();
        customerTicketing.postMessageAsCustomerIntoChatBox();
        customerTicketing.addFile(file_name);
        customerTicketing.clickSend();
        customerTicketing.verifyLastMessageWasPosted();
        customerTicketing.verifyFileAttachedToMessage(file_name);
      });
    });
  });
});
