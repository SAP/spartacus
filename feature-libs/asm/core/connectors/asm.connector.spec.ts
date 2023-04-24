import { TestBed } from '@angular/core/testing';
import {
  BindCartParams,
  CustomerListsPage,
  CustomerRegistrationForm,
  CustomerSearchOptions,
  CustomerSearchPage,
} from '@spartacus/asm/root';
import { User } from '@spartacus/core';
import { EMPTY, Observable, of } from 'rxjs';
import { AsmAdapter } from './asm.adapter';
import { AsmConnector } from './asm.connector';

class MockAsmAdapter {
  customerSearch(
    _options: CustomerSearchOptions
  ): Observable<CustomerSearchPage> {
    return EMPTY;
  }
  customerLists(): Observable<CustomerListsPage> {
    return EMPTY;
  }
  bindCart(_options: BindCartParams): Observable<unknown> {
    return EMPTY;
  }
  createCustomer(_user: CustomerRegistrationForm): Observable<User> {
    return EMPTY;
  }
}
const MOCK_ID = '00000123';
const MOCK_USER_ID = 'userId';
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

const mockBindCartResponse = {};

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

const mockBindCartParams = {
  cartId: MOCK_ID,
  customerId: MOCK_USER_ID,
};

const user: User = {
  firstName: 'John',
  lastName: 'Smith',
  uid: 'john.smith@test.com',
};

const customerRegistrationForm: CustomerRegistrationForm = {
  firstName: 'John',
  lastName: 'Smith',
  emailAddress: 'john.smith@test.com',
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

  it('should call adapter for bind cart', () => {
    spyOn(asmAdapter, 'bindCart').and.callThrough();

    asmConnector.bindCart(mockBindCartParams);

    expect(asmAdapter.bindCart).toHaveBeenCalledWith(mockBindCartParams);
  });

  it('should pass the adapter bind cart response through to calling context ', (done) => {
    spyOn(asmAdapter, 'bindCart').and.returnValue(of(mockBindCartResponse));

    asmConnector.bindCart(mockBindCartParams).subscribe((results) => {
      expect(results).toEqual(mockBindCartResponse);
      done();
    });
  });

  it('should create a new customer', (done) => {
    spyOn(asmAdapter, 'createCustomer').and.returnValue(of(user));
    asmConnector
      .createCustomer(customerRegistrationForm)
      .subscribe((results) => {
        expect(results).toEqual(user);
        done();
      });
  });
});
