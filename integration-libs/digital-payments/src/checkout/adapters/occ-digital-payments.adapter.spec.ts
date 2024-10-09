import {
  HttpRequest,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  Address,
  ConverterService,
  OccEndpointsService,
} from '@spartacus/core';
import { MockOccEndpointsService } from 'projects/core/src/occ/adapters/user/unit-test.helper';
import { DP_DETAILS_NORMALIZER, DP_REQUEST_NORMALIZER } from './converters';
import { DigitalPaymentsAdapter } from './digital-payments.adapter';
import { OccDigitalPaymentsAdapter } from './occ-digital-payments.adapter';
import { DigitalPaymentsConfig } from './config';

const mockSessionId = 'mockSessionId';
const mockSignature = 'mockSignature';
const userId = 'current';
const cartId = 'current';
const mockBillingAddress: Address = {
  firstName: 'John',
  lastName: 'Doe',
  line1: 'GreenStreet',
  line2: '420',
  town: 'Montreal',
  postalCode: 'H3A',
  country: { isocode: 'CA' },
  region: { isocodeShort: 'QC' },
};
const mockDpConfig: DigitalPaymentsConfig = {
  digitalPayments: {
    occQueryParams: {
      sessionId: 'xsid',
      signature: 'xsign',
      billingAddress: 'xbillingAddress',
      country: 'xcountry',
      firstName: 'xfirstName',
      lastName: 'xlastName',
      line1: 'xline1',
      line2: 'xline2',
      town: 'xtown',
      region: 'xregion',
      postalCode: 'xpostalCode',
    },
  },
};

describe('OccDigitalPaymentsAdapter', () => {
  let adapter: DigitalPaymentsAdapter;
  let httpMock: HttpTestingController;
  let occEnpointsService: OccEndpointsService;
  let converterService: ConverterService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: DigitalPaymentsConfig, useValue: mockDpConfig },
        OccDigitalPaymentsAdapter,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    adapter = TestBed.inject(OccDigitalPaymentsAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEnpointsService = TestBed.inject(OccEndpointsService);
    converterService = TestBed.inject(ConverterService);

    spyOn(converterService, 'pipeable').and.callThrough();
    spyOn(occEnpointsService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  it('should create payment details', () => {
    const config = mockDpConfig.digitalPayments?.occQueryParams;
    adapter
      .createPaymentDetails(mockSessionId, mockSignature, userId)
      .subscribe();
    const mockReq = httpMock.expectOne((req: HttpRequest<any>) => {
      return (
        req.method === 'POST' &&
        req.urlWithParams ===
          `/paymentDetails?${config?.sessionId}=${mockSessionId}&${config?.signature}=${mockSignature}`
      );
    });

    expect(occEnpointsService.buildUrl).toHaveBeenCalledWith('paymentDetails', {
      urlParams: { userId, cartId },
    });
    expect(converterService.pipeable).toHaveBeenCalledWith(
      DP_DETAILS_NORMALIZER
    );
    mockReq.flush('');
  });
  it('should create payment details with billing address', () => {
    const config = mockDpConfig.digitalPayments?.occQueryParams;
    adapter
      .createPaymentDetails(
        mockSessionId,
        mockSignature,
        userId,
        undefined,
        mockBillingAddress
      )
      .subscribe();
    const mockReq = httpMock.expectOne((req: HttpRequest<any>) => {
      const expectedUrl = `/paymentDetails?${config?.sessionId}=${mockSessionId}&${config?.signature}=${mockSignature}&${config?.billingAddress}=true&${config?.country}=${mockBillingAddress.country?.isocode}&${config?.firstName}=${mockBillingAddress.firstName}&${config?.lastName}=${mockBillingAddress.lastName}&${config?.line1}=${mockBillingAddress.line1}&${config?.line2}=${mockBillingAddress.line2}&${config?.town}=${mockBillingAddress.town}&${config?.region}=${mockBillingAddress.region?.isocodeShort}&${config?.postalCode}=${mockBillingAddress.postalCode}`;
      return req.method === 'POST' && req.urlWithParams === expectedUrl;
    });

    expect(occEnpointsService.buildUrl).toHaveBeenCalledWith('paymentDetails', {
      urlParams: { userId, cartId },
    });
    expect(converterService.pipeable).toHaveBeenCalledWith(
      DP_DETAILS_NORMALIZER
    );
    mockReq.flush('');
  });

  it('should create payment request', () => {
    adapter.createPaymentRequest(userId).subscribe();
    const mockReq = httpMock.expectOne((req: HttpRequest<any>) => {
      return req.method === 'POST';
    });
    expect(occEnpointsService.buildUrl).toHaveBeenCalledWith('paymentRequest', {
      urlParams: { userId, cartId },
    });
    expect(converterService.pipeable).toHaveBeenCalledWith(
      DP_REQUEST_NORMALIZER
    );
    mockReq.flush('');
  });
});
