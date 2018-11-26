import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccConfig, Order } from '@spartacus/core';
import { OccOrderService } from './order.service';

const userId = '123';
const cartId = '456';

const orderData: Order = {
  site: 'electronics',
  calculated: true,
  code: '00001004'
};

const usersEndpoint = '/users';
const orderEndpoint = '/orders';

const MockOccModuleConfig: OccConfig = {
  server: {
    baseUrl: '',
    occPrefix: ''
  },

  site: {
    baseSite: ''
  }
};

describe('OccOrderService', () => {
  let service: OccOrderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccOrderService,
        { provide: OccConfig, useValue: MockOccModuleConfig }
      ]
    });

    service = TestBed.get(OccOrderService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('place order', () => {
    it('should be able to place order for the cart', () => {
      service.placeOrder(userId, cartId).subscribe(result => {
        expect(result).toEqual(orderData);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'POST' &&
          req.url === usersEndpoint + `/${userId}` + orderEndpoint
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.params.get('cartId')).toEqual(cartId);
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orderData);
    });
  });

  describe('getUserOrders', () => {
    it('should fetch user Orders with default options', async(() => {
      const PAGE_SIZE = 5;
      service.getOrders(userId, PAGE_SIZE).subscribe();
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

      service.getOrders(userId, PAGE_SIZE, currentPage, sort).subscribe();
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
  });

  describe('getOrder', () => {
    it('should fetch a single order', async(() => {
      service.getOrder(userId, orderData.code).subscribe();
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
  });
});
