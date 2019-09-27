import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { AsmConfig } from '../../../asm/config/asm-config';
import { CUSTOMER_SEARCH_PAGE_NORMALIZER } from '../../../asm/connectors/converters';
import {
  CustomerSearchOptions,
  CustomerSearchPage,
} from '../../../asm/models/asm.models';
import { User } from '../../../model/misc.model';
import { BaseSiteService } from '../../../site-context/facade/base-site.service';
import { ConverterService } from '../../../util/converter.service';
import { OccEndpointsService } from '../../services';
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
class MockBaseSiteService {
  getActive(): Observable<string> {
    return of(baseSite);
  }
}

export class MockOccEndpointsService {
  getRawEndpoint(endpoint: string): string {
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

    occAsmAdapter = TestBed.get(OccAsmAdapter);
    httpMock = TestBed.get(HttpTestingController);
    converterService = TestBed.get(ConverterService);
    occEnpointsService = TestBed.get(OccEndpointsService);
    spyOn(converterService, 'pipeable').and.callThrough();
    spyOn(occEnpointsService, 'getRawEndpoint').and.callThrough();
  });

  it('should be created', () => {
    expect(occAsmAdapter).toBeTruthy();
  });

  it('should perform a customer search', () => {
    let result: CustomerSearchPage;
    const searchQuery = 'user@test.com';
    const searchOptions: CustomerSearchOptions = { query: searchQuery };
    occAsmAdapter.customerSearch(searchOptions).subscribe(data => {
      result = data;
    });
    const mockReq: TestRequest = httpMock.expectOne(req => {
      return (
        req.method === 'GET' &&
        req.params.get('query') === searchQuery &&
        req.params.get('baseSite') === baseSite
      );
    });

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(mockCustomerSearchPage);
    expect(result).toEqual(mockCustomerSearchPage);
    expect(converterService.pipeable).toHaveBeenCalledWith(
      CUSTOMER_SEARCH_PAGE_NORMALIZER
    );
    expect(occEnpointsService.getRawEndpoint).toHaveBeenCalledWith(
      'asmCustomerSearch'
    );
  });
});
