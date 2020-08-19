import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EntitiesModel } from '@spartacus/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UserGroup } from '../../../../core/model/user-group.model';
import { B2BUserService } from '../../../../core/services/b2b-user.service';
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
    let result: Table<UserGroup>;
    service.getTable().subscribe((table) => (result = table));
    expect(result.data.length).toEqual(3);
    expect(result.data[0].uid).toEqual('first');
    expect(result.data[1].uid).toEqual('second');
    expect(result.data[2].uid).toEqual('third');
  });

  it('should assign permission', () => {
    spyOn(userService, 'assignUserGroup');
    service.toggleAssign('userCode', 'permissionCode');
    expect(userService.assignUserGroup).toHaveBeenCalledWith(
      'userCode',
      'permissionCode'
    );
  });

  it('should unassign permission', () => {
    spyOn(userService, 'unassignUserGroup');
    service.toggleAssign('userCode', 'permissionCode', false);
    expect(userService.unassignUserGroup).toHaveBeenCalledWith(
      'userCode',
      'permissionCode'
    );
  });
});
