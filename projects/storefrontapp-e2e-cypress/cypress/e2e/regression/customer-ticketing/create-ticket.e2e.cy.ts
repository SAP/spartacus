/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as customerTicketing from '../../../helpers/customer-ticketing/customer-ticketing';

describe('Ticketing', () => {
  context('Registered User', () => {
    before(() => {
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
    });

    //refactored within CXSPA-9749
    //includes the original tests 1, 2, 7 and 11
    it('should be able to open the form and create ticket when filling the form properly (CXSPA-470)', () => {
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

      cy.log('DO NOT CREATE A TICKET IF FORM NOT PROPERLY COMPLETED:');
      customerTicketing.clickSubmit();
      customerTicketing.verifyFieldValidationErrorShown();

      cy.log(
        'CREATE A TICKET ONCE FORM PROPERLY COMPLETED, VERIFY FORM CLOSE AND CREATION MESSAGE:'
      );
      customerTicketing.fillTicketDetails(testTicketDetails);
      customerTicketing.clickSubmit();
      customerTicketing.verifyCreateTicketPopupIsClosed();
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
      customerTicketing.addFileSelect(testTicketDetails.filename);
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
      customerTicketing.addFileSelect(testTicketDetails.filename);
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
      customerTicketing.addFileSelect(testTicketDetails.filename);
      customerTicketing.clickSubmit();
      customerTicketing.verifyTicketDoesNotExist(testTicketDetails);
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

    it('should not let subject exceed 255 character limit and message exceed 5000 character limit (CXSPA-470)', () => {
      const TICKET_SUBJECT_MAX_LENGTH = 255;
      const TICKET_MESSAGE_MAX_LENGTH = 5000;
      const testTicketDetails: customerTicketing.TestTicketDetails = {
        subject: customerTicketing.generateDummyStringOfLength(
          TICKET_SUBJECT_MAX_LENGTH + 1
        ),
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
