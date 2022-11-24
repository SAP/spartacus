import { viewportContext } from '../../../helpers/viewport-context';
import * as customerTicketing from '../../../helpers/customer-ticketing/customer-ticketing';
import {
  FIRST_ROW_TICKET_LIST,
  TestCategory,
  TestTicketDetails
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

      it('should be able to view ticket details page for an existing ticket', () => {
        const testTicketDetails: TestTicketDetails = {
          subject: 'A test subject',
          message: 'A test message',
          category: TestCategory.complaint,
        };
        customerTicketing.createTicket(testTicketDetails);
        customerTicketing.clickMyAccountMenuOption();
        customerTicketing.clickCustomerSupportMenuOption();
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.clickTicketInRow(FIRST_ROW_TICKET_LIST);
        customerTicketing.verifyTicketDetailsPageVisit();
      });
      it('should be able to visit ticket details page for an existing ticket via url', () => {
        const testTicketDetails: TestTicketDetails = {
          subject: 'A test subject',
          message: 'A test message',
          category: TestCategory.complaint,
        };
        customerTicketing.createTicket(testTicketDetails);
        customerTicketing.clickMyAccountMenuOption();
        customerTicketing.clickCustomerSupportMenuOption();
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.clickTicketInRow(FIRST_ROW_TICKET_LIST);
      });
      it('should throw 404 error when trying to visit ticket details page for a non-existing ticket id via url', () => {
        customerTicketing.loginRegisteredUser();
        customerTicketing.visitTicketDetailsPageForNonExistingTicket();
      });
    });
  });
});
