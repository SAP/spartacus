import { CustomerSearchOptions, CustomerSearchPage } from '@spartacus/asm/root';
import { StateUtils, User } from '@spartacus/core';
import {
  CUSTOMER_LIST_CUSTOMERS_SEARCH_DATA,
  CUSTOMER_SEARCH_DATA,
} from '../asm-state';
import { AsmActions } from './index';
import { ASSISTED_SESSION_REGISTRATION_START, ASSISTED_SESSION_REGISTRATION_START_FAIL, ASSISTED_SESSION_REGISTRATION_START_SUCCESS } from './customer.action';

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
        meta: StateUtils.failMeta(CUSTOMER_SEARCH_DATA, error),
        payload: error,
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
        meta: StateUtils.failMeta(CUSTOMER_LIST_CUSTOMERS_SEARCH_DATA, error),
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

    it('should create the AssistedSessionRegistrationStart action', () => {
      const action = new AsmActions.AssistedSessionRegistrationStart();

      expect({ ...action }).toEqual({
        type: AsmActions.ASSISTED_SESSION_REGISTRATION_START,
        meta: StateUtils.loadMeta(ASSISTED_SESSION_REGISTRATION_START),
      });
    });

    it('should create the AssistedSessionRegistrationSuccess action', () => {
      const action = new AsmActions.AssistedSessionRegistrationSuccess();
      expect({ ...action }).toEqual({
        type: AsmActions.ASSISTED_SESSION_REGISTRATION_START_SUCCESS,
        meta: StateUtils.successMeta(ASSISTED_SESSION_REGISTRATION_START_SUCCESS),
      });
    });

    it('should create the AssistedSessionRegistrationFail action', () => {
      const action = new AsmActions.AssistedSessionRegistrationFail(error);
      expect({ ...action }).toEqual({
        type: AsmActions.ASSISTED_SESSION_REGISTRATION_START_FAIL,
        meta: StateUtils.failMeta(ASSISTED_SESSION_REGISTRATION_START_FAIL, error),
        payload: error,
        error,
      });
    });

  });
});
