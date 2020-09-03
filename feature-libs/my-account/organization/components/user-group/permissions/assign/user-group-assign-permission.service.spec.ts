import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Permission, EntitiesModel } from '@spartacus/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UserGroupAssignPermissionService } from './user-group-assign-permission.service';
import { UserGroupService } from '@spartacus/my-account/organization/core';

const mockUserGroupPermissionEntities: EntitiesModel<Permission> = {
  values: [
    {
      code: 'first',
      selected: true,
    },
    {
      code: 'second',
      selected: false,
    },
    {
      code: 'third',
      selected: true,
    },
  ],
};

class MockUserGroupService {
  getAvailableOrderApprovalPermissions(): Observable<
    EntitiesModel<Permission>
  > {
    return of(mockUserGroupPermissionEntities);
  }
  assignPermission() {}
  unassignPermission() {}
}

@Injectable()
export class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('UserGroupAssignPermissionListService', () => {
  let service: UserGroupAssignPermissionService;
  let userGroupService: UserGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UserGroupAssignPermissionService,
        {
          provide: UserGroupService,
          useClass: MockUserGroupService,
        },
        {
          provide: TableService,
          useClass: MockTableService,
        },
      ],
    });
    service = TestBed.inject(UserGroupAssignPermissionService);
    userGroupService = TestBed.inject(UserGroupService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should not filter selected permissions', () => {
    let result: Table<Permission>;
    service.getTable().subscribe((table) => (result = table));
    expect(result.data.length).toEqual(3);
    expect(result.data[0].code).toEqual('first');
    expect(result.data[1].code).toEqual('second');
    expect(result.data[2].code).toEqual('third');
  });

  it('should assign permission', () => {
    spyOn(userGroupService, 'assignPermission');
    service.toggleAssign('userGroupCode', 'permissionCode');
    expect(userGroupService.assignPermission).toHaveBeenCalledWith(
      'userGroupCode',
      'permissionCode'
    );
  });

  it('should unassign permission', () => {
    spyOn(userGroupService, 'unassignPermission');
    service.toggleAssign('userGroupCode', 'permissionCode', false);
    expect(userGroupService.unassignPermission).toHaveBeenCalledWith(
      'userGroupCode',
      'permissionCode'
    );
  });
});
