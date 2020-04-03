import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

import { EntitiesModel } from '../../model/misc.model';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import {
  OrgUnitUserGroupActions,
  PermissionActions,
  B2BUserActions,
} from '../store/actions/index';
import * as fromReducers from '../store/reducers/index';
import { B2BSearchConfig } from '../model/search-config';
import {
  AuthService,
  ORGANIZATION_FEATURE,
  StateWithOrganization,
  OrgUnitUserGroup,
  UserGroupService,
  Permission,
} from '@spartacus/core';
import { B2BUser } from '../../model';

const userId = 'current';
const orgUnitUserGroupUid = 'testOrgUnitUserGroup';
const orgUnitUserGroup = {
  uid: orgUnitUserGroupUid,
  name: 'The Test Group',
  orgUnit: { uid: 'Rustic' },
};
const orgUnitUserGroup2 = {
  uid: 'testOrgUnitUserGroup2',
  name: 'The Test Group',
  orgUnit: { uid: 'Rustic' },
};
const pagination = { currentPage: 1 };
const sorts = [{ selected: true, name: 'byName' }];
const orgUnitUserGroupList: EntitiesModel<OrgUnitUserGroup> = {
  values: [orgUnitUserGroup, orgUnitUserGroup2],
  pagination,
  sorts,
};

const permissionUid = 'permissionUid';
const permission = {
  code: permissionUid,
};
const permission2 = {
  code: 'permissionUid2',
};
const permissionList: EntitiesModel<Permission> = {
  values: [permission, permission2],
  pagination,
  sorts,
};

const customerId = 'customerId';
const member = {
  uid: customerId,
};
const member2 = {
  uid: 'customerId2',
};
const memberList: EntitiesModel<B2BUser> = {
  values: [member, member2],
  pagination,
  sorts,
};

class MockAuthService {
  getOccUserId = createSpy().and.returnValue(of(userId));
}

