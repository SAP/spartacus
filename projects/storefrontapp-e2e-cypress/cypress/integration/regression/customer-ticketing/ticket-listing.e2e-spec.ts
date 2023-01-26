import * as customerTicketing from '../../../helpers/customer-ticketing/customer-ticketing';
import {
  TestTicketDetails,
  TestCategory,
  TestStatus,
  FIRST_ROW_TICKET_LIST,
  SECOND_ROW_TICKET_LIST,
  LAST_PAGE,
} from '../../../helpers/customer-ticketing/customer-ticketing';

describe('ticket listing', () => {
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

    it('should still show the ticket in the list when status is closed', () => {
      const testTicketDetails: TestTicketDetails = {
        subject: 'changing status',
        message: 'status will change',
        category: TestCategory.complaint,
      };

      customerTicketing.loginRegisteredUser();
      customerTicketing.visitElectronicTicketListingPage();
      customerTicketing.createTicket(testTicketDetails);
      customerTicketing.clickTicketInRow(FIRST_ROW_TICKET_LIST);
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
      customerTicketing.clickTicketInRow(FIRST_ROW_TICKET_LIST);
      customerTicketing.closeTicketRequest('thank you');
      customerTicketing.verifyTicketListingPageVisit();
      customerTicketing.clickTicketInRow(FIRST_ROW_TICKET_LIST);
      customerTicketing.reopenTicketRequest('Reopening ticket');
      customerTicketing.navigateBackToPreviousPage();
      customerTicketing.verifyStatusOfTicketInList(
        FIRST_ROW_TICKET_LIST,
        TestStatus.in_process
      );
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
      customerTicketing.openTicketOnSepcifiedRowNumber(SECOND_ROW_TICKET_LIST);
      cy.wait(1000);
      customerTicketing.sendMessage('hello, world');
      cy.go('back');
      customerTicketing.selectSortBy(customerTicketing.TestSortingTypes.byId);
      customerTicketing.verifyCertainNumberOfTicketsSortedById(2);
      customerTicketing.selectSortBy(
        customerTicketing.TestSortingTypes.byChangedOn
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
      customerTicketing.navigateBackToPreviousPage();
      customerTicketing.createMultipleTickets(
        numberOfOtherTickets,
        otherTickets
      );
      customerTicketing.openTicketOnSepcifiedRowNumber(
        numberOfOtherTickets + 1
      );
      customerTicketing.sendMessage('adding to top');
      customerTicketing.navigateBackToPreviousPage();
      customerTicketing.verifyCreatedTicketDetails(ticketToSort);
    });

    it('should take you to the corresponding page when clicking the page number on pagination', () => {
      customerTicketing.loginAsAdmin();
      customerTicketing.visitElectronicTicketListingPage();
      customerTicketing.verifyPaginationExist();
      customerTicketing.selectSortBy(customerTicketing.TestSortingTypes.byId);
      customerTicketing.verifyTicketIdIsSmallerInNextPageComparedToPreviousPageByComparingIds();
    });

    it('should take you to the last page when the last button is clicked on pagination', () => {
      customerTicketing.loginAsAdmin();
      customerTicketing.visitElectronicTicketListingPage();
      customerTicketing.verifyPaginationExist();
      customerTicketing.selectSortBy(customerTicketing.TestSortingTypes.byId);
      customerTicketing.verifyTicketIdIsSmallerInLastPageComparedToFirstPageByComparingIds();
    });

    it('should take you to the first page when the first button is clicked on pagination', () => {
      customerTicketing.loginAsAdmin();
      customerTicketing.visitElectronicTicketListingPage();
      customerTicketing.verifyPaginationExist();
      customerTicketing.selectSortBy(customerTicketing.TestSortingTypes.byId);
      customerTicketing.clickPageOnPagination(LAST_PAGE);
      customerTicketing.verifyTicketIdIsHigherInFirstPageComparedToOtherPageByComparingIds();
    });
  });
});
