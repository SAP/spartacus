import { B2BUser } from '@spartacus/core';
import { UserGroup } from '../../model/index';
import {
  B2BUserActions,
  OrgUnitActions,
  UserGroupActions,
} from '../actions/index';
import {
  b2bUserApproverListReducer,
  b2bUserEntitiesReducer,
  b2bUserInitialState,
  b2bUserPermissionListReducer,
  b2bUsersInitialState,
  b2bUserUserGroupListReducer,
  userListReducer,
} from './b2b-user.reducer';

const payloadB2BUser: B2BUser = {
  active: true,
  customerId: 'testId',
  email: 'test@email.com',
  roles: ['role1', 'role2'],
};

describe('B2B User Entities Reducer', () => {
  describe('no action', () => {
    it('should return the default state', () => {
      const action = { type: '' };
      const state = b2bUserEntitiesReducer(undefined, action);

      expect(state).toBe(b2bUserInitialState);
    });
  });

  describe('LOAD_B2B_USER_SUCCESS action', () => {
    it('should return the payload', () => {
      const action = new B2BUserActions.LoadB2BUserSuccess(payloadB2BUser);
      const result = b2bUserEntitiesReducer(b2bUserInitialState, action);

      expect(result).toEqual(payloadB2BUser);
    });
  });

  describe('ASSIGN_ROLE_SUCCESS action', () => {
    describe('without passed state', () => {
      it('should return the payload', () => {
        const payload = {
          uid: 'testUid',
          roleId: 'testRoleId',
          selected: true,
        };

        const expected: B2BUser = {
          selected: payload.selected,
          roles: [payload.roleId],
        };

        const action = new OrgUnitActions.AssignRoleSuccess(payload);
        const result = b2bUserEntitiesReducer(b2bUserInitialState, action);

        expect(result).toEqual(expected);
      });
    });

    describe('with passed state', () => {
      it('should merge state and return the data', () => {
        const payload = {
          uid: 'testUid',
          roleId: 'testRoleId',
          selected: true,
        };

        const expected = {
          ...payloadB2BUser,
          selected: payload.selected,
          roles: [...payloadB2BUser.roles, payload.roleId],
        };

        const action = new OrgUnitActions.AssignRoleSuccess(payload);
        const result = b2bUserEntitiesReducer(payloadB2BUser, action);

        expect(result).toEqual(expected);
      });
    });
  });

  describe('ASSIGN_APPROVER_SUCCESS action', () => {
    describe('without passed state', () => {
      it('should return the payload', () => {
        const payload = {
          uid: 'testUid',
          roleId: 'testRoleId',
          selected: true,
        };

        const expected: B2BUser = {
          selected: payload.selected,
          roles: [payload.roleId],
        };

        const action = new OrgUnitActions.AssignApproverSuccess(payload);
        const result = b2bUserEntitiesReducer(b2bUserInitialState, action);

        expect(result).toEqual(expected);
      });
    });

    describe('with passed state', () => {
      it('should merge state and return the data', () => {
        const payload = {
          uid: 'testUid',
          roleId: 'testRoleId',
          selected: true,
        };

        const expected = {
          ...payloadB2BUser,
          selected: payload.selected,
          roles: [...payloadB2BUser.roles, payload.roleId],
        };

        const action = new OrgUnitActions.AssignApproverSuccess(payload);
        const result = b2bUserEntitiesReducer(payloadB2BUser, action);

        expect(result).toEqual(expected);
      });
    });
  });

  describe('UNASSIGN_ROLE_SUCCESS action', () => {
    describe('without passed state', () => {
      it('should return the payload', () => {
        const payload = {
          uid: 'testUid',
          roleId: 'testRoleId',
          selected: true,
        };

        const expected: B2BUser = {
          selected: payload.selected,
          roles: [],
        };

        const action = new OrgUnitActions.UnassignRoleSuccess(payload);
        const result = b2bUserEntitiesReducer(b2bUserInitialState, action);

        expect(result).toEqual(expected);
      });
    });

    describe('with passed state', () => {
      it('should merge state and return the data', () => {
        const payload = {
          uid: 'testUid',
          roleId: 'role1',
          selected: true,
        };

        const expected = {
          ...payloadB2BUser,
          selected: payload.selected,
          roles: ['role2'],
        };

        const action = new OrgUnitActions.UnassignRoleSuccess(payload);
        const result = b2bUserEntitiesReducer(payloadB2BUser, action);

        expect(result).toEqual(expected);
      });
    });
  });

  describe('UNASSIGN_APPROVER_SUCCESS action', () => {
    describe('without passed state', () => {
      it('should return the payload', () => {
        const payload = {
          uid: 'testUid',
          roleId: 'testRoleId',
          selected: true,
        };

        const expected: B2BUser = {
          selected: payload.selected,
          roles: [],
        };

        const action = new OrgUnitActions.UnassignApproverSuccess(payload);
        const result = b2bUserEntitiesReducer(b2bUserInitialState, action);

        expect(result).toEqual(expected);
      });
    });

    describe('with passed state', () => {
      it('should merge state and return the data', () => {
        const payload = {
          uid: 'testUid',
          roleId: 'role1',
          selected: true,
        };

        const expected = {
          ...payloadB2BUser,
          selected: payload.selected,
          roles: ['role2'],
        };

        const action = new OrgUnitActions.UnassignApproverSuccess(payload);
        const result = b2bUserEntitiesReducer(payloadB2BUser, action);

        expect(result).toEqual(expected);
      });
    });
  });

  describe('CREATE_B2B_USER_APPROVER_SUCCESS action', () => {
    describe('without passed state', () => {
      it('should return the payload', () => {
        const payload = {
          approverId: 'testId',
          selected: true,
        };

        const action = new B2BUserActions.AssignB2BUserApproverSuccess(payload);
        const result = b2bUserEntitiesReducer(b2bUserInitialState, action);

        expect(result).toEqual(payload);
      });
    });

    describe('with passed state', () => {
      it('should merge state and return the payload', () => {
        const payload = {
          approverId: 'testId',
          selected: true,
        };

        const expected = {
          ...payloadB2BUser,
          ...payload,
        };

        const action = new B2BUserActions.AssignB2BUserApproverSuccess(payload);
        const result = b2bUserEntitiesReducer(payloadB2BUser, action);

        expect(result).toEqual(expected);
      });
    });
  });

  describe('DELETE_B2B_USER_APPROVER_SUCCESS action', () => {
    describe('without passed state', () => {
      it('should return the payload', () => {
        const payload = {
          approverId: 'testId',
          selected: true,
        };

        const action = new B2BUserActions.UnassignB2BUserApproverSuccess(
          payload
        );
        const result = b2bUserEntitiesReducer(b2bUserInitialState, action);

        expect(result).toEqual(payload);
      });
    });

    describe('with passed state', () => {
      it('should merge state and return the payload', () => {
        const payload = {
          approverId: 'testId',
          selected: true,
        };

        const expected = {
          ...payloadB2BUser,
          ...payload,
        };

        const action = new B2BUserActions.UnassignB2BUserApproverSuccess(
          payload
        );
        const result = b2bUserEntitiesReducer(payloadB2BUser, action);

        expect(result).toEqual(expected);
      });
    });
  });

  describe('USER_GROUP_ASSIGN_MEMBER_SUCCESS action', () => {
    describe('without passed state', () => {
      it('should return the payload', () => {
        const payload = {
          customerId: 'testId',
          selected: true,
        };

        const action = new UserGroupActions.AssignMemberSuccess(payload);
        const result = b2bUserEntitiesReducer(b2bUserInitialState, action);

        expect(result).toEqual(payload);
      });
    });

    describe('with passed state', () => {
      it('should merge state and return the payload', () => {
        const payload = {
          customerId: 'testId',
          selected: true,
        };

        const expected = {
          ...payloadB2BUser,
          ...payload,
        };

        const action = new UserGroupActions.AssignMemberSuccess(payload);
        const result = b2bUserEntitiesReducer(payloadB2BUser, action);

        expect(result).toEqual(expected);
      });
    });
  });

  describe('USER_GROUP_UNASSIGN_MEMBER_SUCCESS action', () => {
    describe('without passed state', () => {
      it('should return the payload', () => {
        const payload = {
          customerId: 'testId',
          selected: true,
        };

        const action = new UserGroupActions.UnassignMemberSuccess(payload);
        const result = b2bUserEntitiesReducer(b2bUserInitialState, action);

        expect(result).toEqual(payload);
      });
    });

    describe('with passed state', () => {
      it('should merge state and return the payload', () => {
        const payload = {
          customerId: 'testId',
          selected: true,
        };

        const expected = {
          ...payloadB2BUser,
          ...payload,
        };

        const action = new UserGroupActions.UnassignMemberSuccess(payload);
        const result = b2bUserEntitiesReducer(payloadB2BUser, action);

        expect(result).toEqual(expected);
      });
    });
  });

  describe('USER_GROUP_UNASSIGN_ALL_MEMBERS_SUCCESS action', () => {
    describe('without passed state', () => {
      it('should return the payload', () => {
        const payload: UserGroup = {
          name: 'testUserGroup',
          uid: 'testUid',
        };

        const action = new UserGroupActions.UnassignAllMembersSuccess(payload);
        const result = b2bUserEntitiesReducer(b2bUserInitialState, action);

        expect(result).toEqual(payload);
      });
    });

    describe('with passed state', () => {
      it('should merge state and return the payload', () => {
        const payload: UserGroup = {
          name: 'testUserGroup',
          uid: 'testUid',
        };

        const expected = {
          ...payloadB2BUser,
          ...payload,
        };

        const action = new UserGroupActions.UnassignAllMembersSuccess(payload);
        const result = b2bUserEntitiesReducer(payloadB2BUser, action);

        expect(result).toEqual(expected);
      });
    });
  });
});

