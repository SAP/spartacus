import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  CustomerListsPage,
  CustomerSearchOptions,
  CustomerSearchPage,
} from '@spartacus/asm/root';
import { QueryService, QueryState, User } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { AsmConnector } from '../connectors';
import { AsmActions } from '../store/actions/index';
import { ASM_FEATURE, StateWithAsm } from '../store/asm-state';
import * as fromReducers from '../store/reducers/index';
import { AsmCustomerListService } from './asm-customer-list.service';

const mockCustomerListsPage: CustomerListsPage = {
  currentPage: 0,
  numberOfPages: 1,
  pageSize: 5,
  totalNumber: 1,
  userGroups: [{ uid: 'mock-usergroup-uid', name: 'User Group 1' }],
};

class MockAsmConnector implements Partial<AsmConnector> {
  customerLists(): Observable<CustomerListsPage> {
    return of(mockCustomerListsPage);
  }
}

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
};

describe('AsmCustomerListService', () => {
  let service: AsmCustomerListService;
  let asmConnector: AsmConnector;
  let store: Store<StateWithAsm>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(ASM_FEATURE, fromReducers.getReducers()),
      ],
      providers: [
        AsmCustomerListService,
        QueryService,
        { provide: AsmConnector, useClass: MockAsmConnector },
      ],
    });

    asmConnector = TestBed.inject(AsmConnector);
    spyOn(asmConnector, 'customerLists').and.callThrough();

    service = TestBed.inject(AsmCustomerListService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCustomerLists()', () => {
    it('should emit response data from connector', () => {
      let actual: CustomerListsPage | undefined;
      const expected = mockCustomerListsPage;

      service.getCustomerLists().subscribe((response) => (actual = response));

      expect(actual).toEqual(expected);
    });

    it('should request customer lists only once for multiple subscribers', () => {
      service.getCustomerLists().subscribe();
      service.getCustomerLists().subscribe();

      expect(asmConnector.customerLists).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCustomerListsState()', () => {
    it('should emit a query state with the response data from connector', () => {
      let actual: QueryState<CustomerListsPage> | undefined;
      const expected: QueryState<CustomerListsPage> = {
        loading: false,
        data: mockCustomerListsPage,
        error: false,
      };
      service
        .getCustomerListsState()
        .subscribe((response) => (actual = response));

      expect(actual).toEqual(expected);
    });
  });
  it('should dispatch proper action for customer list customers search', () => {
    spyOn(store, 'dispatch').and.stub();
    const searchOptions: CustomerSearchOptions = {
      customerListId: 'mock-customer-list-id',
    };

    service.customerListCustomersSearch(searchOptions);

    expect(store.dispatch).toHaveBeenCalledWith(
      new AsmActions.CustomerListCustomersSearch(searchOptions)
    );
  });

  it('should return customer list customers search result', () => {
    store.dispatch(
      new AsmActions.CustomerListCustomersSearchSuccess(mockCustomerSearchPage)
    );
    let result: CustomerSearchPage;

    service
      .getCustomerListCustomersSearchResults()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual(mockCustomerSearchPage);
  });

  it('should return customer list customers search result loading status', () => {
    let result: boolean;

    service
      .getCustomerListCustomersSearchResultsLoading()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual(false);
  });

  it('should dispatch proper action for customer list customers search reset', () => {
    spyOn(store, 'dispatch').and.stub();

    service.customerListCustomersSearchReset();

    expect(store.dispatch).toHaveBeenCalledWith(
      new AsmActions.CustomerListCustomersSearchReset()
    );
  });
});
