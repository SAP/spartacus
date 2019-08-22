import { CustomerSearchPage } from '../../models/asm.models';
import { CustomerActions } from './index';

describe('Customer Actions', () => {
  describe('Customer Search Actions', () => {
    it('should create the Customer Search Actions', () => {
      const testSearchTerm = { searchTerm: 'abc' };
      const action = new CustomerActions.CustomerSearch(testSearchTerm);
      expect({ ...action }).toEqual({
        type: CustomerActions.CUSTOMER_SEARCH,
        payload: testSearchTerm,
      });
    });

    it('should create the CustomerSearchFail action', () => {
      const error = 'anError';
      const action = new CustomerActions.CustomerSearchFail(error);

      expect({ ...action }).toEqual({
        type: CustomerActions.CUSTOMER_SEARCH_FAIL,
        payload: error,
      });
    });

    it('should create the CustomerSearchSuccess action', () => {
      const action = new CustomerActions.CustomerSearchSuccess(
        {} as CustomerSearchPage
      );

      expect({ ...action }).toEqual({
        type: CustomerActions.CUSTOMER_SEARCH_SUCCESS,
        payload: {} as CustomerSearchPage,
      });
    });
  });
});
