import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EntitiesModel, Permission } from '@spartacus/core';
import { B2BUserService } from '@spartacus/my-account/organization/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
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
export class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('UserApproverListService', () => {
  let service: UserPermissionListService;
  let userService: B2BUserService;

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
          provide: TableService,
          useClass: MockTableService,
        },
      ],
    });
    service = TestBed.inject(UserPermissionListService);
    userService = TestBed.inject(B2BUserService);
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
    spyOn(userService, 'assignPermission');
    service.assign('customerId', 'permissionCode');
    expect(userService.assignPermission).toHaveBeenCalledWith(
      'customerId',
      'permissionCode'
    );
  });

  it('should unassign permission', () => {
    spyOn(userService, 'unassignPermission');
    service.unassign('customerId', 'permissionCode');
    expect(userService.unassignPermission).toHaveBeenCalledWith(
      'customerId',
      'permissionCode'
    );
  });
});
