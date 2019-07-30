import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { ConverterService, OccUserOrderAdapter } from '@spartacus/core';
import { ORDER_NORMALIZER } from '../../../checkout/connectors/checkout/converters';
import { Order } from '../../../model/order.model';
import { ORDER_HISTORY_NORMALIZER } from '../../../user/connectors/order/converters';
import { OccConfig } from '../../config/occ-config';

const userId = '123';

const orderData: Order = {
  site: 'electronics',
  calculated: true,
  code: '00001004',
};

const usersEndpoint = '/users';
const orderEndpoint = '/orders';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },

  context: {
    baseSite: [''],
  },
};

describe('OccUserOrderAdapter', () => {
  let service: OccUserOrderAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccUserOrderAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });
    service = TestBed.get(OccUserOrderAdapter as Type<OccUserOrderAdapter>);
    httpMock = TestBed.get(HttpTestingController as Type<
      HttpTestingController
    >);
    converter = TestBed.get(ConverterService as Type<ConverterService>);

    spyOn(converter, 'pipeable').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getUserOrders', () => {
    it('should fetch user Orders with default options', async(() => {
      const PAGE_SIZE = 5;
      service.loadHistory(userId, PAGE_SIZE).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === usersEndpoint + `/${userId}` + orderEndpoint &&
          req.method === 'GET'
        );
      }, `GET method and url`);
    }));

    it('should fetch user Orders with defined options', async(() => {
      const PAGE_SIZE = 5;
      const currentPage = 1;
      const sort = 'byDate';

      service.loadHistory(userId, PAGE_SIZE, currentPage, sort).subscribe();
      const mockReq = httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === usersEndpoint + `/${userId}` + orderEndpoint &&
          req.method === 'GET'
        );
      }, `GET method and url`);
      expect(mockReq.request.params.get('pageSize')).toEqual(
        PAGE_SIZE.toString()
      );
      expect(mockReq.request.params.get('currentPage')).toEqual(
        currentPage.toString()
      );
      expect(mockReq.request.params.get('sort')).toEqual(sort);
    }));

    it('should use converter', () => {
      service.loadHistory(userId).subscribe();
      httpMock
        .expectOne(usersEndpoint + `/${userId}` + orderEndpoint)
        .flush({});
      expect(converter.pipeable).toHaveBeenCalledWith(ORDER_HISTORY_NORMALIZER);
    });
  });

  describe('getOrder', () => {
    it('should fetch a single order', async(() => {
      service.load(userId, orderData.code).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url ===
            usersEndpoint +
              `/${userId}` +
              orderEndpoint +
              '/' +
              orderData.code && req.method === 'GET'
        );
      }, `GET a single order`);
    }));

    it('should use converter', () => {
      service.load(userId, orderData.code).subscribe();
      httpMock
        .expectOne(
          req =>
            req.url ===
              usersEndpoint +
                `/${userId}` +
                orderEndpoint +
                '/' +
                orderData.code && req.method === 'GET'
        )
        .flush({});
      expect(converter.pipeable).toHaveBeenCalledWith(ORDER_NORMALIZER);
    });
  });
});
