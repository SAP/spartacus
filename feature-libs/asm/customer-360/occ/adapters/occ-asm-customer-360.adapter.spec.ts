import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  AsmCustomer360Request,
  AsmCustomer360Response,
  AsmCustomer360Type,
} from '@spartacus/asm/customer-360/root';
import {
  BaseOccUrlProperties,
  BaseSiteService,
  ConverterService,
  DynamicAttributes,
  OccEndpointsService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { OccAsmCustomer360Adapter } from './occ-asm-customer-360.adapter';

const baseSite = 'test-site';
class MockBaseSiteService {
  getActive(): Observable<string> {
    return of(baseSite);
  }
}

class MockOccEndpointsService implements Partial<OccEndpointsService> {
  buildUrl(
    endpoint: string,
    _attributes?: DynamicAttributes,
    _propertiesToOmit?: BaseOccUrlProperties
  ): string {
    return endpoint;
  }
}

describe('OccAsmCustomer360Adapter', () => {
  let occAsmCustomer360Adapter: OccAsmCustomer360Adapter;
  let converterService: ConverterService;
  let httpMock: HttpTestingController;
  let occEnpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccAsmCustomer360Adapter,
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    occAsmCustomer360Adapter = TestBed.inject(OccAsmCustomer360Adapter);
    httpMock = TestBed.inject(HttpTestingController);
    converterService = TestBed.inject(ConverterService);
    occEnpointsService = TestBed.inject(OccEndpointsService);
    spyOn(converterService, 'pipeable').and.callThrough();
    spyOn(occEnpointsService, 'buildUrl').and.callThrough();
  });

  it('should be created', () => {
    expect(occAsmCustomer360Adapter).toBeTruthy();
  });

  it('should get customer 360 data', (done) => {
    const request: AsmCustomer360Request = {
      queries: [
        {
          type: AsmCustomer360Type.REVIEW_LIST,
        },
      ],
      options: {
        userId: 'user001',
      },
    };

    const response: AsmCustomer360Response = {
      value: [
        {
          type: AsmCustomer360Type.REVIEW_LIST,
          reviews: [],
        },
      ],
    };

    occAsmCustomer360Adapter
      .getAsmCustomer360Data(request)
      .subscribe((backendResponse) => {
        expect(backendResponse).toBe(response);
        done();
      });

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.url === 'asmCustomer360' &&
        req.method === 'POST' &&
        req.body.customer360Queries === request.queries
      );
    });

    mockReq.flush(response);
  });

  it('should get customer 360 data', (done) => {
    const request: AsmCustomer360Request = {
      queries: [
        {
          type: AsmCustomer360Type.REVIEW_LIST,
        },
      ],
      options: {
        userId: 'user001',
      },
    };

    const response: AsmCustomer360Response = {
      value: [
        {
          type: AsmCustomer360Type.REVIEW_LIST,
          reviews: [],
        },
      ],
    };

    occAsmCustomer360Adapter
      .getAsmCustomer360Data(request)
      .subscribe((backendResponse) => {
        expect(backendResponse).toBe(response);
        done();
      });

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.url === 'asmCustomer360' &&
        req.method === 'POST' &&
        req.body.customer360Queries === request.queries
      );
    });

    mockReq.flush(response);
  });
});
