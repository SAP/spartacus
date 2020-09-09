import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EntitiesModel, Permission } from '@spartacus/core';
import { UserGroupService } from '@spartacus/my-account/organization/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UserGroupPermissionListService } from './user-group-permission-list.service';

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

describe('UserGroupPermissionListService', () => {
  let service: UserGroupPermissionListService;
  let userGroupService: UserGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UserGroupPermissionListService,
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
    service = TestBed.inject(UserGroupPermissionListService);
    userGroupService = TestBed.inject(UserGroupService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should not filter selected permissions', () => {
    let result: Table<Permission>;
    service.getTable().subscribe((table) => (result = table));
    expect(result.data.length).toEqual(3);
  });

  it('should assign permission', () => {
    spyOn(userGroupService, 'assignPermission');
    service.assign('userGroupCode', 'permissionCode');
    expect(userGroupService.assignPermission).toHaveBeenCalledWith(
      'userGroupCode',
      'permissionCode'
    );
  });

  it('should unassign permission', () => {
    spyOn(userGroupService, 'unassignPermission');
    service.unassign('userGroupCode', 'permissionCode');
    expect(userGroupService.unassignPermission).toHaveBeenCalledWith(
      'userGroupCode',
      'permissionCode'
    );
  });
});
