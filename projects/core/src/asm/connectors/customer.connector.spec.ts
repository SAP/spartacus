import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import {
  CustomerSearchOptions,
  CustomerSearchPage,
} from '../models/asm.models';
import { CustomerAdapter } from './customer.adapter';
import { CustomerConnector } from './customer.connector';

class MockCustomerAdapter {
  search(_options: CustomerSearchOptions): Observable<CustomerSearchPage> {
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

describe('CustomerConnector', () => {
  let customerConnector: CustomerConnector;
  let customerAdapter: CustomerAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: CustomerAdapter, useClass: MockCustomerAdapter }],
    });

    customerConnector = TestBed.get(CustomerConnector);
    customerAdapter = TestBed.get(CustomerAdapter);
  });

  it('should be created', () => {
    expect(customerConnector).toBeTruthy();
  });

  it('should call adapter for search', () => {
    spyOn(customerAdapter, 'search').and.stub();
    customerConnector.search(testSearchOptions);
    expect(customerAdapter.search).toHaveBeenCalledWith(testSearchOptions);
  });

  it('should return search results ', () => {
    spyOn(customerAdapter, 'search').and.returnValue(of(testSearchResults));
    let results: CustomerSearchPage;
    customerConnector
      .search(testSearchOptions)
      .subscribe(value => (results = value))
      .unsubscribe();
    expect(results).toEqual(testSearchResults);
  });
});
