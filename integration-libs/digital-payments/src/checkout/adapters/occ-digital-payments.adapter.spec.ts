import { MockOccEndpointsService } from './../../../../../projects/core/src/occ/adapters/user/unit-test.helper';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { OccDigitalPaymentsAdapter } from './occ-digital-payments.adapter';
import { TestBed } from '@angular/core/testing';

import { OccEndpointsService } from '@spartacus/core';
import { HttpRequest } from '@angular/common/http';
import { DigitalPaymentsAdapter } from './digital-payments.adapter';

const mockSessionId = 'mockSessionId';
const mockSignature = 'mockSignature';

describe('OccDigitalPaymentsAdapter', () => {
  let adapter: DigitalPaymentsAdapter;
  let httpMock: HttpTestingController;
  let occEnpointsService: OccEndpointsService;

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
    spyOn(occEnpointsService, 'getBaseEndpoint').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  it('should create payment details', () => {
    adapter.createPaymentDetails(mockSessionId, mockSignature).subscribe();
    httpMock.expectOne((req: HttpRequest<any>) => {
      return req.method === 'POST';
    }, `POST method and url`);
    expect(occEnpointsService.getBaseEndpoint).toHaveBeenCalled();
  });

  it('should create payment request', () => {
    adapter.createPaymentRequest().subscribe();
    httpMock.expectOne((req: HttpRequest<any>) => {
      return req.method === 'POST';
    }, `POST method and url`);
    expect(occEnpointsService.getBaseEndpoint).toHaveBeenCalled();
  });
});
