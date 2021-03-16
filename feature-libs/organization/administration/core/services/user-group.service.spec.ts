import { inject, TestBed } from '@angular/core/testing';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store, StoreModule } from '@ngrx/store';
import {
  B2BUser,
  EntitiesModel,
  SearchConfig,
  UserIdService,
} from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { OrganizationItemStatus, Permission, UserGroup } from '../model';
import { LoadStatus } from '../model/organization-item-status';
import {
  B2BUserActions,
  PermissionActions,
  UserGroupActions,
} from '../store/actions/index';
import {
  ORGANIZATION_FEATURE,
  StateWithOrganization,
} from '../store/organization-state';
import * as fromReducers from '../store/reducers/index';
import { UserGroupService } from './user-group.service';

const userId = 'current';
const userGroupId = 'testUserGroup';
const userGroup = {
  uid: userGroupId,
  name: 'The Test Group',
  orgUnit: { uid: 'Rustic' },
};
const userGroup2 = {
  uid: 'testUserGroup2',
  name: 'The Test Group',
  orgUnit: { uid: 'Rustic' },
};
const pagination = { currentPage: 1 };
const sorts = [{ selected: true, name: 'byName' }];
const userGroupList: EntitiesModel<UserGroup> = {
  values: [userGroup, userGroup2],
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
  uid: 'aa@bb',
  customerId,
};
const member2 = {
  uid: 'bb@aa',
  customerId: 'customerId2',
};
const memberList: EntitiesModel<B2BUser> = {
  values: [member, member2],
  pagination,
  sorts,
};

let takeUserId$: BehaviorSubject<string | never>;
class MockUserIdService implements Partial<UserIdService> {
  takeUserId = () => takeUserId$.asObservable();
}