describe('B2B User List Reducer', () => {
  describe('no action', () => {
    it('should return the default state', () => {
      const action = { type: '' };
      const state = userListReducer(undefined, action);

      expect(state).toBe(b2bUsersInitialState);
    });
  });

  describe('LOAD_B2B_USERS_SUCCESS action', () => {
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

      const action = new B2BUserActions.LoadB2BUsersSuccess(payload);
      const result = userListReducer(b2bUsersInitialState, action);

      expect(result).toEqual(payload.page);
    });
  });
});

describe('B2B User Approver List Reducer', () => {
  describe('no action', () => {
    it('should return the default state', () => {
      const action = { type: '' };
      const state = b2bUserApproverListReducer(undefined, action);

      expect(state).toBe(b2bUsersInitialState);
    });
  });

  describe('LOAD_B2B_USER_APPROVERS_SUCCESS action', () => {
    it('should return the page object', () => {
      const payload = {
        orgCustomerId: 'testId',
        page: {
          ids: ['testId'],
        },
        params: {
          pageSize: 2,
          currentPage: 1,
          sort: 'yes',
        },
      };

      const action = new B2BUserActions.LoadB2BUserApproversSuccess(payload);
      const result = b2bUserApproverListReducer(b2bUsersInitialState, action);

      expect(result).toEqual(payload.page);
    });
  });
});

