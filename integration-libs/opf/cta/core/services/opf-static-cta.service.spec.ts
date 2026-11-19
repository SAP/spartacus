import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { WindowRef } from '@spartacus/core';
import { OpfCtaScriptsLocation } from '@spartacus/opf/cta/root';
import { Order, OrderFacade, OrderHistoryFacade } from '@spartacus/order/root';
import { of } from 'rxjs';
import { OpfStaticCtaService } from './opf-static-cta.service';

describe('OpfStaticCtaService', () => {
  let service: OpfStaticCtaService;
  let orderFacadeMock: any;
  let orderHistoryFacadeMock: any;

  beforeEach(() => {
    orderFacadeMock = { getOrderDetails: vi.fn() };
    orderHistoryFacadeMock = { getOrderDetails: vi.fn() };
    TestBed.configureTestingModule({
      providers: [
        WindowRef,
        OpfStaticCtaService,
        { provide: OrderFacade, useValue: orderFacadeMock },
        { provide: OrderHistoryFacade, useValue: orderHistoryFacadeMock },
      ],
    });
    service = TestBed.inject(OpfStaticCtaService);
    orderHistoryFacadeMock.getOrderDetails.mockReturnValue(of(mockOrder));
    orderFacadeMock.getOrderDetails.mockReturnValue(of(mockOrder));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call OrderHistoryFacade for CTA on order history page', async () => {
    service
      .fillCtaRequestforPagesWithOrder(
        OpfCtaScriptsLocation.ORDER_HISTORY_PAYMENT_GUIDE
      )
      .subscribe((ctaScriptRequest) => {
        expect(ctaScriptRequest.cartId).toContain('mockPaymentInfoId');
        expect(orderHistoryFacadeMock.getOrderDetails).toHaveBeenCalled();
        expect(orderFacadeMock.getOrderDetails).not.toHaveBeenCalled();
      });
  });

  it('should call orderFacade for CTA on confirmation page', async () => {
    service
      .fillCtaRequestforPagesWithOrder(
        OpfCtaScriptsLocation.ORDER_CONFIRMATION_PAYMENT_GUIDE
      )
      .subscribe((ctaScriptRequest) => {
        expect(ctaScriptRequest.cartId).toContain('mockPaymentInfoId');
        expect(orderHistoryFacadeMock.getOrderDetails).not.toHaveBeenCalled();
        expect(orderFacadeMock.getOrderDetails).toHaveBeenCalled();
      });
  });

  it('should throw error when no order Id', async () => {
    orderFacadeMock.getOrderDetails.mockReturnValue(
      of({ ...mockOrder, paymentInfo: undefined })
    );
    service
      .fillCtaRequestforPagesWithOrder(
        OpfCtaScriptsLocation.ORDER_CONFIRMATION_PAYMENT_GUIDE
      )
      .subscribe({
        next: () => {
          fail();
        },
        error: (error) => {
          expect(error).toBeTruthy();
        },
      });
  });

  const mockOrder: Order = {
    code: 'mockOrder',
    paymentInfo: {
      id: 'mockPaymentInfoId',
    },
    entries: [
      {
        product: {
          code: '11',
        },
        quantity: 1,
      },
      {
        product: {
          code: '22',
        },
        quantity: 1,
      },
    ],
  };
});
