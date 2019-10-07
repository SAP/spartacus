import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { User } from '../../../model/misc.model';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { CustomerSearchPage } from '../../models/asm.models';
import { AsmActions } from '../actions';
import { StateWithAsm } from '../asm-state';
import * as fromReducers from '../reducers/index';
import { AsmSelectors } from './index';

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

describe('Customer Search Results Selectors', () => {
  let store: Store<StateWithAsm>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('asm', fromReducers.getReducers()),
      ],
    });

    store = TestBed.get(Store as Type<Store<StateWithAsm>>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should return a Customer Search results from the state', () => {
    let result: CustomerSearchPage;

    store
      .pipe(select(AsmSelectors.getCustomerSearchResults))
      .subscribe(value => (result = value));
    expect(result).toEqual(undefined);

    store.dispatch(
      new AsmActions.CustomerSearchSuccess(mockCustomerSearchPage)
    );

    expect(result).toEqual(mockCustomerSearchPage);
  });

  it('should return Customer Search results loading state from the state', () => {
    let result: boolean;

    store
      .pipe(select(AsmSelectors.getCustomerSearchResultsLoading))
      .subscribe(value => (result = value));
    expect(result).toEqual(false);

    store.dispatch(new AsmActions.CustomerSearch({ query: 'abc' }));

    expect(result).toEqual(true);
  });

  it('should return Customer Search results loader state', () => {
    store.dispatch(
      new AsmActions.CustomerSearchSuccess(mockCustomerSearchPage)
    );

    let result: LoaderState<CustomerSearchPage>;
    store
      .pipe(select(AsmSelectors.getCustomerSearchResultsLoaderState))
      .subscribe(value => (result = value))
      .unsubscribe();

    expect(result).toEqual({
      error: false,
      loading: false,
      success: true,
      value: mockCustomerSearchPage,
    } as LoaderState<CustomerSearchPage>);
  });
});
