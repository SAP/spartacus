import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  Cart,
  ConverterService,
  Occ,
  OccConfig,
  PaymentDetails,
  PAYMENT_DETAILS_NORMALIZER,
  OccEndpoints,
} from '@spartacus/core';
import { OccCheckoutPaymentAdapter } from './occ-checkout-payment.adapter';
import {
  CARD_TYPE_NORMALIZER,
  PAYMENT_DETAILS_SERIALIZER,
} from '@spartacus/checkout/core';

const userId = '123';
const cartId = '456';
const cartData: Cart = {
  store: 'electronics',
  guid: '1212121',
};
const mockPaymentDetails: PaymentDetails = {
  accountHolderName: 'mockPaymentDetails',
  cardType: {
    code: 'aaa',
  },
  billingAddress: {
    country: {},
    region: {},
  },
};

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
      endpoints: {
        setCartPaymentDetails: 'users/${userId}/carts/${cartId}/paymentdetails',
        paymentProviderSubInfo:
          'users/${userId}/carts/${cartId}/payment/sop/request?responseUrl=sampleUrl',
        createPaymentDetails:
          'users/${userId}/carts/${cartId}/payment/sop/response',
        cardTypes: 'cardtypes',
      } as OccEndpoints,
    },
  },
  context: {
    baseSite: [''],
  },
};

const paymentProviderInfo = {
  mappingLabels: {
    entry: [
      {
        key: 'hybris_sop_amount',
        value: 'amount',
      },
      {
        key: 'hybris_sop_currency',
        value: '',
      },
      {
        key: 'hybris_billTo_country',
        value: 'billTo_country',
      },
      {
        key: 'hybris_card_type',
        value: 'card_type',
      },
      {
        key: 'hybris_card_expiration_year',
        value: 'card_expirationYear',
      },
      {
        key: 'hybris_sop_reason_code',
        value: 'reason_code',
      },
      {
        key: 'hybris_combined_expiry_date',
        value: 'false',
      },
      {
        key: 'hybris_sop_decision',
        value: 'decision',
      },
      {
        key: 'hybris_card_expiry_date',
        value: 'card_expirationDate',
      },
      {
        key: 'hybris_card_expiration_month',
        value: 'card_expirationMonth',
      },
      {
        key: 'hybris_billTo_street1',
        value: 'billTo_street1',
      },
      {
        key: 'hybris_sop_card_number',
        value: 'card_accountNumber',
      },
      {
        key: 'hybris_separator_expiry_date',
        value: '',
      },
      {
        key: 'hybris_account_holder_name',
        value: 'mockup_account_holder',
      },
      {
        key: 'hybris_sop_uses_public_signature',
        value: 'false',
      },
      {
        key: 'hybris_card_number',
        value: 'card_accountNumber',
      },
      {
        key: 'hybris_card_cvn',
        value: 'card_cvNumber',
      },
      {
        key: 'hybris_billTo_lastname',
        value: 'billTo_lastName',
      },
      {
        key: 'hybris_billTo_city',
        value: 'billTo_city',
      },
      {
        key: 'hybris_billTo_firstname',
        value: 'billTo_firstName',
      },
      {
        key: 'hybris_billTo_region',
        value: 'billTo_state',
      },
      {
        key: 'hybris_billTo_postalcode',
        value: 'billTo_postalCode',
      },
    ],
  },
  parameters: {
    entry: [],
  },
  postUrl: 'https://testurl',
};

const html =
  '<form id="silentOrderPostForm" name="silentOrderPostForm" action="javascript:false;" method="post">' +
  '<div id="postFormItems">' +
  '<dl>' +
  '<input type="hidden" id="billTo_city" name="billTo_city" value="MainCity" />' +
  '<input type="hidden" id="amount" name="amount" value="0" />' +
  '<input type="hidden" id="decision_publicSignature" name="decision_publicSignature" value="mEhlMRLCsuPimhp50ElrY94zFyc=" />' +
  '<input type="hidden" id="decision" name="decision" value="ACCEPT" />' +
  '<input type="hidden" id="billTo_country" name="billTo_country" value="US" />' +
  '<input type="hidden" id="billTo_state" name="billTo_state" value="CA" />' +
  '<input type="hidden" id="billTo_lastName" name="billTo_lastName" value="test" />' +
  '<input type="hidden" id="ccAuthReply_cvCode" name="ccAuthReply_cvCode" value="M" />' +
  '<input type="hidden" id="billTo_postalCode" name="billTo_postalCode" value="12345" />' +
  '<input type="hidden" id="billTo_street1" name="billTo_street1" value="999 de Maisonneuve" />' +
  '<input type="hidden" id="billTo_firstName" name="billTo_firstName" value="test" />' +
  '<input type="hidden" id="card_cardType" name="card_cardType" value="visa" />' +
  '<input type="hidden" id="card_expirationMonth" name="card_expirationMonth" value="12" />' +
  '<input type="hidden" id="card_expirationYear" name="card_expirationYear" value="2020" />' +
  '<input type="hidden" id="reasonCode" name="reasonCode" value="100" />' +
  '<input type="hidden" id="card_accountNumber" name="card_accountNumber" value="************1111" />' +
  '</dl>' +
  '</div>' +
  '</form>';

