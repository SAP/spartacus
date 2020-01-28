import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

import { Permission } from '../../model/permission.model';
import { EntitiesModel } from '../../model/misc.model';
import { PROCESS_FEATURE } from '../../process/store/process-state';
import * as fromProcessReducers from '../../process/store/reducers';
import { PermissionActions } from '../store/actions/index';
import * as fromReducers from '../store/reducers/index';
import { PermissionService } from './permission.service';
import { B2BSearchConfig } from '../model/search-config';
import {
  AuthService,
  ORGANIZATION_FEATURE,
  StateWithOrganization,
} from '@spartacus/core';

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
        StoreModule.forFeature(
          PROCESS_FEATURE,
          fromProcessReducers.getReducers()
        ),
      ],
      providers: [
        PermissionService,
        { provide: AuthService, useClass: MockAuthService },
      ],
    });

    store = TestBed.get(Store as Type<Store<StateWithOrganization>>);
    service = TestBed.get(PermissionService as Type<PermissionService>);
    authService = TestBed.get(AuthService as Type<AuthService>);
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
        .subscribe(data => {
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
        .subscribe(data => {
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
    const params: B2BSearchConfig = { sort: 'code' };

    it('getList() should trigger load permissions when they are not present in the store', () => {
      let permissions: EntitiesModel<Permission>;
      service
        .getList(params)
        .subscribe(data => {
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
});
