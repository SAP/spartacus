import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import {
  ORDER_HISTORY_NORMALIZER,
  ORDER_NORMALIZER,
} from '@spartacus/order/root';
import { MockOccEndpointsService } from 'projects/core/src/occ/adapters/user/unit-test.helper';
import { OccUnitOrderAdapter } from './occ-unit-order.adapter';

const userId = '123';
const orderDetailCode = '00001004';

describe('OccUnitOrderAdapter', () => {
  let occOrderHistoryAdapter: OccUnitOrderAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let occEnpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccUnitOrderAdapter,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });

    occOrderHistoryAdapter = TestBed.inject(OccUnitOrderAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
    occEnpointsService = TestBed.inject(OccEndpointsService);
    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(converter, 'convert').and.callThrough();
    spyOn(occEnpointsService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getUnitLevelOrders', () => {
    it('should fetch unit Orders with default options', fakeAsync(() => {
      const PAGE_SIZE = 5;
      occOrderHistoryAdapter
        .loadUnitOrderHistory(userId, PAGE_SIZE)
        .subscribe();
      httpMock.expectOne((req: HttpRequest<void>) => {
        return req.method === 'GET';
      }, `GET method and url`);
      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
        'unitLevelOrderHistory',
        {
          urlParams: { userId },
          queryParams: { pageSize: PAGE_SIZE.toString() },
        }
      );
    }));

    it('should fetch unit Orders with defined options', fakeAsync(() => {
      const PAGE_SIZE = 5;
      const currentPage = 1;
      const sort = 'byDate';
      const filters = '';

      occOrderHistoryAdapter
        .loadUnitOrderHistory(userId, PAGE_SIZE, currentPage, filters, sort)
        .subscribe();
      httpMock.expectOne((req: HttpRequest<void>) => {
        return req.method === 'GET';
      }, `GET method`);
      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
        'unitLevelOrderHistory',
        {
          urlParams: { userId },
          queryParams: {
            pageSize: PAGE_SIZE.toString(),
            currentPage: currentPage.toString(),
            sort,
          },
        }
      );
    }));

    it('should use converter', () => {
      occOrderHistoryAdapter.loadUnitOrderHistory(userId).subscribe();
      httpMock
        .expectOne((req: HttpRequest<any>) => {
          return req.method === 'GET';
        }, `GET method`)
        .flush({});
      expect(converter.pipeable).toHaveBeenCalledWith(ORDER_HISTORY_NORMALIZER);
    });
  });

  describe('loadUnitOrderDetail', () => {
    it(
      'should fetch a single unit-level order',
      waitForAsync(() => {
        occOrderHistoryAdapter
          .loadUnitOrderDetail(userId, orderDetailCode)
          .subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.method === 'GET';
        }, `GET a single order`);
        expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
          'unitLevelOrderDetail',
          {
            urlParams: { userId, orderId: orderDetailCode },
          }
        );
      })
    );

    it('should use converter', () => {
      occOrderHistoryAdapter
        .loadUnitOrderDetail(userId, orderDetailCode)
        .subscribe();
      httpMock.expectOne((req) => req.method === 'GET').flush({});
      expect(converter.pipeable).toHaveBeenCalledWith(ORDER_NORMALIZER);
    });
  });
});
