/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as customerTicketing from '../../../helpers/customer-ticketing/customer-ticketing';

describe('ticketing', () => {
  context('Registered User', () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
    });

    it('should open create new ticket popup when clicking add button (CXSPA-470)', () => {
      customerTicketing.loginRegisteredUser();
      customerTicketing.visitElectronicTicketListingPage();
      customerTicketing.openCreateTicketPopup();
    });

    it('should be able to create ticket when filling the required form (CXSPA-470)', () => {
      const testTicketDetails: customerTicketing.TestTicketDetails = {
        subject: 'Entering a subject',
        message: 'Typing a message',
        ticketCategory: {
          id: customerTicketing.TestCategory.complaint.toUpperCase(),
          name: customerTicketing.TestCategory.complaint,
        },
      };

      customerTicketing.loginRegisteredUser();
      customerTicketing.visitElectronicTicketListingPage();
      customerTicketing.openCreateTicketPopup();
      customerTicketing.fillTicketDetails(testTicketDetails);
      customerTicketing.clickSubmit();
      customerTicketing.verifyGlobalMessage();
      customerTicketing.verifyCreatedTicketDetails(testTicketDetails);
    });

    it('should be able to create a ticket with an attachment (CXSPA-470)', () => {
      const testTicketDetails: customerTicketing.TestTicketDetails = {
        subject: 'Testing uploading attachment',
        message: 'Has the file been uploaded',
        ticketCategory: {
          id: customerTicketing.TestCategory.complaint.toUpperCase(),
          name: customerTicketing.TestCategory.complaint,
        },
        filename: 'test.docx',
      };
      customerTicketing.loginRegisteredUser();
      customerTicketing.visitElectronicTicketListingPage();
      customerTicketing.openCreateTicketPopup();
      customerTicketing.fillTicketDetails(testTicketDetails);
      customerTicketing.addFile(testTicketDetails.filename);
      customerTicketing.clickSubmit();
      customerTicketing.verifyGlobalMessage();
      customerTicketing.verifyCreatedTicketDetails(testTicketDetails);
      customerTicketing.verifyFileAttachedToMessage(testTicketDetails.filename);
    });

    it('should not be able to create a ticket with an attachment larger than 10mb (CXSPA-470)', () => {
      const testTicketDetails: customerTicketing.TestTicketDetails = {
        subject: 'Testing uploading attachment',
        message: 'Has the file been uploaded',
        ticketCategory: {
          id: customerTicketing.TestCategory.complaint.toUpperCase(),
          name: customerTicketing.TestCategory.complaint,
        },
        filename: 'largeFile.txt',
      };
      customerTicketing.loginRegisteredUser();
      customerTicketing.visitElectronicTicketListingPage();
      customerTicketing.openCreateTicketPopup();
      customerTicketing.fillTicketDetails(testTicketDetails);
      customerTicketing.addFile(testTicketDetails.filename);
      customerTicketing.clickSubmit();
      customerTicketing.verifyTicketDoesNotExist(testTicketDetails);
    });

    it('should not be able to create a ticket with an attachment that has an unsupported extension (CXSPA-470)', () => {
      const testTicketDetails: customerTicketing.TestTicketDetails = {
        subject: 'Testing uploading attachment',
        message: 'Has the file been uploaded',
        ticketCategory: {
          id: customerTicketing.TestCategory.complaint.toUpperCase(),
          name: customerTicketing.TestCategory.complaint,
        },
        filename: 'fileNotSupported.xls',
      };
      customerTicketing.loginRegisteredUser();
      customerTicketing.visitElectronicTicketListingPage();
      customerTicketing.openCreateTicketPopup();
      customerTicketing.fillTicketDetails(testTicketDetails);
      customerTicketing.addFile(testTicketDetails.filename);
      customerTicketing.clickSubmit();
      customerTicketing.verifyTicketDoesNotExist(testTicketDetails);
    });

    it('should be able to create a ticket with an empty attachment (CXSPA-470)', () => {
      const testTicketDetails: customerTicketing.TestTicketDetails = {
        subject: 'Testing uploading attachment',
        message: 'Has the file been uploaded',
        ticketCategory: {
          id: customerTicketing.TestCategory.complaint.toUpperCase(),
          name: customerTicketing.TestCategory.complaint,
        },
        filename: 'emptyFile.doc',
      };
      customerTicketing.loginRegisteredUser();
      customerTicketing.visitElectronicTicketListingPage();
      customerTicketing.openCreateTicketPopup();
      customerTicketing.fillTicketDetails(testTicketDetails);
      customerTicketing.addFile(testTicketDetails.filename);
      customerTicketing.clickSubmit();
      customerTicketing.verifyGlobalMessage();
      customerTicketing.verifyCreatedTicketDetails(testTicketDetails);
      customerTicketing.verifyFileAttachedToMessage(testTicketDetails.filename);
    });

    it('should not allow ticket to be created if form not properly completed (CXSPA-470)', () => {
      customerTicketing.loginRegisteredUser();
      customerTicketing.visitElectronicTicketListingPage();
      customerTicketing.openCreateTicketPopup();
      customerTicketing.clickSubmit();
      customerTicketing.verifyFieldValidationErrorShown();
    });

    it('should not create tickets when cancelling or closing the modal (CXSPA-470)', () => {
      const testTicketDetails: customerTicketing.TestTicketDetails = {
        subject: 'Cancelling a ticketing creation',
        message: 'Cancelled',
        ticketCategory: {
          id: customerTicketing.TestCategory.complaint.toUpperCase(),
          name: customerTicketing.TestCategory.complaint,
        },
      };
      customerTicketing.loginRegisteredUser();
      customerTicketing.visitElectronicTicketListingPage();
      customerTicketing.openCreateTicketPopup();
      customerTicketing.fillTicketDetails(testTicketDetails);
      customerTicketing.clickCancel();
      customerTicketing.verifyTicketDoesNotExist(testTicketDetails);
      customerTicketing.openCreateTicketPopup();
      customerTicketing.fillTicketDetails(testTicketDetails);
      customerTicketing.clickClose();
      customerTicketing.verifyTicketDoesNotExist(testTicketDetails);
    });

    it('should not let subject exceeds 255 character limit (CXSPA-470)', () => {
      const TICKET_SUBJECT_MAX_LENGTH = 255;
      const testTicketDetails: customerTicketing.TestTicketDetails = {
        subject: customerTicketing.generateDummyStringOfLength(
          TICKET_SUBJECT_MAX_LENGTH + 1
        ),
        message: 'Exceeding character limit',
        ticketCategory: {
          id: customerTicketing.TestCategory.complaint.toUpperCase(),
          name: customerTicketing.TestCategory.complaint,
        },
      };
      customerTicketing.loginRegisteredUser();
      customerTicketing.visitElectronicTicketListingPage();
      customerTicketing.openCreateTicketPopup();
      customerTicketing.fillTicketDetails(testTicketDetails);
      customerTicketing.clickSubmit();
      customerTicketing.verifyTicketSubjectAndMessageDoNotExceedCharacterLimit();
    });

    it('should not let message exceeds 5000 character limit (CXSPA-470)', () => {
      const TICKET_MESSAGE_MAX_LENGTH = 5000;
      const testTicketDetails: customerTicketing.TestTicketDetails = {
        subject: 'Exceeding character limit',
        message: customerTicketing.generateDummyStringOfLength(
          TICKET_MESSAGE_MAX_LENGTH + 1
        ),
        ticketCategory: {
          id: customerTicketing.TestCategory.complaint.toUpperCase(),
          name: customerTicketing.TestCategory.complaint,
        },
      };
      customerTicketing.loginRegisteredUser();
      customerTicketing.visitElectronicTicketListingPage();
      customerTicketing.openCreateTicketPopup();
      customerTicketing.fillTicketDetails(testTicketDetails);
      customerTicketing.clickSubmit();
      customerTicketing.verifyTicketSubjectAndMessageDoNotExceedCharacterLimit();
    });

    it('should close create ticket popup upon submit (CXSPA-470)', () => {
      const testTicketDetails: customerTicketing.TestTicketDetails = {
        subject: 'Entering a subject',
        message: 'Typing a message',
        ticketCategory: {
          id: customerTicketing.TestCategory.complaint.toUpperCase(),
          name: customerTicketing.TestCategory.complaint,
        },
      };

      customerTicketing.loginRegisteredUser();
      customerTicketing.visitElectronicTicketListingPage();
      customerTicketing.openCreateTicketPopup();
      customerTicketing.fillTicketDetails(testTicketDetails);
      customerTicketing.clickSubmit();
      customerTicketing.verifyCreateTicketPopupIsClosed();
    });

    it('should not be able to see created ticket in other stores (CXSPA-470)', () => {
      const testTicketDetails: customerTicketing.TestTicketDetails = {
        subject: 'Entering a subject',
        message: 'Typing a message',
        ticketCategory: {
          id: customerTicketing.TestCategory.complaint.toUpperCase(),
          name: customerTicketing.TestCategory.complaint,
        },
      };
      customerTicketing.loginRegisteredUser();
      customerTicketing.visitElectronicTicketListingPage();
      customerTicketing.openCreateTicketPopup();
      customerTicketing.fillTicketDetails(testTicketDetails);
      customerTicketing.clickSubmit();
      customerTicketing.verifyGlobalMessage();
      customerTicketing.verifyCreatedTicketDetails(testTicketDetails);
      customerTicketing.visitApparelUKTicketListingPage();
      customerTicketing.verifyTicketDoesNotExist(testTicketDetails);
    });
  });
});
