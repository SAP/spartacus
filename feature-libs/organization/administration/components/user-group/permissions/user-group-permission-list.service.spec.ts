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
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

class MockPermissionService {
  getLoadingStatus(
    _id: string
  ): Observable<OrganizationItemStatus<Permission>> {
    return of({ status: LoadStatus.SUCCESS, item: {} });
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
          provide: PermissionService,
          useClass: MockPermissionService,
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
    let result: EntitiesModel<Permission>;
    service.getData().subscribe((table) => (result = table));
    expect(result.values.length).toEqual(3);
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
