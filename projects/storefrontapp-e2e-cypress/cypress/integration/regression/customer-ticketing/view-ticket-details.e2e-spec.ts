import { viewportContext } from "../../../helpers/viewport-context";
import * as customerTicketing from '../../../helpers/customer-ticketing/customer-ticketing';

const FIRST_TICKET_ROW_INDEX = 1;

function createTestTicket() {
  const testTicketDetails: customerTicketing.TestTicketDetails = {
    subject: 'A test subject',
    message: 'A test message',
    category: customerTicketing.TestCategory.complaint,
  };
  customerTicketing.loginRegisteredUser();
  customerTicketing.visitElectronicTicketListingPage();
  customerTicketing.openCreateTicketPopup();
  customerTicketing.fillTicketDetails(testTicketDetails);
  customerTicketing.clickSubmit();
  customerTicketing.verifyCreatedTicketDetails(testTicketDetails);
}

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
        customerTicketing.createTicket({
          subject: 'ticket details',
          message: 'ticket details',
          category: customerTicketing.TestCategory.complaint,
        });
        customerTicketing.clickTicketInRow();
        customerTicketing.verifyTicketDetailsPageVisit();
      });

      it('should be able to view ticket details page for an existing ticket', () => {
        createTestTicket();
        customerTicketing.clickMyAccountMenuOption();
        customerTicketing.clickCustomerSupportMenuOption();
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.clickTicketInRow(FIRST_TICKET_ROW_INDEX);
        customerTicketing.verifyTicketDetailsPageVisit();
      });
      it('should be able to visit ticket details page for an existing ticket via url', () => {
        createTestTicket();
        customerTicketing.clickMyAccountMenuOption();
        customerTicketing.clickCustomerSupportMenuOption();
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.clickTicketInRow(FIRST_TICKET_ROW_INDEX);
      });
      it('should throw 404 error when trying to visit ticket details page for a non-existing ticket id via url', () => {
        customerTicketing.loginRegisteredUser();
        customerTicketing.visitTicketDetailsPageForNonExistingTicket();
      });
    });
  });
});
