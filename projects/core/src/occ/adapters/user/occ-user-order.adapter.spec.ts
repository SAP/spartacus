import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { ConverterService, OccUserOrderAdapter } from '@spartacus/core';
import { ORDER_NORMALIZER } from '../../../checkout/connectors/checkout/converters';
import { Order } from '../../../model/order.model';
import { ORDER_HISTORY_NORMALIZER } from '../../../user/connectors/order/converters';
import { OccConfig } from '../../config/occ-config';
import { OccEndpointsService } from '../../services';
import {
  MockOccEndpointsService,
  mockOccModuleConfig,
} from './unit-test.helper';

const userId = '123';

const orderData: Order = {
  site: 'electronics',
  calculated: true,
  code: '00001004',
};

describe('OccUserOrderAdapter', () => {
  let occUserOrderAdapter: OccUserOrderAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let occEnpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccUserOrderAdapter,
        { provide: OccConfig, useValue: mockOccModuleConfig },
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });

    occUserOrderAdapter = TestBed.get(OccUserOrderAdapter);
    httpMock = TestBed.get(HttpTestingController);
    converter = TestBed.get(ConverterService);
    occEnpointsService = TestBed.get(OccEndpointsService);
    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(occEnpointsService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getUserOrders', () => {
    it('should fetch user Orders with default options', async(() => {
      const PAGE_SIZE = 5;
      occUserOrderAdapter.loadHistory(userId, PAGE_SIZE).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.method === 'GET';
      }, `GET method and url`);
      expect(occEnpointsService.getUrl).toHaveBeenCalledWith('orderHistory', {
        userId,
      });
    }));

    it('should fetch user Orders with defined options', async(() => {
      const PAGE_SIZE = 5;
      const currentPage = 1;
      const sort = 'byDate';

      occUserOrderAdapter
        .loadHistory(userId, PAGE_SIZE, currentPage, sort)
        .subscribe();
      const mockReq = httpMock.expectOne((req: HttpRequest<any>) => {
        return req.method === 'GET';
      }, `GET method`);
      expect(occEnpointsService.getUrl).toHaveBeenCalledWith('orderHistory', {
        userId,
      });
      expect(mockReq.request.params.get('pageSize')).toEqual(
        PAGE_SIZE.toString()
      );
      expect(mockReq.request.params.get('currentPage')).toEqual(
        currentPage.toString()
      );
      expect(mockReq.request.params.get('sort')).toEqual(sort);
    }));

    it('should use converter', () => {
      occUserOrderAdapter.loadHistory(userId).subscribe();
      httpMock
        .expectOne((req: HttpRequest<any>) => {
          return req.method === 'GET';
        }, `GET method`)
        .flush({});
      expect(converter.pipeable).toHaveBeenCalledWith(ORDER_HISTORY_NORMALIZER);
    });
  });

  describe('getOrder', () => {
    it('should fetch a single order', async(() => {
      occUserOrderAdapter.load(userId, orderData.code).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.method === 'GET';
      }, `GET a single order`);
      expect(occEnpointsService.getUrl).toHaveBeenCalledWith('orderDetail', {
        userId,
        orderId: orderData.code,
      });
    }));

    it('should use converter', () => {
      occUserOrderAdapter.load(userId, orderData.code).subscribe();
      httpMock.expectOne(req => req.method === 'GET').flush({});
      expect(converter.pipeable).toHaveBeenCalledWith(ORDER_NORMALIZER);
    });
  });
});
