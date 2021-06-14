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
import { OccEndpointsService } from '../../services';
import {
  MockOccEndpointsService,
  mockOccModuleConfig,
} from '../user/unit-test.helper';

const userId = '123';
const cartId = '456';
const voucherId = 'testVocherId';
const cartData: Cart = {
  store: 'electronics',
  guid: '1212121',
};

describe('OccCartVoucherAdapter', () => {
  let service: OccCartVoucherAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let occEnpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCartVoucherAdapter,
        { provide: OccConfig, useValue: mockOccModuleConfig },
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });

    service = TestBed.inject(OccCartVoucherAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
    occEnpointsService = TestBed.inject(OccEndpointsService);

    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(occEnpointsService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('add voucher to cart', () => {
    it('should add voucher to cart for given user id, cart id and voucher id', () => {
      let result;
      service.add(userId, cartId, voucherId).subscribe((res) => (result = res));

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'POST';
      });

      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith('cartVoucher', {
        urlParams: {
          userId: userId,
          cartId: cartId,
        },
      });
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
        .subscribe((res) => (result = res));

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'DELETE';
      });

      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith('cartVoucher', {
        urlParams: {
          userId: userId,
          cartId: cartId,
        },
      });
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);
      expect(result).toEqual(cartData);
    });
  });
});
