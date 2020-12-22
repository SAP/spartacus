import { Permission } from '../../model/index';
import {
  B2BUserActions,
  PermissionActions,
  UserGroupActions,
} from '../actions/index';
import {
  permissionInitialState,
  permissionsEntitiesReducer,
  permissionsInitialState,
  permissionsListReducer,
} from './permission.reducer';

const payloadPermission: Permission = {
  active: true,
  code: 'permissionCode',
};

describe('Permissions Entities Reducer', () => {
  describe('no action', () => {
    it('should return the default state', () => {
      const action = { type: '' };
      const state = permissionsEntitiesReducer(undefined, action);

      expect(state).toBe(permissionInitialState);
    });
  });

  describe('LOAD_PERMISSION_SUCCESS action', () => {
    it('should return the payload', () => {
      const action = new PermissionActions.LoadPermissionSuccess(
        payloadPermission
      );
      const result = permissionsEntitiesReducer(permissionInitialState, action);

      expect(result).toEqual(payloadPermission);
    });
  });

  describe('CREATE_PERMISSION_SUCCESS action', () => {
    it('should return the payload', () => {
      const action = new PermissionActions.CreatePermissionSuccess(
        payloadPermission
      );
      const result = permissionsEntitiesReducer(permissionInitialState, action);

      expect(result).toEqual(payloadPermission);
    });
  });

  describe('UPDATE_PERMISSION_SUCCESS action', () => {
    it('should return the payload', () => {
      const action = new PermissionActions.UpdatePermissionSuccess(
        payloadPermission
      );
      const result = permissionsEntitiesReducer(permissionInitialState, action);

      expect(result).toEqual(payloadPermission);
    });
  });

  describe('USER_GROUP_ASSIGN_PERMISSION_SUCCESS action', () => {
    describe('without passed state', () => {
      it('should return the payload', () => {
        const payload = {
          permissionUid: 'testCode',
          selected: true,
        };

        const action = new UserGroupActions.AssignPermissionSuccess(payload);
        const result = permissionsEntitiesReducer(
          permissionInitialState,
          action
        );

        expect(result).toEqual(payload);
      });
    });

    describe('with passed state', () => {
      it('should merge state and return the payload', () => {
        const payload = {
          permissionUid: 'testCode',
          selected: true,
        };

        const expected = {
          ...payloadPermission,
          ...payload,
        };

        const action = new UserGroupActions.AssignPermissionSuccess(payload);
        const result = permissionsEntitiesReducer(payloadPermission, action);

        expect(result).toEqual(expected);
      });
    });
  });

  describe('USER_GROUP_UNASSIGN_PERMISSION_SUCCESS action', () => {
    describe('without passed state', () => {
      it('should return the payload', () => {
        const payload = {
          permissionUid: 'testCode',
          selected: true,
        };

        const action = new UserGroupActions.UnassignPermissionSuccess(payload);
        const result = permissionsEntitiesReducer(
          permissionInitialState,
          action
        );

        expect(result).toEqual(payload);
      });
    });

    describe('with passed state', () => {
      it('should merge state and return the payload', () => {
        const payload = {
          permissionUid: 'testCode',
          selected: true,
        };

        const expected = {
          ...payloadPermission,
          ...payload,
        };

        const action = new UserGroupActions.UnassignPermissionSuccess(payload);
        const result = permissionsEntitiesReducer(payloadPermission, action);

        expect(result).toEqual(expected);
      });
    });
  });

  describe('CREATE_B2B_USER_PERMISSION_SUCCESS action', () => {
    describe('without passed state', () => {
      it('should return the payload', () => {
        const payload = {
          permissionId: 'testCode',
          selected: true,
        };

        const action = new B2BUserActions.AssignB2BUserPermissionSuccess(
          payload
        );
        const result = permissionsEntitiesReducer(
          permissionInitialState,
          action
        );

        expect(result).toEqual(payload);
      });
    });

    describe('with passed state', () => {
      it('should merge state and return the payload', () => {
        const payload = {
          permissionId: 'testCode',
          selected: true,
        };

        const expected = {
          ...payloadPermission,
          ...payload,
        };

        const action = new B2BUserActions.AssignB2BUserPermissionSuccess(
          payload
        );
        const result = permissionsEntitiesReducer(payloadPermission, action);

        expect(result).toEqual(expected);
      });
    });
  });

  describe('DELETE_B2B_USER_PERMISSION_SUCCESS action', () => {
    describe('without passed state', () => {
      it('should return the payload', () => {
        const payload = {
          permissionId: 'testCode',
          selected: true,
        };

        const action = new B2BUserActions.UnassignB2BUserPermissionSuccess(
          payload
        );
        const result = permissionsEntitiesReducer(
          permissionInitialState,
          action
        );

        expect(result).toEqual(payload);
      });
    });

    describe('with passed state', () => {
      it('should merge state and return the payload', () => {
        const payload = {
          permissionId: 'testCode',
          selected: true,
        };

        const expected = {
          ...payloadPermission,
          ...payload,
        };

        const action = new B2BUserActions.UnassignB2BUserPermissionSuccess(
          payload
        );
        const result = permissionsEntitiesReducer(payloadPermission, action);

        expect(result).toEqual(expected);
      });
    });
  });
});

describe('Permissions List Reducer', () => {
  describe('no action', () => {
    it('should return the default state', () => {
      const action = { type: '' };
      const state = permissionsListReducer(undefined, action);

      expect(state).toBe(permissionsInitialState);
    });
  });

  describe('LOAD_PERMISSIONS_SUCCESS action', () => {
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

      const action = new PermissionActions.LoadPermissionsSuccess(payload);
      const result = permissionsListReducer(permissionsInitialState, action);

      expect(result).toEqual(payload.page);
    });
  });
});
