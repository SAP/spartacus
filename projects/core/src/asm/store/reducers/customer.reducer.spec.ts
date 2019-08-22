import { User } from 'projects/core/src/model/misc.model';
import { CustomerSearchPage } from '../../models/asm.models';
import { CustomerActions } from '../actions';
import * as fromReducer from './customer.reducer';

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

describe('Customer reducer', () => {
  it('should return the same state for undefined action', () => {
    const { initialState } = fromReducer;
    const action = {} as CustomerActions.CustomerAction;
    const state = fromReducer.reducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should return the initial state for undefined state', () => {
    const { initialState } = fromReducer;
    const action = {} as CustomerActions.CustomerAction;
    const state = fromReducer.reducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should store search results on CustomerSearchSuccess', () => {
    const { initialState } = fromReducer;

    const action = new CustomerActions.CustomerSearchSuccess(
      mockCustomerSearchPage
    );
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(mockCustomerSearchPage);
  });

  it('should CustomerSearchFail not change the state', () => {
    const { initialState } = fromReducer;

    const action = new CustomerActions.CustomerSearchFail({});
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should CustomerSearch not change the state', () => {
    const { initialState } = fromReducer;

    const action = new CustomerActions.CustomerSearch({ searchTerm: 'abc' });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should CustomerSearchReset reset the state', () => {
    const { initialState } = fromReducer;

    const action = new CustomerActions.CustomerSearchReset();
    const state = fromReducer.reducer(mockCustomerSearchPage, action);

    expect(state).toEqual(initialState);
  });
});
