import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  AsmConfig,
  CustomerSearchOptions,
  CustomerSearchPage,
  CUSTOMER_SEARCH_PAGE_NORMALIZER,
} from '@spartacus/asm/core';
import {
  BaseOccUrlProperties,
  BaseSiteService,
  ConverterService,
  DynamicAttributes,
  OccEndpointsService,
  User,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { OccAsmAdapter } from './occ-asm.adapter';

const MockAsmConfig: AsmConfig = {
  backend: {
    occ: {
      baseUrl: '',
    },
  },
};

const mockUser: User = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  uid: 'user@test.com',
  customerId: '123456',
};

const mockCustomerSearchPage: CustomerSearchPage = {
  entries: [mockUser],
} as CustomerSearchPage;

const baseSite = 'test-site';
const defaultSort = 'byNameAsc';
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

describe('OccAsmAdapter', () => {
  let occAsmAdapter: OccAsmAdapter;
  let converterService: ConverterService;
  let httpMock: HttpTestingController;
  let occEnpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccAsmAdapter,
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        { provide: AsmConfig, useValue: MockAsmConfig },
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    occAsmAdapter = TestBed.inject(OccAsmAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converterService = TestBed.inject(ConverterService);
    occEnpointsService = TestBed.inject(OccEndpointsService);
    spyOn(converterService, 'pipeable').and.callThrough();
    spyOn(occEnpointsService, 'buildUrl').and.callThrough();
  });

  it('should be created', () => {
    expect(occAsmAdapter).toBeTruthy();
  });

  it('should perform a customer search with all params', () => {
    let result: CustomerSearchPage;
    const searchQuery = 'user@test.com';
    const pageSize = 10;
    const searchOptions: CustomerSearchOptions = {
      query: searchQuery,
      pageSize,
    };
    occAsmAdapter.customerSearch(searchOptions).subscribe((data) => {
      result = data;
    });
    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET';
    });

    expect(mockReq.request.params.get('baseSite')).toBe(baseSite);
    expect(mockReq.request.params.get('sort')).toBe(defaultSort);
    expect(mockReq.request.params.get('query')).toBe(searchQuery);
    expect(mockReq.request.params.get('pageSize')).toBe(pageSize + '');

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(mockCustomerSearchPage);
    expect(result).toEqual(mockCustomerSearchPage);
    expect(converterService.pipeable).toHaveBeenCalledWith(
      CUSTOMER_SEARCH_PAGE_NORMALIZER
    );
    expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
      'asmCustomerSearch',
      {},
      {
        baseSite: false,
        prefix: false,
      }
    );
  });

  it('should not include optional params if they are not in the options', () => {
    let result: CustomerSearchPage;
    const searchOptions: CustomerSearchOptions = {};
    occAsmAdapter.customerSearch(searchOptions).subscribe((data) => {
      result = data;
    });
    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET';
    });

    expect(mockReq.request.params.get('baseSite')).toBe(baseSite);
    expect(mockReq.request.params.get('sort')).toBe(defaultSort);
    expect(mockReq.request.params.get('query')).toBeNull();
    expect(mockReq.request.params.get('pageSize')).toBeNull();

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(mockCustomerSearchPage);
    expect(result).toEqual(mockCustomerSearchPage);
    expect(converterService.pipeable).toHaveBeenCalledWith(
      CUSTOMER_SEARCH_PAGE_NORMALIZER
    );
    expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
      'asmCustomerSearch',
      {},
      {
        baseSite: false,
        prefix: false,
      }
    );
  });

  it('should perform a customer search with pageSize 0', () => {
    let result: CustomerSearchPage;
    const searchQuery = 'user@test.com';
    const pageSize = 0;
    const searchOptions: CustomerSearchOptions = {
      query: searchQuery,
      pageSize,
    };
    occAsmAdapter.customerSearch(searchOptions).subscribe((data) => {
      result = data;
    });
    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET';
    });

    expect(mockReq.request.params.get('baseSite')).toBe(baseSite);
    expect(mockReq.request.params.get('sort')).toBe(defaultSort);
    expect(mockReq.request.params.get('query')).toBe(searchQuery);
    expect(mockReq.request.params.get('pageSize')).toBe(pageSize + '');

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(mockCustomerSearchPage);
    expect(result).toEqual(mockCustomerSearchPage);
    expect(converterService.pipeable).toHaveBeenCalledWith(
      CUSTOMER_SEARCH_PAGE_NORMALIZER
    );
    expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
      'asmCustomerSearch',
      {},
      {
        baseSite: false,
        prefix: false,
      }
    );
  });
});
