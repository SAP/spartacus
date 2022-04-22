import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { normalizeHttpError, OccConfig, SearchConfig } from '@spartacus/core';
import {
  OrganizationActions,
  UserGroup,
  UserGroupConnector,
} from '@spartacus/organization/administration/core';
import { cold, hot } from 'jasmine-marbles';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import { Observable, of, throwError } from 'rxjs';
import { defaultOccOrganizationConfig } from '../../../occ/config/default-occ-organization-config';
import {
  B2BUserActions,
  PermissionActions,
  UserGroupActions,
} from '../actions';
import * as fromEffects from './user-group.effect';
import createSpy = jasmine.createSpy;

const httpErrorResponse = new HttpErrorResponse({
  error: 'error',
  headers: new HttpHeaders().set('xxx', 'xxx'),
  status: 500,
  statusText: 'Unknown error',
  url: '/xxx',
});
const error = normalizeHttpError(httpErrorResponse);
const userGroupId = 'testUid';
const userId = 'testUser';
const userGroup: UserGroup = {
  uid: userGroupId,
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
  uid: 'aaa@bbb',
  customerId,
};

class MockUserGroupConnector implements Partial<UserGroupConnector> {
  get = createSpy().and.returnValue(of(userGroup));
  getList = createSpy().and.returnValue(
    of({ values: [userGroup], pagination, sorts })
  );
  create = createSpy().and.returnValue(of(userGroup));
  update = createSpy().and.returnValue(of(userGroup));
  delete = createSpy().and.returnValue(of(userGroup));
  getAvailableOrderApprovalPermissions = createSpy().and.returnValue(
    of({ values: [permission], pagination, sorts })
  );
  assignOrderApprovalPermission = createSpy().and.returnValue(
    of({ id: permissionUid, selected: true })
  );
  unassignOrderApprovalPermission = createSpy().and.returnValue(
    of({ id: permissionUid, selected: false })
  );
  getAvailableOrgCustomers = createSpy().and.returnValue(
    of({ values: [customer], pagination, sorts })
  );
  assignMember = createSpy().and.returnValue(
    of({ id: customerId, selected: true })
  );
  unassignMember = createSpy().and.returnValue(
    of({ id: customerId, selected: false })
  );
  unassignAllMembers = createSpy().and.returnValue(of(null));
}

