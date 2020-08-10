import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CART_VOUCHER_NORMALIZER } from '../../../../../../../../projects/core/src/cart/connectors/voucher/converters';
import { Cart } from '../../../../../../../../projects/core/src/model/cart.model';
import { ConverterService } from '../../../../../../../../projects/core/src/util/converter.service';
import { OccConfig } from '../../../../../../../../projects/core/src/occ/index';
import { OccCartVoucherAdapter } from './occ-cart-voucher.adapter';
import { OccEndpointsService } from '../../../../../../../../projects/core/src/occ/services';
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
    spyOn(occEnpointsService, 'getUrl').and.callThrough();
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

      expect(occEnpointsService.getUrl).toHaveBeenCalledWith('cartVoucher', {
        userId: userId,
        cartId: cartId,
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

      expect(occEnpointsService.getUrl).toHaveBeenCalledWith('cartVoucher', {
        userId: userId,
        cartId: cartId,
      });
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);
      expect(result).toEqual(cartData);
    });
  });
});
