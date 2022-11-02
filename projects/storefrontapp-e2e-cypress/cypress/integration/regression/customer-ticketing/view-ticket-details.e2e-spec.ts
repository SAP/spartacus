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
      it('should be able to visit ticket details page for an existing ticket via url', () => {
        customerTicketing.loginRegisteredUser();
        customerTicketing.clickMyAccountMenuOption();
        customerTicketing.clickCustomerSupportMenuOption();
        customerTicketing.verifyTicketListingPageVisit();
        customerTicketing.visitTicketDetailsPageForFirstTicket();
      });
      it('should throw 404 error when trying to visit ticket details page for a non-existing ticket id via url', () => {
        customerTicketing.loginRegisteredUser();
        customerTicketing.clickMyAccountMenuOption();
        customerTicketing.clickCustomerSupportMenuOption();
        customerTicketing.verifyTicketListingPageVisit();
        // Uncomment the following action after 404 error flow is merged on epic
        // customerTicketing.visitTicketDetailsPageForNonExistingTicket();
      });
    });
  });
});
