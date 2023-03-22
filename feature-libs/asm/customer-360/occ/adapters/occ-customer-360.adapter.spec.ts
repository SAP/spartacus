import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  Customer360Request,
  Customer360Response,
  Customer360Type,
} from '@spartacus/asm/customer-360/root';
import {
  BaseOccUrlProperties,
  BaseSiteService,
  ConverterService,
  DynamicAttributes,
  OccEndpointsService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { OccCustomer360Adapter } from './occ-customer-360.adapter';

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

describe('OccCustomer360Adapter', () => {
  let occCustomer360Adapter: OccCustomer360Adapter;
  let converterService: ConverterService;
  let httpMock: HttpTestingController;
  let occEnpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCustomer360Adapter,
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    occCustomer360Adapter = TestBed.inject(OccCustomer360Adapter);
    httpMock = TestBed.inject(HttpTestingController);
    converterService = TestBed.inject(ConverterService);
    occEnpointsService = TestBed.inject(OccEndpointsService);
    spyOn(converterService, 'pipeable').and.callThrough();
    spyOn(occEnpointsService, 'buildUrl').and.callThrough();
  });

  it('should be created', () => {
    expect(occCustomer360Adapter).toBeTruthy();
  });

  it('should get customer 360 data', (done) => {
    const request: Customer360Request = {
      queries: [
        {
          type: Customer360Type.REVIEW_LIST,
        },
      ],
      options: {
        userId: 'user001',
      },
    };

    const response: Customer360Response = {
      value: [
        {
          type: Customer360Type.REVIEW_LIST,
          reviews: [],
        },
      ],
    };

    occCustomer360Adapter
      .getCustomer360Data(request)
      .subscribe((backendResponse) => {
        expect(backendResponse).toBe(response);
        done();
      });

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.url === 'customer360' &&
        req.method === 'POST' &&
        req.body.customer360Queries === request.queries
      );
    });

    mockReq.flush(response);
  });

  it('should get customer 360 data', (done) => {
    const request: Customer360Request = {
      queries: [
        {
          type: Customer360Type.REVIEW_LIST,
        },
      ],
      options: {
        userId: 'user001',
      },
    };

    const response: Customer360Response = {
      value: [
        {
          type: Customer360Type.REVIEW_LIST,
          reviews: [],
        },
      ],
    };

    occCustomer360Adapter
      .getCustomer360Data(request)
      .subscribe((backendResponse) => {
        expect(backendResponse).toBe(response);
        done();
      });

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.url === 'customer360' &&
        req.method === 'POST' &&
        req.body.customer360Queries === request.queries
      );
    });

    mockReq.flush(response);
  });
});
