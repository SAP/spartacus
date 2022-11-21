import { viewportContext } from '../../../helpers/viewport-context';
import * as customerTicketing from '../../../helpers/customer-ticketing/customer-ticketing';
import {
  TestTicketDetails,
  TestCategory,
  TestStatus
} from '../../../helpers/customer-ticketing/customer-ticketing';

describe('ticket listing', () => {
  viewportContext(['desktop', 'mobile'], () => {
    context('Registered User', () => {
      before(() => {
        cy.window().then((win) => {
          win.sessionStorage.clear();
        });
      });
      it('visit the ticket listing page and see if tickets exist', () => {
        const testTicketDetails: TestTicketDetails = {
          subject: 'something to mindful',
          message: 'nothing to worry about',
          category: TestCategory.complaint,
        };

        customerTicketing.loginRegisteredUser();
        customerTicketing.visitElectronicTicketListingPage();
        customerTicketing.verifyTicketListingTableContent();
        let numberOfTickets = customerTicketing.getNumberOfTickets();
        customerTicketing.verifyPaginationExistBasedOnTheNumberOfTicketsCreated(
          numberOfTickets
        );
        customerTicketing.createTicket(testTicketDetails);
        customerTicketing.shouldHaveNumberOfTicketsListed(++numberOfTickets);
        customerTicketing.verifyTicketListingTableContent();
      });

      it('should still show the ticket in the list when status is not open', () => {
        const testTicketDetails: TestTicketDetails = {
          subject: 'changing status',
          message: 'status will change',
          category: TestCategory.complaint,
        };

        customerTicketing.loginRegisteredUser();
        customerTicketing.visitElectronicTicketListingPage();
        customerTicketing.createTicket(testTicketDetails);
        customerTicketing.clickTicketInRow();
        customerTicketing.closeTicketRequest('thank you');
        customerTicketing.verifyStatusOfTicketInList();
      });

      it('should still show the ticket in the list when status is In Process', () => {
        const testTicketDetails: TestTicketDetails = {
          subject: 'changing status',
          message: 'status will change',
          category: TestCategory.complaint,
        };

        customerTicketing.loginRegisteredUser();
        customerTicketing.visitElectronicTicketListingPage();
        customerTicketing.createTicket(testTicketDetails);
        customerTicketing.clickTicketInRow();
        customerTicketing.closeTicketRequest('thank you');
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.clickTicketInRow();
        customerTicketing.reopenTicketRequest('Reopening ticket');
        customerTicketing.verifyStatusOfTicketInList(TestStatus.in_process);
      });

      it('should create 6 tickets', () => {
        const testTicketDetails: TestTicketDetails = {
          subject: 'Creating tickets for pagination ',
          message: 'Creating tickets for pagination ',
          category: TestCategory.complaint,
        };

        const numberOfTicketsToCreateInitially = 5;
        const numberOfTicketsToCreateForOnePagination = 1;
        const numberOfTicketsToCreateForMultipagePagination = 5;

        customerTicketing.loginRegisteredUser();
        customerTicketing.visitElectronicTicketListingPage();
        customerTicketing.verifyPaginationDoesNotExist();
        customerTicketing.createMultipleTickets(
          numberOfTicketsToCreateInitially,
          testTicketDetails
        );
        customerTicketing.verifyPaginationDoesNotExist();
        customerTicketing.createMultipleTickets(
          numberOfTicketsToCreateForOnePagination,
          testTicketDetails
        );
        customerTicketing.verifyPaginationExist();
        let totalNumberOfTicketsCreated =
          numberOfTicketsToCreateInitially +
          numberOfTicketsToCreateForOnePagination;
        customerTicketing.verifyNumberOfPagesBasedOnTotalNumberOfTickets(
          totalNumberOfTicketsCreated
        );

        customerTicketing.createMultipleTickets(
          numberOfTicketsToCreateForMultipagePagination,
          testTicketDetails
        );
        totalNumberOfTicketsCreated +=
          numberOfTicketsToCreateForMultipagePagination;
        customerTicketing.verifyNumberOfPagesBasedOnTotalNumberOfTickets(
          totalNumberOfTicketsCreated
        );
      });

      it('should sort ticket listing', () => {
        const firstTicket: TestTicketDetails = {
          subject: 'first ticket',
          message: 'first ticket',
          category: TestCategory.complaint,
        };

        const secondTicket: TestTicketDetails = {
          subject: 'secondoo',
          message: 'no uno',
          category: TestCategory.complaint,
        };

        customerTicketing.loginRegisteredUser();
        customerTicketing.visitElectronicTicketListingPage();
        customerTicketing.createTicket(firstTicket);
        customerTicketing.createTicket(secondTicket);
        customerTicketing.openTicketOnSepcifiedRowNumber(2);
        cy.wait(1000);
        customerTicketing.sendMessage('hello, world');
        cy.go('back');
        customerTicketing.selectSortBy(customerTicketing.TestSortingTypes.id);
        customerTicketing.verifyCertainNumberOfTicketsSortedById(2);
        customerTicketing.selectSortBy(
          customerTicketing.TestSortingTypes.changedOn
        );
        customerTicketing.verifyCreatedTicketDetails(firstTicket);
      });

      it('should put the ticket on top when Changed On is selected as the sort', () => {
        const otherTickets: TestTicketDetails = {
          subject: 'Creating tickets for pagination ',
          message: 'Creating tickets for pagination ',
          category: TestCategory.complaint,
        };

        const ticketToSort: TestTicketDetails = {
          subject: 'This will go from bottom of the list to the top ',
          message: 'This will go from bottom of the list to the top ',
          category: TestCategory.complaint,
        };

        const numberOfOtherTickets = 2;

        customerTicketing.loginRegisteredUser();
        customerTicketing.visitElectronicTicketListingPage();
        customerTicketing.createTicket(ticketToSort);
        customerTicketing.verifyCreatedTicketDetails(ticketToSort);
        customerTicketing.createMultipleTickets(
          numberOfOtherTickets,
          otherTickets
        );
        customerTicketing.openTicketOnSepcifiedRowNumber(
          numberOfOtherTickets + 1
        );
        customerTicketing.sendMessage('adding to top');
        cy.go('back');
        customerTicketing.verifyCreatedTicketDetails(ticketToSort);
      });

      it('numbers on pagination should take you to the corresponding page', () => {
        customerTicketing.loginAsAdminLindaWolf();
        customerTicketing.visitElectronicTicketListingPage();
        customerTicketing.verifyPaginationExist();
        customerTicketing.selectSortBy(customerTicketing.TestSortingTypes.id);
        customerTicketing.verifyTicketIdIsSmallerInNextPageComparedToPreviousPageByComparingIds();
      });
    });
  });
});
