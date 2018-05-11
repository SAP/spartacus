import { TestBed } from '@angular/core/testing';
import { OccOrderService } from './order.service';
import { ConfigService } from '../config.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

const userId = '123';
const cartId = '456';

const orderData = {
  type: 'orderWsDTO',
  calculated: true,
  code: '00001004'
};

const usersEndpoint = '/users';
const orderEndpoint = '/orders';

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

describe('OccOrderService', () => {
  let service: OccOrderService;
  let config: ConfigService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccOrderService,
        { provide: ConfigService, useClass: MockConfigService }
      ]
    });

    service = TestBed.get(OccOrderService);
    httpMock = TestBed.get(HttpTestingController);
    config = TestBed.get(ConfigService);
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
});
