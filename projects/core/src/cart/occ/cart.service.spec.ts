import { TestBed } from '@angular/core/testing';
import { OccCartService } from './cart.service';
import {
  OccConfig,
  Address,
  Cart,
  CartList,
  CartModification,
  PaymentDetails,
  DeliveryModeList
} from '@spartacus/core';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ProductImageConverterService } from '@spartacus/core';

const userId = '123';
const cartId = '456';
const toMergeCart = { guid: '123456' };
const cartData: Cart = {
  store: 'electronics',
  guid: '1212121'
};
const cartDataList: CartList = {
  carts: [cartData]
};
const mergedCart: Cart = {
  name: 'mergedCart'
};
const cartModified: CartModification = {
  deliveryModeChanged: true
};
const mockPaymentDetails: PaymentDetails = {
  accountHolderName: 'mockPaymentDetails'
};

const usersEndpoint = '/users';
const cartsEndpoint = '/carts/';
const BASIC_PARAMS =
  'DEFAULT,deliveryItemsQuantity,totalPrice(formattedValue),' +
  'entries(totalPrice(formattedValue),product(images(FULL)))';

const DETAILS_PARAMS =
  'DEFAULT,potentialProductPromotions,appliedProductPromotions,potentialOrderPromotions,appliedOrderPromotions,' +
  'entries(totalPrice(formattedValue),product(images(FULL),stock(FULL)),basePrice(formattedValue)),' +
  'totalPrice(formattedValue),totalItems,totalPriceWithTax(formattedValue),totalDiscounts(formattedValue),subTotal(formattedValue),' +
  'deliveryItemsQuantity,totalTax(formattedValue),pickupItemsQuantity,net,appliedVouchers,productDiscounts(formattedValue)';

const MockOccModuleConfig: OccConfig = {
  server: {
    baseUrl: '',
    occPrefix: ''
  },

  site: {
    baseSite: ''
  }
};

