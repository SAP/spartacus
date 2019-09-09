import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { User } from '../../../model/misc.model';
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
});
