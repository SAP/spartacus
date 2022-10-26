import { viewportContext } from "../../../helpers/viewport-context";
import { loginRegisteredUser } from "../../../helpers/cart";
import * as customerTicketing from '../../../helpers/customer-ticketing/cutsomer-ticketing';
import {TestTicketDetails, TestCategory} from '../../../helpers/customer-ticketing/cutsomer-ticketing';



describe('ticketing', () => {
  viewportContext(['desktop', 'mobile'], () => {
    context('Registered User', () => {
      before(() => {
        cy.window().then((win) => {
          win.sessionStorage.clear();
        });
      });
      it('should be able to create ticket when filling the required form', () => {
        const testTicketDetails: TestTicketDetails = {
          subject: 'Entering a subject',
          message: 'Typing a message',
          category: TestCategory.complaint,
        };

        loginRegisteredUser();
        customerTicketing.visitElectronicSupportTicketPage();
        customerTicketing.openCreateTicketModal();
        customerTicketing.fillTicketDetails(testTicketDetails);
        customerTicketing.clickSubmitAndVerifyRequestCompleted();
        customerTicketing.verifyCreatedTicketDetails(testTicketDetails);

      });

      it('should be able to create a ticket with an attachment', () => {
        const testTicketDetails: TestTicketDetails = {
          subject: 'Testing uploading attachment',
          message: 'Has the file been uploaded',
          category: TestCategory.complaint,
          filename: 'test.docx',
        };
        loginRegisteredUser();
        customerTicketing.visitElectronicSupportTicketPage();
        customerTicketing.openCreateTicketModal();
        customerTicketing.fillTicketDetails(testTicketDetails);
        customerTicketing.addFile(testTicketDetails.filename);
        customerTicketing.clickSubmitAndVerifyRequestCompleted();
        customerTicketing.verifyCreatedTicketDetails(testTicketDetails);
        customerTicketing.verifyFileAttachedToMessage(testTicketDetails.filename);
      });

      it('should not be able to create a ticket with an attachment larger than 10mb', () => {
        const testTicketDetails: TestTicketDetails = {
          subject: 'Testing uploading attachment',
          message: 'Has the file been uploaded',
          category: TestCategory.complaint,
          filename: 'largeFile.txt',
        };
        loginRegisteredUser();
        customerTicketing.visitElectronicSupportTicketPage();
        customerTicketing.openCreateTicketModal();
        customerTicketing.fillTicketDetails(testTicketDetails);
        customerTicketing.addFile(testTicketDetails.filename);
        customerTicketing.clickSubmit();
        customerTicketing.verifyTicketDoesNotExist();
      });

      it('should not be able to create a ticket with an attachment that has an unsupported extension', () => {
        const testTicketDetails: TestTicketDetails = {
          subject: 'Testing uploading attachment',
          message: 'Has the file been uploaded',
          category: TestCategory.complaint,
          filename: 'fileNotSupported.xls',
        };
        loginRegisteredUser();
        customerTicketing.visitElectronicSupportTicketPage();
        customerTicketing.openCreateTicketModal();
        customerTicketing.fillTicketDetails(testTicketDetails);
        customerTicketing.addFile(testTicketDetails.filename);
        customerTicketing.clickSubmit();
        customerTicketing.verifyTicketDoesNotExist(); // TODO check if any error is shown
      });

      it('should not be able to create a ticket with an empty attachment', () => {
        const testTicketDetails: TestTicketDetails = {
          subject: 'Testing uploading attachment',
          message: 'Has the file been uploaded',
          category: TestCategory.complaint,
          filename: 'emptyFile.txt',
        };
        loginRegisteredUser();
        customerTicketing.visitElectronicSupportTicketPage();
        customerTicketing.openCreateTicketModal();
        customerTicketing.fillTicketDetails(testTicketDetails);
        customerTicketing.addFile(testTicketDetails.filename);
         // TODO throws exception that isn't caught and handled
      });

      it('should not be able to see created ticket in other stores', () => {
        const testTicketDetails: TestTicketDetails = {
          subject: 'Entering a subject',
          message: 'Typing a message',
          category: TestCategory.complaint,
        };
        loginRegisteredUser();
        customerTicketing.visitElectronicSupportTicketPage();
        customerTicketing.openCreateTicketModal();
        customerTicketing.fillTicketDetails(testTicketDetails);
        customerTicketing.clickSubmitAndVerifyRequestCompleted();
        customerTicketing.verifyCreatedTicketDetails(testTicketDetails);
        customerTicketing.visitApparelUKSupportPage();
        customerTicketing.verifyTicketDoesNotExist();
      });

      it('should not allow ticket to be created if form not properly completed', () => {
        loginRegisteredUser();
        customerTicketing.visitElectronicSupportTicketPage();
        customerTicketing.openCreateTicketModal();
        customerTicketing.clickSubmit();
        customerTicketing.isFieldValidationErrorShown();
      });

      it('should not create tickets when cancelling or closing the modal', () => {
        const testTicketDetails: TestTicketDetails = {
          subject: 'Cancelling a ticketing creating',
          message: 'Cancelled',
          category: TestCategory.complaint,
        }
        loginRegisteredUser();
        customerTicketing.visitElectronicSupportTicketPage();
        customerTicketing.openCreateTicketModal();
        customerTicketing.fillTicketDetails(testTicketDetails);
        customerTicketing.clickCancel();
        customerTicketing.verifyTicketDoesNotExist();
        customerTicketing.openCreateTicketModal();
        customerTicketing.fillTicketDetails(testTicketDetails);
        customerTicketing.clickClose();
        customerTicketing.verifyTicketDoesNotExist();
      });

    });
  });
});
