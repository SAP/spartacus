/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpResponseStatus,
  RoutingService,
} from '@spartacus/core';
import { OpfPaymentError, PaymentErrorType } from '../../root/model';
import { OpfPaymentErrorHandlerService } from './opf-payment-error-handler.service';

describe('OpfPaymentErrorHandlerService', () => {
  let service: OpfPaymentErrorHandlerService;

  const mockGlobalMessageService = {
    add: jasmine.createSpy('add'),
  };

  const mockRoutingService = {
    go: jasmine.createSpy('go'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfPaymentErrorHandlerService,
        { provide: GlobalMessageService, useValue: mockGlobalMessageService },
        { provide: RoutingService, useValue: mockRoutingService },
      ],
    });
    service = TestBed.inject(OpfPaymentErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('displayError', () => {
    it('should add error message to global message service', () => {
      const error: OpfPaymentError = {
        type: 'type',
        message: 'Test error message',
      };
      service['displayError'](error);
      expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
        { key: error.message },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });

  describe('handlePaymentError', () => {
    it('should handle payment bad request error', () => {
      const error: OpfPaymentError = {
        type: PaymentErrorType.INVALID_CVV,
        message: 'Test error message',
        status: HttpResponseStatus.BAD_REQUEST,
      };
      service.handlePaymentError(error);
      expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
        { key: 'opf.payment.errors.invalidCreditCard' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });

    it('should handle payment cancelled error', () => {
      const error: OpfPaymentError = {
        type: PaymentErrorType.PAYMENT_CANCELLED,
        message: 'Test error message',
      };

      service.handlePaymentError(error);
      expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
        { key: 'opf.payment.errors.cancelPayment' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });

    it('should handle other payment errors with returnPath', () => {
      const error: OpfPaymentError = {
        type: 'type',
        message: 'Test error message',
      };
      const returnPath = 'checkout';
      service.handlePaymentError(error, returnPath);
      expect(mockGlobalMessageService.add).toHaveBeenCalled();
      expect(mockRoutingService.go).toHaveBeenCalledWith({
        cxRoute: returnPath,
      });
    });
  });

  describe('handleBadRequestError', () => {
    it('should handle INSUFFICENT_FUNDS error type', () => {
      const errorType = PaymentErrorType.INSUFFICENT_FUNDS;

      const message = service['handleBadRequestError'](errorType);

      expect(message).toBe('opf.payment.errors.insufficientFunds');
    });

    it('should handle INVALID_CARD error type', () => {
      const errorType = PaymentErrorType.INVALID_CARD;

      const message = service['handleBadRequestError'](errorType);

      expect(message).toBe('opf.payment.errors.invalidCreditCard');
    });

    it('should handle LOST_CARD error type', () => {
      const errorType = PaymentErrorType.LOST_CARD;

      const message = service['handleBadRequestError'](errorType);

      expect(message).toBe('opf.payment.errors.cardReportedLost');
    });

    it('should handle EXPIRED error type', () => {
      const errorType = PaymentErrorType.EXPIRED;

      const message = service['handleBadRequestError'](errorType);

      expect(message).toBe('opf.payment.errors.cardExpired');
    });

    it('should handle INVALID_CVV error type', () => {
      const errorType = PaymentErrorType.INVALID_CVV;

      const message = service['handleBadRequestError'](errorType);

      expect(message).toBe('opf.payment.errors.invalidCreditCard');
    });

    it('should handle CREDIT_LIMIT error type', () => {
      const errorType = PaymentErrorType.CREDIT_LIMIT;

      const message = service['handleBadRequestError'](errorType);

      expect(message).toBe('opf.payment.errors.insufficientFunds');
    });
  });
});
