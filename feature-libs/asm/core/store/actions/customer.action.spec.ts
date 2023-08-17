import { CustomerSearchOptions, CustomerSearchPage } from '@spartacus/asm/root';
import { StateUtils, User } from '@spartacus/core';
import {
  CUSTOMER_LIST_CUSTOMERS_SEARCH_DATA,
  CUSTOMER_SEARCH_DATA,
} from '../asm-state';
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
const error = new Error('anError');

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
      const action = new AsmActions.CustomerSearchFail(error);

      expect({ ...action }).toEqual({
        type: AsmActions.CUSTOMER_SEARCH_FAIL,
        meta: StateUtils.failMeta(CUSTOMER_SEARCH_DATA),
        error,
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

  describe('Customer List Customers Search Actions', () => {
    it('should create the Customer List Customers Search Actions', () => {
      const searchOptions: CustomerSearchOptions = { query: 'abc' };
      const action = new AsmActions.CustomerListCustomersSearch(searchOptions);
      expect({ ...action }).toEqual({
        type: AsmActions.CUSTOMER_LIST_CUSTOMERS_SEARCH,
        meta: StateUtils.loadMeta(CUSTOMER_LIST_CUSTOMERS_SEARCH_DATA),
        payload: searchOptions,
      });
    });

    it('should create the CustomerListCustomersSearchFail action', () => {
      const action = new AsmActions.CustomerListCustomersSearchFail(error);

      expect({ ...action }).toEqual({
        type: AsmActions.CUSTOMER_LIST_CUSTOMERS_SEARCH_FAIL,
        meta: StateUtils.failMeta(CUSTOMER_LIST_CUSTOMERS_SEARCH_DATA),
        payload: error,
        error,
      });
    });

    it('should create the CustomerListCustomersSearchSuccess action', () => {
      const action = new AsmActions.CustomerListCustomersSearchSuccess(
        mockCustomerSearchPage
      );

      expect({ ...action }).toEqual({
        type: AsmActions.CUSTOMER_LIST_CUSTOMERS_SEARCH_SUCCESS,
        meta: StateUtils.successMeta(CUSTOMER_LIST_CUSTOMERS_SEARCH_DATA),
        payload: mockCustomerSearchPage,
      });
    });

    it('should create the CustomerListCustomersSearchReset action', () => {
      const action = new AsmActions.CustomerListCustomersSearchReset();

      expect({ ...action }).toEqual({
        type: AsmActions.CUSTOMER_LIST_CUSTOMERS_SEARCH_RESET,
        meta: StateUtils.resetMeta(CUSTOMER_LIST_CUSTOMERS_SEARCH_DATA),
      });
    });
  });
});
