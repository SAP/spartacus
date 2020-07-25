import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User, UserGroupService, EntitiesModel } from '@spartacus/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UserGroupAssignUserListService } from './user-group-assign-user.service';

const mockUserGroupEntities: EntitiesModel<User> = {
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
  getUsers(): Observable<EntitiesModel<User>> {
    return of(mockUserGroupEntities);
  }
  assignMember() {}
  unassignMember() {}
}

@Injectable()
export class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('UserGroupAssignUserListService', () => {
  let service: UserGroupAssignUserListService;
  let userGroupService: UserGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UserGroupAssignUserListService,
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
    service = TestBed.inject(UserGroupAssignUserListService);
    userGroupService = TestBed.inject(UserGroupService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should not filter selected users', () => {
    let result: Table<User>;
    service.getTable().subscribe((table) => (result = table));
    expect(result.data.length).toEqual(3);
    expect(result.data[0].code).toEqual('first');
    expect(result.data[1].code).toEqual('second');
    expect(result.data[2].code).toEqual('third');
  });

  it('should assign user', () => {
    spyOn(userGroupService, 'assignMember');
    service.toggleAssign('userGroupCode', 'userCode');
    expect(userGroupService.assignMember).toHaveBeenCalledWith(
      'userGroupCode',
      'userCode'
    );
  });

  it('should unassign user', () => {
    spyOn(userGroupService, 'unassignMember');
    service.toggleAssign('userGroupCode', 'userCode', false);
    expect(userGroupService.unassignMember).toHaveBeenCalledWith(
      'userGroupCode',
      'userCode'
    );
  });
});
