import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import {
  Address,
  B2BApprovalProcess,
  B2BUnit,
  B2BUser,
  EntitiesModel,
  ListModel,
  normalizeHttpError,
  OccConfig,
  SearchConfig,
} from '@spartacus/core';
import {
  OrganizationActions,
  OrgUnitConnector,
} from '@spartacus/organization/administration/core';
import { cold, hot } from 'jasmine-marbles';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import { Observable, of, throwError } from 'rxjs';
import { defaultOccOrganizationConfig } from '../../../occ/config/default-occ-organization-config';
import { B2BUnitNode } from '../../model/unit-node.model';
import { B2BUserActions, OrgUnitActions } from '../actions/index';
import * as fromEffects from './org-unit.effect';

import createSpy = jasmine.createSpy;

const httpErrorResponse = new HttpErrorResponse({
  error: 'error',
  headers: new HttpHeaders().set('xxx', 'xxx'),
  status: 500,
  statusText: 'Unknown error',
  url: '/xxx',
});
const error = normalizeHttpError(httpErrorResponse);
const userId = 'testUser';

const orgUnitId = 'testOrgUnitId';
const orgUnit: Partial<B2BUnit> = { uid: orgUnitId };

const orgUnitNode: Partial<B2BUnitNode> = { id: orgUnitId };
const orgUnitNode2: Partial<B2BUnitNode> = { id: 'testOrgUnit2' };

const orgUnitList: B2BUnitNode[] = [orgUnitNode, orgUnitNode2];

const address: Address = { id: 'testAddressId' };
const addressId = address.id;
const orgCustomerId = 'testOrgCustomerId';
const roleId = 'testRoleId';
const approvalProcess: B2BApprovalProcess = {
  code: 'testCode',
  name: 'testName',
};
const approvalProcesses: B2BApprovalProcess[] = [approvalProcess];
const unitNode: B2BUnitNode = { id: 'testUnitNode' };

const user = { uid: 'aaa@bbb', customerId: userId };
const users: EntitiesModel<B2BUser> = {
  values: [user],
  pagination: { totalResults: 1 },
  sorts: [{ code: 'code' }],
};

class MockOrgUnitConnector {
  get = createSpy().and.returnValue(of(orgUnit));
  getList = createSpy().and.returnValue(of(orgUnitList));
  create = createSpy().and.returnValue(of(orgUnit));
  update = createSpy().and.returnValue(of(orgUnit));
  createAddress = createSpy().and.returnValue(of(address));
  updateAddress = createSpy().and.returnValue(of(address));
  deleteAddress = createSpy().and.returnValue(of(address));
  assignRole = createSpy().and.returnValue(of(roleId));
  unassignRole = createSpy().and.returnValue(of(roleId));
  assignApprover = createSpy().and.returnValue(of(roleId));
  unassignApprover = createSpy().and.returnValue(of(roleId));
  getApprovalProcesses = createSpy().and.returnValue(of(approvalProcesses));
  getUsers = createSpy().and.returnValue(of(users));
  getTree = createSpy().and.returnValue(of(unitNode));
}