describe('UserGroup Effects', () => {
  let actions$: Observable<UserGroupActions.UserGroupAction>;
  let userGroupConnector: UserGroupConnector;
  let effects: fromEffects.UserGroupEffects;
  let expected: TestColdObservable;

  const mockUserGroupState = {
    details: {
      entities: {
        testLoadedUid: { loading: false, value: userGroup },
        testLoadingUid: { loading: true, value: null },
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({
          userGroup: () => mockUserGroupState,
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
    userGroupConnector = TestBed.inject(
      UserGroupConnector as Type<UserGroupConnector>
    );
    expected = null;
  });

  describe('load$', () => {
    it('should return LoadUserGroupSuccess action', () => {
      const action = new UserGroupActions.LoadUserGroup({
        userId,
        userGroupId,
      });
      const completion = new UserGroupActions.LoadUserGroupSuccess([userGroup]);
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadUserGroup$).toBeObservable(expected);
      expect(userGroupConnector.get).toHaveBeenCalledWith(userId, userGroupId);
    });

    it('should return LoadUserGroupFail action if userGroup not updated', () => {
      userGroupConnector.get = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new UserGroupActions.LoadUserGroup({
        userId,
        userGroupId,
      });
      const completion = new UserGroupActions.LoadUserGroupFail({
        userGroupId,
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadUserGroup$).toBeObservable(expected);
      expect(userGroupConnector.get).toHaveBeenCalledWith(userId, userGroupId);
    });
  });

  describe('loadList$', () => {
    const params: SearchConfig = { sort: 'uid' };

    it('should return LoadUserGroupSuccess action', () => {
      const action = new UserGroupActions.LoadUserGroups({
        userId,
        params,
      });
      const completion = new UserGroupActions.LoadUserGroupSuccess([userGroup]);
      const completion2 = new UserGroupActions.LoadUserGroupsSuccess({
        page: { ids: [userGroupId], pagination, sorts },
        params,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion, c: completion2 });

      expect(effects.loadUserGroups$).toBeObservable(expected);
      expect(userGroupConnector.getList).toHaveBeenCalledWith(userId, params);
    });

    it('should return LoadUserGroupsFail action if userGroups not loaded', () => {
      userGroupConnector.getList = createSpy().and.returnValue(
        throwError(httpErrorResponse)
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
      expect(userGroupConnector.getList).toHaveBeenCalledWith(userId, params);
    });
  });

  describe('createUserGroup$', () => {
    it('should return CreateUserGroupSuccess action', () => {
      const action = new UserGroupActions.CreateUserGroup({
        userId,
        userGroup,
      });
      const completion1 = new UserGroupActions.CreateUserGroupSuccess(
        userGroup
      );
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.createUserGroup$).toBeObservable(expected);
      expect(userGroupConnector.create).toHaveBeenCalledWith(userId, userGroup);
    });

    it('should return CreateUserGroupFail action if userGroup not created', () => {
      userGroupConnector.create = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new UserGroupActions.CreateUserGroup({
        userId,
        userGroup,
      });
      const completion1 = new UserGroupActions.CreateUserGroupFail({
        userGroupId,
        error,
      });
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.createUserGroup$).toBeObservable(expected);
      expect(userGroupConnector.create).toHaveBeenCalledWith(userId, userGroup);
    });
  });

  describe('updateUserGroup$', () => {
    // TODO: unlock after get correct response and fixed effect
    xit('should return UpdateUserGroupSuccess action', () => {
      const action = new UserGroupActions.UpdateUserGroup({
        userId,
        userGroupId,
        userGroup,
      });
      const completion = new UserGroupActions.UpdateUserGroupSuccess(userGroup);
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.updateUserGroup$).toBeObservable(expected);
      expect(userGroupConnector.update).toHaveBeenCalledWith(
        userId,
        userGroupId,
        userGroup
      );
    });

    it('should return UpdateUserGroupFail action if userGroup not created', () => {
      userGroupConnector.update = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new UserGroupActions.UpdateUserGroup({
        userId,
        userGroupId,
        userGroup,
      });
      const completion1 = new UserGroupActions.UpdateUserGroupFail({
        userGroupId,
        error,
      });
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.updateUserGroup$).toBeObservable(expected);
      expect(userGroupConnector.update).toHaveBeenCalledWith(
        userId,
        userGroupId,
        userGroup
      );
    });
  });

  describe('deleteUserGroup$', () => {
    it('should return DeleteUserGroupSuccess action', () => {
      const action = new UserGroupActions.DeleteUserGroup({
        userId,
        userGroupId,
      });
      const completion1 = new UserGroupActions.DeleteUserGroupSuccess(
        userGroup
      );
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.deleteUserGroup$).toBeObservable(expected);
      expect(userGroupConnector.delete).toHaveBeenCalledWith(
        userId,
        userGroupId
      );
    });

    it('should return DeleteUserGroupFail action if userGroup not created', () => {
      userGroupConnector.delete = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new UserGroupActions.DeleteUserGroup({
        userId,
        userGroupId,
      });
      const completion1 = new UserGroupActions.DeleteUserGroupFail({
        userGroupId,
        error,
      });
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.deleteUserGroup$).toBeObservable(expected);
      expect(userGroupConnector.delete).toHaveBeenCalledWith(
        userId,
        userGroupId
      );
    });
  });

  describe('loadAvailableOrderApprovalPermissions$', () => {
    const params: SearchConfig = { sort: 'uid' };

    it('should return LoadPermissionSuccess action', () => {
      const action = new UserGroupActions.LoadPermissions({
        userId,
        userGroupId,
        params,
      });
      const completion = new PermissionActions.LoadPermissionSuccess([
        permission,
      ]);
      const completion2 = new UserGroupActions.LoadPermissionsSuccess({
        userGroupId,
        page: { ids: [permissionUid], pagination, sorts },
        params,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion, c: completion2 });

      expect(effects.loadAvailableOrderApprovalPermissions$).toBeObservable(
        expected
      );
      expect(
        userGroupConnector.getAvailableOrderApprovalPermissions
      ).toHaveBeenCalledWith(userId, userGroupId, params);
    });

    it('should return LoadPermissionFail action if permissions not loaded', () => {
      userGroupConnector.getAvailableOrderApprovalPermissions =
        createSpy().and.returnValue(throwError(httpErrorResponse));
      const action = new UserGroupActions.LoadPermissions({
        userId,
        userGroupId,
        params,
      });
      const completion = new UserGroupActions.LoadPermissionsFail({
        error,
        userGroupId,
        params,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadAvailableOrderApprovalPermissions$).toBeObservable(
        expected
      );
      expect(
        userGroupConnector.getAvailableOrderApprovalPermissions
      ).toHaveBeenCalledWith(userId, userGroupId, params);
    });
  });

  describe('assignPermissionToUserGroup$', () => {
    it('should return CreateUserGroupOrderApprovalPermissionSuccess action', () => {
      const action = new UserGroupActions.AssignPermission({
        userId,
        userGroupId,
        permissionUid,
      });
      const completion1 = new UserGroupActions.AssignPermissionSuccess({
        permissionUid: permissionUid,
        selected: true,
      });
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.assignPermissionToUserGroup$).toBeObservable(expected);
      expect(
        userGroupConnector.assignOrderApprovalPermission
      ).toHaveBeenCalledWith(userId, userGroupId, permissionUid);
    });

    it('should return CreateUserGroupOrderApprovalPermissionFail action if permission not assigned', () => {
      userGroupConnector.assignOrderApprovalPermission =
        createSpy().and.returnValue(throwError(httpErrorResponse));
      const action = new UserGroupActions.AssignPermission({
        userId,
        userGroupId,
        permissionUid,
      });
      const completion1 = new UserGroupActions.AssignPermissionFail({
        userGroupId,
        permissionUid,
        error,
      });
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.assignPermissionToUserGroup$).toBeObservable(expected);
      expect(
        userGroupConnector.assignOrderApprovalPermission
      ).toHaveBeenCalledWith(userId, userGroupId, permissionUid);
    });
  });
  describe('unassignPermissionFromUserGroup$', () => {
    it('should return DeleteUserGroupOrderApprovalPermissionSuccess action', () => {
      const action = new UserGroupActions.UnassignPermission({
        userId,
        userGroupId,
        permissionUid,
      });
      const completion1 = new UserGroupActions.UnassignPermissionSuccess({
        permissionUid: permissionUid,
        selected: false,
      });
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.unassignPermissionFromUserGroup$).toBeObservable(expected);
      expect(
        userGroupConnector.unassignOrderApprovalPermission
      ).toHaveBeenCalledWith(userId, userGroupId, permissionUid);
    });

    it('should return DeleteUserGroupOrderApprovalPermissionFail action if permission not unassigned', () => {
      userGroupConnector.unassignOrderApprovalPermission =
        createSpy().and.returnValue(throwError(httpErrorResponse));
      const action = new UserGroupActions.UnassignPermission({
        userId,
        userGroupId,
        permissionUid,
      });
      const completion1 = new UserGroupActions.UnassignPermissionFail({
        userGroupId,
        permissionUid,
        error,
      });
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.unassignPermissionFromUserGroup$).toBeObservable(expected);
      expect(
        userGroupConnector.unassignOrderApprovalPermission
      ).toHaveBeenCalledWith(userId, userGroupId, permissionUid);
    });
  });

  describe('loadAvailableOrgCustomers$', () => {
    const params: SearchConfig = { sort: 'uid' };

    it('should return LoadUserGroupAvailableOrgCustomersSuccess action', () => {
      const action = new UserGroupActions.LoadAvailableOrgCustomers({
        userId,
        userGroupId,
        params,
      });
      const completion = new B2BUserActions.LoadB2BUserSuccess([customer]);
      const completion2 = new UserGroupActions.LoadAvailableOrgCustomersSuccess(
        {
          userGroupId,
          page: { ids: [customerId], pagination, sorts },
          params,
        }
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion, c: completion2 });

      expect(effects.loadAvailableOrgCustomers$).toBeObservable(expected);
      expect(userGroupConnector.getAvailableOrgCustomers).toHaveBeenCalledWith(
        userId,
        userGroupId,
        params
      );
    });

    it('should return LoadUserGroupAvailableOrgCustomersFail action if users not loaded', () => {
      userGroupConnector.getAvailableOrgCustomers = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new UserGroupActions.LoadAvailableOrgCustomers({
        userId,
        userGroupId,
        params,
      });
      const completion = new UserGroupActions.LoadAvailableOrgCustomersFail({
        error,
        userGroupId,
        params,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadAvailableOrgCustomers$).toBeObservable(expected);
      expect(userGroupConnector.getAvailableOrgCustomers).toHaveBeenCalledWith(
        userId,
        userGroupId,
        params
      );
    });
  });

  describe('assignMemberUnitUserGroup$', () => {
    it('should return CreateUserGroupOrderApprovalPermissionSuccess action', () => {
      const action = new UserGroupActions.AssignMember({
        userId,
        userGroupId,
        customerId,
      });
      const completion1 = new UserGroupActions.AssignMemberSuccess({
        customerId: customerId,
        selected: true,
      });
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.assignMemberUnitUserGroup$).toBeObservable(expected);
      expect(userGroupConnector.assignMember).toHaveBeenCalledWith(
        userId,
        userGroupId,
        customerId
      );
    });

    it('should return CreateUserGroupOrderApprovalPermissionFail action if user not assigned', () => {
      userGroupConnector.assignMember = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new UserGroupActions.AssignMember({
        userId,
        userGroupId,
        customerId,
      });
      const completion1 = new UserGroupActions.AssignMemberFail({
        userGroupId,
        customerId,
        error,
      });
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.assignMemberUnitUserGroup$).toBeObservable(expected);
      expect(userGroupConnector.assignMember).toHaveBeenCalledWith(
        userId,
        userGroupId,
        customerId
      );
    });
  });
  describe('unassignMemberFromUserGroup$', () => {
    it('should return DeleteUserGroupMemberSuccess action', () => {
      const action = new UserGroupActions.UnassignMember({
        userId,
        userGroupId,
        customerId,
      });
      const completion1 = new UserGroupActions.UnassignMemberSuccess({
        customerId: customerId,
        selected: false,
      });
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.unassignMemberFromUserGroup$).toBeObservable(expected);
      expect(userGroupConnector.unassignMember).toHaveBeenCalledWith(
        userId,
        userGroupId,
        customerId
      );
    });

    it('should return DeleteUserGroupMemberSuccessFail action if users not unassigned', () => {
      userGroupConnector.unassignMember = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new UserGroupActions.UnassignMember({
        userId,
        userGroupId,
        customerId,
      });
      const completion1 = new UserGroupActions.UnassignMemberFail({
        userGroupId,
        customerId,
        error,
      });
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.unassignMemberFromUserGroup$).toBeObservable(expected);
      expect(userGroupConnector.unassignMember).toHaveBeenCalledWith(
        userId,
        userGroupId,
        customerId
      );
    });
  });

  describe('unassignAllMembersFromUserGroup$', () => {
    it('should return DeleteUserGroupMemberSuccess action', () => {
      const action = new UserGroupActions.UnassignAllMembers({
        userId,
        userGroupId,
      });
      const completion1 = new UserGroupActions.UnassignAllMembersSuccess({
        selected: false,
      });
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.unassignAllMembersFromUserGroup$).toBeObservable(expected);
      expect(userGroupConnector.unassignAllMembers).toHaveBeenCalledWith(
        userId,
        userGroupId
      );
    });

    it('should return DeleteUserGroupMemberSuccessFail action if users not unassigned', () => {
      userGroupConnector.unassignAllMembers = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new UserGroupActions.UnassignAllMembers({
        userId,
        userGroupId,
      });
      const completion1 = new UserGroupActions.UnassignAllMembersFail({
        userGroupId,
        error,
      });
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.unassignAllMembersFromUserGroup$).toBeObservable(expected);
      expect(userGroupConnector.unassignAllMembers).toHaveBeenCalledWith(
        userId,
        userGroupId
      );
    });
  });
});
