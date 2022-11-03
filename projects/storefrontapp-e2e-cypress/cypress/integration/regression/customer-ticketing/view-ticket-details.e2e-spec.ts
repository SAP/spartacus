import { viewportContext } from "../../../helpers/viewport-context";
import * as customerTicketing from '../../../helpers/customer-ticketing/customer-ticketing';

describe('ticketing', () => {
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
        customerTicketing.clickFirstTicketFromTicketListing();
        customerTicketing.verifyTicketDetailsPageVisit();
      });

      it('clicking a ticket should open its corresponding ticket details', () => {
        customerTicketing.loginRegisteredUser();
        customerTicketing.clickMyAccountMenuOption();
        customerTicketing.clickCustomerSupportMenuOption();
        customerTicketing.verifyTicketListingPageVisit();
        let ticketDetails = customerTicketing.getTicketDetailsFromTicketListView();
        customerTicketing.clickFirstTicketFromTicketListing();
        customerTicketing.verifyTicketDetails(ticketDetails);
      });

      it('closing a ticket should not let user interact with the ticket anymore', () => {

        customerTicketing.loginRegisteredUser();
        customerTicketing.clickMyAccountMenuOption();
        customerTicketing.clickCustomerSupportMenuOption();
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.clickFirstTicketFromTicketListing();
        customerTicketing.verifyTicketDetailsPageVisit();
        customerTicketing.clickCloseRequestButton();
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.verifyStatusOnListingPage(" Closed ");
        customerTicketing.verifyMessageBoxExists(false);
      });

      it('reopening a ticket should let user make more interaction with the ticket', () => {
        customerTicketing.loginRegisteredUser();
        customerTicketing.clickMyAccountMenuOption();
        customerTicketing.clickCustomerSupportMenuOption();
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.clickFirstTicketFromTicketListing();
        customerTicketing.verifyTicketDetailsPageVisit();
        customerTicketing.clickReopenRequestButton();
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.verifyStatusOnListingPage(" Open ");
        customerTicketing.verifyMessageBoxExists(true);
      });

      it('ticket should always have atleast one message in it', () => {
        customerTicketing.loginRegisteredUser();
        customerTicketing.clickMyAccountMenuOption();
        customerTicketing.clickCustomerSupportMenuOption();
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.clickFirstTicketFromTicketListing();
        customerTicketing.verifyTicketDetailsPageVisit();
        customerTicketing.verifyMessagesAreBeingPopulated();
      });

      it('pressing send should publish message without attachment', () => {
        customerTicketing.loginRegisteredUser();
        customerTicketing.clickMyAccountMenuOption();
        customerTicketing.clickCustomerSupportMenuOption();
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.clickFirstTicketFromTicketListing();
        customerTicketing.verifyTicketDetailsPageVisit();
        customerTicketing.sendMessageAsUser();
      });

      it('pressing send should publish message with attachment', () => {
        customerTicketing.loginRegisteredUser();
        customerTicketing.clickMyAccountMenuOption();
        customerTicketing.clickCustomerSupportMenuOption();
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.clickFirstTicketFromTicketListing();
        customerTicketing.verifyTicketDetailsPageVisit();
        customerTicketing.addFilesInChatBox();
        customerTicketing.sendMessageAsUser();
      });
    });
  });
});
