import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { REPLENISHMENT_ORDER_NORMALIZER } from '../../../checkout/connectors/index';
import {
  ReplenishmentOrder,
  ScheduleReplenishmentForm,
} from '../../../model/replenishment-order.model';
import { ConverterService } from '../../../util/converter.service';
import { OccConfig } from '../../config/occ-config';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import {
  MockOccEndpointsService,
  mockOccModuleConfig,
} from '../user/unit-test.helper';
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
    spyOn(occEndpointService, 'buildUrl').and.callThrough();
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

      expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
        'scheduleReplenishmentOrder',
        {
          urlParams: {
            userId: mockUserId,
          },
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
