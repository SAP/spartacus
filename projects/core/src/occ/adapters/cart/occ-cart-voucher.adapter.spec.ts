import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CART_VOUCHER_NORMALIZER } from '../../../cart/connectors/voucher/converters';
import { Cart } from '../../../model/cart.model';
import { ConverterService } from '../../../util/converter.service';
import { OccConfig } from '../../index';
import { OccCartVoucherAdapter } from './occ-cart-voucher.adapter';

const userId = '123';
const cartId = '456';
const voucherId = 'testVocherId';
const cartData: Cart = {
  store: 'electronics',
  guid: '1212121',
};

const usersEndpoint = '/users';
const cartsEndpoint = '/carts/';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
  context: {
    parameters: {
      baseSite: { default: '' },
    },
  },
};

describe('OccCartVoucherAdapter', () => {
  let service: OccCartVoucherAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCartVoucherAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.get(OccCartVoucherAdapter);
    httpMock = TestBed.get(HttpTestingController);
    converter = TestBed.get(ConverterService);

    spyOn(converter, 'pipeable').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('add voucher to cart', () => {
    it('should add voucher to cart for given user id, cart id and voucher id', () => {
      let result;
      service.add(userId, cartId, voucherId).subscribe(res => (result = res));

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'POST' &&
          req.url ===
            usersEndpoint + `/${userId}` + cartsEndpoint + cartId + '/vouchers'
        );
      });

      expect(mockReq.request.headers.get('Content-Type')).toEqual(
        'application/x-www-form-urlencoded'
      );
      expect(mockReq.request.params.get('voucherId')).toEqual(voucherId);
      expect(mockReq.cancelled).toBeFalsy();
      mockReq.flush(cartData);
      expect(result).toEqual(cartData);
      expect(converter.pipeable).toHaveBeenCalledWith(CART_VOUCHER_NORMALIZER);
    });
  });

  describe('remove a voucher from cart', () => {
    it('should remove voucher from cart for given user id, cart id and voucher id', () => {
      let result;
      service
        .remove(userId, cartId, voucherId)
        .subscribe(res => (result = res));

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'DELETE' &&
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              cartId +
              '/vouchers/' +
              voucherId
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);
      expect(result).toEqual(cartData);
    });
  });
});
