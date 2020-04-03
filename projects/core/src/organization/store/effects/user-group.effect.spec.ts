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
import { OrgUnitUserGroup, OrgUnitUserGroupConnector } from '@spartacus/core';

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

class MockOrgUnitUserGroupConnector
  implements Partial<OrgUnitUserGroupConnector> {
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

describe('OrgUnitUserGroup Effects', () => {
  let actions$: Observable<UserGroupActions.OrgUnitUserGroupAction>;
  let orgUnitUserGroupConnector: OrgUnitUserGroupConnector;
  let effects: fromEffects.OrgUnitUserGroupEffects;
  let expected: TestColdObservable;

  const mockOrgUnitUserGroupState = {
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
          orgUnitUserGroup: () => mockOrgUnitUserGroupState,
        }),
      ],
      providers: [
        {
          provide: OrgUnitUserGroupConnector,
          useClass: MockOrgUnitUserGroupConnector,
        },
        { provide: OccConfig, useValue: defaultOccOrganizationConfig },
        fromEffects.OrgUnitUserGroupEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(
      fromEffects.OrgUnitUserGroupEffects as Type<
        fromEffects.OrgUnitUserGroupEffects
      >
    );
    orgUnitUserGroupConnector = TestBed.inject(
      OrgUnitUserGroupConnector as Type<OrgUnitUserGroupConnector>
    );
    expected = null;
  });

  describe('loadOrgUnitUserGroup$', () => {
    it('should return LoadOrgUnitUserGroupSuccess action', () => {
      const action = new UserGroupActions.LoadOrgUnitUserGroup({
        userId,
        orgUnitUserGroupUid,
      });
      const completion = new UserGroupActions.LoadOrgUnitUserGroupSuccess([
        orgUnitUserGroup,
      ]);
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadOrgUnitUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.get).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid
      );
    });

    it('should return LoadOrgUnitUserGroupFail action if orgUnitUserGroup not updated', () => {
      orgUnitUserGroupConnector.get = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new UserGroupActions.LoadOrgUnitUserGroup({
        userId,
        orgUnitUserGroupUid,
      });
      const completion = new UserGroupActions.LoadOrgUnitUserGroupFail({
        orgUnitUserGroupUid,
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadOrgUnitUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.get).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid
      );
    });
  });

  describe('loadOrgUnitUserGroups$', () => {
    const params: B2BSearchConfig = { sort: 'uid' };

    it('should return LoadOrgUnitUserGroupSuccess action', () => {
      const action = new UserGroupActions.LoadOrgUnitUserGroups({
        userId,
        params,
      });
      const completion = new UserGroupActions.LoadOrgUnitUserGroupSuccess([
        orgUnitUserGroup,
      ]);
      const completion2 = new UserGroupActions.LoadOrgUnitUserGroupsSuccess({
        page: { ids: [orgUnitUserGroupUid], pagination, sorts },
        params,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion, c: completion2 });

      expect(effects.loadOrgUnitUserGroups$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.getList).toHaveBeenCalledWith(
        userId,
        params
      );
    });

    it('should return LoadOrgUnitUserGroupsFail action if orgUnitUserGroups not loaded', () => {
      orgUnitUserGroupConnector.getList = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new UserGroupActions.LoadOrgUnitUserGroups({
        userId,
        params,
      });
      const completion = new UserGroupActions.LoadOrgUnitUserGroupsFail({
        error,
        params,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadOrgUnitUserGroups$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.getList).toHaveBeenCalledWith(
        userId,
        params
      );
    });
  });

  describe('createOrgUnitUserGroup$', () => {
    it('should return CreateOrgUnitUserGroupSuccess action', () => {
      const action = new UserGroupActions.CreateOrgUnitUserGroup({
        userId,
        orgUnitUserGroup,
      });
      const completion = new UserGroupActions.CreateOrgUnitUserGroupSuccess(
        orgUnitUserGroup
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.createOrgUnitUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.create).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroup
      );
    });

    it('should return CreateOrgUnitUserGroupFail action if orgUnitUserGroup not created', () => {
      orgUnitUserGroupConnector.create = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new UserGroupActions.CreateOrgUnitUserGroup({
        userId,
        orgUnitUserGroup,
      });
      const completion = new UserGroupActions.CreateOrgUnitUserGroupFail({
        orgUnitUserGroupUid,
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.createOrgUnitUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.create).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroup
      );
    });
  });

  describe('updateOrgUnitUserGroup$', () => {
    it('should return UpdateOrgUnitUserGroupSuccess action', () => {
      const action = new UserGroupActions.UpdateOrgUnitUserGroup({
        userId,
        orgUnitUserGroupUid,
        orgUnitUserGroup,
      });
      const completion = new UserGroupActions.UpdateOrgUnitUserGroupSuccess(
        orgUnitUserGroup
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.updateOrgUnitUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.update).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid,
        orgUnitUserGroup
      );
    });

    it('should return UpdateOrgUnitUserGroupFail action if orgUnitUserGroup not created', () => {
      orgUnitUserGroupConnector.update = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new UserGroupActions.UpdateOrgUnitUserGroup({
        userId,
        orgUnitUserGroupUid,
        orgUnitUserGroup,
      });
      const completion = new UserGroupActions.UpdateOrgUnitUserGroupFail({
        orgUnitUserGroupUid,
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.updateOrgUnitUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.update).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid,
        orgUnitUserGroup
      );
    });
  });

  describe('deleteOrgUnitUserGroup$', () => {
    it('should return DeleteOrgUnitUserGroupSuccess action', () => {
      const action = new UserGroupActions.DeleteOrgUnitUserGroup({
        userId,
        orgUnitUserGroupUid,
      });
      const completion = new UserGroupActions.DeleteOrgUnitUserGroupSuccess(
        orgUnitUserGroup
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.deleteOrgUnitUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.delete).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid
      );
    });

    it('should return DeleteOrgUnitUserGroupFail action if orgUnitUserGroup not created', () => {
      orgUnitUserGroupConnector.delete = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new UserGroupActions.DeleteOrgUnitUserGroup({
        userId,
        orgUnitUserGroupUid,
      });
      const completion = new UserGroupActions.DeleteOrgUnitUserGroupFail({
        orgUnitUserGroupUid,
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.deleteOrgUnitUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.delete).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid
      );
    });
  });

  describe('loadOrgUnitUserGroupAvailableOrderApprovalPermissions$', () => {
    const params: B2BSearchConfig = { sort: 'uid' };

    it('should return LoadPermissionSuccess action', () => {
      const action = new UserGroupActions.LoadOrgUnitUserGroupAvailableOrderApprovalPermissions(
        {
          userId,
          orgUnitUserGroupUid,
          params,
        }
      );
      const completion = new PermissionActions.LoadPermissionSuccess([
        permission,
      ]);
      const completion2 = new UserGroupActions.LoadOrgUnitUserGroupAvailableOrderApprovalPermissionsSuccess(
        {
          orgUnitUserGroupUid,
          page: { ids: [permissionUid], pagination, sorts },
          params,
        }
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion, c: completion2 });

      expect(
        effects.loadOrgUnitUserGroupAvailableOrderApprovalPermissions$
      ).toBeObservable(expected);
      expect(
        orgUnitUserGroupConnector.getAvailableOrderApprovalPermissions
      ).toHaveBeenCalledWith(userId, orgUnitUserGroupUid, params);
    });

    it('should return LoadPermissionFail action if permissions not loaded', () => {
      orgUnitUserGroupConnector.getAvailableOrderApprovalPermissions = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new UserGroupActions.LoadOrgUnitUserGroupAvailableOrderApprovalPermissions(
        {
          userId,
          orgUnitUserGroupUid,
          params,
        }
      );
      const completion = new UserGroupActions.LoadOrgUnitUserGroupAvailableOrderApprovalPermissionsFail(
        {
          error,
          orgUnitUserGroupUid,
          params,
        }
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(
        effects.loadOrgUnitUserGroupAvailableOrderApprovalPermissions$
      ).toBeObservable(expected);
      expect(
        orgUnitUserGroupConnector.getAvailableOrderApprovalPermissions
      ).toHaveBeenCalledWith(userId, orgUnitUserGroupUid, params);
    });
  });

  describe('assignPermissionToOrgUnitUserGroup$', () => {
    it('should return CreateOrgUnitUserGroupOrderApprovalPermissionSuccess action', () => {
      const action = new UserGroupActions.AssignPermission({
        userId,
        orgUnitUserGroupUid,
        permissionUid,
      });
      const completion = new UserGroupActions.CreateOrgUnitUserGroupOrderApprovalPermissionSuccess(
        {
          permissionUid: permissionUid,
          selected: true,
        }
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.assignPermissionToOrgUnitUserGroup$).toBeObservable(
        expected
      );
      expect(
        orgUnitUserGroupConnector.assignOrderApprovalPermission
      ).toHaveBeenCalledWith(userId, orgUnitUserGroupUid, permissionUid);
    });

    it('should return CreateOrgUnitUserGroupOrderApprovalPermissionFail action if permission not assigned', () => {
      orgUnitUserGroupConnector.assignOrderApprovalPermission = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new UserGroupActions.AssignPermission({
        userId,
        orgUnitUserGroupUid,
        permissionUid,
      });
      const completion = new UserGroupActions.CreateOrgUnitUserGroupOrderApprovalPermissionFail(
        {
          orgUnitUserGroupUid,
          permissionUid,
          error,
        }
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.assignPermissionToOrgUnitUserGroup$).toBeObservable(
        expected
      );
      expect(
        orgUnitUserGroupConnector.assignOrderApprovalPermission
      ).toHaveBeenCalledWith(userId, orgUnitUserGroupUid, permissionUid);
    });
  });
  describe('unassignPermissionFromOrgUnitUserGroup$', () => {
    it('should return DeleteOrgUnitUserGroupOrderApprovalPermissionSuccess action', () => {
      const action = new UserGroupActions.UnassignPermission({
        userId,
        orgUnitUserGroupUid,
        permissionUid,
      });
      const completion = new UserGroupActions.DeleteOrgUnitUserGroupOrderApprovalPermissionSuccess(
        {
          permissionUid: permissionUid,
          selected: false,
        }
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.unassignPermissionFromOrgUnitUserGroup$).toBeObservable(
        expected
      );
      expect(
        orgUnitUserGroupConnector.unassignOrderApprovalPermission
      ).toHaveBeenCalledWith(userId, orgUnitUserGroupUid, permissionUid);
    });

    it('should return DeleteOrgUnitUserGroupOrderApprovalPermissionFail action if permission not unassigned', () => {
      orgUnitUserGroupConnector.unassignOrderApprovalPermission = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new UserGroupActions.UnassignPermission({
        userId,
        orgUnitUserGroupUid,
        permissionUid,
      });
      const completion = new UserGroupActions.DeleteOrgUnitUserGroupOrderApprovalPermissionFail(
        {
          orgUnitUserGroupUid,
          permissionUid,
          error,
        }
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.unassignPermissionFromOrgUnitUserGroup$).toBeObservable(
        expected
      );
      expect(
        orgUnitUserGroupConnector.unassignOrderApprovalPermission
      ).toHaveBeenCalledWith(userId, orgUnitUserGroupUid, permissionUid);
    });
  });

  describe('loadOrgUnitUserGroupAvailableOrgCustomers$', () => {
    const params: B2BSearchConfig = { sort: 'uid' };

    it('should return LoadOrgUnitUserGroupAvailableOrgCustomersSuccess action', () => {
      const action = new UserGroupActions.LoadOrgUnitUserGroupAvailableOrgCustomers(
        {
          userId,
          orgUnitUserGroupUid,
          params,
        }
      );
      const completion = new B2BUserActions.LoadB2BUserSuccess([customer]);
      const completion2 = new UserGroupActions.LoadOrgUnitUserGroupAvailableOrgCustomersSuccess(
        {
          orgUnitUserGroupUid,
          page: { ids: [customerId], pagination, sorts },
          params,
        }
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion, c: completion2 });

      expect(effects.loadOrgUnitUserGroupAvailableOrgCustomers$).toBeObservable(
        expected
      );
      expect(
        orgUnitUserGroupConnector.getAvailableOrgCustomers
      ).toHaveBeenCalledWith(userId, orgUnitUserGroupUid, params);
    });

    it('should return LoadOrgUnitUserGroupAvailableOrgCustomersFail action if users not loaded', () => {
      orgUnitUserGroupConnector.getAvailableOrgCustomers = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new UserGroupActions.LoadOrgUnitUserGroupAvailableOrgCustomers(
        {
          userId,
          orgUnitUserGroupUid,
          params,
        }
      );
      const completion = new UserGroupActions.LoadOrgUnitUserGroupAvailableOrgCustomersFail(
        {
          error,
          orgUnitUserGroupUid,
          params,
        }
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadOrgUnitUserGroupAvailableOrgCustomers$).toBeObservable(
        expected
      );
      expect(
        orgUnitUserGroupConnector.getAvailableOrgCustomers
      ).toHaveBeenCalledWith(userId, orgUnitUserGroupUid, params);
    });
  });

  describe('assignMemberToOrgUnitUserGroup$', () => {
    it('should return CreateOrgUnitUserGroupOrderApprovalPermissionSuccess action', () => {
      const action = new UserGroupActions.AssignMember({
        userId,
        orgUnitUserGroupUid,
        customerId,
      });
      const completion = new UserGroupActions.CreateOrgUnitUserGroupMemberSuccess(
        {
          customerId: customerId,
          selected: true,
        }
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.assignMemberToOrgUnitUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.assignMember).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid,
        customerId
      );
    });

    it('should return CreateOrgUnitUserGroupOrderApprovalPermissionFail action if user not assigned', () => {
      orgUnitUserGroupConnector.assignMember = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new UserGroupActions.AssignMember({
        userId,
        orgUnitUserGroupUid,
        customerId,
      });
      const completion = new UserGroupActions.CreateOrgUnitUserGroupMemberFail({
        orgUnitUserGroupUid,
        customerId,
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.assignMemberToOrgUnitUserGroup$).toBeObservable(expected);
      expect(orgUnitUserGroupConnector.assignMember).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid,
        customerId
      );
    });
  });
  describe('unassignMemberFromOrgUnitUserGroup$', () => {
    it('should return DeleteOrgUnitUserGroupMemberSuccess action', () => {
      const action = new UserGroupActions.UnassignMember({
        userId,
        orgUnitUserGroupUid,
        customerId,
      });
      const completion = new UserGroupActions.DeleteOrgUnitUserGroupMemberSuccess(
        {
          customerId: customerId,
          selected: false,
        }
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.unassignMemberFromOrgUnitUserGroup$).toBeObservable(
        expected
      );
      expect(orgUnitUserGroupConnector.unassignMember).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid,
        customerId
      );
    });

    it('should return DeleteOrgUnitUserGroupMemberSuccessFail action if users not unassigned', () => {
      orgUnitUserGroupConnector.unassignMember = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new UserGroupActions.UnassignMember({
        userId,
        orgUnitUserGroupUid,
        customerId,
      });
      const completion = new UserGroupActions.DeleteOrgUnitUserGroupMemberFail({
        orgUnitUserGroupUid,
        customerId,
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.unassignMemberFromOrgUnitUserGroup$).toBeObservable(
        expected
      );
      expect(orgUnitUserGroupConnector.unassignMember).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid,
        customerId
      );
    });
  });

  describe('unassignAllMembersFromOrgUnitUserGroup$', () => {
    it('should return DeleteOrgUnitUserGroupMemberSuccess action', () => {
      const action = new UserGroupActions.UnassignAllMembers({
        userId,
        orgUnitUserGroupUid,
      });
      const completion = new UserGroupActions.DeleteOrgUnitUserGroupMembersSuccess(
        {
          selected: false,
        }
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.unassignAllMembersFromOrgUnitUserGroup$).toBeObservable(
        expected
      );
      expect(orgUnitUserGroupConnector.unassignAllMembers).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid
      );
    });

    it('should return DeleteOrgUnitUserGroupMemberSuccessFail action if users not unassigned', () => {
      orgUnitUserGroupConnector.unassignAllMembers = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new UserGroupActions.UnassignAllMembers({
        userId,
        orgUnitUserGroupUid,
      });
      const completion = new UserGroupActions.DeleteOrgUnitUserGroupMembersFail(
        {
          orgUnitUserGroupUid,
          error,
        }
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.unassignAllMembersFromOrgUnitUserGroup$).toBeObservable(
        expected
      );
      expect(orgUnitUserGroupConnector.unassignAllMembers).toHaveBeenCalledWith(
        userId,
        orgUnitUserGroupUid
      );
    });
  });
});