describe('OccCheckoutPaymentAdapter', () => {
  let service: OccCheckoutPaymentAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCheckoutPaymentAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });
    service = TestBed.inject(OccCheckoutPaymentAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);

    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(converter, 'pipeableMany').and.callThrough();
    spyOn(converter, 'convert').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('set payment details', () => {
    it('should set payment details for given user id, cart id and payment details id', () => {
      const paymentDetailsId = '999';

      service.set(userId, cartId, paymentDetailsId).subscribe((result) => {
        expect(result).toEqual(cartData);
      });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PUT' &&
          req.url ===
            `users/${userId}/carts/${cartId}/paymentdetails?paymentDetailsId=${paymentDetailsId}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cartData);
    });
  });

  describe('create payment', () => {
    it('should create payment', () => {
      service.create(userId, cartId, mockPaymentDetails).subscribe((result) => {
        expect(result).toEqual(mockPaymentDetails);
      });

      httpMock
        .expectOne((req) => {
          return (
            req.method === 'GET' &&
            req.url ===
              `users/${userId}/carts/${cartId}/payment/sop/request?responseUrl=sampleUrl`
          );
        })
        .flush(paymentProviderInfo);

      httpMock
        .expectOne((req) => {
          return (
            req.method === 'POST' && req.url === paymentProviderInfo.postUrl
          );
        })
        .flush(html);

      httpMock
        .expectOne((req) => {
          return (
            req.method === 'POST' &&
            req.url === `users/${userId}/carts/${cartId}/payment/sop/response`
          );
        })
        .flush(mockPaymentDetails);

      expect(converter.pipeable).toHaveBeenCalledWith(
        PAYMENT_DETAILS_NORMALIZER
      );
      expect(converter.convert).toHaveBeenCalledWith(
        mockPaymentDetails,
        PAYMENT_DETAILS_SERIALIZER
      );
    });
  });

  describe('get payment provider subscription info', () => {
    it('should get payment provider subscription info for given user id and cart id', () => {
      // testing protected method
      (service as any)
        .getProviderSubInfo(userId, cartId)
        .subscribe((result) => {
          expect(result).toEqual(cartData);
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.url ===
            `users/${userId}/carts/${cartId}/payment/sop/request?responseUrl=sampleUrl`
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
        param: 'mockParam',
      };
      const mockUrl = 'mockUrl';
      const mockPaymentProvider = 'mockPaymentProvider';

      // testing protected method
      (service as any)
        .createSubWithProvider(mockUrl, params)
        .subscribe((result) => {
          expect(result).toEqual(mockPaymentProvider);
        });

      const mockReq = httpMock.expectOne((req) => {
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
        param2: 'mockParam2',
      };
      const mockUrl = 'mockUrl';
      const mockPaymentProvider = 'mockPaymentProvider';

      // testing protected method
      (service as any)
        .createSubWithProvider(mockUrl, params)
        .subscribe((result) => {
          expect(result).toEqual(mockPaymentProvider);
        });

      const mockReq = httpMock.expectOne((req) => {
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
        param: 'mockParam',
      };

      // testing protected method
      (service as any)
        .createDetailsWithParameters(userId, cartId, params)
        .subscribe((result) => {
          expect(result).toEqual(mockPaymentDetails);
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'POST' &&
          req.url === `users/${userId}/carts/${cartId}/payment/sop/response`
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
        param2: 'mockParam2',
      };

      // testing protected method
      (service as any)
        .createDetailsWithParameters(userId, cartId, params)
        .subscribe((result) => {
          expect(result).toEqual(mockPaymentDetails);
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'POST' &&
          req.url === `users/${userId}/carts/${cartId}/payment/sop/response`
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

  describe('loadCardTypes', () => {
    it('should return cardTypes', () => {
      const cardTypesList: Occ.CardTypeList = {
        cardTypes: [
          {
            code: 'amex',
            name: 'American Express',
          },
          {
            code: 'maestro',
            name: 'Maestro',
          },
        ],
      };

      service.loadCardTypes().subscribe((result) => {
        expect(result).toEqual(cardTypesList.cardTypes);
      });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET' && req.url === 'cardtypes';
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cardTypesList);
    });

    it('should use converter', () => {
      service.loadCardTypes().subscribe();
      httpMock.expectOne('cardtypes').flush({});
      expect(converter.pipeableMany).toHaveBeenCalledWith(CARD_TYPE_NORMALIZER);
    });

    describe('getParamsForPaymentProvider() function ', () => {
      const parametersSentByBackend = [
        { key: 'billTo_country', value: 'CA' },
        { key: 'billTo_state', value: 'QC' },
      ];
      const labelsMap = {
        hybris_billTo_country: 'billTo_country',
        hybris_billTo_region: 'billTo_state',
      };

      it('should support billing address in a different country than the default/shipping address.', () => {
        const paymentDetails: PaymentDetails = {
          cardType: { code: 'visa' },
          billingAddress: {
            country: { isocode: 'US' },
            region: { isocodeShort: 'RG' },
          },
        };
        const params = service['getParamsForPaymentProvider'](
          paymentDetails,
          parametersSentByBackend,
          labelsMap
        );
        expect(params['billTo_country']).toEqual(
          paymentDetails.billingAddress.country.isocode
        );
        expect(params['billTo_state']).toEqual(
          paymentDetails.billingAddress.region.isocodeShort
        );
      });

      it('should support billing address different than shipping when billing country has no region.', () => {
        const paymentDetails: PaymentDetails = {
          cardType: { code: 'visa' },
          billingAddress: {
            country: { isocode: 'PL' },
          },
        };

        const params = service['getParamsForPaymentProvider'](
          paymentDetails,
          parametersSentByBackend,
          labelsMap
        );
        expect(params['billTo_country']).toEqual(
          paymentDetails.billingAddress.country.isocode
        );
        expect(params['billTo_state']).toEqual('');
      });
    });
  });
});
