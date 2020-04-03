import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import createSpy = jasmine.createSpy;

import { defaultOccOrganizationConfig } from '../../../occ/adapters/organization/default-occ-organization-config';
import { OccConfig } from '../../../occ/config/occ-config';
import {
  UserGroupActions,
  PermissionActions,
  B2BUserActions,
} from '../actions/index';
import * as fromEffects from './user-group.effect';
import { B2BSearchConfig } from '../../model/search-config';
import { OrgUnitUserGroup, UserGroupConnector } from '@spartacus/core';

const error = 'error';
const orgUnitUserGroupUid = 'testUid';
const userId = 'testUser';
const orgUnitUserGroup: OrgUnitUserGroup = {
  uid: orgUnitUserGroupUid,
  name: 'The Test Group',
  orgUnit: { uid: 'Rustic' },
};
const pagination = { currentPage: 1 };
const sorts = [{ selected: true, name: 'uid' }];
const permissionUid = 'permissionUid';
const permission = {
  uid: permissionUid,
  code: permissionUid,
};
const customerId = 'customerId';
const customer = {
  uid: customerId,
};

class MockUserGroupConnector implements Partial<UserGroupConnector> {
  get = createSpy().and.returnValue(of(orgUnitUserGroup));
  getList = createSpy().and.returnValue(
    of({ values: [orgUnitUserGroup], pagination, sorts })
  );
  create = createSpy().and.returnValue(of(orgUnitUserGroup));
  update = createSpy().and.returnValue(of(orgUnitUserGroup));
  delete = createSpy().and.returnValue(of(orgUnitUserGroup));
  getAvailableOrderApprovalPermissions = createSpy().and.returnValue(
    of({ values: [permission], pagination, sorts })
  );
  assignOrderApprovalPermission = createSpy().and.returnValue(of(null));
  unassignOrderApprovalPermission = createSpy().and.returnValue(of(null));
  getAvailableOrgCustomers = createSpy().and.returnValue(
    of({ values: [customer], pagination, sorts })
  );
  assignMember = createSpy().and.returnValue(of(null));
  unassignMember = createSpy().and.returnValue(of(null));
  unassignAllMembers = createSpy().and.returnValue(of(null));
}

