import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SearchConfig } from '@spartacus/core';
import { of } from 'rxjs';
import { UserGroupAdapter } from './user-group.adapter';
import { UserGroupConnector } from './user-group.connector';
import createSpy = jasmine.createSpy;

const userId = 'userId';
const userGroupId = 'userGroupId';
const permissionUid = 'permissionUid';
const memberUid = 'memberUid';

const userGroup = {
  uid: userGroupId,
};
const permission = {
  uid: permissionUid,
};
const member = {
  uid: memberUid,
};

class MockUserGroupAdapter implements UserGroupAdapter {
  load = createSpy('load').and.returnValue(of(userGroup));
  loadList = createSpy('loadList').and.returnValue(of([userGroup]));
  create = createSpy('create').and.returnValue(of(userGroup));
  update = createSpy('update').and.returnValue(of(userGroup));
  delete = createSpy('delete').and.returnValue(of(userGroup));
  loadAvailableOrderApprovalPermissions = createSpy(
    'loadAvailableOrderApprovalPermissions'
  ).and.returnValue(of([permission]));
  loadAvailableOrgCustomers = createSpy(
    'loadAvailableOrgCustomers'
  ).and.returnValue(of([member]));
  assignMember = createSpy('assignMember');
  assignOrderApprovalPermission = createSpy('assignOrderApprovalPermission');
  unassignMember = createSpy('unassignMember');
  unassignAllMembers = createSpy('unassignAllMembers');
  unassignOrderApprovalPermission = createSpy(
    'unassignOrderApprovalPermission'
  );
}

describe('UserGroupConnector', () => {
  let service: UserGroupConnector;
  let adapter: UserGroupAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserGroupConnector,
        {
          provide: UserGroupAdapter,
          useClass: MockUserGroupAdapter,
        },
      ],
    });

    service = TestBed.inject(UserGroupConnector as Type<UserGroupConnector>);
    adapter = TestBed.inject(UserGroupAdapter as Type<UserGroupAdapter>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load userGroup', () => {
    service.get(userId, userGroupId);
    expect(adapter.load).toHaveBeenCalledWith(userId, userGroupId);
  });

  it('should load userGroup', () => {
    const params: SearchConfig = { sort: 'uid' };
    service.getList(userId, params);
    expect(adapter.loadList).toHaveBeenCalledWith(userId, params);
  });

  it('should create userGroup', () => {
    service.create(userId, userGroup);
    expect(adapter.create).toHaveBeenCalledWith(userId, userGroup);
  });

  it('should update userGroup', () => {
    service.update(userId, userGroupId, userGroup);
    expect(adapter.update).toHaveBeenCalledWith(userId, userGroupId, userGroup);
  });

  it('should delete userGroup', () => {
    service.delete(userId, userGroupId);
    expect(adapter.delete).toHaveBeenCalledWith(userId, userGroupId);
  });

  it('should load permissions assigned to userGroup', () => {
    const params: SearchConfig = { sort: 'uid' };
    service.getAvailableOrderApprovalPermissions(userId, userGroupId, params);
    expect(adapter.loadAvailableOrderApprovalPermissions).toHaveBeenCalledWith(
      userId,
      userGroupId,
      params
    );
  });

  it('should assign permissions to userGroup', () => {
    service.assignOrderApprovalPermission(userId, userGroupId, permissionUid);
    expect(adapter.assignOrderApprovalPermission).toHaveBeenCalledWith(
      userId,
      userGroupId,
      permissionUid
    );
  });

  it('should unassign permissions from userGroup', () => {
    service.unassignOrderApprovalPermission(userId, userGroupId, permissionUid);
    expect(adapter.unassignOrderApprovalPermission).toHaveBeenCalledWith(
      userId,
      userGroupId,
      permissionUid
    );
  });

  it('should load members assigned to userGroup', () => {
    const params: SearchConfig = { sort: 'uid' };
    service.getAvailableOrgCustomers(userId, userGroupId, params);
    expect(adapter.loadAvailableOrgCustomers).toHaveBeenCalledWith(
      userId,
      userGroupId,
      params
    );
  });

  it('should assign members to userGroup', () => {
    service.assignMember(userId, userGroupId, memberUid);
    expect(adapter.assignMember).toHaveBeenCalledWith(
      userId,
      userGroupId,
      memberUid
    );
  });

  it('should unassign members from userGroup', () => {
    service.unassignMember(userId, userGroupId, memberUid);
    expect(adapter.unassignMember).toHaveBeenCalledWith(
      userId,
      userGroupId,
      memberUid
    );
  });

  it('should unassign all members from userGroup', () => {
    service.unassignAllMembers(userId, userGroupId);
    expect(adapter.unassignAllMembers).toHaveBeenCalledWith(
      userId,
      userGroupId
    );
  });
});
