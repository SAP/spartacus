import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { B2BUser, EntitiesModel } from '@spartacus/core';
import {
  B2BUserService,
  LoadStatus,
  OrganizationItemStatus,
  Permission,
  PermissionService,
  UserGroup,
} from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UserAssignedPermissionListService } from './user-assigned-permission-list.service';

const mockUserPermissionsEntities: EntitiesModel<B2BUser> = {
  values: [
    {
      uid: 'first',
      selected: true,
    },
    {
      uid: 'second',
      selected: false,
    },
    {
      uid: 'third',
      selected: true,
    },
  ],
};
class MockB2BUserService implements Partial<B2BUserService> {
  getPermissions(): Observable<EntitiesModel<B2BUser>> {
    return of(mockUserPermissionsEntities);
  }
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

describe('UserAssignedPermissionListService', () => {
  let service: UserAssignedPermissionListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UserAssignedPermissionListService,
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
    service = TestBed.inject(UserAssignedPermissionListService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should filter selected permissions', () => {
    let result: EntitiesModel<UserGroup>;
    service.getData().subscribe((table) => (result = table));
    expect(result.values.length).toEqual(2);
    expect(result.values[0].uid).toEqual('first');
    expect(result.values[1].uid).toEqual('third');
  });
});
