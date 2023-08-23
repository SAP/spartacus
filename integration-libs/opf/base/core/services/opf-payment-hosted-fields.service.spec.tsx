/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  GlobalMessageService,
  RoutingService,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { of } from 'rxjs';
import { OpfOrderFacade, OpfOtpFacade } from '../../root/facade';
import {
  PaymentErrorType,
  PaymentMethod,
  SubmitCompleteInput,
  SubmitInput,
  SubmitResponse,
  SubmitStatus,
} from '../../root/model';
import { OpfPaymentConnector } from '../connectors';
import { OpfPaymentErrorHandlerService } from './opf-payment-error-handler.service';
import { OpfPaymentHostedFieldsService } from './opf-payment-hosted-fields.service';

describe('OpfPaymentHostedFieldsService', () => {
  let service: OpfPaymentHostedFieldsService;
  let routingService: RoutingService;
  let opfOrderFacade: OpfOrderFacade;
  let opfPaymentErrorHandlerService: OpfPaymentErrorHandlerService;

  const mockOpfPaymentConnector = {
    submitPayment: jasmine.createSpy('submitPayment'),
    submitCompletePayment: jasmine.createSpy('submitCompletePayment'),
  };

  const mockOpfOtpFacade = {
    generateOtpKey: jasmine
      .createSpy('generateOtpKey')
      .and.returnValue(of({ value: 'mockOtpKey' })),
  };

  const mockActiveCartFacade = {
    getActiveCartId: jasmine
      .createSpy('getActiveCartId')
      .and.returnValue(of('mockActiveCartId')),
  };

  const mockUserIdService = {
    getUserId: jasmine.createSpy('getUserId').and.returnValue(of('mockUserId')),
  };

  const mockRoutingService = {
    go: jasmine.createSpy('go'),
  };

  const mockOpfOrderFacade = {
    placeOpfOrder: jasmine
      .createSpy('placeOpfOrder')
      .and.returnValue(of({ id: 'testOrder' } as Order)),
  };

  const mockGlobalMessageService = {
    add: jasmine.createSpy('add'),
  };

  const mockOpfPaymentErrorHandlerService = {
    handlePaymentError: jasmine.createSpy('handlePaymentError'),
  };

  const mockInput: SubmitInput = {
    paymentMethod: PaymentMethod.CREDIT_CARD,
    cartId: 'mockCartId',
    additionalData: [{ key: 'key', value: 'value' }],
    paymentSessionId: 'sessionId',
    returnPath: ['checkout', 'payment'],
    callbackArray: [() => {}, () => {}, () => {}],
  };

  const mockSubmitCompleteInput: SubmitCompleteInput = {
    cartId: 'mockCartId',
    additionalData: [{ key: 'key', value: 'value' }],
    paymentSessionId: 'sessionId',
    returnPath: ['checkout', 'payment'],
    callbackArray: [() => {}, () => {}, () => {}],
  };

  const mockSubmitResponse = {
    status: SubmitStatus.ACCEPTED,
    cartId: 'cartId',
    reasonCode: 'code',
    paymentMethod: PaymentMethod.CREDIT_CARD,
    authorizedAmount: 10,
    customFields: [{ key: 'key', value: 'value' }],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfPaymentHostedFieldsService,
        WindowRef,
        { provide: OpfPaymentConnector, useValue: mockOpfPaymentConnector },
        { provide: OpfOtpFacade, useValue: mockOpfOtpFacade },
        { provide: ActiveCartFacade, useValue: mockActiveCartFacade },
        { provide: UserIdService, useValue: mockUserIdService },
        { provide: RoutingService, useValue: mockRoutingService },
        { provide: OpfOrderFacade, useValue: mockOpfOrderFacade },
        { provide: GlobalMessageService, useValue: mockGlobalMessageService },
        {
          provide: OpfPaymentErrorHandlerService,
          useValue: mockOpfPaymentErrorHandlerService,
        },
      ],
    });

    service = TestBed.inject(OpfPaymentHostedFieldsService);
    routingService = TestBed.inject(RoutingService);
    opfOrderFacade = TestBed.inject(OpfOrderFacade);
    opfPaymentErrorHandlerService = TestBed.inject(
      OpfPaymentErrorHandlerService
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('submitPayment', () => {
    it('should submit payment and handle success', (done) => {
      mockUserIdService.getUserId.and.returnValue(of('mockUserId'));
      mockActiveCartFacade.getActiveCartId.and.returnValue(
        of('mockActiveCartId')
      );
      mockOpfPaymentConnector.submitPayment.and.returnValue(
        of({ status: SubmitStatus.ACCEPTED })
      );

      service.submitPayment(mockInput).subscribe((result) => {
        expect(result).toBeTruthy();
        expect(mockOpfPaymentConnector.submitPayment).toHaveBeenCalled();
        expect(opfOrderFacade.placeOpfOrder).toHaveBeenCalled();
        expect(routingService.go).toHaveBeenCalledWith({
          cxRoute: 'orderConfirmation',
        });
        done();
      });
    });
    it('should handle rejected payment', (done) => {
      const res: Partial<SubmitResponse> = {
        status: SubmitStatus.REJECTED,
      };
      mockOpfPaymentConnector.submitPayment.and.returnValue(of(res));

      service.submitPayment(mockInput).subscribe({
        error: (error) => {
          expect(error.type).toBe(PaymentErrorType.PAYMENT_REJECTED);
          expect(mockOpfPaymentConnector.submitPayment).toHaveBeenCalled();
          expect(
            opfPaymentErrorHandlerService.handlePaymentError
          ).toHaveBeenCalled();
          done();
        },
      });
    });
  });

  describe('submitCompletePayment', () => {
    it('should submit complete payment and handle success', (done) => {
      mockUserIdService.getUserId.and.returnValue(of('mockUserId'));
      mockActiveCartFacade.getActiveCartId.and.returnValue(
        of('mockActiveCartId')
      );
      mockOpfPaymentConnector.submitCompletePayment.and.returnValue(
        of({ status: SubmitStatus.ACCEPTED })
      );

      service
        .submitCompletePayment(mockSubmitCompleteInput)
        .subscribe((result) => {
          expect(result).toBeTruthy();
          expect(
            mockOpfPaymentConnector.submitCompletePayment
          ).toHaveBeenCalled();
          expect(opfOrderFacade.placeOpfOrder).toHaveBeenCalled();
          expect(routingService.go).toHaveBeenCalledWith({
            cxRoute: 'orderConfirmation',
          });
          done();
        });
    });

    it('should handle rejected complete payment', (done) => {
      const res: Partial<SubmitResponse> = {
        status: SubmitStatus.REJECTED,
      };

      mockOpfPaymentConnector.submitCompletePayment.and.returnValue(of(res));

      service.submitCompletePayment(mockSubmitCompleteInput).subscribe({
        error: (error) => {
          expect(error.type).toBe(PaymentErrorType.PAYMENT_REJECTED);
          expect(
            mockOpfPaymentConnector.submitCompletePayment
          ).toHaveBeenCalled();
          expect(
            opfPaymentErrorHandlerService.handlePaymentError
          ).toHaveBeenCalled();
          done();
        },
      });
    });
  });

  describe('paymentResponseHandler', () => {
    const mockSubmitSuccess = jasmine
      .createSpy('mockSubmitSuccess')
      .and.returnValue(() => {});
    const mockSubmitPending = jasmine
      .createSpy('mockSubmitPending')
      .and.returnValue(() => {});
    const mockSubmitFailure = jasmine
      .createSpy('mockSubmitFailure')
      .and.returnValue(() => {});

    it('should handle accepted payment response', fakeAsync(() => {
      const response: SubmitResponse = {
        ...mockSubmitResponse,
        status: SubmitStatus.ACCEPTED,
      };

      spyOn(service as any, 'paymentResponseHandler').and.callThrough();

      service['paymentResponseHandler'](response, [
        mockSubmitSuccess,
        mockSubmitPending,
        mockSubmitFailure,
      ]).subscribe((result) => {
        expect(result).toBeTruthy();
        expect(mockSubmitSuccess).toHaveBeenCalled();
        expect(opfOrderFacade.placeOpfOrder).toHaveBeenCalled();
        flush();
      });
    }));

    it('should handle delayed payment response', fakeAsync(() => {
      const response: SubmitResponse = {
        ...mockSubmitResponse,
        status: SubmitStatus.DELAYED,
      };
      spyOn(service as any, 'paymentResponseHandler').and.callThrough();

      service['paymentResponseHandler'](response, [
        mockSubmitSuccess,
        mockSubmitPending,
        mockSubmitFailure,
      ]).subscribe((result) => {
        expect(result).toBeTruthy();
        expect(mockSubmitSuccess).toHaveBeenCalled();
        expect(opfOrderFacade.placeOpfOrder).toHaveBeenCalled();
        flush();
      });
    }));

    it('should handle pending payment response', fakeAsync(() => {
      const response: SubmitResponse = {
        ...mockSubmitResponse,
        status: SubmitStatus.PENDING,
      };
      spyOn(service as any, 'paymentResponseHandler').and.callThrough();

      let result;

      service['paymentResponseHandler'](response, [
        mockSubmitSuccess,
        mockSubmitPending,
        mockSubmitFailure,
      ]).subscribe((res) => {
        result = res;
      });

      expect(result).toBeUndefined();
      expect(mockSubmitPending).toHaveBeenCalled();
      flush();
    }));

    it('should handle rejected payment response', fakeAsync(() => {
      const response: SubmitResponse = {
        ...mockSubmitResponse,
        status: SubmitStatus.REJECTED,
      };
      spyOn(service as any, 'paymentResponseHandler').and.callThrough();

      service['paymentResponseHandler'](response, [
        mockSubmitSuccess,
        mockSubmitPending,
        mockSubmitFailure,
      ]).subscribe({
        error: (error) => {
          expect(error.type).toBe(PaymentErrorType.PAYMENT_REJECTED);
          expect(mockSubmitFailure).toHaveBeenCalled();
          flush();
        },
      });
    }));

    it('should handle unrecognized payment response status', fakeAsync(() => {
      const response: SubmitResponse = {
        ...mockSubmitResponse,
        status: 'UNKNOWN_STATUS' as SubmitStatus,
      };
      spyOn(service as any, 'paymentResponseHandler').and.callThrough();

      service['paymentResponseHandler'](response, [
        mockSubmitSuccess,
        mockSubmitPending,
        mockSubmitFailure,
      ]).subscribe({
        error: (error) => {
          expect(error.type).toBe(PaymentErrorType.STATUS_NOT_RECOGNIZED);
          expect(mockSubmitFailure).toHaveBeenCalled();
          flush();
        },
      });
    }));
  });
});
