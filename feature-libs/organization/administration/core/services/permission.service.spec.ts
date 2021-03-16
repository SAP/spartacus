import { inject, TestBed } from '@angular/core/testing';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store, StoreModule } from '@ngrx/store';
import {
  EntitiesModel,
  OrderApprovalPermissionType,
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
import { PermissionActions } from '../store/actions/index';
import {
  ORGANIZATION_FEATURE,
  StateWithOrganization,
} from '../store/organization-state';
import * as fromReducers from '../store/reducers/index';
import { PermissionService } from './permission.service';

const userId = 'current';
const permissionCode = 'testPermission';
const permission = { code: permissionCode };
const permission2 = { code: 'testPermission2' };
const pagination = { currentPage: 1 };
const sorts = [{ selected: true, name: 'code' }];
const permissionList: EntitiesModel<Permission> = {
  values: [permission, permission2],
  pagination,
  sorts,
};
const mockPermissionType: OrderApprovalPermissionType = {
  code: 'testPermissionTypeCode',
  name: 'testPermissionTypeName',
};
const mockPermissionTypes: OrderApprovalPermissionType[] = [mockPermissionType];

let takeUserId$: BehaviorSubject<string | never>;
class MockUserIdService implements Partial<UserIdService> {
  takeUserId = () => takeUserId$.asObservable();
}

describe('PermissionService', () => {
  let service: PermissionService;
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
        PermissionService,
        { provide: UserIdService, useClass: MockUserIdService },
      ],
    });

    store = TestBed.inject(Store);
    service = TestBed.inject(PermissionService);
    userIdService = TestBed.inject(UserIdService);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(userIdService, 'takeUserId').and.callThrough();

    actions$ = TestBed.inject(ActionsSubject);
    takeUserId$ = new BehaviorSubject(userId);
  });

  it('should PermissionService is injected', inject(
    [PermissionService],
    (permissionService: PermissionService) => {
      expect(permissionService).toBeTruthy();
    }
  ));

  describe('get permission', () => {
    xit('get() should trigger load permission details when they are not present in the store', (done) => {
      const sub = service.get(permissionCode).subscribe();

      actions$
        .pipe(ofType(PermissionActions.LOAD_PERMISSION), take(1))
        .subscribe((action) => {
          expect(action).toEqual(
            new PermissionActions.LoadPermission({ userId, permissionCode })
          );
          sub.unsubscribe();
          done();
        });
    });

    it('get() should be able to get permission details when they are present in the store', () => {
      store.dispatch(
        new PermissionActions.LoadPermissionSuccess([permission, permission2])
      );
      let permissionDetails: Permission;
      service
        .get(permissionCode)
        .subscribe((data) => {
          permissionDetails = data;
        })
        .unsubscribe();

      expect(userIdService.takeUserId).not.toHaveBeenCalled();
      expect(permissionDetails).toEqual(permission);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new PermissionActions.LoadPermission({ userId, permissionCode })
      );
    });
  });

  describe('get permissions', () => {
    const params: SearchConfig = { sort: 'code' };

    it('getList() should trigger load permissions when they are not present in the store', () => {
      let permissions: EntitiesModel<Permission>;
      service
        .getList(params)
        .subscribe((data) => {
          permissions = data;
        })
        .unsubscribe();

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(permissions).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new PermissionActions.LoadPermissions({ userId, params })
      );
    });

    it('getList() should be able to get permissions when they are present in the store', () => {
      store.dispatch(
        new PermissionActions.LoadPermissionSuccess([permission, permission2])
      );
      store.dispatch(
        new PermissionActions.LoadPermissionsSuccess({
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
        .getList(params)
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

  describe('create permission', () => {
    it('create() should should dispatch CreatePermission action', () => {
      service.create(permission);

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new PermissionActions.CreatePermission({ userId, permission })
      );
    });
  });

  describe('update permission', () => {
    it('update() should should dispatch UpdatePermission action', () => {
      service.update(permissionCode, permission);

      expect(userIdService.takeUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new PermissionActions.UpdatePermission({
          userId,
          permissionCode,
          permission,
        })
      );
    });
  });

  describe('get permission types', () => {
    it('getTypes() should trigger load permission types when they are not present in the store', () => {
      let permissionTypes: OrderApprovalPermissionType[];
      service
        .getTypes()
        .subscribe((data) => {
          permissionTypes = data;
        })
        .unsubscribe();

      expect(permissionTypes).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new PermissionActions.LoadPermissionTypes()
      );
    });

    it('getTypes() should trigger load permission types when they are present in the store', () => {
      store.dispatch(
        new PermissionActions.LoadPermissionTypesSuccess(mockPermissionTypes)
      );
      let permissionTypesReceived: OrderApprovalPermissionType[];
      service
        .getTypes()
        .subscribe((data) => {
          permissionTypesReceived = data;
        })
        .unsubscribe();

      expect(permissionTypesReceived).toEqual(mockPermissionTypes);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new PermissionActions.LoadPermissionTypes()
      );
    });
  });

  describe('get loading Status', () => {
    it('getLoadingStatus() should should be able to get status success change from loading with value', () => {
      let loadingStatus: OrganizationItemStatus<Permission>;
      store.dispatch(
        new PermissionActions.LoadPermission({ userId, permissionCode })
      );
      service
        .getLoadingStatus(permissionCode)
        .subscribe((status) => (loadingStatus = status));
      expect(loadingStatus).toBeUndefined();
      store.dispatch(new PermissionActions.LoadPermissionSuccess([permission]));
      expect(loadingStatus).toEqual({
        status: LoadStatus.SUCCESS,
        item: permission,
      });
    });

    it('getLoadingStatus() should should be able to get status fail', () => {
      let loadingStatus: OrganizationItemStatus<Permission>;
      store.dispatch(
        new PermissionActions.LoadPermission({ userId, permissionCode })
      );
      service
        .getLoadingStatus(permissionCode)
        .subscribe((status) => (loadingStatus = status));
      expect(loadingStatus).toBeUndefined();
      store.dispatch(
        new PermissionActions.LoadPermissionFail({
          permissionCode,
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
      spyOn<any>(service, 'getPermissionState').and.returnValue(
        of({ loading: false, success: false, error: true })
      );

      service.getErrorState('code').subscribe((error) => (errorState = error));

      expect(errorState).toBeTrue();
    });
  });
});