describe('B2B User Permission List Reducer', () => {
  describe('no action', () => {
    it('should return the default state', () => {
      const action = { type: '' };
      const state = b2bUserPermissionListReducer(undefined, action);

      expect(state).toBe(b2bUsersInitialState);
    });
  });

  describe('LOAD_B2B_USER_PERMISSIONS_SUCCESS action', () => {
    it('should return the page object', () => {
      const payload = {
        orgCustomerId: 'testId',
        page: {
          ids: ['testId'],
        },
        params: {
          pageSize: 2,
          currentPage: 1,
          sort: 'yes',
        },
      };

      const action = new B2BUserActions.LoadB2BUserPermissionsSuccess(payload);
      const result = b2bUserPermissionListReducer(b2bUsersInitialState, action);

      expect(result).toEqual(payload.page);
    });
  });
});

describe('B2B User Permission List Reducer', () => {
  describe('no action', () => {
    it('should return the default state', () => {
      const action = { type: '' };
      const state = b2bUserUserGroupListReducer(undefined, action);

      expect(state).toBe(b2bUsersInitialState);
    });
  });

  describe('LOAD_B2B_USER_USER_GROUPS_SUCCESS action', () => {
    it('should return the page object', () => {
      const payload = {
        orgCustomerId: 'testId',
        page: {
          ids: ['testId'],
        },
        params: {
          pageSize: 2,
          currentPage: 1,
          sort: 'yes',
        },
      };

      const action = new B2BUserActions.LoadB2BUserUserGroupsSuccess(payload);
      const result = b2bUserUserGroupListReducer(b2bUsersInitialState, action);

      expect(result).toEqual(payload.page);
    });
  });
});
