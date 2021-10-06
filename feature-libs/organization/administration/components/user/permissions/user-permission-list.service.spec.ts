import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EntitiesModel } from '@spartacus/core';
import {
  B2BUserService,
  LoadStatus,
  OrganizationItemStatus,
  Permission,
  PermissionService,
} from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UserPermissionListService } from './user-permission-list.service';

const mockUserPermissionEntities: EntitiesModel<Permission> = {
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

class MockB2BUserService implements Partial<B2BUserService> {
  getPermissions(): Observable<EntitiesModel<Permission>> {
    return of(mockUserPermissionEntities);
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
const mockItemStatus = of({ status: LoadStatus.SUCCESS, item: {} });

class MockPermissionService {
  getLoadingStatus(): Observable<OrganizationItemStatus<Permission>> {
    return mockItemStatus;
  }
}

describe('UserPermissionListService', () => {
  let service: UserPermissionListService;
  let userService: B2BUserService;
  let permissionService: PermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UserPermissionListService,
        {
          provide: B2BUserService,
          useClass: MockB2BUserService,
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
    service = TestBed.inject(UserPermissionListService);
    userService = TestBed.inject(B2BUserService);
    permissionService = TestBed.inject(PermissionService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should not filter selected permissions', () => {
    let result: EntitiesModel<Permission>;
    service.getData().subscribe((table) => (result = table));
    expect(result.values.length).toEqual(3);
    expect(result.values[0].code).toEqual('first');
    expect(result.values[1].code).toEqual('second');
    expect(result.values[2].code).toEqual('third');
  });

  it('should assign permission', () => {
    spyOn(userService, 'assignPermission').and.callThrough();
    spyOn(permissionService, 'getLoadingStatus').and.callThrough();

    expect(service.assign('customerId', 'permissionCode')).toEqual(
      mockItemStatus
    );
    expect(userService.assignPermission).toHaveBeenCalledWith(
      'customerId',
      'permissionCode'
    );
    expect(permissionService.getLoadingStatus).toHaveBeenCalledWith(
      'permissionCode'
    );
  });

  it('should unassign permission', () => {
    spyOn(userService, 'unassignPermission').and.callThrough();
    spyOn(permissionService, 'getLoadingStatus').and.callThrough();

    expect(service.unassign('customerId', 'permissionCode')).toEqual(
      mockItemStatus
    );
    expect(userService.unassignPermission).toHaveBeenCalledWith(
      'customerId',
      'permissionCode'
    );
    expect(permissionService.getLoadingStatus).toHaveBeenCalledWith(
      'permissionCode'
    );
  });
});
