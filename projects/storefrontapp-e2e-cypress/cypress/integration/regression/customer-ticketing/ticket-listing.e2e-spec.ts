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
        customerTicketing.verifyTicketListingTableContent();
        let numberOfTickets = customerTicketing.getNumberOfTicket();
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
        customerTicketing.clickTicketInRow();
        customerTicketing.closeTicketRequest("thank you");
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
        customerTicketing.createMultipleTickets(numberOfTicketToCreateInitially, testTicketDetails);
        customerTicketing.verifyPaginationDoesNotExist();
        customerTicketing.createMultipleTickets(numberOfTicketToCraeteForOnePagePagination, testTicketDetails);
        customerTicketing.verifyPaginationExists();
        let totalNumberOfTicketCreated = (numberOfTicketToCreateInitially + numberOfTicketToCraeteForOnePagePagination);
        customerTicketing.verifyNumberOfPagesBasedOnTotalNumberOfTicket(totalNumberOfTicketCreated);

        customerTicketing.createMultipleTickets(numberOfTicketToCreateForMultipagePagination, testTicketDetails);
        totalNumberOfTicketCreated += numberOfTicketToCreateForMultipagePagination;
        customerTicketing.verifyNumberOfPagesBasedOnTotalNumberOfTicket(totalNumberOfTicketCreated);
      });

      it('should sort ticket listing', () => {

        const fistTicket: TestTicketDetails = {
          subject: "first ticket",
          message: "fisrt ticket",
          category: TestCategory.complaint,
        };

        const secondTicket: TestTicketDetails = {
          subject: "secondoo",
          message: "no uno",
          category: TestCategory.complaint,
        };

        customerTicketing.loginRegisteredUser();
        customerTicketing.visitElectronicTicketListingPage();
        customerTicketing.createTicket(fistTicket);
        customerTicketing.createTicket(secondTicket);
        customerTicketing.openTicketOnSepcifiedRowNumber(2);
        cy.wait(1000);
        customerTicketing.sendMessage("hello, world");
        cy.go('back');
        customerTicketing.selectSortBy(customerTicketing.TestSortingTypes.id);
        customerTicketing.verifyCertainNumberOfTicketsSortedById(2);
        customerTicketing.selectSortBy(customerTicketing.TestSortingTypes.changedOn);
        customerTicketing.verifyCreatedTicketDetails(fistTicket);

      });

      it('should put the ticket on top when Changed On is selected as the sort', () => {
        const otherTickets: TestTicketDetails = {
          subject: "Creating tickets for pagination ",
          message: "Creating tickets for pagination ",
          category: TestCategory.complaint,
        };

        const ticketToSort: TestTicketDetails = {
          subject: "This will go from bottom of the list to the top ",
          message: "This will go from bottom of the list to the top ",
          category: TestCategory.complaint,
        };

        const numberOfOtherTicket = 2;

        customerTicketing.loginRegisteredUser();
        customerTicketing.visitElectronicTicketListingPage();
        customerTicketing.createTicket(ticketToSort);
        customerTicketing.verifyCreatedTicketDetails(ticketToSort);
        customerTicketing.createMultipleTickets(numberOfOtherTicket, otherTickets);
        customerTicketing.openTicketOnSepcifiedRowNumber(numberOfOtherTicket+1);
        customerTicketing.sendMessage("adding to top");
        cy.go('back');
        customerTicketing.verifyCreatedTicketDetails(ticketToSort);
      });

    });
  });
});
