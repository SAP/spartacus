import { MockOccEndpointsService } from './../../../../../projects/core/src/occ/adapters/user/unit-test.helper';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { OccDigitalPaymentsAdapter } from './occ-digital-payments.adapter';
import { TestBed } from '@angular/core/testing';
import { OccEndpointsService, ConverterService } from '@spartacus/core';
import { HttpRequest } from '@angular/common/http';
import { DigitalPaymentsAdapter } from './digital-payments.adapter';
import { DP_DETAILS_NORMALIZER, DP_REQUEST_NORMALIZER } from './converters';

const mockSessionId = 'mockSessionId';
const mockSignature = 'mockSignature';
const userId = 'current';
const cartId = 'current';

describe('OccDigitalPaymentsAdapter', () => {
  let adapter: DigitalPaymentsAdapter;
  let httpMock: HttpTestingController;
  let occEnpointsService: OccEndpointsService;
  let converterService: ConverterService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
        {
          provide: DigitalPaymentsAdapter,
          useClass: OccDigitalPaymentsAdapter,
        },
      ],
    });

    adapter = TestBed.inject(DigitalPaymentsAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEnpointsService = TestBed.inject(OccEndpointsService);
    spyOn(occEnpointsService, 'buildUrl').and.callThrough();
    converterService = TestBed.inject(ConverterService);
    spyOn(converterService, 'pipeable').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  it('should create payment details', () => {
    adapter
      .createPaymentDetails(mockSessionId, mockSignature, userId)
      .subscribe();
    const mockReq = httpMock.expectOne((req: HttpRequest<any>) => {
      return (
        req.method === 'POST' &&
        req.urlWithParams ===
          `/paymentDetails?sid=${mockSessionId}&sign=${mockSignature}`
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
