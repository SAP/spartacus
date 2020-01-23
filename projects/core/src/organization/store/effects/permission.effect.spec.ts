import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import createSpy = jasmine.createSpy;

import { Permission } from '../../../model/permission.model';
import { defaultOccOrganizationConfig } from '../../../occ/adapters/organization/default-occ-organization-config';
import { OccConfig } from '../../../occ/config/occ-config';
import { PermissionConnector } from '../../connectors/permission/permission.connector';
import { PermissionActions } from '../actions/index';
import * as fromEffects from './permission.effect';
import { B2BSearchConfig } from '../../model/search-config';

const error = 'error';
const permissionCode = 'testCode';
const userId = 'testUser';
const permission: Permission = {
  code: 'testCode',
  active: false,
  permission: 2,
  currency: {},
  endDate: 'endDate',
  startDate: 'startDate',
  name: 'testName',
  orgUnit: { uid: 'ouid', name: 'ouName' },
  costCenters: [],
};
const pagination = { currentPage: 1 };
const sorts = [{ selected: true, name: 'code' }];

class MockPermissionConnector {
  get = createSpy().and.returnValue(of(permission));
  getList = createSpy().and.returnValue(
    of({ permissions: [permission], pagination, sorts })
  );
  create = createSpy().and.returnValue(of(permission));
  update = createSpy().and.returnValue(of(permission));
}

describe('Permission Effects', () => {
  let actions$: Observable<PermissionActions.PermissionAction>;
  let permissionConnector: PermissionConnector;
  let effects: fromEffects.PermissionEffects;
  let expected: TestColdObservable;

  const mockPermissionState = {
    details: {
      entities: {
        testLoadedCode: { loading: false, value: permission },
        testLoadingCode: { loading: true, value: null },
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({ permission: () => mockPermissionState }),
      ],
      providers: [
        { provide: PermissionConnector, useClass: MockPermissionConnector },
        { provide: OccConfig, useValue: defaultOccOrganizationConfig },
        fromEffects.PermissionEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.get(fromEffects.PermissionEffects as Type<
      fromEffects.PermissionEffects
    >);
    permissionConnector = TestBed.get(PermissionConnector as Type<
      PermissionConnector
    >);
    expected = null;
  });

  describe('loadPermission$', () => {
    it('should return LoadPermissionSuccess action', () => {
      const action = new PermissionActions.LoadPermission({
        userId,
        permissionCode,
      });
      const completion = new PermissionActions.LoadPermissionSuccess([
        permission,
      ]);
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadPermission$).toBeObservable(expected);
      expect(permissionConnector.get).toHaveBeenCalledWith(
        userId,
        permissionCode
      );
    });

    it('should return LoadPermissionFail action if permission not updated', () => {
      permissionConnector.get = createSpy().and.returnValue(throwError(error));
      const action = new PermissionActions.LoadPermission({
        userId,
        permissionCode,
      });
      const completion = new PermissionActions.LoadPermissionFail(
        permissionCode,
        error
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadPermission$).toBeObservable(expected);
      expect(permissionConnector.get).toHaveBeenCalledWith(
        userId,
        permissionCode
      );
    });
  });

  describe('loadPermissions$', () => {
    const params: B2BSearchConfig = { sort: 'code' };

    it('should return LoadPermissionSuccess action', () => {
      const action = new PermissionActions.LoadPermissions({ userId, params });
      const completion = new PermissionActions.LoadPermissionSuccess([
        permission,
      ]);
      const completion2 = new PermissionActions.LoadPermissionsSuccess({
        params,
        permissionPage: { ids: [permissionCode], pagination, sorts },
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion, c: completion2 });

      expect(effects.loadPermissions$).toBeObservable(expected);
      expect(permissionConnector.getList).toHaveBeenCalledWith(userId, params);
    });

    it('should return LoadPermissionsFail action if permissions not loaded', () => {
      permissionConnector.getList = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new PermissionActions.LoadPermissions({ userId, params });
      const completion = new PermissionActions.LoadPermissionsFail({
        error,
        params,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadPermissions$).toBeObservable(expected);
      expect(permissionConnector.getList).toHaveBeenCalledWith(userId, params);
    });
  });

  describe('createPermission$', () => {
    it('should return CreatePermissionSuccess action', () => {
      const action = new PermissionActions.CreatePermission({
        userId,
        permission,
      });
      const completion = new PermissionActions.CreatePermissionSuccess(
        permission
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.createPermission$).toBeObservable(expected);
      expect(permissionConnector.create).toHaveBeenCalledWith(
        userId,
        permission
      );
    });

    it('should return CreatePermissionFail action if permission not created', () => {
      permissionConnector.create = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new PermissionActions.CreatePermission({
        userId,
        permission,
      });
      const completion = new PermissionActions.CreatePermissionFail(
        permission.code,
        error
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.createPermission$).toBeObservable(expected);
      expect(permissionConnector.create).toHaveBeenCalledWith(
        userId,
        permission
      );
    });
  });

  describe('updatePermission$', () => {
    it('should return UpdatePermissionSuccess action', () => {
      const action = new PermissionActions.UpdatePermission({
        userId,
        permissionCode,
        permission,
      });
      const completion = new PermissionActions.UpdatePermissionSuccess(
        permission
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.updatePermission$).toBeObservable(expected);
      expect(permissionConnector.update).toHaveBeenCalledWith(
        userId,
        permissionCode,
        permission
      );
    });

    it('should return UpdatePermissionFail action if permission not created', () => {
      permissionConnector.update = createSpy().and.returnValue(
        throwError(error)
      );
      const action = new PermissionActions.UpdatePermission({
        userId,
        permissionCode,
        permission,
      });
      const completion = new PermissionActions.UpdatePermissionFail(
        permission.code,
        error
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.updatePermission$).toBeObservable(expected);
      expect(permissionConnector.update).toHaveBeenCalledWith(
        userId,
        permissionCode,
        permission
      );
    });
  });
});
