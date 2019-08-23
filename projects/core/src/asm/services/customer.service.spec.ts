import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { User } from '../../model/misc.model';
import { BaseSiteService } from '../../site-context/facade/base-site.service';
import { AsmConfig } from '../config/asm-config';
import {
  CustomerSearchOptions,
  CustomerSearchPage,
} from '../models/asm.models';
import { CustomerService } from './customer.service';

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

describe('CustomerService', () => {
  let customerService: CustomerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CustomerService,
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        { provide: AsmConfig, useValue: MockAsmConfig },
      ],
    });

    customerService = TestBed.get(CustomerService);
    httpMock = TestBed.get(HttpTestingController as Type<
      HttpTestingController
    >);
  });

  it('should be created', () => {
    const service: CustomerService = TestBed.get(CustomerService);
    expect(service).toBeTruthy();
  });

  it('should perform a customer search', () => {
    let result: CustomerSearchPage;
    const searchQuery = 'user@test.com';
    const searchOptions: CustomerSearchOptions = { query: searchQuery };
    customerService.search(searchOptions).subscribe(data => {
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
  });
});