describe('OrgUnit Effects', () => {
  let actions$: Observable<OrgUnitActions.OrgUnitAction>;
  let orgUnitConnector: OrgUnitConnector;
  let effects: fromEffects.OrgUnitEffects;
  let expected: TestColdObservable;

  const mockOrgUnitState = {
    details: {
      entities: {
        testLoadedCode: { loading: false, value: orgUnit },
        testLoadingCode: { loading: true, value: null },
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({ orgUnit: () => mockOrgUnitState }),
      ],
      providers: [
        { provide: OrgUnitConnector, useClass: MockOrgUnitConnector },
        { provide: OccConfig, useValue: defaultOccOrganizationConfig },
        fromEffects.OrgUnitEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(fromEffects.OrgUnitEffects);
    orgUnitConnector = TestBed.inject(OrgUnitConnector);
    expected = null;
  });

  describe('load$', () => {
    // TODO: unlock after use final addresses endpoint
    xit('should return LoadOrgUnitSuccess action', () => {
      const action = new OrgUnitActions.LoadOrgUnit({ userId, orgUnitId });
      const completion = new OrgUnitActions.LoadOrgUnitSuccess([orgUnit]);
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadOrgUnit$).toBeObservable(expected);
      expect(orgUnitConnector.get).toHaveBeenCalledWith(userId, orgUnitId);
    });

    it('should return LoadOrgUnitFail action if orgUnit not updated', () => {
      orgUnitConnector.get = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new OrgUnitActions.LoadOrgUnit({ userId, orgUnitId });
      const completion = new OrgUnitActions.LoadOrgUnitFail({
        orgUnitId,
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadOrgUnit$).toBeObservable(expected);
      expect(orgUnitConnector.get).toHaveBeenCalledWith(userId, orgUnitId);
    });
  });

  describe('loadOrgUnits$', () => {
    it('should return LoadOrgUnitNodesSuccess action', () => {
      const action = new OrgUnitActions.LoadOrgUnitNodes({ userId });
      const completion = new OrgUnitActions.LoadOrgUnitNodesSuccess(
        orgUnitList
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadAvailableOrgUnits$).toBeObservable(expected);
      expect(orgUnitConnector.getList).toHaveBeenCalledWith(userId);
    });

    it('should return LoadOrgUnitNodesFail action if orgUnits not loaded', () => {
      orgUnitConnector.getList = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new OrgUnitActions.LoadOrgUnitNodes({ userId });
      const completion = new OrgUnitActions.LoadOrgUnitNodesFail({ error });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadAvailableOrgUnits$).toBeObservable(expected);
      expect(orgUnitConnector.getList).toHaveBeenCalledWith(userId);
    });
  });

  describe('createUnit$', () => {
    it('should return CreateOrgUnitNodesSuccess action', () => {
      const action = new OrgUnitActions.CreateUnit({ userId, unit: orgUnit });
      const completion1 = new OrgUnitActions.CreateUnitSuccess(orgUnit);
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.createUnit$).toBeObservable(expected);
      expect(orgUnitConnector.create).toHaveBeenCalledWith(userId, orgUnit);
    });

    it('should return LoadOrgUnitNodesFail action if orgUnits not loaded', () => {
      orgUnitConnector.create = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new OrgUnitActions.CreateUnit({ userId, unit: orgUnit });
      const completion1 = new OrgUnitActions.CreateUnitFail({
        unitCode: orgUnitId,
        error,
      });
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.createUnit$).toBeObservable(expected);
      expect(orgUnitConnector.create).toHaveBeenCalledWith(userId, orgUnit);
    });
  });

  describe('updateUnit$', () => {
    // TODO: unlock after get correct response and fixed effect
    xit('should return UpdateOrgUnitNodesSuccess action', () => {
      const action = new OrgUnitActions.UpdateUnit({
        userId,
        unitCode: orgUnitId,
        unit: orgUnit,
      });
      const completion = new OrgUnitActions.UpdateUnitSuccess(orgUnit);
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.updateUnit$).toBeObservable(expected);
      expect(orgUnitConnector.update).toHaveBeenCalledWith(
        userId,
        orgUnitId,
        orgUnit
      );
    });

    it('should return UpdateOrgUnitNodesFail action if orgUnits not loaded', () => {
      orgUnitConnector.update = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new OrgUnitActions.UpdateUnit({
        userId,
        unitCode: orgUnitId,
        unit: orgUnit,
      });
      const completion1 = new OrgUnitActions.UpdateUnitFail({
        unitCode: orgUnit.uid,
        error,
      });
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.updateUnit$).toBeObservable(expected);
      expect(orgUnitConnector.update).toHaveBeenCalledWith(
        userId,
        orgUnitId,
        orgUnit
      );
    });
  });

  describe('createAddress$', () => {
    it('should return CreateAddressSuccess action', () => {
      const action = new OrgUnitActions.CreateAddress({
        userId,
        orgUnitId,
        address,
      });
      const completion1 = new OrgUnitActions.CreateAddressSuccess(address);
      const completion2 = new OrgUnitActions.CreateAddressSuccess({ id: null });
      const completion3 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bcd)', {
        b: completion1,
        c: completion2,
        d: completion3,
      });

      expect(effects.createAddress$).toBeObservable(expected);
      expect(orgUnitConnector.createAddress).toHaveBeenCalledWith(
        userId,
        orgUnitId,
        address
      );
    });

    it('should return CreateAddressFail action if address is not loaded', () => {
      orgUnitConnector.createAddress = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new OrgUnitActions.CreateAddress({
        userId,
        orgUnitId,
        address,
      });
      const completion1 = new OrgUnitActions.CreateAddressFail({
        addressId,
        error,
      });
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.createAddress$).toBeObservable(expected);
      expect(orgUnitConnector.createAddress).toHaveBeenCalledWith(
        userId,
        orgUnitId,
        address
      );
    });
  });

  describe('updateAddress$', () => {
    it('should return UpdateAddressSuccess action', () => {
      const action = new OrgUnitActions.UpdateAddress({
        userId,
        orgUnitId,
        addressId,
        address,
      });
      const completion1 = new OrgUnitActions.UpdateAddressSuccess(address);
      const completion2 = new OrganizationActions.OrganizationClearData();

      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      //effect -> updateAddress is triggering LoadAddresses instead of UpdateAddressSuccess
      expect(effects.updateAddress$).toBeObservable(expected);
      expect(orgUnitConnector.updateAddress).toHaveBeenCalledWith(
        userId,
        orgUnitId,
        addressId,
        address
      );
    });

    it('should return UpdateAddressFail action if address is not loaded', () => {
      orgUnitConnector.updateAddress = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new OrgUnitActions.UpdateAddress({
        userId,
        orgUnitId,
        addressId,
        address,
      });
      const completion1 = new OrgUnitActions.UpdateAddressFail({
        addressId,
        error,
      });
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.updateAddress$).toBeObservable(expected);
      expect(orgUnitConnector.updateAddress).toHaveBeenCalledWith(
        userId,
        orgUnitId,
        addressId,
        address
      );
    });
  });

  describe('deleteAddress$', () => {
    it('should return DeleteAddressSuccess action', () => {
      const action = new OrgUnitActions.DeleteAddress({
        userId,
        orgUnitId,
        addressId,
      });
      const completion1 = new OrgUnitActions.DeleteAddressSuccess(address);
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.deleteAddress$).toBeObservable(expected);
      expect(orgUnitConnector.deleteAddress).toHaveBeenCalledWith(
        userId,
        orgUnitId,
        addressId
      );
    });

    it('should return DeleteAddressFail action if address is not loaded', () => {
      orgUnitConnector.deleteAddress = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new OrgUnitActions.DeleteAddress({
        userId,
        orgUnitId,
        addressId,
      });
      const completion1 = new OrgUnitActions.DeleteAddressFail({
        addressId,
        error,
      });
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.deleteAddress$).toBeObservable(expected);
      expect(orgUnitConnector.deleteAddress).toHaveBeenCalledWith(
        userId,
        orgUnitId,
        addressId
      );
    });
  });

  describe('AssignRoleToUser', () => {
    it('should return AssignRoleSuccess action', () => {
      const action = new OrgUnitActions.AssignRole({
        userId,
        orgCustomerId,
        roleId,
      });
      const completion = new OrgUnitActions.AssignRoleSuccess({
        uid: orgCustomerId,
        roleId,
        selected: true,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.assignRoleToUser).toBeObservable(expected);
      expect(orgUnitConnector.assignRole).toHaveBeenCalledWith(
        userId,
        orgCustomerId,
        roleId
      );
    });

    it('should return AssignRoleFail action if address is not loaded', () => {
      orgUnitConnector.assignRole = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new OrgUnitActions.AssignRole({
        userId,
        orgCustomerId,
        roleId,
      });
      const completion = new OrgUnitActions.AssignRoleFail({
        orgCustomerId,
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.assignRoleToUser).toBeObservable(expected);
      expect(orgUnitConnector.assignRole).toHaveBeenCalledWith(
        userId,
        orgCustomerId,
        roleId
      );
    });
  });

  describe('UnassignRoleToUser', () => {
    it('should return UnassignRoleSuccess action', () => {
      const action = new OrgUnitActions.UnassignRole({
        userId,
        orgCustomerId,
        roleId,
      });
      const completion = new OrgUnitActions.UnassignRoleSuccess({
        uid: orgCustomerId,
        roleId,
        selected: false,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.unassignRoleToUser$).toBeObservable(expected);
      expect(orgUnitConnector.unassignRole).toHaveBeenCalledWith(
        userId,
        orgCustomerId,
        roleId
      );
    });

    it('should return UnassignRoleFail action if address is not loaded', () => {
      orgUnitConnector.unassignRole = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new OrgUnitActions.UnassignRole({
        userId,
        orgCustomerId,
        roleId,
      });
      const completion = new OrgUnitActions.UnassignRoleFail({
        orgCustomerId,
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.unassignRoleToUser$).toBeObservable(expected);
      expect(orgUnitConnector.unassignRole).toHaveBeenCalledWith(
        userId,
        orgCustomerId,
        roleId
      );
    });
  });

  describe('AssignApprover', () => {
    it('should return AssignApproverSuccess action', () => {
      const action = new OrgUnitActions.AssignApprover({
        userId,
        orgUnitId,
        orgCustomerId,
        roleId,
      });
      const completion1 = new OrgUnitActions.AssignApproverSuccess({
        uid: orgCustomerId,
        roleId,
        selected: true,
      });
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.assignApprover).toBeObservable(expected);
      expect(orgUnitConnector.assignApprover).toHaveBeenCalledWith(
        userId,
        orgUnitId,
        orgCustomerId,
        roleId
      );
    });

    it('should return AssignApproverFail action if address is not loaded', () => {
      orgUnitConnector.assignApprover = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new OrgUnitActions.AssignApprover({
        userId,
        orgUnitId,
        orgCustomerId,
        roleId,
      });
      const completion1 = new OrgUnitActions.AssignApproverFail({
        orgCustomerId,
        error,
      });
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.assignApprover).toBeObservable(expected);
      expect(orgUnitConnector.assignApprover).toHaveBeenCalledWith(
        userId,
        orgUnitId,
        orgCustomerId,
        roleId
      );
    });
  });

  describe('UnassignApprover', () => {
    it('should return UnassignApproverSuccess action', () => {
      const action = new OrgUnitActions.UnassignApprover({
        userId,
        orgUnitId,
        orgCustomerId,
        roleId,
      });
      const completion1 = new OrgUnitActions.UnassignApproverSuccess({
        uid: orgCustomerId,
        roleId,
        selected: false,
      });
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.unassignApprover).toBeObservable(expected);
      expect(orgUnitConnector.unassignApprover).toHaveBeenCalledWith(
        userId,
        orgUnitId,
        orgCustomerId,
        roleId
      );
    });

    it('should return UnassignApproverFail action if address is not loaded', () => {
      orgUnitConnector.unassignApprover = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new OrgUnitActions.UnassignApprover({
        userId,
        orgUnitId,
        orgCustomerId,
        roleId,
      });
      const completion1 = new OrgUnitActions.UnassignApproverFail({
        orgCustomerId,
        error,
      });
      const completion2 = new OrganizationActions.OrganizationClearData();
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.unassignApprover).toBeObservable(expected);
      expect(orgUnitConnector.unassignApprover).toHaveBeenCalledWith(
        userId,
        orgUnitId,
        orgCustomerId,
        roleId
      );
    });
  });

  describe('LoadApprovalProcesses', () => {
    it('should return LoadApprovalProcessesSuccess action', () => {
      const action = new OrgUnitActions.LoadApprovalProcesses({
        userId,
      });
      const completion = new OrgUnitActions.LoadApprovalProcessesSuccess(
        approvalProcesses
      );
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadApprovalProcesses$).toBeObservable(expected);
      expect(orgUnitConnector.getApprovalProcesses).toHaveBeenCalledWith(
        userId
      );
    });

    it('should return LoadApprovalProcessesFail action if address is not loaded', () => {
      orgUnitConnector.getApprovalProcesses = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new OrgUnitActions.LoadApprovalProcesses({
        userId,
      });
      const completion = new OrgUnitActions.LoadApprovalProcessesFail({
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadApprovalProcesses$).toBeObservable(expected);
      expect(orgUnitConnector.getApprovalProcesses).toHaveBeenCalledWith(
        userId
      );
    });
  });

  describe('LoadUsers', () => {
    const params: SearchConfig = { sort: 'code' };
    const page: ListModel = {
      ids: [userId],
      pagination: { totalResults: 1 },
      sorts: [{ code: 'code' }],
    };

    it('should return LoadUsersSuccess action', () => {
      const action = new OrgUnitActions.LoadAssignedUsers({
        userId,
        orgUnitId,
        roleId,
        params,
      });
      const completion1 = new B2BUserActions.LoadB2BUserSuccess([user]);
      const completion2 = new OrgUnitActions.LoadAssignedUsersSuccess({
        orgUnitId,
        roleId,
        page,
        params,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-(bc)', { b: completion1, c: completion2 });

      expect(effects.loadUsers$).toBeObservable(expected);
      expect(orgUnitConnector.getUsers).toHaveBeenCalledWith(
        userId,
        orgUnitId,
        roleId,
        params
      );
    });

    it('should return LoadUsersFail action if address is not loaded', () => {
      orgUnitConnector.getUsers = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new OrgUnitActions.LoadAssignedUsers({
        userId,
        orgUnitId,
        roleId,
        params,
      });
      const completion = new OrgUnitActions.LoadAssignedUsersFail({
        orgUnitId,
        roleId,
        params,
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadUsers$).toBeObservable(expected);
      expect(orgUnitConnector.getUsers).toHaveBeenCalledWith(
        userId,
        orgUnitId,
        roleId,
        params
      );
    });
  });

  describe('LoadTree', () => {
    it('should return LoadTreeSuccess action', () => {
      const action = new OrgUnitActions.LoadTree({
        userId,
      });
      const completion = new OrgUnitActions.LoadTreeSuccess(unitNode);
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadTree$).toBeObservable(expected);
      expect(orgUnitConnector.getTree).toHaveBeenCalledWith(userId);
    });

    it('should return LoadTreeFail action if address is not loaded', () => {
      orgUnitConnector.getTree = createSpy().and.returnValue(
        throwError(httpErrorResponse)
      );
      const action = new OrgUnitActions.LoadTree({
        userId,
      });
      const completion = new OrgUnitActions.LoadTreeFail({
        error,
      });
      actions$ = hot('-a', { a: action });
      expected = cold('-b', { b: completion });

      expect(effects.loadTree$).toBeObservable(expected);
      expect(orgUnitConnector.getTree).toHaveBeenCalledWith(userId);
    });
  });
});