describe('UserGroupService', () => {
  let service: UserGroupService;
  let userIdService: UserIdService;
  let store: Store<StateWithOrganization>;
  let actions$: ActionsSubject;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          ORGANIZATION_FEATURE,
          fromReducers.getReducers()
        ),
      ],
      providers: [
        UserGroupService,
        { provide: UserIdService, useClass: MockUserIdService },
      ],
    });

    store = TestBed.inject(Store);
    service = TestBed.inject(UserGroupService);
    userIdService = TestBed.inject(UserIdService);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(userIdService, 'takeUserId').and.callThrough();

    actions$ = TestBed.inject(ActionsSubject);
    takeUserId$ = new BehaviorSubject(userId);
  });

  it('should UserGroupService is injected', inject(
    [UserGroupService],
    (userGroupService: UserGroupService) => {
      expect(userGroupService).toBeTruthy();
    }
  ));

  describe('get userGroup', () => {
    xit('get() should trigger load userGroup details when they are not present in the store', (done) => {
      const sub = service.get(userGroupId).subscribe();

      actions$
        .pipe(ofType(UserGroupActions.LOAD_USER_GROUP), take(1))
        .subscribe((action) => {
          expect(action).toEqual(
            new UserGroupActions.LoadUserGroup({
              userId,
              userGroupId,
            })
          );
          sub.unsubscribe();
          done();
        });
    });

    it('get() should be able to get userGroup details when they are present in the store', () => {
      store.dispatch(
        new UserGroupActions.LoadUserGroupSuccess([userGroup, userGroup2])
      );
      let userGroupDetails: UserGroup;
      service
        .get(userGroupId)
        .subscribe((data) => {
          userGroupDetails = data;
        })
        .unsubscribe();

      expect(userIdService.takeUserId).not.toHaveBeenCalled();
      expect(userGroupDetails).toEqual(userGroup);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new UserGroupActions.LoadUserGroup({
          userId,
          userGroupId,
        })
      );
    });
  });

  describe('get userGroups', () => {
    const params: SearchConfig = { sort: 'byName' };

    it('getList() should trigger load userGroups when they are not present in the store', () => {
      let userGroups: EntitiesModel<UserGroup>;
      service
        .getList(params)
        .subscribe((data) => {
          userGroups = data;
        })
        .unsubscribe();

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(userGroups).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserGroupActions.LoadUserGroups({ userId, params })
      );
    });

    it('getList() should be able to get userGroups when they are present in the store', () => {
      store.dispatch(
        new UserGroupActions.LoadUserGroupSuccess([userGroup, userGroup2])
      );
      store.dispatch(
        new UserGroupActions.LoadUserGroupsSuccess({
          params,
          page: {
            ids: [userGroup.uid, userGroup2.uid],
            pagination,
            sorts,
          },
        })
      );
      let userGroups: EntitiesModel<UserGroup>;
      service
        .getList(params)
        .subscribe((data) => {
          userGroups = data;
        })
        .unsubscribe();

      expect(userIdService.takeUserId).not.toHaveBeenCalled();
      expect(userGroups).toEqual(userGroupList);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new UserGroupActions.LoadUserGroups({ userId, params })
      );
    });
  });

  describe('create userGroup', () => {
    it('create() should should dispatch CreateUserGroup action', () => {
      service.create(userGroup);

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserGroupActions.CreateUserGroup({
          userId,
          userGroup,
        })
      );
    });
  });

  describe('update userGroup', () => {
    it('update() should should dispatch UpdateUserGroup action', () => {
      service.update(userGroupId, userGroup);

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserGroupActions.UpdateUserGroup({
          userId,
          userGroupId,
          userGroup,
        })
      );
    });
  });

  describe('delete userGroup', () => {
    it('delete() should should dispatch UpdateUserGroup action', () => {
      service.delete(userGroupId);

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserGroupActions.DeleteUserGroup({
          userId,
          userGroupId,
        })
      );
    });
  });

  describe('get permissions', () => {
    const params: SearchConfig = { sort: 'uid' };

    it('getUserGroupAvailableOrderApprovalPermissions() should trigger load permissions when they are not present in the store', () => {
      let permissions: EntitiesModel<Permission>;
      service
        .getAvailableOrderApprovalPermissions(userGroupId, params)
        .subscribe((data) => {
          permissions = data;
        })
        .unsubscribe();

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(permissions).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserGroupActions.LoadPermissions({
          userId,
          userGroupId,
          params,
        })
      );
    });

    it('getUserGroupAvailableOrderApprovalPermissions() should be able to get permissions when they are present in the store', () => {
      store.dispatch(
        new PermissionActions.LoadPermissionSuccess([permission, permission2])
      );
      store.dispatch(
        new UserGroupActions.LoadPermissionsSuccess({
          userGroupId,
          params,
          page: {
            ids: [permission.code, permission2.code],
            pagination,
            sorts,
          },
        })
      );
      let permissions: EntitiesModel<Permission>;
      service
        .getAvailableOrderApprovalPermissions(userGroupId, params)
        .subscribe((data) => {
          permissions = data;
        })
        .unsubscribe();

      expect(userIdService.takeUserId).not.toHaveBeenCalled();
      expect(permissions).toEqual(permissionList);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new PermissionActions.LoadPermissions({ userId, params })
      );
    });
  });

  describe('assign permission to userGroup', () => {
    it('assignPermission() should should dispatch CreateUserGroupOrderApprovalPermission action', () => {
      service.assignPermission(userGroupId, permissionUid);

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserGroupActions.AssignPermission({
          userId,
          userGroupId,
          permissionUid,
        })
      );
    });
  });

  describe('unassign permission from userGroup', () => {
    it('unassignPermission() should should dispatch DeleteUserGroupOrderApprovalPermission action', () => {
      service.unassignPermission(userGroupId, permissionUid);

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserGroupActions.UnassignPermission({
          userId,
          userGroupId,
          permissionUid,
        })
      );
    });
  });

  describe('get members', () => {
    const params: SearchConfig = { sort: 'uid' };

    it('getUserGroupAvailableOrgCustomers() should trigger load members when they are not present in the store', () => {
      let members: EntitiesModel<B2BUser>;
      service
        .getAvailableOrgCustomers(userGroupId, params)
        .subscribe((data) => {
          members = data;
        })
        .unsubscribe();

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(members).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserGroupActions.LoadAvailableOrgCustomers({
          userId,
          userGroupId,
          params,
        })
      );
    });

    it('getUserGroupAvailableOrgCustomers() should be able to get members when they are present in the store', () => {
      store.dispatch(new B2BUserActions.LoadB2BUserSuccess([member, member2]));
      store.dispatch(
        new UserGroupActions.LoadAvailableOrgCustomersSuccess({
          userGroupId,
          params,
          page: {
            ids: [member.customerId, member2.customerId],
            pagination,
            sorts,
          },
        })
      );
      let members: EntitiesModel<B2BUser>;
      service
        .getAvailableOrgCustomers(userGroupId, params)
        .subscribe((data) => {
          members = data;
        })
        .unsubscribe();

      expect(userIdService.takeUserId).not.toHaveBeenCalled();
      expect(members).toEqual(memberList);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new B2BUserActions.LoadB2BUsers({ userId, params })
      );
    });
  });

  describe('assign members to userGroup', () => {
    it('assignMember() should should dispatch CreateUserGroupMember action', () => {
      service.assignMember(userGroupId, customerId);

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserGroupActions.AssignMember({
          userId,
          userGroupId,
          customerId,
        })
      );
    });
  });

  describe('unassign members from userGroup', () => {
    it('unassignMember() should should dispatch DeleteUserGroupMember action', () => {
      service.unassignMember(userGroupId, customerId);

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserGroupActions.UnassignMember({
          userId,
          userGroupId,
          customerId,
        })
      );
    });
  });

  describe('unassign all members from userGroup', () => {
    it('unassignMember() should should dispatch DeleteUserGroupMember action', () => {
      service.unassignAllMembers(userGroupId);

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new UserGroupActions.UnassignAllMembers({
          userId,
          userGroupId,
        })
      );
    });
  });

  describe('get loading Status', () => {
    it('getLoadingStatus() should should be able to get status success change from loading with value', () => {
      let loadingStatus: OrganizationItemStatus<UserGroup>;
      store.dispatch(
        new UserGroupActions.LoadUserGroup({ userId, userGroupId })
      );
      service
        .getLoadingStatus(userGroupId)
        .subscribe((status) => (loadingStatus = status));
      expect(loadingStatus).toBeUndefined();
      store.dispatch(new UserGroupActions.LoadUserGroupSuccess([userGroup]));
      expect(loadingStatus).toEqual({
        status: LoadStatus.SUCCESS,
        item: userGroup,
      });
    });

    it('getLoadingStatus() should should be able to get status fail', () => {
      let loadingStatus: OrganizationItemStatus<UserGroup>;
      store.dispatch(
        new UserGroupActions.LoadUserGroup({ userId, userGroupId })
      );
      service
        .getLoadingStatus(userGroupId)
        .subscribe((status) => (loadingStatus = status));
      expect(loadingStatus).toBeUndefined();
      store.dispatch(
        new UserGroupActions.LoadUserGroupFail({
          userGroupId,
          error: new Error(),
        })
      );
      expect(loadingStatus).toEqual({
        status: LoadStatus.ERROR,
        item: undefined,
      });
    });
  });

  describe('getErrorState', () => {
    it('getErrorState() should be able to get status error', () => {
      let errorState: boolean;
      spyOn<any>(service, 'getUserGroupState').and.returnValue(
        of({ loading: false, success: false, error: true })
      );

      service.getErrorState('code').subscribe((error) => (errorState = error));

      expect(errorState).toBeTrue();
    });
  });
});
