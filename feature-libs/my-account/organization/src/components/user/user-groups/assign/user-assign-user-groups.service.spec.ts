import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Permission,
  B2BUserService,
  EntitiesModel,
  UserGroup,
} from '@spartacus/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UserAssignUserGroupListService } from './user-assign-user-groups.service';

const mockUserGroupEntities: EntitiesModel<UserGroup> = {
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

class MockB2BUserService {
  getUserGroups(): Observable<EntitiesModel<UserGroup>> {
    return of(mockUserGroupEntities);
  }
  assignUserGroup() {}
  unassignUserGroup() {}
}

@Injectable()
export class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('UserAssignUserGroupListService', () => {
  let service: UserAssignUserGroupListService;
  let userService: B2BUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UserAssignUserGroupListService,
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
    service = TestBed.inject(UserAssignUserGroupListService);
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
    service.toggleAssign('userCode', 'permissionCode');
    expect(userService.assignPermission).toHaveBeenCalledWith(
      'userCode',
      'permissionCode'
    );
  });

  it('should unassign permission', () => {
    spyOn(userService, 'unassignPermission');
    service.toggleAssign('userCode', 'permissionCode', false);
    expect(userService.unassignPermission).toHaveBeenCalledWith(
      'userCode',
      'permissionCode'
    );
  });
});
