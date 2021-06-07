import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DELIVERY_MODE_NORMALIZER } from '@spartacus/core';
import { Address } from '../../../model/address.model';
import { Cart } from '../../../model/cart.model';
import {
  ADDRESS_NORMALIZER,
  ADDRESS_SERIALIZER,
} from '../../../user/connectors/address/converters';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import {
  BaseOccUrlProperties,
  DynamicAttributes,
  OccEndpointsService,
} from '../../services';
import { OccCheckoutDeliveryAdapter } from './occ-checkout-delivery.adapter';

const userId = '123';
const cartId = '456';
const cartData: Cart = {
  store: 'electronics',
  guid: '1212121',
};

const usersEndpoint = 'users';
const cartsEndpoint = '/carts/';

class MockOccEndpointsService {
  buildUrl(
    endpoint: string,
    _attributes?: DynamicAttributes,
    _propertiesToOmit?: BaseOccUrlProperties
  ) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}

describe('OccCheckoutDeliveryAdapter', () => {
  let service: OccCheckoutDeliveryAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let occEndpointService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCheckoutDeliveryAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });
    service = TestBed.inject(OccCheckoutDeliveryAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
    occEndpointService = TestBed.inject(OccEndpointsService);

    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(converter, 'pipeableMany').and.callThrough();
    spyOn(converter, 'convert').and.callThrough();
    spyOn(occEndpointService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('create an address for cart', () => {
    it('should create address for cart for given user id, cart id and address', () => {
      const mockAddress: Address = {
        firstName: 'Mock',
        lastName: 'Address',
      };

      let result;
      service
        .createAddress(userId, cartId, mockAddress)
        .subscribe((res) => (result = res));

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'POST' &&
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              cartId +
              '/addresses/' +
              'delivery'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockAddress);
      expect(result).toEqual(mockAddress);
      expect(converter.pipeable).toHaveBeenCalledWith(ADDRESS_NORMALIZER);
      expect(converter.convert).toHaveBeenCalledWith(
        mockAddress,
        ADDRESS_SERIALIZER
      );
    });
  });

  describe('set an address for cart', () => {
    it('should set address for cart for given user id, cart id and address id', () => {
      const mockAddressId = 'mockAddressId';

      let result;
      service
        .setAddress(userId, cartId, mockAddressId)
        .subscribe((res) => (result = res));

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'PUT' && req.url === 'setDeliveryAddress';
      });

      expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
        'setDeliveryAddress',
        {
          urlParams: {
            userId,
            cartId,
          },
        }
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.params.get('addressId')).toEqual(mockAddressId);
      mockReq.flush(cartData);
      expect(result).toEqual(cartData);
    });
  });

  describe('get all supported delivery modes for cart', () => {
    it('should get all supported delivery modes for cart for given user id and cart id', () => {
      const mockDeliveryModes: Occ.DeliveryModeList = {
        deliveryModes: [{ name: 'mockDeliveryMode' }],
      };
      let result;
      service
        .getSupportedModes(userId, cartId)
        .subscribe((res) => (result = res));

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              cartId +
              '/deliverymodes'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockDeliveryModes);
      expect(result).toEqual(mockDeliveryModes.deliveryModes);
      expect(converter.pipeableMany).toHaveBeenCalledWith(
        DELIVERY_MODE_NORMALIZER
      );
    });
  });

  describe('get delivery mode for cart', () => {
    it('should delivery modes for cart for given user id and cart id', () => {
      let result;
      service.getMode(userId, cartId).subscribe((res) => (result = res));

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              cartId +
              '/deliverymode'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);
      expect(result).toEqual(cartData);
      expect(converter.pipeable).toHaveBeenCalledWith(DELIVERY_MODE_NORMALIZER);
    });
  });

  describe('set delivery mode for cart', () => {
    it('should set modes for cart for given user id, cart id and delivery mode id', () => {
      const mockDeliveryModeId = 'mockDeliveryModeId';

      let result;
      service
        .setMode(userId, cartId, mockDeliveryModeId)
        .subscribe((res) => (result = res));

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PUT' &&
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              cartId +
              '/deliverymode'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.params.get('deliveryModeId')).toEqual(
        mockDeliveryModeId
      );
      mockReq.flush(cartData);
      expect(result).toEqual(cartData);
    });
  });
});
