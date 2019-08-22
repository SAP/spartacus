import { User } from 'projects/core/src/model/misc.model';
import { CustomerSearchPage } from '../../models/asm.models';
import { CustomerActions } from './index';

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
        mockCustomerSearchPage
      );

      expect({ ...action }).toEqual({
        type: CustomerActions.CUSTOMER_SEARCH_SUCCESS,
        payload: mockCustomerSearchPage,
      });
    });

    it('should create the CustomerSearchReset action', () => {
      const action = new CustomerActions.CustomerSearchReset();

      expect({ ...action }).toEqual({
        type: CustomerActions.CUSTOMER_SEARCH_RESET,
      });
    });
  });
});
