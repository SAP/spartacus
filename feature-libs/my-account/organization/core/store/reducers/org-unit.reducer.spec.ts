import { OrgUnitActions } from '../actions/index';
import {
  orgUnitAddressListReducer,
  orgUnitsInitialState,
  orgUnitUserListReducer,
} from './org-unit.reducer';

describe('Org Unit User List Reducer', () => {
  describe('no action', () => {
    it('should return the default state', () => {
      const action = { type: '' };
      const state = orgUnitUserListReducer(undefined, action);

      expect(state).toBe(orgUnitsInitialState);
    });
  });

  describe('LOAD_ASSIGNED_USERS_SUCCESS action', () => {
    it('should return the page object', () => {
      const payload = {
        orgUnitId: 'orgUnitId',
        roleId: 'roleId',
        page: {
          ids: ['testId'],
        },
        params: {
          pageSize: 2,
          currentPage: 1,
          sort: 'yes',
        },
      };

      const action = new OrgUnitActions.LoadAssignedUsersSuccess(payload);
      const result = orgUnitUserListReducer(orgUnitsInitialState, action);

      expect(result).toEqual(payload.page);
    });
  });
});

describe('Org Unit Address List Reducer', () => {
  describe('no action', () => {
    it('should return the default state', () => {
      const action = { type: '' };
      const state = orgUnitAddressListReducer(undefined, action);

      expect(state).toBe(orgUnitsInitialState);
    });
  });

  describe('LOAD_ADDRESSES_SUCCESS action', () => {
    it('should return the page object', () => {
      const payload = {
        orgUnitId: 'orgUnitId',
        page: {
          ids: ['testId'],
        },
      };

      const action = new OrgUnitActions.LoadAddressesSuccess(payload);
      const result = orgUnitAddressListReducer(orgUnitsInitialState, action);

      expect(result).toEqual(payload.page);
    });
  });
});
