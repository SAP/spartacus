import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  ConverterService,
  OccConfig,
  ReplenishmentOrder,
  REPLENISHMENT_ORDER_NORMALIZER,
  ScheduleReplenishmentForm,
  OccEndpoints,
} from '@spartacus/core';
import { OccCheckoutReplenishmentOrderAdapter } from './occ-checkout-replenishment-order.adapter';

const cartId = 'testCart';
const termsChecked = true;
const userId = 'testUser';

const mockReplenishmentOrderFormData: ScheduleReplenishmentForm = {
  numberOfDays: 'test-number-days',
};

const mockReplenishmentOrder: ReplenishmentOrder = {
  active: true,
  purchaseOrderNumber: 'test-po',
  replenishmentOrderCode: 'test-repl-order',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
};

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
      endpoints: {
        scheduleReplenishmentOrder:
          'orgUsers/${userId}/replenishmentOrders?fields=FULL,costCenter(FULL),purchaseOrderNumber,paymentType',
      } as OccEndpoints,
    },
  },
  context: {
    baseSite: [''],
  },
};

describe('OccCheckoutReplenishmentOrderAdapter', () => {
  let occAdapter: OccCheckoutReplenishmentOrderAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          OccCheckoutReplenishmentOrderAdapter,
          { provide: OccConfig, useValue: MockOccModuleConfig },
        ],
      });
    })
  );

  beforeEach(() => {
    occAdapter = TestBed.inject(OccCheckoutReplenishmentOrderAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);

    spyOn(converter, 'pipeable').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Schedule a replenishment order', () => {
    it('should schedule a replenishment order', () => {
      occAdapter
        .scheduleReplenishmentOrder(
          cartId,
          mockReplenishmentOrderFormData,
          termsChecked,
          userId
        )
        .subscribe((data) => {
          expect(data).toEqual(mockReplenishmentOrder);
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'POST' &&
          req.url ===
            `orgUsers/${userId}/replenishmentOrders?fields=FULL%2CcostCenter(FULL)%2CpurchaseOrderNumber%2CpaymentType&cartId=${cartId}&termsChecked=${termsChecked}` &&
          req.body === mockReplenishmentOrderFormData
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(converter.pipeable).toHaveBeenCalledWith(
        REPLENISHMENT_ORDER_NORMALIZER
      );
      mockReq.flush(mockReplenishmentOrder);
    });
  });
});