describe('UserGroupService', () => {
  let service: UserGroupService;
  let authService: AuthService;
  let store: Store<StateWithOrganization>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          ORGANIZATION_FEATURE,
          fromReducers.getReducers()
        ),
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [
        UserGroupService,
        { provide: AuthService, useClass: MockAuthService },
      ],
    });

    store = TestBed.inject(Store as Type<Store<StateWithOrganization>>);
    service = TestBed.inject(UserGroupService as Type<UserGroupService>);
    authService = TestBed.inject(AuthService as Type<AuthService>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should UserGroupService is injected', inject(
    [UserGroupService],
    (orgUnitUserGroupService: UserGroupService) => {
      expect(orgUnitUserGroupService).toBeTruthy();
    }
  ));

  describe('get orgUnitUserGroup', () => {
    it('get() should trigger load orgUnitUserGroup details when they are not present in the store', () => {
      let orgUnitUserGroupDetails: OrgUnitUserGroup;
      service
        .get(orgUnitUserGroupUid)
        .subscribe(data => {
          orgUnitUserGroupDetails = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(orgUnitUserGroupDetails).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroup({
          userId,
          orgUnitUserGroupUid,
        })
      );
    });

    it('get() should be able to get orgUnitUserGroup details when they are present in the store', () => {
      store.dispatch(
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroupSuccess([
          orgUnitUserGroup,
          orgUnitUserGroup2,
        ])
      );
      let orgUnitUserGroupDetails: OrgUnitUserGroup;
      service
        .get(orgUnitUserGroupUid)
        .subscribe(data => {
          orgUnitUserGroupDetails = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).not.toHaveBeenCalled();
      expect(orgUnitUserGroupDetails).toEqual(orgUnitUserGroup);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroup({
          userId,
          orgUnitUserGroupUid,
        })
      );
    });
  });

  describe('get orgUnitUserGroups', () => {
    const params: B2BSearchConfig = { sort: 'byName' };

    it('getList() should trigger load orgUnitUserGroups when they are not present in the store', () => {
      let orgUnitUserGroups: EntitiesModel<OrgUnitUserGroup>;
      service
        .getList(params)
        .subscribe(data => {
          orgUnitUserGroups = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(orgUnitUserGroups).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroups({ userId, params })
      );
    });

    it('getList() should be able to get orgUnitUserGroups when they are present in the store', () => {
      store.dispatch(
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroupSuccess([
          orgUnitUserGroup,
          orgUnitUserGroup2,
        ])
      );
      store.dispatch(
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroupsSuccess({
          params,
          page: {
            ids: [orgUnitUserGroup.uid, orgUnitUserGroup2.uid],
            pagination,
            sorts,
          },
        })
      );
      let orgUnitUserGroups: EntitiesModel<OrgUnitUserGroup>;
      service
        .getList(params)
        .subscribe(data => {
          orgUnitUserGroups = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).not.toHaveBeenCalled();
      expect(orgUnitUserGroups).toEqual(orgUnitUserGroupList);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroups({ userId, params })
      );
    });
  });

  describe('create orgUnitUserGroup', () => {
    it('create() should should dispatch CreateOrgUnitUserGroup action', () => {
      service.create(orgUnitUserGroup);

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitUserGroupActions.CreateOrgUnitUserGroup({
          userId,
          orgUnitUserGroup,
        })
      );
    });
  });

  describe('update orgUnitUserGroup', () => {
    it('update() should should dispatch UpdateOrgUnitUserGroup action', () => {
      service.update(orgUnitUserGroupUid, orgUnitUserGroup);

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitUserGroupActions.UpdateOrgUnitUserGroup({
          userId,
          orgUnitUserGroupUid,
          orgUnitUserGroup,
        })
      );
    });
  });

  describe('delete orgUnitUserGroup', () => {
    it('delete() should should dispatch UpdateOrgUnitUserGroup action', () => {
      service.delete(orgUnitUserGroupUid);

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitUserGroupActions.DeleteOrgUnitUserGroup({
          userId,
          orgUnitUserGroupUid,
        })
      );
    });
  });

  describe('get permissions', () => {
    const params: B2BSearchConfig = { sort: 'uid' };

    it('getOrgUnitUserGroupAvailableOrderApprovalPermissions() should trigger load permissions when they are not present in the store', () => {
      let permissions: EntitiesModel<Permission>;
      service
        .getUserGroupAvailableOrderApprovalPermissions(
          orgUnitUserGroupUid,
          params
        )
        .subscribe(data => {
          permissions = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(permissions).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroupAvailableOrderApprovalPermissions(
          {
            userId,
            orgUnitUserGroupUid,
            params,
          }
        )
      );
    });

    it('getOrgUnitUserGroupAvailableOrderApprovalPermissions() should be able to get permissions when they are present in the store', () => {
      store.dispatch(
        new PermissionActions.LoadPermissionSuccess([permission, permission2])
      );
      store.dispatch(
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroupAvailableOrderApprovalPermissionsSuccess(
          {
            orgUnitUserGroupUid,
            params,
            page: {
              ids: [permission.code, permission2.code],
              pagination,
              sorts,
            },
          }
        )
      );
      let permissions: EntitiesModel<Permission>;
      service
        .getUserGroupAvailableOrderApprovalPermissions(
          orgUnitUserGroupUid,
          params
        )
        .subscribe(data => {
          permissions = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).not.toHaveBeenCalled();
      expect(permissions).toEqual(permissionList);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new PermissionActions.LoadPermissions({ userId, params })
      );
    });
  });

  describe('assign permission to orgUnitUserGroup', () => {
    it('assignPermission() should should dispatch CreateOrgUnitUserGroupOrderApprovalPermission action', () => {
      service.assignPermission(orgUnitUserGroupUid, permissionUid);

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitUserGroupActions.CreateOrgUnitUserGroupOrderApprovalPermission(
          {
            userId,
            orgUnitUserGroupUid,
            permissionUid,
          }
        )
      );
    });
  });

  describe('unassign permission from orgUnitUserGroup', () => {
    it('unassignPermission() should should dispatch DeleteOrgUnitUserGroupOrderApprovalPermission action', () => {
      service.unassignPermission(orgUnitUserGroupUid, permissionUid);

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitUserGroupActions.DeleteOrgUnitUserGroupOrderApprovalPermission(
          {
            userId,
            orgUnitUserGroupUid,
            permissionUid,
          }
        )
      );
    });
  });

  describe('get members', () => {
    const params: B2BSearchConfig = { sort: 'uid' };

    it('getOrgUnitUserGroupAvailableOrgCustomers() should trigger load members when they are not present in the store', () => {
      let members: EntitiesModel<B2BUser>;
      service
        .getUserGroupAvailableOrgCustomers(orgUnitUserGroupUid, params)
        .subscribe(data => {
          members = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(members).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroupAvailableOrgCustomers({
          userId,
          orgUnitUserGroupUid,
          params,
        })
      );
    });

    it('getOrgUnitUserGroupAvailableOrgCustomers() should be able to get members when they are present in the store', () => {
      store.dispatch(new B2BUserActions.LoadB2BUserSuccess([member, member2]));
      store.dispatch(
        new OrgUnitUserGroupActions.LoadOrgUnitUserGroupAvailableOrgCustomersSuccess(
          {
            orgUnitUserGroupUid,
            params,
            page: {
              ids: [member.uid, member2.uid],
              pagination,
              sorts,
            },
          }
        )
      );
      let members: EntitiesModel<B2BUser>;
      service
        .getUserGroupAvailableOrgCustomers(orgUnitUserGroupUid, params)
        .subscribe(data => {
          members = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).not.toHaveBeenCalled();
      expect(members).toEqual(memberList);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new B2BUserActions.LoadB2BUsers({ userId, params })
      );
    });
  });

  describe('assign members to orgUnitUserGroup', () => {
    it('assignMember() should should dispatch CreateOrgUnitUserGroupMember action', () => {
      service.assignMember(orgUnitUserGroupUid, customerId);

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitUserGroupActions.CreateOrgUnitUserGroupMember({
          userId,
          orgUnitUserGroupUid,
          customerId,
        })
      );
    });
  });

  describe('unassign members from orgUnitUserGroup', () => {
    it('unassignMember() should should dispatch DeleteOrgUnitUserGroupMember action', () => {
      service.unassignMember(orgUnitUserGroupUid, customerId);

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitUserGroupActions.DeleteOrgUnitUserGroupMember({
          userId,
          orgUnitUserGroupUid,
          customerId,
        })
      );
    });
  });

  describe('unassign all members from orgUnitUserGroup', () => {
    it('unassignMember() should should dispatch DeleteOrgUnitUserGroupMember action', () => {
      service.unassignAllMembers(orgUnitUserGroupUid);

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new OrgUnitUserGroupActions.DeleteOrgUnitUserGroupMembers({
          userId,
          orgUnitUserGroupUid,
        })
      );
    });
  });
});
