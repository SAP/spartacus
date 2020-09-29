import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AuthService, EntitiesModel, SearchConfig } from '@spartacus/core';
import { of } from 'rxjs';
import {
  OrderApprovalPermissionType,
  Permission,
} from '../model/permission.model';
import { PermissionActions } from '../store/actions/index';
import {
  ORGANIZATION_FEATURE,
  StateWithOrganization,
} from '../store/organization-state';
import * as fromReducers from '../store/reducers/index';
import { PermissionService } from './permission.service';
import { LoadStatus } from '../model/LoadStatus';
import createSpy = jasmine.createSpy;

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

class MockAuthService {
  getOccUserId = createSpy().and.returnValue(of(userId));
}

describe('PermissionService', () => {
  let service: PermissionService;
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
      ],
      providers: [
        PermissionService,
        { provide: AuthService, useClass: MockAuthService },
      ],
    });

    store = TestBed.inject(Store);
    service = TestBed.inject(PermissionService);
    authService = TestBed.inject(AuthService);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should PermissionService is injected', inject(
    [PermissionService],
    (permissionService: PermissionService) => {
      expect(permissionService).toBeTruthy();
    }
  ));

  describe('get permission', () => {
    it('get() should trigger load permission details when they are not present in the store', () => {
      let permissionDetails: Permission;
      service
        .get(permissionCode)
        .subscribe((data) => {
          permissionDetails = data;
        })
        .unsubscribe();

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(permissionDetails).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new PermissionActions.LoadPermission({ userId, permissionCode })
      );
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

      expect(authService.getOccUserId).not.toHaveBeenCalled();
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

      expect(authService.getOccUserId).toHaveBeenCalled();
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

      expect(authService.getOccUserId).not.toHaveBeenCalled();
      expect(permissions).toEqual(permissionList);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new PermissionActions.LoadPermissions({ userId, params })
      );
    });
  });

  describe('create permission', () => {
    it('create() should should dispatch CreatePermission action', () => {
      service.create(permission);

      expect(authService.getOccUserId).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        new PermissionActions.CreatePermission({ userId, permission })
      );
    });
  });

  describe('update permission', () => {
    it('update() should should dispatch UpdatePermission action', () => {
      service.update(permissionCode, permission);

      expect(authService.getOccUserId).toHaveBeenCalled();
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
      let permisstionTypes: OrderApprovalPermissionType[];
      service
        .getTypes()
        .subscribe((data) => {
          permisstionTypes = data;
        })
        .unsubscribe();

      expect(permisstionTypes).toEqual(undefined);
      expect(store.dispatch).toHaveBeenCalledWith(
        new PermissionActions.LoadPermissionTypes()
      );
    });

    it('getTypes() should trigger load permission types when they are present in the store', () => {
      store.dispatch(
        new PermissionActions.LoadPermissionTypesSuccess(mockPermissionTypes)
      );
      let permissionTypesRecived: OrderApprovalPermissionType[];
      service
        .getTypes()
        .subscribe((data) => {
          permissionTypesRecived = data;
        })
        .unsubscribe();

      expect(permissionTypesRecived).toEqual(mockPermissionTypes);
      expect(store.dispatch).not.toHaveBeenCalledWith(
        new PermissionActions.LoadPermissionTypes()
      );
    });
  });

  describe('get loading Status', () => {
    it('getLoadingStatus() should should be able to get status success change from loading with value', () => {
      let loadingStatus;
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
        value: permission,
      });
    });

    it('getLoadingStatus() should should be able to get status fail', () => {
      let loadingStatus;
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
        value: {},
      });
    });
  });
});
