import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EntitiesModel } from '@spartacus/core';
import {
  LoadStatus,
  OrganizationItemStatus,
  Permission,
  PermissionService,
  UserGroupService,
} from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UserGroupAssignedPermissionsListService } from './user-group-assigned-permission-list.service';

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
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

class MockPermissionService {
  getLoadingStatus(): Observable<OrganizationItemStatus<Permission>> {
    return of({ status: LoadStatus.SUCCESS, item: {} });
  }
}

describe('UserGroupAssignedPermissionsListService', () => {
  let service: UserGroupAssignedPermissionsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UserGroupAssignedPermissionsListService,
        {
          provide: UserGroupService,
          useClass: MockUserGroupService,
        },
        {
          provide: PermissionService,
          useClass: MockPermissionService,
        },
        {
          provide: TableService,
          useClass: MockTableService,
        },
      ],
    });
    service = TestBed.inject(UserGroupAssignedPermissionsListService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should filter selected permissions', () => {
    let result: EntitiesModel<Permission>;
    service.getData().subscribe((table) => (result = table));
    expect(result.values.length).toEqual(2);
    expect(result.values[0].code).toEqual('first');
    expect(result.values[1].code).toEqual('third');
  });
});
