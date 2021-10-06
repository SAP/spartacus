import { UserGroup } from '../../model/index';
import { B2BUserActions, UserGroupActions } from '../actions/index';
import {
  userGroupAvailableOrderApprovalPermissionsListReducer,
  userGroupAvailablOrgCustomersListReducer,
  userGroupEntitiesReducer,
  userGroupInitialState,
  userGroupsInitialState,
  userGroupsListReducer,
} from './user-group.reducer';

const payloadUserGroup: UserGroup = {
  name: 'userGroup',
  selected: true,
  uid: 'userGroup01',
};

describe('User Group Entities Reducer', () => {
  describe('no action', () => {
    it('should return the default state', () => {
      const action = { type: '' };
      const state = userGroupEntitiesReducer(undefined, action);

      expect(state).toBe(userGroupInitialState);
    });
  });

  describe('LOAD_USER_GROUP_SUCCESS action', () => {
    it('should return the payload', () => {
      const action = new UserGroupActions.LoadUserGroupSuccess(
        payloadUserGroup
      );
      const result = userGroupEntitiesReducer(userGroupInitialState, action);

      expect(result).toEqual(payloadUserGroup);
    });
  });

  describe('CREATE_USER_GROUP_SUCCESS action', () => {
    it('should return the payload', () => {
      const action = new UserGroupActions.CreateUserGroupSuccess(
        payloadUserGroup
      );
      const result = userGroupEntitiesReducer(userGroupInitialState, action);

      expect(result).toEqual(payloadUserGroup);
    });
  });

  describe('UPDATE_USER_GROUP_SUCCESS action', () => {
    it('should return the payload', () => {
      const action = new UserGroupActions.UpdateUserGroupSuccess(
        payloadUserGroup
      );
      const result = userGroupEntitiesReducer(userGroupInitialState, action);

      expect(result).toEqual(payloadUserGroup);
    });
  });

  describe('CREATE_B2B_USER_USER_GROUP_SUCCESS action', () => {
    describe('without passed state', () => {
      it('should return the payload', () => {
        const payload = {
          uid: 'testCode',
          selected: true,
        };

        const action = new B2BUserActions.AssignB2BUserUserGroupSuccess(
          payload
        );
        const result = userGroupEntitiesReducer(userGroupInitialState, action);

        expect(result).toEqual(payload);
      });
    });

    describe('with passed state', () => {
      it('should merge state and return the payload', () => {
        const payload = {
          uid: 'testCode',
          selected: true,
        };

        const expected = {
          ...payloadUserGroup,
          ...payload,
        };

        const action = new B2BUserActions.AssignB2BUserUserGroupSuccess(
          payload
        );
        const result = userGroupEntitiesReducer(payloadUserGroup, action);

        expect(result).toEqual(expected);
      });
    });
  });

  describe('DELETE_B2B_USER_USER_GROUP_SUCCESS action', () => {
    describe('without passed state', () => {
      it('should return the payload', () => {
        const payload = {
          uid: 'testCode',
          selected: true,
        };

        const action = new B2BUserActions.UnassignB2BUserUserGroupSuccess(
          payload
        );
        const result = userGroupEntitiesReducer(userGroupInitialState, action);

        expect(result).toEqual(payload);
      });
    });

    describe('with passed state', () => {
      it('should merge state and return the payload', () => {
        const payload = {
          uid: 'testCode',
          selected: true,
        };

        const expected = {
          ...payloadUserGroup,
          ...payload,
        };

        const action = new B2BUserActions.UnassignB2BUserUserGroupSuccess(
          payload
        );
        const result = userGroupEntitiesReducer(payloadUserGroup, action);

        expect(result).toEqual(expected);
      });
    });
  });
});

describe('User Groups List Reducer', () => {
  describe('no action', () => {
    it('should return the default state', () => {
      const action = { type: '' };
      const state = userGroupsListReducer(undefined, action);

      expect(state).toBe(userGroupsInitialState);
    });
  });

  describe('LOAD_USER_GROUPS_SUCCESS action', () => {
    it('should return the page object', () => {
      const payload = {
        page: {
          ids: ['testId'],
        },
        params: {
          pageSize: 2,
          currentPage: 1,
          sort: 'yes',
        },
      };

      const action = new UserGroupActions.LoadUserGroupsSuccess(payload);
      const result = userGroupsListReducer(userGroupsInitialState, action);

      expect(result).toEqual(payload.page);
    });
  });
});

describe('User Group Available Order Approval Permissions List Reducer', () => {
  describe('no action', () => {
    it('should return the default state', () => {
      const action = { type: '' };
      const state = userGroupAvailableOrderApprovalPermissionsListReducer(
        undefined,
        action
      );

      expect(state).toBe(userGroupsInitialState);
    });
  });

  describe('LOAD_USER_GROUPS_SUCCESS action', () => {
    it('should return the page object', () => {
      const payload = {
        userGroupId: 'testGroupId',
        page: {
          ids: ['testId'],
        },
        params: {
          pageSize: 2,
          currentPage: 1,
          sort: 'yes',
        },
      };

      const action = new UserGroupActions.LoadPermissionsSuccess(payload);
      const result = userGroupAvailableOrderApprovalPermissionsListReducer(
        userGroupsInitialState,
        action
      );

      expect(result).toEqual(payload.page);
    });
  });
});

describe('User Group Available Org Customers List Reducer', () => {
  describe('no action', () => {
    it('should return the default state', () => {
      const action = { type: '' };
      const state = userGroupAvailablOrgCustomersListReducer(undefined, action);

      expect(state).toBe(userGroupsInitialState);
    });
  });

  describe('LOAD_USER_GROUP_AVAILABLE_CUSTOMERS_SUCCESS action', () => {
    it('should return the page object', () => {
      const payload = {
        userGroupId: 'testGroupId',
        page: {
          ids: ['testId'],
        },
        params: {
          pageSize: 2,
          currentPage: 1,
          sort: 'yes',
        },
      };

      const action = new UserGroupActions.LoadAvailableOrgCustomersSuccess(
        payload
      );
      const result = userGroupAvailablOrgCustomersListReducer(
        userGroupsInitialState,
        action
      );

      expect(result).toEqual(payload.page);
    });
  });
});
