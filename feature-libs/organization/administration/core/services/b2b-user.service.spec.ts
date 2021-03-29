import { inject, TestBed } from '@angular/core/testing';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store, StoreModule } from '@ngrx/store';
import {
  B2BUser,
  B2BUserRole,
  EntitiesModel,
  SearchConfig,
  UserIdService,
} from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  LoadStatus,
  OrganizationItemStatus,
} from '../model/organization-item-status';
import { Permission } from '../model/permission.model';
import { UserGroup } from '../model/user-group.model';
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
import { B2BUserService } from './b2b-user.service';

const userId = 'currentUserId';
const orgCustomerId = 'currentOrgCustomerId';
const permissionId = 'permissionId';
const permissionId2 = 'permissionId2';
const params: SearchConfig = { sort: 'code' };
const permission: Permission = {
  active: true,
  code: permissionId,
};
const permission2: Permission = { ...permission, code: permissionId2 };

const b2bUser: B2BUser = {
  active: true,
  customerId: orgCustomerId,
  uid: 'aaa@bbb',
  name: 'test',
};
const b2bUser2: B2BUser = {
  active: true,
  customerId: 'OrgCustomerId2',
  uid: 'bbb@aaa',
  name: 'test2',
};

const userGroup: UserGroup = {
  uid: 'userGroupUid',
  permissions: [permission],
};
const userGroup2: UserGroup = { ...userGroup, uid: 'userGroupUid2' };
const pagination = { currentPage: 1 };
const sorts = [{ selected: true, name: 'code' }];
const b2bUserList: EntitiesModel<B2BUser> = {
  values: [b2bUser, b2bUser2],
  pagination,
  sorts,
};
const permissionList: EntitiesModel<Permission> = {
  values: [permission, permission2],
  pagination,
  sorts,
};
const userGroupList: EntitiesModel<UserGroup> = {
  values: [userGroup, userGroup2],
  pagination,
  sorts,
};

let takeUserId$: BehaviorSubject<string | never>;
class MockUserIdService implements Partial<UserIdService> {
  takeUserId = () => takeUserId$.asObservable();
}

