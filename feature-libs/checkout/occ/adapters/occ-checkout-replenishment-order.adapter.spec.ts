import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  ConverterService,
  OccConfig,
  OccEndpointsService,
  ReplenishmentOrder,
  REPLENISHMENT_ORDER_NORMALIZER,
  ScheduleReplenishmentForm,
} from '@spartacus/core';
import {
  MockOccEndpointsService,
  mockOccModuleConfig,
} from '../../../../projects/core/src/occ/adapters/user/unit-test.helper';
import { OccCheckoutReplenishmentOrderAdapter } from './occ-checkout-replenishment-order.adapter';

const mockCartId = 'test-cart';
const mockTermsChecked = true;
const mockUserId = 'test-user';

const mockReplenishmentOrderFormData: ScheduleReplenishmentForm = {
  numberOfDays: 'test-number-days',
};

const mockReplenishmentOrder: ReplenishmentOrder = {
  active: true,
  purchaseOrderNumber: 'test-po',
  replenishmentOrderCode: 'test-repl-order',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
};

describe('OccCheckoutReplenishmentOrderAdapter', () => {
  let occAdapter: OccCheckoutReplenishmentOrderAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let occEndpointService: OccEndpointsService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          OccCheckoutReplenishmentOrderAdapter,
          { provide: OccConfig, useValue: mockOccModuleConfig },
          { provide: OccEndpointsService, useClass: MockOccEndpointsService },
        ],
      });
    })
  );

  beforeEach(() => {
    occAdapter = TestBed.inject(OccCheckoutReplenishmentOrderAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
    occEndpointService = TestBed.inject(OccEndpointsService);

    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(occEndpointService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Schedule a replenishment order', () => {
    it('should schedule a replenishment order', () => {
      occAdapter
        .scheduleReplenishmentOrder(
          mockCartId,
          mockReplenishmentOrderFormData,
          mockTermsChecked,
          mockUserId
        )
        .subscribe((data) => {
          expect(data).toEqual(mockReplenishmentOrder);
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'POST' &&
          req.url === '/scheduleReplenishmentOrder' &&
          req.body === mockReplenishmentOrderFormData
        );
      });

      expect(occEndpointService.getUrl).toHaveBeenCalledWith(
        'scheduleReplenishmentOrder',
        {
          userId: mockUserId,
        }
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.params.get('termsChecked')).toBeTruthy();
      expect(mockReq.request.params.get('cartId')).toEqual(mockCartId);
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockReplenishmentOrder);
    });

    it('should use converter', () => {
      occAdapter
        .scheduleReplenishmentOrder(
          mockCartId,
          mockReplenishmentOrderFormData,
          mockTermsChecked,
          mockUserId
        )
        .subscribe();
      httpMock
        .expectOne(
          (req) =>
            req.method === 'POST' &&
            req.url === '/scheduleReplenishmentOrder' &&
            req.body === mockReplenishmentOrderFormData
        )
        .flush({});
      expect(converter.pipeable).toHaveBeenCalledWith(
        REPLENISHMENT_ORDER_NORMALIZER
      );
    });
  });
});
