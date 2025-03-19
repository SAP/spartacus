import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { OpfCtaScriptsLocation } from '@spartacus/opf/cta/root';
import { Order, OrderFacade, OrderHistoryFacade } from '@spartacus/order/root';
import { of } from 'rxjs';
import { OpfStaticCtaService } from './opf-static-cta.service';

describe('OpfStaticCtaService', () => {
  let service: OpfStaticCtaService;
  let orderFacadeMock: jasmine.SpyObj<OrderFacade>;
  let orderHistoryFacadeMock: jasmine.SpyObj<OrderHistoryFacade>;

  beforeEach(() => {
    orderFacadeMock = jasmine.createSpyObj('OrderFacade', ['getOrderDetails']);
    orderHistoryFacadeMock = jasmine.createSpyObj('OrderHistoryFacade', [
      'getOrderDetails',
    ]);
    TestBed.configureTestingModule({
      providers: [
        WindowRef,
        OpfStaticCtaService,
        { provide: OrderFacade, useValue: orderFacadeMock },
        { provide: OrderHistoryFacade, useValue: orderHistoryFacadeMock },
      ],
    });
    service = TestBed.inject(OpfStaticCtaService);
    orderHistoryFacadeMock.getOrderDetails.and.returnValue(of(mockOrder));
    orderFacadeMock.getOrderDetails.and.returnValue(of(mockOrder));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call OrderHistoryFacade for CTA on order history page', (done) => {
    service
      .fillCtaRequestforPagesWithOrder(
        OpfCtaScriptsLocation.ORDER_HISTORY_PAYMENT_GUIDE
      )
      .subscribe((ctaScriptRequest) => {
        expect(ctaScriptRequest.cartId).toContain('mockPaymentInfoId');
        expect(orderHistoryFacadeMock.getOrderDetails).toHaveBeenCalled();
        expect(orderFacadeMock.getOrderDetails).not.toHaveBeenCalled();
        done();
      });
  });

  it('should call orderFacade for CTA on confirmation page', (done) => {
    service
      .fillCtaRequestforPagesWithOrder(
        OpfCtaScriptsLocation.ORDER_CONFIRMATION_PAYMENT_GUIDE
      )
      .subscribe((ctaScriptRequest) => {
        expect(ctaScriptRequest.cartId).toContain('mockPaymentInfoId');
        expect(orderHistoryFacadeMock.getOrderDetails).not.toHaveBeenCalled();
        expect(orderFacadeMock.getOrderDetails).toHaveBeenCalled();
        done();
      });
  });

  it('should throw error when no order Id', (done) => {
    orderFacadeMock.getOrderDetails.and.returnValue(
      of({ ...mockOrder, paymentInfo: undefined })
    );
    service
      .fillCtaRequestforPagesWithOrder(
        OpfCtaScriptsLocation.ORDER_CONFIRMATION_PAYMENT_GUIDE
      )
      .subscribe({
        next: () => {
          fail();
          done();
        },
        error: (error) => {
          expect(error).toBeTruthy();
          done();
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
