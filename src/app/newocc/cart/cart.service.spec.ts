import { TestBed } from '@angular/core/testing';
import { OccCartService } from './cart.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { ConfigService } from '../config.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ProductImageConverterService } from '../../product/converters';

const userId = '123';
const cartId = '456';
const latestCart = 'mockLatestCart';
const cart = 'cart';
const cartToken = 'cartToken';
const mergedCart = 'mergedCart';
const usersEndpoint = '/users';
const cartsEndpoint = '/carts';

class MockConfigService {
  server = {
    baseUrl: '',
    occPrefix: ''
  };

  site = {
    baseSite: ''
  };

  authentication = {
    client_id: '',
    client_secret: '',
    userToken: {}
  };
}

fdescribe('OccCartService', () => {
  let service: OccCartService;
  let config: ConfigService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCartService,
        ProductImageConverterService,
        { provide: ConfigService, useClass: MockConfigService }
      ]
    });

    service = TestBed.get(OccCartService);
    httpMock = TestBed.get(HttpTestingController);
    config = TestBed.get(ConfigService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('load latest cart details', () => {
    it('should load latest cart details for given user id', () => {
      service.loadLatestCart(userId).subscribe(result => {
        expect(result).toEqual(latestCart);
      });

      const mockReq = httpMock.expectOne(usersEndpoint + `/${userId}` + cartsEndpoint + '/current');

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(latestCart);
    });
  });

  describe('load cart details', () => {
    it('should load cart details for given user id and cart id', () => {
      service.loadCart(userId, cartId).subscribe(result => {
        expect(result).toEqual(cart);
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === usersEndpoint + '/' + userId + cartsEndpoint + '/' + cartId;
      });

      // expect(mockReq.request.params.get('fields')).toEqual(
      //   'DEFAULT,deliveryItemsQuantity,totalPrice(formattedValue),entries(totalPrice(formattedValue),product(images(FULL)))'
      // );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cart);
    });
  });

  describe('merge carts', () => {
    it('should merge the provided cart with the latest cart for given user id, oldCartToken and toMergeCart', () => {
      service.mergeCartWithLatestCart(userId, cartToken, latestCart).subscribe(result => {
        expect(result).toEqual(latestCart);
      });

      const mockReq = httpMock.expectOne(req => {
        console.log(usersEndpoint + `/${userId}` + cartsEndpoint + '/');
        return req.method === 'POST' && req.url === usersEndpoint + `/${userId}` + cartsEndpoint + '/';
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mergedCart);
    });
  });
});