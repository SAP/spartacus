import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { Permission } from '../../../model/permission.model';
import { PermissionActions } from '../actions/index';
import {
  ORGANIZATION_FEATURE,
  StateWithOrganization,
  PermissionManagement,
} from '../organization-state';
import * as fromReducers from '../reducers/index';
import { PermissionSelectors } from '../selectors/index';
import { EntityLoaderState, LoaderState } from '@spartacus/core';

describe('Permission Selectors', () => {
  let store: Store<StateWithOrganization>;

  const code = 'testCode';
  const permission: Permission = {
    code,
  };
  const permission2: Permission = {
    code: 'testCode2',
  };

  const entities = {
    testCode: {
      loading: false,
      error: false,
      success: true,
      value: permission,
    },
    testCode2: {
      loading: false,
      error: false,
      success: true,
      value: permission2,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          ORGANIZATION_FEATURE,
          fromReducers.getReducers()
        ),
      ],
    });

    store = TestBed.get(Store as Type<Store<StateWithOrganization>>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getPermissionManagementState ', () => {
    it('should return permissions state', () => {
      let result: PermissionManagement;
      store
        .pipe(select(PermissionSelectors.getPermissionManagementState))
        .subscribe(value => (result = value));

      store.dispatch(
        new PermissionActions.LoadPermissionSuccess([permission, permission2])
      );
      expect(result).toEqual({
        entities: { entities },
        list: { entities: {} },
      });
    });
  });

  describe('getPermissions', () => {
    it('should return permissions', () => {
      let result: EntityLoaderState<Permission>;
      store
        .pipe(select(PermissionSelectors.getPermissionsState))
        .subscribe(value => (result = value));

      store.dispatch(
        new PermissionActions.LoadPermissionSuccess([permission, permission2])
      );
      expect(result).toEqual({ entities });
    });
  });

  describe('getPermission', () => {
    it('should return permission by id', () => {
      let result: LoaderState<Permission>;
      store
        .pipe(select(PermissionSelectors.getPermission(code)))
        .subscribe(value => (result = value));

      store.dispatch(
        new PermissionActions.LoadPermissionSuccess([permission, permission2])
      );
      expect(result).toEqual(entities.testCode);
    });
  });
});
