import { viewportContext } from "../../../helpers/viewport-context";
import * as customerTicketing from '../../../helpers/customer-ticketing/customer-ticketing';

const NOT_EXISTENT_TICKET_ID = 'XYZ01234';

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
        createTestTicket();
        customerTicketing.clickMyAccountMenuOption();
        customerTicketing.clickCustomerSupportMenuOption();
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.clickFirstTicketFromTicketListing();
        customerTicketing.verifyTicketDetailsPageVisit();
      });
      it('should be able to visit ticket details page for an existing ticket via url', () => {
        createTestTicket();
        customerTicketing.clickMyAccountMenuOption();
        customerTicketing.clickCustomerSupportMenuOption();
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.visitTicketDetailsPageForFirstTicket();
      });
      it('should throw 404 error when trying to visit ticket details page for a non-existing ticket id via url', () => {
        createTestTicket();
        customerTicketing.clickMyAccountMenuOption();
        customerTicketing.clickCustomerSupportMenuOption();
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.visitTicketDetailsPageForNonExistentTicket(NOT_EXISTENT_TICKET_ID);
      });
    });
  });
});
