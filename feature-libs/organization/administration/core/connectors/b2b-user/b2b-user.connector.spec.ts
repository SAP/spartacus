import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { B2BUser, SearchConfig } from '@spartacus/core';
import {
  Permission,
  UserGroup,
} from '@spartacus/organization/administration/core';
import { of } from 'rxjs';
import { B2BUserAdapter } from './b2b-user.adapter';
import { B2BUserConnector } from './b2b-user.connector';

import createSpy = jasmine.createSpy;

const customerId = 'userId';
const approverId = 'approverId';
const permissionId = 'permissionId';
const userGroupId = 'userGroupId';
const orgUnitCustomerId = 'orgUnitCustomerId';
const b2bUser: B2BUser = {
  customerId,
  orgUnit: { uid: orgUnitCustomerId },
};
const permission: Permission = {
  code: permissionId,
  orgUnit: { uid: orgUnitCustomerId },
};
const userGroup: UserGroup = {
  uid: userGroupId,
  orgUnit: { uid: orgUnitCustomerId },
};

class MockB2BUserAdapter implements B2BUserAdapter {
  load = createSpy('B2BUserAdapter.load').and.returnValue(of(b2bUser));
  loadList = createSpy('B2BUserAdapter.loadList').and.returnValue(
    of([b2bUser])
  );
  create = createSpy('B2BUserAdapter.create').and.returnValue(of(b2bUser));
  update = createSpy('B2BUserAdapter.update').and.returnValue(of(b2bUser));

  loadApprovers = createSpy('B2BUserAdapter.loadApprovers').and.returnValue(
    of([b2bUser])
  );
  assignApprover = createSpy('B2BUserAdapter.assignApprover').and.returnValue(
    of(b2bUser)
  );
  unassignApprover = createSpy(
    'B2BUserAdapter.unassignApprover'
  ).and.returnValue(of(b2bUser));
  loadPermissions = createSpy('B2BUserAdapter.loadPermissions').and.returnValue(
    of([permission])
  );
  assignPermission = createSpy(
    'B2BUserAdapter.assignPermission'
  ).and.returnValue(of(b2bUser));
  unassignPermission = createSpy(
    'B2BUserAdapter.unassignPermission'
  ).and.returnValue(of(b2bUser));
  loadUserGroups = createSpy('B2BUserAdapter.loadUserGroups').and.returnValue(
    of([userGroup])
  );
  assignUserGroup = createSpy('B2BUserAdapter.assignUserGroup').and.returnValue(
    of(userGroup)
  );
  unassignUserGroup = createSpy(
    'B2BUserAdapter.unassignUserGroup'
  ).and.returnValue(of(userGroup));
}

describe('B2BUserConnector', () => {
  let service: B2BUserConnector;
  let adapter: B2BUserAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        B2BUserConnector,
        { provide: B2BUserAdapter, useClass: MockB2BUserAdapter },
      ],
    });

    service = TestBed.inject(B2BUserConnector as Type<B2BUserConnector>);
    adapter = TestBed.inject(B2BUserAdapter as Type<B2BUserAdapter>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load b2bUser', () => {
    service.get(customerId, orgUnitCustomerId);
    expect(adapter.load).toHaveBeenCalledWith(customerId, orgUnitCustomerId);
  });

  it('should load b2bUsers', () => {
    const params: SearchConfig = { sort: 'code' };
    service.getList(customerId, params);
    expect(adapter.loadList).toHaveBeenCalledWith(customerId, params);
  });

  it('should create b2bUser', () => {
    service.create(customerId, b2bUser);
    expect(adapter.create).toHaveBeenCalledWith(customerId, b2bUser);
  });

  it('should update b2bUser', () => {
    service.update(customerId, orgUnitCustomerId, b2bUser);
    expect(adapter.update).toHaveBeenCalledWith(
      customerId,
      orgUnitCustomerId,
      b2bUser
    );
  });

  it('should load approvers', () => {
    const params: SearchConfig = { sort: 'email' };
    service.getApprovers(customerId, orgUnitCustomerId, params);
    expect(adapter.loadApprovers).toHaveBeenCalledWith(
      customerId,
      orgUnitCustomerId,
      params
    );
  });

  it('should assign approver', () => {
    service.assignApprover(customerId, orgUnitCustomerId, approverId);
    expect(adapter.assignApprover).toHaveBeenCalledWith(
      customerId,
      orgUnitCustomerId,
      approverId
    );
  });

  it('should unassign approvers', () => {
    service.unassignApprover(customerId, orgUnitCustomerId, approverId);
    expect(adapter.unassignApprover).toHaveBeenCalledWith(
      customerId,
      orgUnitCustomerId,
      approverId
    );
  });

  it('should load permissions', () => {
    const params: SearchConfig = { sort: 'code' };
    service.getPermissions(customerId, orgUnitCustomerId, params);
    expect(adapter.loadPermissions).toHaveBeenCalledWith(
      customerId,
      orgUnitCustomerId,
      params
    );
  });

  it('should assign permission', () => {
    service.assignPermission(customerId, orgUnitCustomerId, permissionId);
    expect(adapter.assignPermission).toHaveBeenCalledWith(
      customerId,
      orgUnitCustomerId,
      permissionId
    );
  });

  it('should unassign permission', () => {
    service.unassignPermission(customerId, orgUnitCustomerId, permissionId);
    expect(adapter.unassignPermission).toHaveBeenCalledWith(
      customerId,
      orgUnitCustomerId,
      permissionId
    );
  });

  it('should load UserGroups', () => {
    const params: SearchConfig = { sort: 'name' };
    service.getUserGroups(customerId, orgUnitCustomerId, params);
    expect(adapter.loadUserGroups).toHaveBeenCalledWith(
      customerId,
      orgUnitCustomerId,
      params
    );
  });

  it('should assign UserGroups', () => {
    service.assignUserGroup(customerId, orgUnitCustomerId, userGroupId);
    expect(adapter.assignUserGroup).toHaveBeenCalledWith(
      customerId,
      orgUnitCustomerId,
      userGroupId
    );
  });

  it('should unassign UserGroups', () => {
    service.unassignUserGroup(customerId, orgUnitCustomerId, userGroupId);
    expect(adapter.unassignUserGroup).toHaveBeenCalledWith(
      customerId,
      orgUnitCustomerId,
      userGroupId
    );
  });
});
