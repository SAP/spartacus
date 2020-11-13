import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import {
  normalizeHttpError,
  OccConfig,
  SearchConfig,
  OrderApprovalPermissionType,
} from '@spartacus/core';
import {
  OrganizationActions,
  PermissionConnector,
} from '@spartacus/organization/administration/core';
import { cold, hot } from 'jasmine-marbles';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import { Observable, of, throwError } from 'rxjs';
import { defaultOccOrganizationConfig } from '../../../occ/config/default-occ-organization-config';
import { Permission } from '../../model/permission.model';
import { PermissionActions } from '../actions/index';
import * as fromEffects from './permission.effect';
import createSpy = jasmine.createSpy;

const httpErrorResponse = new HttpErrorResponse({
  error: 'error',
  headers: new HttpHeaders().set('xxx', 'xxx'),
  status: 500,
  statusText: 'Unknown error',
  url: '/xxx',
});
const error = normalizeHttpError(httpErrorResponse);
const permissionCode = 'testCode';
const userId = 'testUser';
const permission: Permission = {
  code: permissionCode,
  active: false,
  currency: {},
  orgUnit: { uid: 'ouid', name: 'ouName' },
};

const permissionType: OrderApprovalPermissionType = {
  code: 'testPermissionTypeCode',
  name: 'testPermissionTypeName',
};
const permissionTypes: OrderApprovalPermissionType[] = [permissionType];

const pagination = { currentPage: 1 };
const sorts = [{ selected: true, name: 'code' }];

class MockPermissionConnector {
  get = createSpy().and.returnValue(of(permission));
  getList = createSpy().and.returnValue(
    of({ values: [permission], pagination, sorts })
  );
  create = createSpy().and.returnValue(of(permission));
  update = createSpy().and.returnValue(of(permission));
  getTypes = createSpy().and.returnValue(of(permissionTypes));
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

    effects = TestBed.inject(fromEffects.PermissionEffects);
    permissionConnector = TestBed.inject(PermissionConnector);
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
      permissionConnector.get = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new PermissionActions.LoadPermission({
        userId,
        permissionCode,
      });
      const completion = new PermissionActions.LoadPermissionFail({
        permissionCode,
        error,
      });
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
    const params: SearchConfig = { sort: 'code' };

    it('should return LoadPermissionSuccess action', () => {
      const action = new PermissionActions.LoadPermissions({ userId, params });
      const completion = new PermissionActions.LoadPermissionSuccess([
        permission,
      ]);
      const completion2 = new PermissionActions.LoadPermissionsSuccess({
        params,
        page: { ids: [permissionCode], pagination, sorts },
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion, c: completion2 });

      expect(effects.loadPermissions$).toBeObservable(expected);
      expect(permissionConnector.getList).toHaveBeenCalledWith(userId, params);
    });

    it('should return LoadPermissionsFail action if permissions not loaded', () => {
      permissionConnector.getList = createSpy().and.returnValue(
        throwError(httpErrorResponse)
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
      const completion1 = new PermissionActions.CreatePermissionSuccess(
        permission
      );
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.createPermission$).toBeObservable(expected);
      expect(permissionConnector.create).toHaveBeenCalledWith(
        userId,
        permission
      );
    });

    it('should return CreatePermissionFail action if permission not created', () => {
      permissionConnector.create = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new PermissionActions.CreatePermission({
        userId,
        permission,
      });
      const completion1 = new PermissionActions.CreatePermissionFail({
        permissionCode,
        error,
      });
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

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
      const completion1 = new PermissionActions.UpdatePermissionSuccess(
        permission
      );
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.updatePermission$).toBeObservable(expected);
      expect(permissionConnector.update).toHaveBeenCalledWith(
        userId,
        permissionCode,
        permission
      );
    });

    it('should return UpdatePermissionFail action if permission not created', () => {
      permissionConnector.update = createSpy('update').and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new PermissionActions.UpdatePermission({
        userId,
        permissionCode,
        permission,
      });
      const completion1 = new PermissionActions.UpdatePermissionFail({
        permissionCode,
        error,
      });
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.updatePermission$).toBeObservable(expected);
      expect(permissionConnector.update).toHaveBeenCalledWith(
        userId,
        permissionCode,
        permission
      );
    });
  });

  describe('loadPermissionTypes$', () => {
    it('should return LoadPermissionTypesSuccess action', () => {
      const action = new PermissionActions.LoadPermissionTypes();
      const completion = new PermissionActions.LoadPermissionTypesSuccess(
        permissionTypes
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadPermissionTypes$).toBeObservable(expected);
      expect(permissionConnector.getTypes).toHaveBeenCalledWith();
    });

    it('should return LoadPermissionTypesFail action if permission types are not updated', () => {
      permissionConnector.getTypes = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new PermissionActions.LoadPermissionTypes();
      const completion = new PermissionActions.LoadPermissionTypesFail({
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadPermissionTypes$).toBeObservable(expected);
      expect(permissionConnector.getTypes).toHaveBeenCalledWith();
    });
  });
});
