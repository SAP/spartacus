import { TestBed } from '@angular/core/testing';
import {
  CustomerListsPage,
  CustomerSearchOptions,
  CustomerSearchPage,
} from '@spartacus/asm/root';
import { Observable, of } from 'rxjs';
import { AsmAdapter } from './asm.adapter';
import { AsmConnector } from './asm.connector';

class MockAsmAdapter {
  customerSearch(
    _options: CustomerSearchOptions
  ): Observable<CustomerSearchPage> {
    return of();
  }
  customerLists(): Observable<CustomerListsPage> {
    return of();
  }
}

const testSearchOptions: CustomerSearchOptions = { query: 'abcde' };
const testSearchResults: CustomerSearchPage = {
  entries: [
    {
      name: 'test-name',
      uid: 'test-uid',
      customerId: 'test-customerId',
      displayUid: 'test-displayUid',
      firstName: 'test-firstName',
      lastName: 'test-lastName',
    },
    {
      name: 'test-name',
      uid: 'test-uid',
      customerId: 'test-customerId',
      displayUid: 'test-displayUid',
      firstName: 'test-firstName',
      lastName: 'test-lastName',
    },
  ],
  pagination: {
    currentPage: 0,
    pageSize: 20,
  },
} as CustomerSearchPage;

const mockCustomerListPage: CustomerListsPage = {
  userGroups: [
    {
      name: 'Current In-Store Customers',
      uid: 'instoreCustomers',
    },
    {
      name: 'Pick-Up In-Store Customers',
      uid: 'bopisCustomers',
    },
    {
      name: 'My Recent Customer Sessions',
      uid: 'myRecentCustomerSessions',
    },
  ],
};

describe('AsmConnector', () => {
  let asmConnector: AsmConnector;
  let asmAdapter: AsmAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AsmAdapter, useClass: MockAsmAdapter }],
    });

    asmConnector = TestBed.inject(AsmConnector);
    asmAdapter = TestBed.inject(AsmAdapter);
  });

  it('should be created', () => {
    expect(asmConnector).toBeTruthy();
  });

  it('should call adapter for customerSearch', () => {
    spyOn(asmAdapter, 'customerSearch').and.stub();
    asmConnector.customerSearch(testSearchOptions);
    expect(asmAdapter.customerSearch).toHaveBeenCalledWith(testSearchOptions);
  });

  it('should return customerSearch results ', (done) => {
    spyOn(asmAdapter, 'customerSearch').and.returnValue(of(testSearchResults));
    asmConnector.customerSearch(testSearchOptions).subscribe((results) => {
      expect(results).toEqual(testSearchResults);
      done();
    });
  });

  it('should call adapter for customerLists', () => {
    spyOn(asmAdapter, 'customerLists').and.stub();
    asmConnector.customerLists();
    expect(asmAdapter.customerLists).toHaveBeenCalled();
  });

  it('should return customerLists results', (done) => {
    spyOn(asmAdapter, 'customerLists').and.returnValue(
      of(mockCustomerListPage)
    );
    asmConnector.customerLists().subscribe((results) => {
      expect(results).toEqual(mockCustomerListPage);
      done();
    });
  });
});
