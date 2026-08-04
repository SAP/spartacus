import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Address, B2BApprovalProcess, SearchConfig } from '@spartacus/core';
import { EMPTY, of } from 'rxjs';
import { OrgUnitAdapter } from './org-unit.adapter';
import { OrgUnitConnector } from './org-unit.connector';

const userId = 'userId';
const orgUnitId = 'orgUnitId';
const approvalProcessCode = 'approvalProcessCode';
const roleId = 'testRoleId';
const params: SearchConfig = { sort: 'code' };
const orgCustomerId = 'testCustomerId';
const address: Address = { id: 'testAddressId' };
const addressId: string = address.id;

const orgUnitNode = {
  id: orgUnitId,
};

const orgUnit = {
  uid: orgUnitId,
};

const approvalProcess: B2BApprovalProcess = {
  code: approvalProcessCode,
  name: 'approvalProcessName',
};

class MockOrgUnitAdapter implements OrgUnitAdapter {
  load = vi.fn('load').mockReturnValue(of(orgUnit));
  loadList = vi.fn('loadList').mockReturnValue(of([orgUnitNode]));
  create = vi.fn('create').mockReturnValue(of(orgUnit));
  update = vi.fn('update').mockReturnValue(of(orgUnit));
  loadTree = vi.fn('loadTree').mockReturnValue(of(orgUnit));
  loadApprovalProcesses = vi.fn('loadApprovalProcesses').mockReturnValue(
    of([approvalProcess])
  );
  loadUsers = vi.fn('loadUsers').mockReturnValue(EMPTY);
  assignRole = vi.fn('assignRole').mockReturnValue(EMPTY);
  unassignRole = vi.fn('unassignRole').mockReturnValue(EMPTY);
  assignApprover = vi.fn('assignApprover').mockReturnValue(EMPTY);
  unassignApprover = vi.fn('unassignApprover').mockReturnValue(EMPTY);
  loadAddresses = vi.fn('loadAddresses').mockReturnValue(EMPTY);
  createAddress = vi.fn('createAddress').mockReturnValue(EMPTY);
  updateAddress = vi.fn('updateAddress').mockReturnValue(EMPTY);
  deleteAddress = vi.fn('deleteAddress').mockReturnValue(EMPTY);
}

describe('OrgUnitConnector', () => {
  let service: OrgUnitConnector;
  let adapter: OrgUnitAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrgUnitConnector,
        { provide: OrgUnitAdapter, useClass: MockOrgUnitAdapter },
      ],
    });

    service = TestBed.inject(OrgUnitConnector);
    adapter = TestBed.inject(OrgUnitAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load orgUnit', () => {
    service.get(userId, orgUnitId);
    expect(adapter.load).toHaveBeenCalledWith(userId, orgUnitId);
  });

  it('should load orgUnits', () => {
    service.getList(userId);
    expect(adapter.loadList).toHaveBeenCalledWith(userId);
  });

  it('should create orgUnit', () => {
    service.create(userId, orgUnit);
    expect(adapter.create).toHaveBeenCalledWith(userId, orgUnit);
  });

  it('should update orgUnit', () => {
    service.update(userId, orgUnitId, orgUnit);
    expect(adapter.update).toHaveBeenCalledWith(userId, orgUnitId, orgUnit);
  });

  it('should get approval processes', () => {
    service.getApprovalProcesses(userId);
    expect(adapter.loadApprovalProcesses).toHaveBeenCalledWith(userId);
  });

  it('should get tree', () => {
    service.getTree(userId);
    expect(adapter.loadTree).toHaveBeenCalledWith(userId);
  });

  it('should get users', () => {
    service.getUsers(userId, orgUnitId, roleId, params);
    expect(adapter.loadUsers).toHaveBeenCalledWith(
      userId,
      orgUnitId,
      roleId,
      params
    );
  });

  it('should assign role', () => {
    service.assignRole(userId, orgCustomerId, roleId);
    expect(adapter.assignRole).toHaveBeenCalledWith(
      userId,
      orgCustomerId,
      roleId
    );
  });

  it('should unassign role', () => {
    service.unassignRole(userId, orgCustomerId, roleId);
    expect(adapter.unassignRole).toHaveBeenCalledWith(
      userId,
      orgCustomerId,
      roleId
    );
  });

  it('should assign approver', () => {
    service.assignApprover(userId, orgUnitId, orgCustomerId, roleId);
    expect(adapter.assignApprover).toHaveBeenCalledWith(
      userId,
      orgUnitId,
      orgCustomerId,
      roleId
    );
  });

  it('should unassign approver', () => {
    service.unassignApprover(userId, orgUnitId, orgCustomerId, roleId);
    expect(adapter.unassignApprover).toHaveBeenCalledWith(
      userId,
      orgUnitId,
      orgCustomerId,
      roleId
    );
  });

  it('should get addresses', () => {
    service.getAddresses(userId, orgUnitId);
    expect(adapter.loadAddresses).toHaveBeenCalledWith(userId, orgUnitId);
  });

  it('should create address', () => {
    service.createAddress(userId, orgUnitId, address);
    expect(adapter.createAddress).toHaveBeenCalledWith(
      userId,
      orgUnitId,
      address
    );
  });

  it('should update address', () => {
    service.updateAddress(userId, orgUnitId, addressId, address);
    expect(adapter.updateAddress).toHaveBeenCalledWith(
      userId,
      orgUnitId,
      addressId,
      address
    );
  });

  it('should delete address', () => {
    service.deleteAddress(userId, orgUnitId, addressId);
    expect(adapter.deleteAddress).toHaveBeenCalledWith(
      userId,
      orgUnitId,
      addressId
    );
  });
});
