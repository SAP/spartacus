import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { CartModificationList } from '@spartacus/cart/base/root';
import {
  ConverterService,
  OccEndpointsService,
  OCC_USER_ID_CURRENT,
} from '@spartacus/core';
import { REORDER_ORDER_NORMALIZER } from '@spartacus/order/root';
import { MockOccEndpointsService } from 'projects/core/src/occ/adapters/user/unit-test.helper';
import { OccReorderOrderAdapter } from './occ-reorder-order.adapter';

const userId = OCC_USER_ID_CURRENT;
const orderCode = 'orderCode';

const mockCartModificationList: CartModificationList = {
  cartModifications: [],
};

describe(`OccReorderOrderAdapter`, () => {
  let occAdapter: OccReorderOrderAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let occEndpointService: OccEndpointsService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          OccReorderOrderAdapter,
          { provide: OccEndpointsService, useClass: MockOccEndpointsService },
        ],
      });
    })
  );

  beforeEach(() => {
    occAdapter = TestBed.inject(OccReorderOrderAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
    occEndpointService = TestBed.inject(OccEndpointsService);

    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(occEndpointService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe(`Create cart from order`, () => {
    it(`should create a cart from order`, () => {
      occAdapter.reorder(orderCode, userId).subscribe((data) => {
        expect(data).toEqual(mockCartModificationList);
      });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'POST' && req.url === '/reorder';
      });

      expect(occEndpointService.buildUrl).toHaveBeenCalledWith('reorder', {
        urlParams: {
          userId,
        },
        queryParams: { orderCode },
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockCartModificationList);
    });

    it('should use converter', () => {
      occAdapter.reorder(orderCode, userId).subscribe();

      httpMock
        .expectOne((req) => {
          return req.method === 'POST' && req.url === '/reorder';
        })
        .flush({});

      expect(converter.pipeable).toHaveBeenCalledWith(REORDER_ORDER_NORMALIZER);
    });
  });
});
