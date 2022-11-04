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
        customerTicketing.verifyPaginationExistBasedOnTheNumberOfTicketsCreated(numberOfTickets);

        customerTicketing.createTicket(testTicketDetails);
        customerTicketing.shouldHaveNumberOfTicketsListed(++numberOfTickets);
        customerTicketing.verifyTicketListingTableContent();
      });


      it("should still show the ticket in the list when status is not open", () => {

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

      it("should create 6 tickets" ,() => {
        const testTicketDetails: TestTicketDetails = {
          subject: "Creating tickets for pagination ",
          message: "Creating tickets for pagination ",
          category: TestCategory.complaint,
        };

        const numberOfTicketToCreateInitially = 5;
        const numberOfTicketToCraeteForOnePagePagination = 1;
        const numberOfTicketToCreateForMultipagePagination = 5;

        customerTicketing.loginRegisteredUser();
        customerTicketing.visitElectronicTicketListingPage();
        customerTicketing.verifyPaginationDoesNotExist();
        customerTicketing.createNumberOfTickets(numberOfTicketToCreateInitially, testTicketDetails);
        customerTicketing.verifyPaginationDoesNotExist();
        customerTicketing.createNumberOfTickets(numberOfTicketToCraeteForOnePagePagination, testTicketDetails);
        customerTicketing.verifyPaginationExists();
        let totalNumberOfTicketCreated = (numberOfTicketToCreateInitially + numberOfTicketToCraeteForOnePagePagination);
        customerTicketing.verifyNumberOfPagesBasedOnTotalNumberOfTicket(totalNumberOfTicketCreated);

        customerTicketing.createNumberOfTickets(numberOfTicketToCreateForMultipagePagination, testTicketDetails);
        totalNumberOfTicketCreated += numberOfTicketToCreateForMultipagePagination;
        customerTicketing.verifyNumberOfPagesBasedOnTotalNumberOfTicket(totalNumberOfTicketCreated);
      });

    });
  });
});
