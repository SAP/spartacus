import { viewportContext } from "../../../helpers/viewport-context";
import * as customerTicketing from '../../../helpers/customer-ticketing/cutsomer-ticketing';

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
        customerTicketing.openMyAccountDropDown();
        customerTicketing.clickCustomerSupport();
        customerTicketing.verifyCustomerSupportPageVisit();
        customerTicketing.clickFirstTicket();
        customerTicketing.verifyTicketDetailsPageVisit();
      });
    });
  });
});
