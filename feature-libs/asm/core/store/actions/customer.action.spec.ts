import { StateUtils, User } from '@spartacus/core';
import {
  CustomerSearchOptions,
  CustomerSearchPage,
} from '../../models/asm.models';
import { CUSTOMER_SEARCH_DATA } from '../asm-state';
import { AsmActions } from './index';

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

describe('Customer Actions', () => {
  describe('Customer Search Actions', () => {
    it('should create the Customer Search Actions', () => {
      const searchOptions: CustomerSearchOptions = { query: 'abc' };
      const action = new AsmActions.CustomerSearch(searchOptions);
      expect({ ...action }).toEqual({
        type: AsmActions.CUSTOMER_SEARCH,
        meta: StateUtils.loadMeta(CUSTOMER_SEARCH_DATA),
        payload: searchOptions,
      });
    });

    it('should create the CustomerSearchFail action', () => {
      const error = 'anError';
      const action = new AsmActions.CustomerSearchFail(error);

      expect({ ...action }).toEqual({
        type: AsmActions.CUSTOMER_SEARCH_FAIL,
        meta: StateUtils.failMeta(CUSTOMER_SEARCH_DATA),
        payload: error,
      });
    });

    it('should create the CustomerSearchSuccess action', () => {
      const action = new AsmActions.CustomerSearchSuccess(
        mockCustomerSearchPage
      );

      expect({ ...action }).toEqual({
        type: AsmActions.CUSTOMER_SEARCH_SUCCESS,
        meta: StateUtils.successMeta(CUSTOMER_SEARCH_DATA),
        payload: mockCustomerSearchPage,
      });
    });

    it('should create the CustomerSearchReset action', () => {
      const action = new AsmActions.CustomerSearchReset();

      expect({ ...action }).toEqual({
        type: AsmActions.CUSTOMER_SEARCH_RESET,
        meta: StateUtils.resetMeta(CUSTOMER_SEARCH_DATA),
      });
    });
  });
});