describe('OccCartService', () => {
  let service: OccCartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCartService,
        ProductImageConverterService,
        { provide: OccConfig, useValue: MockOccModuleConfig }
      ]
    });

    service = TestBed.get(OccCartService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('load all carts', () => {
    it('should load all carts basic data for given user', () => {
      service.loadAllCarts(userId).subscribe(result => {
        expect(result).toEqual(cartDataList);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === usersEndpoint + `/${userId}` + cartsEndpoint
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.params.get('fields')).toEqual(
        'carts(' + BASIC_PARAMS + ',saveTime)'
      );
      mockReq.flush(cartDataList);
    });

    it('should load all carts details data for given user with details flag', () => {
      service.loadAllCarts(userId, true).subscribe(result => {
        expect(result).toEqual(cartDataList);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === usersEndpoint + `/${userId}` + cartsEndpoint
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.params.get('fields')).toEqual(
        'carts(' + DETAILS_PARAMS + ',saveTime)'
      );
      mockReq.flush(cartDataList);
    });
  });

  describe('load cart data', () => {
    it('should load cart basic data for given userId and cartId', () => {
      service.loadCart(userId, cartId).subscribe(result => {
        expect(result).toEqual(cartData);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === usersEndpoint + `/${userId}` + cartsEndpoint + `${cartId}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.params.get('fields')).toEqual(BASIC_PARAMS);
      mockReq.flush(cartData);
    });

    it('should load cart detail data for given userId, cartId and details flag', () => {
      service.loadCart(userId, cartId, true).subscribe(result => {
        expect(result).toEqual(cartData);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === usersEndpoint + `/${userId}` + cartsEndpoint + `${cartId}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.params.get('fields')).toEqual(DETAILS_PARAMS);
      mockReq.flush(cartData);
    });

    it('should load current cart for given userId', () => {
      service.loadCart(userId, 'current').subscribe(result => {
        expect(result).toEqual(cartData);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === usersEndpoint + `/${userId}` + cartsEndpoint
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.params.get('fields')).toEqual(
        'carts(' + BASIC_PARAMS + ',saveTime)'
      );
      mockReq.flush({ carts: [cartData] });
    });
  });

  describe('create a cart', () => {
    it('should able to create a new cart for the given user ', () => {
      service.createCart(userId).subscribe(result => {
        expect(result).toEqual(cartData);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'POST' &&
          req.url === usersEndpoint + `/${userId}` + cartsEndpoint
        );
      });

      expect(mockReq.request.params.get('fields')).toEqual(BASIC_PARAMS);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);
    });
  });

  describe('merge a cart', () => {
    it('should able to merge a cart to current one for the given user ', () => {
      service.createCart(userId, cartId, toMergeCart.guid).subscribe(result => {
        expect(result).toEqual(mergedCart);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'POST' &&
          req.url === usersEndpoint + `/${userId}` + cartsEndpoint
        );
      });

      expect(mockReq.request.params.get('oldCartId')).toEqual(cartId);

      expect(mockReq.request.params.get('toMergeCartGuid')).toEqual(
        toMergeCart.guid
      );

      expect(mockReq.request.params.get('fields')).toEqual(BASIC_PARAMS);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mergedCart);
    });
  });

  describe('add entry to cart', () => {
    it('should add entry to cart for given user id, cart id, product code and product quantity', () => {
      service.addEntry(userId, cartId, '147852', 5).subscribe(result => {
        expect(result).toEqual(cartModified);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'POST' &&
          req.url ===
            usersEndpoint + `/${userId}` + cartsEndpoint + cartId + '/entries'
        );
      });

      expect(mockReq.request.headers.get('Content-Type')).toEqual(
        'application/x-www-form-urlencoded'
      );

      expect(mockReq.request.params.get('code')).toEqual('147852');

      expect(mockReq.request.params.get('qty')).toEqual('5');

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartModified);
    });
  });

  describe('update entry in a cart', () => {
    it('should update an entry in a cart for given user id, cart id, entryNumber and quantitiy', () => {
      service.updateEntry(userId, cartId, '12345', 5).subscribe(result => {
        expect(result).toEqual(cartModified);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'PATCH' &&
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              cartId +
              '/entries/12345'
        );
      });

      expect(mockReq.request.headers.get('Content-Type')).toEqual(
        'application/x-www-form-urlencoded'
      );
      expect(mockReq.request.params.get('qty')).toEqual('5');
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartModified);
    });
  });

  describe('remove an entry from cart', () => {
    it('should remove entry from cart for given user id, cart id and entry number', () => {
      service.removeEntry(userId, cartId, '147852').subscribe(result => {
        expect(result).toEqual(cartData);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'DELETE' &&
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              cartId +
              '/entries/' +
              '147852'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);
    });
  });

  describe('create an address for cart', () => {
    it('should create address for cart for given user id, cart id and address', () => {
      const mockAddress: Address = {
        firstName: 'Mock',
        lastName: 'Address'
      };

      service
        .createAddressOnCart(userId, cartId, mockAddress)
        .subscribe(result => {
          expect(result).toEqual(mockAddress);
        });

      const mockReq = httpMock.expectOne(req => {
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
    });
  });

  describe('set an address for cart', () => {
    it('should set address for cart for given user id, cart id and address id', () => {
      const mockAddressId = 'mockAddressId';

      service
        .setDeliveryAddress(userId, cartId, mockAddressId)
        .subscribe(result => {
          expect(result).toEqual(cartData);
        });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'PUT' &&
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
      expect(mockReq.request.params.get('addressId')).toEqual(mockAddressId);
      mockReq.flush(cartData);
    });
  });

  describe('get all supported delivery modes for cart', () => {
    it('should get all supported delivery modes for cart for given user id and cart id', () => {
      const mockDeliveryModes: DeliveryModeList = {
        deliveryModes: [{ name: 'mockDeliveryMode' }]
      };
      service.getSupportedDeliveryModes(userId, cartId).subscribe(result => {
        expect(result).toEqual(mockDeliveryModes);
      });

      const mockReq = httpMock.expectOne(req => {
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
    });
  });

  describe('get delivery mode for cart', () => {
    it('should delivery modes for cart for given user id and cart id', () => {
      service.getDeliveryMode(userId, cartId).subscribe(result => {
        expect(result).toEqual(cartData);
      });

      const mockReq = httpMock.expectOne(req => {
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
    });
  });

  describe('set delivery mode for cart', () => {
    it('should set modes for cart for given user id, cart id and delivery mode id', () => {
      const mockDeliveryModeId = 'mockDeliveryModeId';

      service
        .setDeliveryMode(userId, cartId, mockDeliveryModeId)
        .subscribe(result => {
          expect(result).toEqual(cartData);
        });

      const mockReq = httpMock.expectOne(req => {
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
    });
  });

  describe('get payment provider subscription info', () => {
    it('should get payment provider subscription info for given user id and cart id', () => {
      service.getPaymentProviderSubInfo(userId, cartId).subscribe(result => {
        expect(result).toEqual(cartData);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              cartId +
              '/payment/sop/request?responseUrl=sampleUrl'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);
    });
  });

  describe('create subscription with payment provider with single param', () => {
    it('should create subscription with payment provider for given url and parameters', () => {
      const params = {
        param: 'mockParam'
      };
      const mockUrl = 'mockUrl';
      const mockPaymentProvider = 'mockPaymentProvider';

      service
        .createSubWithPaymentProvider(mockUrl, params)
        .subscribe(result => {
          expect(result).toEqual(mockPaymentProvider);
        });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'POST' && req.url === mockUrl;
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.headers.get('Content-Type')).toEqual(
        'application/x-www-form-urlencoded'
      );
      expect(mockReq.request.headers.get('Accept')).toEqual('text/html');
      expect(mockReq.request.responseType).toEqual('text');
      expect(mockReq.request.body.get('param')).toEqual('mockParam');
      mockReq.flush(mockPaymentProvider);
    });
  });

  describe('create subscription with payment provider with multiple params', () => {
    it('should create subscription with payment provider for given url and parameters', () => {
      const params = {
        param1: 'mockParam1',
        param2: 'mockParam2'
      };
      const mockUrl = 'mockUrl';
      const mockPaymentProvider = 'mockPaymentProvider';

      service
        .createSubWithPaymentProvider(mockUrl, params)
        .subscribe(result => {
          expect(result).toEqual(mockPaymentProvider);
        });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'POST' && req.url === mockUrl;
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.headers.get('Content-Type')).toEqual(
        'application/x-www-form-urlencoded'
      );
      expect(mockReq.request.headers.get('Accept')).toEqual('text/html');
      expect(mockReq.request.body.get('param1')).toEqual('mockParam1');
      expect(mockReq.request.body.get('param2')).toEqual('mockParam2');
      expect(mockReq.request.responseType).toEqual('text');
      mockReq.flush(mockPaymentProvider);
    });
  });

  describe('create payment details with single param', () => {
    it('should create payment details for given user id, cart id and parameters', () => {
      const params = {
        param: 'mockParam'
      };

      service.createPaymentDetails(userId, cartId, params).subscribe(result => {
        expect(result).toEqual(mockPaymentDetails);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'POST' &&
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              cartId +
              '/payment/sop/response'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.headers.get('Content-Type')).toEqual(
        'application/x-www-form-urlencoded'
      );
      expect(mockReq.request.body.get('param')).toEqual('mockParam');
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockPaymentDetails);
    });
  });

  describe('create payment details with multiple params', () => {
    it('should create payment details for given user id, cart id and parameters', () => {
      const params = {
        param1: 'mockParam1',
        param2: 'mockParam2'
      };

      service.createPaymentDetails(userId, cartId, params).subscribe(result => {
        expect(result).toEqual(mockPaymentDetails);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'POST' &&
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              cartId +
              '/payment/sop/response'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.headers.get('Content-Type')).toEqual(
        'application/x-www-form-urlencoded'
      );
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.body.get('param1')).toEqual('mockParam1');
      expect(mockReq.request.body.get('param2')).toEqual('mockParam2');
      mockReq.flush(mockPaymentDetails);
    });
  });

  describe('set payment details', () => {
    it('should set payment details for given user id, cart id and payment details id', () => {
      service.setPaymentDetails(userId, cartId, '123').subscribe(result => {
        expect(result).toEqual(cartData);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'PUT' &&
          req.url ===
            usersEndpoint +
              `/${userId}` +
              cartsEndpoint +
              cartId +
              '/paymentdetails'
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.params.get('paymentDetailsId')).toEqual('123');
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);
    });
  });
});
