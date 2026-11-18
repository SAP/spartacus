/*
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { flush, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import {
  ActiveCartFacade,
  CartAccessCodeFacade,
} from '@spartacus/cart/base/root';
import {
  GlobalMessageService,
  RoutingService,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import { Order, OrderFacade } from '@spartacus/order/root';
import { of } from 'rxjs';
import {
  OpfPaymentErrorType,
  OpfPaymentMethod,
  OpfPaymentSubmitCompleteInput,
  OpfPaymentSubmitInput,
  OpfPaymentSubmitResponse,
  OpfPaymentSubmitStatus,
} from '../../root/model';
import { OpfPaymentConnector } from '../connectors';
import { OpfPaymentErrorHandlerService } from './opf-payment-error-handler.service';
import { OpfPaymentHostedFieldsService } from './opf-payment-hosted-fields.service';

describe('OpfPaymentHostedFieldsService', () => {
  let service: OpfPaymentHostedFieldsService;
  let routingService: RoutingService;
  let orderFacade: OrderFacade;
  let opfPaymentErrorHandlerService: OpfPaymentErrorHandlerService;

  const mockOpfPaymentConnector = {
    submitPayment: vi.fn(),
    submitCompletePayment: vi.fn(),
  };

  const mockCartAccessCodeFacade = {
    getCartAccessCode: vi
      .fn()
      .mockReturnValue(of({ accessCode: 'mockAccessCode' })),
  };

  const mockActiveCartFacade = {
    takeActiveCartId: vi.fn().mockReturnValue(of('mockActiveCartId')),
  };

  const mockUserIdService = {
    takeUserId: vi.fn().mockReturnValue(of('mockUserId')),
  };

  const mockRoutingService = {
    go: vi.fn(),
  };

  const mockOrderFacade = {
    placePaymentAuthorizedOrder: vi
      .fn()
      .mockReturnValue(of({ id: 'testOrder' } as Order)),
  };

  const mockGlobalMessageService = {
    add: vi.fn(),
  };

  const mockOpfPaymentErrorHandlerService = {
    handlePaymentError: vi.fn(),
  };

  const mockInput: OpfPaymentSubmitInput = {
    paymentMethod: OpfPaymentMethod.CREDIT_CARD,
    additionalData: [{ key: 'key', value: 'value' }],
    paymentSessionId: 'sessionId',
    returnPath: 'checkout',
    callbacks: {
      onSuccess: () => {},
      onPending: () => {},
      onFailure: () => {},
    },
  };

  const mockSubmitCompleteInput: OpfPaymentSubmitCompleteInput = {
    additionalData: [{ key: 'key', value: 'value' }],
    paymentSessionId: 'sessionId',
    returnPath: 'checkout',
    callbacks: {
      onSuccess: () => {},
      onPending: () => {},
      onFailure: () => {},
    },
  };

  const mockSubmitResponse = {
    status: OpfPaymentSubmitStatus.ACCEPTED,
    cartId: 'cartId',
    reasonCode: 'code',
    paymentMethod: OpfPaymentMethod.CREDIT_CARD,
    authorizedAmount: 10,
    customFields: [{ key: 'key', value: 'value' }],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OpfPaymentHostedFieldsService,
        WindowRef,
        { provide: OpfPaymentConnector, useValue: mockOpfPaymentConnector },
        { provide: CartAccessCodeFacade, useValue: mockCartAccessCodeFacade },
        { provide: ActiveCartFacade, useValue: mockActiveCartFacade },
        { provide: UserIdService, useValue: mockUserIdService },
        { provide: RoutingService, useValue: mockRoutingService },
        { provide: OrderFacade, useValue: mockOrderFacade },
        { provide: GlobalMessageService, useValue: mockGlobalMessageService },
        {
          provide: OpfPaymentErrorHandlerService,
          useValue: mockOpfPaymentErrorHandlerService,
        },
      ],
    });

    service = TestBed.inject(OpfPaymentHostedFieldsService);
    routingService = TestBed.inject(RoutingService);
    orderFacade = TestBed.inject(OrderFacade);
    opfPaymentErrorHandlerService = TestBed.inject(
      OpfPaymentErrorHandlerService
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('submitPayment', () => {
    it('should submit payment and handle success', async () => {
      mockUserIdService.takeUserId.mockReturnValue(of('mockUserId'));
      mockActiveCartFacade.takeActiveCartId.mockReturnValue(
        of('mockActiveCartId')
      );
      mockOpfPaymentConnector.submitPayment.mockReturnValue(
        of({ status: OpfPaymentSubmitStatus.ACCEPTED })
      );

      service.submitPayment(mockInput).subscribe((result) => {
        expect(result).toBeTruthy();
        expect(mockOpfPaymentConnector.submitPayment).toHaveBeenCalled();
        expect(orderFacade.placePaymentAuthorizedOrder).toHaveBeenCalled();
        expect(routingService.go).toHaveBeenCalledWith({
          cxRoute: 'orderConfirmation',
        });
      });
    });

    it('should handle rejected payment', async () => {
      const res: Partial<OpfPaymentSubmitResponse> = {
        status: OpfPaymentSubmitStatus.REJECTED,
      };
      mockOpfPaymentConnector.submitPayment.mockReturnValue(of(res));

      service.submitPayment(mockInput).subscribe({
        error: (error) => {
          expect(error.type).toBe(OpfPaymentErrorType.PAYMENT_REJECTED);
          expect(mockOpfPaymentConnector.submitPayment).toHaveBeenCalled();
          expect(
            opfPaymentErrorHandlerService.handlePaymentError
          ).toHaveBeenCalled();
        },
      });
    });
  });

  describe('submitCompletePayment', () => {
    it('should submit complete payment and handle success', async () => {
      mockUserIdService.takeUserId.mockReturnValue(of('mockUserId'));
      mockActiveCartFacade.takeActiveCartId.mockReturnValue(
        of('mockActiveCartId')
      );
      mockOpfPaymentConnector.submitCompletePayment.mockReturnValue(
        of({ status: OpfPaymentSubmitStatus.ACCEPTED })
      );

      service
        .submitCompletePayment(mockSubmitCompleteInput)
        .subscribe((result) => {
          expect(result).toBeTruthy();
          expect(
            mockOpfPaymentConnector.submitCompletePayment
          ).toHaveBeenCalled();
          expect(orderFacade.placePaymentAuthorizedOrder).toHaveBeenCalled();
          expect(routingService.go).toHaveBeenCalledWith({
            cxRoute: 'orderConfirmation',
          });
        });
    });

    it('should handle rejected complete payment', async () => {
      const res: Partial<OpfPaymentSubmitResponse> = {
        status: OpfPaymentSubmitStatus.REJECTED,
      };

      mockOpfPaymentConnector.submitCompletePayment.mockReturnValue(of(res));

      service.submitCompletePayment(mockSubmitCompleteInput).subscribe({
        error: (error) => {
          expect(error.type).toBe(OpfPaymentErrorType.PAYMENT_REJECTED);
          expect(
            mockOpfPaymentConnector.submitCompletePayment
          ).toHaveBeenCalled();
          expect(
            opfPaymentErrorHandlerService.handlePaymentError
          ).toHaveBeenCalled();
        },
      });
    });
  });

  describe('paymentResponseHandler', () => {
    const mockSubmitSuccess = vi.fn().mockReturnValue(() => {});
    const mockSubmitPending = vi.fn().mockReturnValue(() => {});
    const mockSubmitFailure = vi.fn().mockReturnValue(() => {});

    it('should handle accepted payment response', async () => {
      const response: OpfPaymentSubmitResponse = {
        ...mockSubmitResponse,
        status: OpfPaymentSubmitStatus.ACCEPTED,
      };

      vi.spyOn(service as any, 'paymentResponseHandler');

      service['paymentResponseHandler'](response, {
        onSuccess: mockSubmitSuccess,
        onPending: mockSubmitPending,
        onFailure: mockSubmitFailure,
      }).subscribe((result) => {
        expect(result).toBeTruthy();
        expect(mockSubmitSuccess).toHaveBeenCalled();
        expect(orderFacade.placePaymentAuthorizedOrder).toHaveBeenCalled();
      });
    });

    it('should handle delayed payment response', async () => {
      const response: OpfPaymentSubmitResponse = {
        ...mockSubmitResponse,
        status: OpfPaymentSubmitStatus.DELAYED,
      };
      vi.spyOn(service as any, 'paymentResponseHandler');

      service['paymentResponseHandler'](response, {
        onSuccess: mockSubmitSuccess,
        onPending: mockSubmitPending,
        onFailure: mockSubmitFailure,
      }).subscribe((result) => {
        expect(result).toBeTruthy();
        expect(mockSubmitSuccess).toHaveBeenCalled();
        expect(orderFacade.placePaymentAuthorizedOrder).toHaveBeenCalled();
      });
    });

    it('should pass cartId to placePaymentAuthorizedOrder', async () => {
      const response: OpfPaymentSubmitResponse = {
        ...mockSubmitResponse,
        status: OpfPaymentSubmitStatus.ACCEPTED,
      };

      service['paymentResponseHandler'](
        response,
        {
          onSuccess: mockSubmitSuccess,
          onPending: mockSubmitPending,
          onFailure: mockSubmitFailure,
        },
        'quick-buy-cart-id'
      ).subscribe(() => {
        expect(orderFacade.placePaymentAuthorizedOrder).toHaveBeenCalledWith(
          true,
          'quick-buy-cart-id'
        );
      });
    });

    it('should handle pending payment response', async () => {
      const response: OpfPaymentSubmitResponse = {
        ...mockSubmitResponse,
        status: OpfPaymentSubmitStatus.PENDING,
      };
      vi.spyOn(service as any, 'paymentResponseHandler');

      let result;

      service['paymentResponseHandler'](response, {
        onSuccess: mockSubmitSuccess,
        onPending: mockSubmitPending,
        onFailure: mockSubmitFailure,
      }).subscribe((res) => {
        result = res;
      });

      expect(result).toBeUndefined();
      expect(mockSubmitPending).toHaveBeenCalled();
    });

    it('should handle rejected payment response', async () => {
      const response: OpfPaymentSubmitResponse = {
        ...mockSubmitResponse,
        status: OpfPaymentSubmitStatus.REJECTED,
      };
      vi.spyOn(service as any, 'paymentResponseHandler');

      service['paymentResponseHandler'](response, {
        onSuccess: mockSubmitSuccess,
        onPending: mockSubmitPending,
        onFailure: mockSubmitFailure,
      }).subscribe({
        error: (error) => {
          expect(error.type).toBe(OpfPaymentErrorType.PAYMENT_REJECTED);
          expect(mockSubmitFailure).toHaveBeenCalled();
        },
      });
    });

    it('should handle unrecognized payment response status', async () => {
      const response: OpfPaymentSubmitResponse = {
        ...mockSubmitResponse,
        status: 'UNKNOWN_STATUS' as OpfPaymentSubmitStatus,
      };
      vi.spyOn(service as any, 'paymentResponseHandler');

      service['paymentResponseHandler'](response, {
        onSuccess: mockSubmitSuccess,
        onPending: mockSubmitPending,
        onFailure: mockSubmitFailure,
      }).subscribe({
        error: (error) => {
          expect(error.type).toBe(OpfPaymentErrorType.STATUS_NOT_RECOGNIZED);
          expect(mockSubmitFailure).toHaveBeenCalled();
        },
      });
    });
  });

  describe('placeOrder', () => {
    it('should delegate to orderFacade with correct arguments', async () => {
      service['placeOrder']('my-cart-id').subscribe(() => {
        expect(orderFacade.placePaymentAuthorizedOrder).toHaveBeenCalledWith(
          true,
          'my-cart-id'
        );
      });
    });

    it('should work without a cartId', async () => {
      service['placeOrder']().subscribe(() => {
        expect(orderFacade.placePaymentAuthorizedOrder).toHaveBeenCalledWith(
          true,
          undefined
        );
      });
    });
  });

  describe('onPaymentSuccess', () => {
    it('should navigate to orderConfirmation', () => {
      service['onPaymentSuccess']({ id: 'testOrder' } as Order);
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'orderConfirmation',
      });
    });
  });
});