describe('B2BUserService', () => {
  let service: B2BUserService;
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
        B2BUserService,
        { provide: UserIdService, useClass: MockUserIdService },
      ],
    });

    store = TestBed.inject(Store);
    service = TestBed.inject(B2BUserService);
    userIdService = TestBed.inject(UserIdService);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(userIdService, 'takeUserId').and.callThrough();

    actions$ = TestBed.inject(ActionsSubject);
    takeUserId$ = new BehaviorSubject(userId);
  });

  it('should B2BUserService is injected', inject(
    [B2BUserService],
    (b2bUserService: B2BUserService) => {
      expect(b2bUserService).toBeTruthy();
    }
  ));

  describe('Load B2B User', () => {
    it('load() should should dispatch LoadB2BUser action', () => {
      service.load(orgCustomerId);

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new B2BUserActions.LoadB2BUser({ userId, orgCustomerId })
      );
    });
  });

  describe('Load B2B Users', () => {
    it('loadList() should should dispatch LoadB2BUsers action', () => {
      service.loadList(params);

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new B2BUserActions.LoadB2BUsers({ userId, params })
      );
    });
  });

  describe('get B2B user', () => {
    xit('get() should load B2B user when not present in the store', (done) => {
      const sub = service.get(orgCustomerId).subscribe();

      actions$
        .pipe(ofType(B2BUserActions.LOAD_B2B_USER), take(1))
        .subscribe((action) => {
          expect(action).toEqual(
            new B2BUserActions.LoadB2BUser({ userId, orgCustomerId })
          );
          sub.unsubscribe();
          done();
        });
    });

    it('get() should be able to get user when present in the store', () => {
      store.dispatch(
        new B2BUserActions.LoadB2BUserSuccess([b2bUser, b2bUser2])
      );
      let b2bUserDetails: B2BUser;
      service
        .get(orgCustomerId)
        .subscribe((data) => {
          b2bUserDetails = data;
        })
        .unsubscribe();

      expect(userIdService.takeUserId).not.toHaveBeenCalled();
      expect(b2bUserDetails).toEqual(b2bUser);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new B2BUserActions.LoadB2BUser({ userId, orgCustomerId })
      );
    });
  });

  describe('get users', () => {
    it('getList() should be able to get users when not present in the store', () => {
      let users: EntitiesModel<B2BUser>;
      service
        .getList(params)
        .subscribe((data) => {
          users = data;
        })
        .unsubscribe();

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(users).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new B2BUserActions.LoadB2BUsers({ userId, params })
      );
    });

    it('getList() should be able to get users when present in the store', () => {
      store.dispatch(
        new B2BUserActions.LoadB2BUserSuccess([b2bUser, b2bUser2])
      );
      store.dispatch(
        new B2BUserActions.LoadB2BUsersSuccess({
          params,
          page: {
            ids: [b2bUser.customerId, b2bUser2.customerId],
            pagination,
            sorts,
          },
        })
      );
      let users: EntitiesModel<B2BUser>;
      service
        .getList(params)
        .subscribe((data) => {
          users = data;
        })
        .unsubscribe();

      expect(userIdService.takeUserId).not.toHaveBeenCalled();
      expect(users).toEqual(b2bUserList);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new B2BUserActions.LoadB2BUsers({ userId, params })
      );
    });

    describe('create B2B user', () => {
      it('create() should should dispatch CreateBudget action', () => {
        service.create(b2bUser);

        expect(userIdService.takeUserId).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
          new B2BUserActions.CreateB2BUser({ userId, orgCustomer: b2bUser })
        );
      });
    });

    describe('update B2B user', () => {
      it('update() should should dispatch UpdateB2BUser action', () => {
        service.update(orgCustomerId, b2bUser);

        expect(userIdService.takeUserId).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
          new B2BUserActions.UpdateB2BUser({
            userId,
            orgCustomerId,
            orgCustomer: b2bUser,
          })
        );
      });
    });

    describe('load B2B user approvers', () => {
      it('loadApprovers() should should dispatch LoadB2BUserApprovers action', () => {
        service.loadApprovers(orgCustomerId, params);

        expect(userIdService.takeUserId).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
          new B2BUserActions.LoadB2BUserApprovers({
            userId,
            orgCustomerId,
            params,
          })
        );
      });
    });

    describe('get B2BUser approvers', () => {
      it('getApprovers() should be able to get approvers when not present in the store', () => {
        let users: EntitiesModel<B2BUser>;
        service
          .getApprovers(orgCustomerId, params)
          .subscribe((data) => {
            users = data;
          })
          .unsubscribe();

        expect(userIdService.takeUserId).toHaveBeenCalled();
        expect(users).toEqual(undefined);
        expect(store.dispatch).toHaveBeenCalledWith(
          new B2BUserActions.LoadB2BUserApprovers({
            userId,
            orgCustomerId,
            params,
          })
        );
      });

      it('getApprovers() should be able to get approvers when present in the store', () => {
        store.dispatch(
          new B2BUserActions.LoadB2BUserSuccess(b2bUserList.values)
        );
        store.dispatch(
          new B2BUserActions.LoadB2BUserApproversSuccess({
            orgCustomerId,
            page: {
              ids: [b2bUser.customerId, b2bUser2.customerId],
              pagination,
              sorts,
            },
            params,
          })
        );
        let usersReceived: EntitiesModel<B2BUser>;
        service
          .getApprovers(orgCustomerId, params)
          .subscribe((data) => {
            usersReceived = data;
          })
          .unsubscribe();
        expect(userIdService.takeUserId).not.toHaveBeenCalled();
        expect(usersReceived).toEqual(b2bUserList);
        expect(store.dispatch).not.toHaveBeenCalledWith(
          new B2BUserActions.LoadB2BUserApprovers({
            userId,
            orgCustomerId,
            params,
          })
        );
      });
    });

    describe('assign approver', () => {
      it('assignApprover() should dispatch CreateB2BUserApprover action', () => {
        const approverId = 'approverId';
        service.assignApprover(orgCustomerId, approverId);

        expect(userIdService.takeUserId).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
          new B2BUserActions.AssignB2BUserApprover({
            userId,
            orgCustomerId,
            approverId,
          })
        );
      });
    });

    describe('unassign approver', () => {
      it('unassignApprover() should dispatch DeleteB2BUserApprover action', () => {
        const approverId = 'approverId';
        service.unassignApprover(orgCustomerId, approverId);

        expect(userIdService.takeUserId).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
          new B2BUserActions.UnassignB2BUserApprover({
            userId,
            orgCustomerId,
            approverId,
          })
        );
      });
    });

    describe('load B2B user permissions', () => {
      it('loadPermissions() should dispatch LoadB2BUserPermissions action', () => {
        service.loadPermissions(orgCustomerId, params);
        expect(userIdService.takeUserId).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
          new B2BUserActions.LoadB2BUserPermissions({
            userId,
            orgCustomerId,
            params,
          })
        );
      });
    });
    describe('get B2B user permissions', () => {
      it('getPermissions() should be able to get permissions when not present in the store', () => {
        let permissionsReceived: EntitiesModel<Permission>;
        service
          .getPermissions(orgCustomerId, params)
          .subscribe((data) => {
            permissionsReceived = data;
          })
          .unsubscribe();

        expect(userIdService.takeUserId).toHaveBeenCalled();
        expect(permissionsReceived).toEqual(undefined);
        expect(store.dispatch).toHaveBeenCalledWith(
          new B2BUserActions.LoadB2BUserPermissions({
            userId,
            orgCustomerId,
            params,
          })
        );
      });

      it('getPermissions() should be able to get permissions when present in the store', () => {
        store.dispatch(
          new PermissionActions.LoadPermissionSuccess(permissionList.values)
        );
        store.dispatch(
          new B2BUserActions.LoadB2BUserPermissionsSuccess({
            orgCustomerId,
            page: {
              ids: [permission.code, permission2.code],
              pagination,
              sorts,
            },
            params,
          })
        );
        let permissionsReceived: EntitiesModel<Permission>;
        service
          .getPermissions(orgCustomerId, params)
          .subscribe((data) => {
            permissionsReceived = data;
          })
          .unsubscribe();
        expect(userIdService.takeUserId).not.toHaveBeenCalled();
        expect(permissionsReceived).toEqual(permissionList);
        expect(store.dispatch).not.toHaveBeenCalledWith(
          new B2BUserActions.LoadB2BUserPermissions({
            userId,
            orgCustomerId,
            params,
          })
        );
      });
    });

    describe('assign permission', () => {
      it('assignPermission() should should dispatch CreateB2BUserPermission action', () => {
        service.assignPermission(orgCustomerId, permissionId);

        expect(userIdService.takeUserId).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
          new B2BUserActions.AssignB2BUserPermission({
            userId,
            orgCustomerId,
            permissionId,
          })
        );
      });
    });

    describe('unassign permission', () => {
      it('unassignPermission() should should dispatch DeleteB2BUserPermission action', () => {
        service.unassignPermission(orgCustomerId, permissionId);

        expect(userIdService.takeUserId).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(
          new B2BUserActions.UnassignB2BUserPermission({
            userId,
            orgCustomerId,
            permissionId,
          })
        );
      });
    });
  });

  describe('load B2B User Groups', () => {
    it('loadUserGroups() should should dispatch LoadB2BUserUserGroups action', () => {
      service.loadUserGroups(orgCustomerId, params);
      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new B2BUserActions.LoadB2BUserUserGroups({
          userId,
          orgCustomerId,
          params,
        })
      );
    });
  });

  describe('get B2BUser usergroups', () => {
    it('getUserGroups() should be able to get B2Buser usergroups when not present in the store', () => {
      let userGroupsReceived: EntitiesModel<UserGroup>;
      service
        .getUserGroups(orgCustomerId, params)
        .subscribe((data) => {
          userGroupsReceived = data;
        })
        .unsubscribe();

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(userGroupsReceived).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new B2BUserActions.LoadB2BUserUserGroups({
          userId,
          orgCustomerId,
          params,
        })
      );
    });

    it('getUserGroups() should be able to get B2Buser usergroups when present in the store', () => {
      store.dispatch(
        new UserGroupActions.LoadUserGroupSuccess(userGroupList.values)
      );
      store.dispatch(
        new B2BUserActions.LoadB2BUserUserGroupsSuccess({
          orgCustomerId,
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
        .getUserGroups(orgCustomerId, params)
        .subscribe((data) => {
          userGroups = data;
        })
        .unsubscribe();

      expect(userIdService.takeUserId).not.toHaveBeenCalled();
      expect(userGroups).toEqual(userGroupList);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new B2BUserActions.LoadB2BUserUserGroups({
          userId,
          orgCustomerId,
          params,
        })
      );
    });
  });

  describe('assign user group', () => {
    const userGroupId = 'userGroupId';

    it('assignUserGroup() should should dispatch CreateB2BUserUserGroup action', () => {
      service.assignUserGroup(orgCustomerId, userGroupId);
      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new B2BUserActions.AssignB2BUserUserGroup({
          userId,
          orgCustomerId,
          userGroupId,
        })
      );
    });
  });

  describe('unassign user group', () => {
    const userGroupId = 'userGroupId';

    it('unassignUserGroup() should should dispatch DeleteB2BUserUserGroup action', () => {
      service.unassignUserGroup(orgCustomerId, userGroupId);
      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new B2BUserActions.UnassignB2BUserUserGroup({
          userId,
          orgCustomerId,
          userGroupId,
        })
      );
    });
  });

  describe('getAllRoles()', () => {
    it('should return all possible b2b user roles in order', () => {
      expect(service.getAllRoles()).toEqual([
        B2BUserRole.CUSTOMER,
        B2BUserRole.MANAGER,
        B2BUserRole.APPROVER,
        B2BUserRole.ADMIN,
      ]);
    });
  });

  describe('get loading Status', () => {
    it('getLoadingStatus() should should be able to get status success change from loading with value', () => {
      let loadingStatus: OrganizationItemStatus<B2BUser>;
      store.dispatch(new B2BUserActions.LoadB2BUser({ userId, orgCustomerId }));
      service
        .getLoadingStatus(orgCustomerId)
        .subscribe((status) => (loadingStatus = status));
      expect(loadingStatus).toBeUndefined();
      store.dispatch(new B2BUserActions.LoadB2BUserSuccess([b2bUser]));
      expect(loadingStatus).toEqual({
        status: LoadStatus.SUCCESS,
        item: b2bUser,
      });
    });

    it('getLoadingStatus() should should be able to get status fail', () => {
      let loadingStatus: OrganizationItemStatus<B2BUser>;
      store.dispatch(new B2BUserActions.LoadB2BUser({ userId, orgCustomerId }));
      service
        .getLoadingStatus(orgCustomerId)
        .subscribe((status) => (loadingStatus = status));
      expect(loadingStatus).toBeUndefined();
      store.dispatch(
        new B2BUserActions.LoadB2BUserFail({
          orgCustomerId,
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
      spyOn<any>(service, 'getB2BUserState').and.returnValue(
        of({ loading: false, success: false, error: true })
      );

      service.getErrorState('code').subscribe((error) => (errorState = error));

      expect(errorState).toBeTrue();
    });
  });
});
