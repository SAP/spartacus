import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import createSpy = jasmine.createSpy;

import { B2BSearchConfig } from '../../model/search-config';
import { OrgUnitUserGroupAdapter } from './user-group.adapter';
import { OrgUnitUserGroupConnector } from './user-group.connector';

const userId = 'userId';
const orgUnitUserGroupUid = 'orgUnitUserGroupUid';

const orgUnitUserGroup = {
  uid: orgUnitUserGroupUid,
};

class MockOrgUnitUserGroupAdapter implements OrgUnitUserGroupAdapter {
  load = createSpy('OrgUnitUserGroupAdapter.load').and.returnValue(
    of(orgUnitUserGroup)
  );
  loadList = createSpy('OrgUnitUserGroupAdapter.loadList').and.returnValue(
    of([orgUnitUserGroup])
  );
  create = createSpy('OrgUnitUserGroupAdapter.create').and.returnValue(
    of(orgUnitUserGroup)
  );
  update = createSpy('OrgUnitUserGroupAdapter.update').and.returnValue(
    of(orgUnitUserGroup)
  );
  delete = createSpy('OrgUnitUserGroupAdapter.delete').and.returnValue(
    of(orgUnitUserGroup)
  );
  loadAvailableOrderApprovalPermissions;
  loadAvailableOrgCustomers;
  assignMember;
  assignOrderApprovalPermission;
  unassignMember;
  unassignAllMembers;
  unassignOrderApprovalPermission;
}

describe('OrgUnitUserGroupConnector', () => {
  let service: OrgUnitUserGroupConnector;
  let adapter: OrgUnitUserGroupAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrgUnitUserGroupConnector,
        {
          provide: OrgUnitUserGroupAdapter,
          useClass: MockOrgUnitUserGroupAdapter,
        },
      ],
    });

    service = TestBed.inject(
      OrgUnitUserGroupConnector as Type<OrgUnitUserGroupConnector>
    );
    adapter = TestBed.inject(
      OrgUnitUserGroupAdapter as Type<OrgUnitUserGroupAdapter>
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load orgUnitUserGroup', () => {
    service.get(userId, orgUnitUserGroupUid);
    expect(adapter.load).toHaveBeenCalledWith(userId, orgUnitUserGroupUid);
  });

  it('should load orgUnitUserGroup', () => {
    const params: B2BSearchConfig = { sort: 'uid' };
    service.getList(userId, params);
    expect(adapter.loadList).toHaveBeenCalledWith(userId, params);
  });

  it('should create orgUnitUserGroup', () => {
    service.create(userId, orgUnitUserGroup);
    expect(adapter.create).toHaveBeenCalledWith(userId, orgUnitUserGroup);
  });

  it('should update orgUnitUserGroup', () => {
    service.update(userId, orgUnitUserGroupUid, orgUnitUserGroup);
    expect(adapter.update).toHaveBeenCalledWith(
      userId,
      orgUnitUserGroupUid,
      orgUnitUserGroup
    );
  });

  it('should delete orgUnitUserGroup', () => {
    service.delete(userId, orgUnitUserGroupUid);
    expect(adapter.delete).toHaveBeenCalledWith(userId, orgUnitUserGroupUid);
  });
});
