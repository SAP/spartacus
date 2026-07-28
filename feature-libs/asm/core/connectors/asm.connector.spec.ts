import { TestBed } from '@angular/core/testing';
import {
  AsmSessionCreationOptions,
  BindCartParams,
  CustomerListsPage,
  CustomerRegistrationForm,
  CustomerSearchOptions,
  CustomerSearchPage,
} from '@spartacus/asm/root';
import { User } from '@spartacus/core';
import { EMPTY, Observable, of, firstValueFrom } from 'rxjs';
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
  createAsmSessionEvent(_options: AsmSessionCreationOptions): void {}
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
    vi.spyOn(asmAdapter, 'customerSearch').mockImplementation(() => {});
    asmConnector.customerSearch(testSearchOptions);
    expect(asmAdapter.customerSearch).toHaveBeenCalledWith(testSearchOptions);
  });

  it('should return customerSearch results ', async () => {
    vi.spyOn(asmAdapter, 'customerSearch').mockReturnValue(of(testSearchResults));
    const results = await firstValueFrom(asmConnector.customerSearch(testSearchOptions));
    expect(results).toEqual(testSearchResults);
  });

  it('should call adapter for customerLists', () => {
    vi.spyOn(asmAdapter, 'customerLists').mockImplementation(() => {});
    asmConnector.customerLists();
    expect(asmAdapter.customerLists).toHaveBeenCalled();
  });

  it('should return customerLists results', async () => {
    vi.spyOn(asmAdapter, 'customerLists').mockReturnValue(
      of(mockCustomerListPage)
    );
    const results = await firstValueFrom(asmConnector.customerLists());
    expect(results).toEqual(mockCustomerListPage);
  });

  it('should call adapter for bind cart', () => {
    vi.spyOn(asmAdapter, 'bindCart');

    asmConnector.bindCart(mockBindCartParams);

    expect(asmAdapter.bindCart).toHaveBeenCalledWith(mockBindCartParams);
  });

  it('should pass the adapter bind cart response through to calling context ', async () => {
    vi.spyOn(asmAdapter, 'bindCart').mockReturnValue(of(mockBindCartResponse));

    const results = await firstValueFrom(asmConnector.bindCart(mockBindCartParams));
    expect(results).toEqual(mockBindCartResponse);
  });

  it('should create a new customer', async () => {
    vi.spyOn(asmAdapter, 'createCustomer').mockReturnValue(of(user));
    const results = await firstValueFrom(
      asmConnector.createCustomer(customerRegistrationForm)
    );
    expect(results).toEqual(user);
  });

  it('should call adapter for createAsmSessionEvent', () => {
    vi.spyOn(asmAdapter, 'createAsmSessionEvent').mockImplementation(() => {});
    const options: AsmSessionCreationOptions = { eventType: 'startSession' };
    asmConnector.createAsmSessionEvent(options);
    expect(asmAdapter.createAsmSessionEvent).toHaveBeenCalled();
  });
});
