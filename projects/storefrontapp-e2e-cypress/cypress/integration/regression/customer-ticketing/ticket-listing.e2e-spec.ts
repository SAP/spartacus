import { viewportContext } from "../../../helpers/viewport-context";
import * as customerTicketing from '../../../helpers/customer-ticketing/customer-ticketing';
import {TestTicketDetails, TestCategory} from '../../../helpers/customer-ticketing/customer-ticketing';



describe('ticketing', () => {
  viewportContext(['desktop', 'mobile'], () => {
    context('Registered User', () => {
      before(() => {
        cy.window().then((win) => {
          win.sessionStorage.clear();
        });
      });
      it('visit the ticket listing page and see if tickets exist', () => {

        const testTicketDetails: TestTicketDetails = {
          subject: "something to mindful",
          message: "nothing to worry about",
          category: TestCategory.complaint,
        };

        customerTicketing.loginRegisteredUser();
        customerTicketing.visitElectronicTicketListingPage();
        let numberOfTickets: number = customerTicketing.verifyTicketListingTableContent();

        customerTicketing.createTicket(testTicketDetails);
        customerTicketing.shouldNowHave(++numberOfTickets);
        customerTicketing.verifyTicketListingTableContent();
      });


      it("should still show the ticket when not in open", () => {

        const testTicketDetails: TestTicketDetails = {
          subject: "changing status",
          message: "status will change",
          category: TestCategory.complaint,
        };

        customerTicketing.loginRegisteredUser();
        customerTicketing.visitElectronicTicketListingPage();
        customerTicketing.createTicket(testTicketDetails);
        customerTicketing.openLastCreatedTicket();
        customerTicketing.closeTicketRequest();
        customerTicketing.verifyClosedTicketIsStillInTicketListing();
      });

    });
  });
});