describe('UserGroup Effects', () => {
  let actions$: Observable<UserGroupActions.UserGroupAction>;
  let orgUnitUserGroupConnector: UserGroupConnector;
  let effects: fromEffects.UserGroupEffects;
  let expected: TestColdObservable;

  const mockUserGroupState = {
    details: {
      entities: {
        testLoadedUid: { loading: false, value: orgUnitUserGroup },
        testLoadingUid: { loading: true, value: null },
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({
          orgUnitUserGroup: () => mockUserGroupState,
        }),
      ],
      providers: [
        {
          provide: UserGroupConnector,
          useClass: MockUserGroupConnector,
        },
        { provide: OccConfig, useValue: defaultOccOrganizationConfig },
        fromEffects.UserGroupEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(
      fromEffects.UserGroupEffects as Type<fromEffects.UserGroupEffects>
    );
    orgUnitUserGroupConnector = TestBed.inject(
      UserGroupConnector as Type<UserGroupConnector>
    );
    expected = null;
  });

  describe('loadUserGroup$', () => {
    it('should return LoadUserGroupSuccess action', () => {
      const action = new UserGroupActions.LoadUserGroup({
        userId,
        orgUnitUserGroupUid,
      });
      const completion = new UserGroupActions.LoadUserGroupSuccess([
        orgUnitUserGroup,
      ]);
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.get).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid
      );
    });

    it('should return LoadUserGroupFail action if orgUnitUserGroup not updated', () => {
      orgUnitUserGroupConnector.get = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new UserGroupActions.LoadUserGroup({
        userId,
        orgUnitUserGroupUid,
      });
      const completion = new UserGroupActions.LoadUserGroupFail({
        orgUnitUserGroupUid,
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.get).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid
      );
    });
  });

  describe('loadUserGroups$', () => {
    const params: B2BSearchConfig = { sort: 'uid' };

    it('should return LoadUserGroupSuccess action', () => {
      const action = new UserGroupActions.LoadUserGroups({
        userId,
        params,
      });
      const completion = new UserGroupActions.LoadUserGroupSuccess([
        orgUnitUserGroup,
      ]);
      const completion2 = new UserGroupActions.LoadUserGroupsSuccess({
        page: { ids: [orgUnitUserGroupUid], pagination, sorts },
        params,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion, c: completion2 });

      expect(effects.loadUserGroups$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.getList).toHaveBeenCalledWith(
        userId,
        params
      );
    });

    it('should return LoadUserGroupsFail action if orgUnitUserGroups not loaded', () => {
      orgUnitUserGroupConnector.getList = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new UserGroupActions.LoadUserGroups({
        userId,
        params,
      });
      const completion = new UserGroupActions.LoadUserGroupsFail({
        error,
        params,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadUserGroups$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.getList).toHaveBeenCalledWith(
        userId,
        params
      );
    });
  });

  describe('createUserGroup$', () => {
    it('should return CreateUserGroupSuccess action', () => {
      const action = new UserGroupActions.CreateUserGroup({
        userId,
        orgUnitUserGroup,
      });
      const completion = new UserGroupActions.CreateUserGroupSuccess(
        orgUnitUserGroup
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.createUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.create).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroup
      );
    });

    it('should return CreateUserGroupFail action if orgUnitUserGroup not created', () => {
      orgUnitUserGroupConnector.create = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new UserGroupActions.CreateUserGroup({
        userId,
        orgUnitUserGroup,
      });
      const completion = new UserGroupActions.CreateUserGroupFail({
        orgUnitUserGroupUid,
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.createUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.create).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroup
      );
    });
  });

  describe('updateUserGroup$', () => {
    it('should return UpdateUserGroupSuccess action', () => {
      const action = new UserGroupActions.UpdateUserGroup({
        userId,
        orgUnitUserGroupUid,
        orgUnitUserGroup,
      });
      const completion = new UserGroupActions.UpdateUserGroupSuccess(
        orgUnitUserGroup
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.updateUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.update).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid,
        orgUnitUserGroup
      );
    });

    it('should return UpdateUserGroupFail action if orgUnitUserGroup not created', () => {
      orgUnitUserGroupConnector.update = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new UserGroupActions.UpdateUserGroup({
        userId,
        orgUnitUserGroupUid,
        orgUnitUserGroup,
      });
      const completion = new UserGroupActions.UpdateUserGroupFail({
        orgUnitUserGroupUid,
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.updateUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.update).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid,
        orgUnitUserGroup
      );
    });
  });

  describe('deleteUserGroup$', () => {
    it('should return DeleteUserGroupSuccess action', () => {
      const action = new UserGroupActions.DeleteUserGroup({
        userId,
        orgUnitUserGroupUid,
      });
      const completion = new UserGroupActions.DeleteUserGroupSuccess(
        orgUnitUserGroup
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.deleteUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.delete).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid
      );
    });

    it('should return DeleteUserGroupFail action if orgUnitUserGroup not created', () => {
      orgUnitUserGroupConnector.delete = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new UserGroupActions.DeleteUserGroup({
        userId,
        orgUnitUserGroupUid,
      });
      const completion = new UserGroupActions.DeleteUserGroupFail({
        orgUnitUserGroupUid,
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.deleteUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.delete).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid
      );
    });
  });

  describe('loadAvailableOrderApprovalPermissions$', () => {
    const params: B2BSearchConfig = { sort: 'uid' };

    it('should return LoadPermissionSuccess action', () => {
      const action = new UserGroupActions.LoadPermissions({
        userId,
        orgUnitUserGroupUid,
        params,
      });
      const completion = new PermissionActions.LoadPermissionSuccess([
        permission,
      ]);
      const completion2 = new UserGroupActions.LoadPermissionsSuccess({
        orgUnitUserGroupUid,
        page: { ids: [permissionUid], pagination, sorts },
        params,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion, c: completion2 });

      expect(effects.loadAvailableOrderApprovalPermissions$).toBeObservable(
        expected
      );
      expect(
        orgUnitUserGroupConnector.getAvailableOrderApprovalPermissions
      ).toHaveBeenCalledWith(userId, orgUnitUserGroupUid, params);
    });

    it('should return LoadPermissionFail action if permissions not loaded', () => {
      orgUnitUserGroupConnector.getAvailableOrderApprovalPermissions = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new UserGroupActions.LoadPermissions({
        userId,
        orgUnitUserGroupUid,
        params,
      });
      const completion = new UserGroupActions.LoadPermissionsFail({
        error,
        orgUnitUserGroupUid,
        params,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadAvailableOrderApprovalPermissions$).toBeObservable(
        expected
      );
      expect(
        orgUnitUserGroupConnector.getAvailableOrderApprovalPermissions
      ).toHaveBeenCalledWith(userId, orgUnitUserGroupUid, params);
    });
  });

  describe('assignPermissionToUserGroup$', () => {
    it('should return CreateUserGroupOrderApprovalPermissionSuccess action', () => {
      const action = new UserGroupActions.AssignPermission({
        userId,
        orgUnitUserGroupUid,
        permissionUid,
      });
      const completion = new UserGroupActions.AssignPermissionSuccess({
        permissionUid: permissionUid,
        selected: true,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.assignPermissionToUserGroup$).toBeObservable(expected);
      expect(
        orgUnitUserGroupConnector.assignOrderApprovalPermission
      ).toHaveBeenCalledWith(userId, orgUnitUserGroupUid, permissionUid);
    });

    it('should return CreateUserGroupOrderApprovalPermissionFail action if permission not assigned', () => {
      orgUnitUserGroupConnector.assignOrderApprovalPermission = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new UserGroupActions.AssignPermission({
        userId,
        orgUnitUserGroupUid,
        permissionUid,
      });
      const completion = new UserGroupActions.AssignPermissionFail({
        orgUnitUserGroupUid,
        permissionUid,
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.assignPermissionToUserGroup$).toBeObservable(expected);
      expect(
        orgUnitUserGroupConnector.assignOrderApprovalPermission
      ).toHaveBeenCalledWith(userId, orgUnitUserGroupUid, permissionUid);
    });
  });
  describe('unassignPermissionFromUserGroup$', () => {
    it('should return DeleteUserGroupOrderApprovalPermissionSuccess action', () => {
      const action = new UserGroupActions.UnassignPermission({
        userId,
        orgUnitUserGroupUid,
        permissionUid,
      });
      const completion = new UserGroupActions.UnassignPermissionSuccess({
        permissionUid: permissionUid,
        selected: false,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.unassignPermissionFromUserGroup$).toBeObservable(expected);
      expect(
        orgUnitUserGroupConnector.unassignOrderApprovalPermission
      ).toHaveBeenCalledWith(userId, orgUnitUserGroupUid, permissionUid);
    });

    it('should return DeleteUserGroupOrderApprovalPermissionFail action if permission not unassigned', () => {
      orgUnitUserGroupConnector.unassignOrderApprovalPermission = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new UserGroupActions.UnassignPermission({
        userId,
        orgUnitUserGroupUid,
        permissionUid,
      });
      const completion = new UserGroupActions.UnassignPermissionFail({
        orgUnitUserGroupUid,
        permissionUid,
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.unassignPermissionFromUserGroup$).toBeObservable(expected);
      expect(
        orgUnitUserGroupConnector.unassignOrderApprovalPermission
      ).toHaveBeenCalledWith(userId, orgUnitUserGroupUid, permissionUid);
    });
  });

  describe('loadAvailableOrgCustomers$', () => {
    const params: B2BSearchConfig = { sort: 'uid' };

    it('should return LoadUserGroupAvailableOrgCustomersSuccess action', () => {
      const action = new UserGroupActions.LoadAvailableOrgCustomers({
        userId,
        orgUnitUserGroupUid,
        params,
      });
      const completion = new B2BUserActions.LoadB2BUserSuccess([customer]);
      const completion2 = new UserGroupActions.LoadAvailableOrgCustomersSuccess(
        {
          orgUnitUserGroupUid,
          page: { ids: [customerId], pagination, sorts },
          params,
        }
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion, c: completion2 });

      expect(effects.loadAvailableOrgCustomers$).toBeObservable(expected);
      expect(
        orgUnitUserGroupConnector.getAvailableOrgCustomers
      ).toHaveBeenCalledWith(userId, orgUnitUserGroupUid, params);
    });

    it('should return LoadUserGroupAvailableOrgCustomersFail action if users not loaded', () => {
      orgUnitUserGroupConnector.getAvailableOrgCustomers = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new UserGroupActions.LoadAvailableOrgCustomers({
        userId,
        orgUnitUserGroupUid,
        params,
      });
      const completion = new UserGroupActions.LoadAvailableOrgCustomersFail({
        error,
        orgUnitUserGroupUid,
        params,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadAvailableOrgCustomers$).toBeObservable(expected);
      expect(
        orgUnitUserGroupConnector.getAvailableOrgCustomers
      ).toHaveBeenCalledWith(userId, orgUnitUserGroupUid, params);
    });
  });

  describe('assignMemberUnitUserGroup$', () => {
    it('should return CreateUserGroupOrderApprovalPermissionSuccess action', () => {
      const action = new UserGroupActions.AssignMember({
        userId,
        orgUnitUserGroupUid,
        customerId,
      });
      const completion = new UserGroupActions.AssignMemberSuccess({
        customerId: customerId,
        selected: true,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.assignMemberUnitUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.assignMember).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid,
        customerId
      );
    });

    it('should return CreateUserGroupOrderApprovalPermissionFail action if user not assigned', () => {
      orgUnitUserGroupConnector.assignMember = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new UserGroupActions.AssignMember({
        userId,
        orgUnitUserGroupUid,
        customerId,
      });
      const completion = new UserGroupActions.AssignMemberFail({
        orgUnitUserGroupUid,
        customerId,
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.assignMemberUnitUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.assignMember).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid,
        customerId
      );
    });
  });
  describe('unassignMemberFromUserGroup$', () => {
    it('should return DeleteUserGroupMemberSuccess action', () => {
      const action = new UserGroupActions.UnassignMember({
        userId,
        orgUnitUserGroupUid,
        customerId,
      });
      const completion = new UserGroupActions.UnassignMemberSuccess({
        customerId: customerId,
        selected: false,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.unassignMemberFromUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.unassignMember).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid,
        customerId
      );
    });

    it('should return DeleteUserGroupMemberSuccessFail action if users not unassigned', () => {
      orgUnitUserGroupConnector.unassignMember = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new UserGroupActions.UnassignMember({
        userId,
        orgUnitUserGroupUid,
        customerId,
      });
      const completion = new UserGroupActions.UnassignMemberFail({
        orgUnitUserGroupUid,
        customerId,
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.unassignMemberFromUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.unassignMember).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid,
        customerId
      );
    });
  });

  describe('unassignAllMembersFromUserGroup$', () => {
    it('should return DeleteUserGroupMemberSuccess action', () => {
      const action = new UserGroupActions.UnassignAllMembers({
        userId,
        orgUnitUserGroupUid,
      });
      const completion = new UserGroupActions.UnassignAllMembersSuccess({
        selected: false,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.unassignAllMembersFromUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.unassignAllMembers).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid
      );
    });

    it('should return DeleteUserGroupMemberSuccessFail action if users not unassigned', () => {
      orgUnitUserGroupConnector.unassignAllMembers = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new UserGroupActions.UnassignAllMembers({
        userId,
        orgUnitUserGroupUid,
      });
      const completion = new UserGroupActions.UnassignAllMembersFail({
        orgUnitUserGroupUid,
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.unassignAllMembersFromUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.unassignAllMembers).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid
      );
    });
  });
});
