import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { B2BUser, EntitiesModel } from '@spartacus/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UserGroupAssignUserService } from './user-group-assign-user.service';
import { UserGroupService } from '@spartacus/my-account/organization/core';

const mockUserEntities: EntitiesModel<B2BUser> = {
  values: [
    {
      uid: 'user-1',
      customerId: 'user-1',
      name: 'b1',
      selected: true,
    },
    {
      uid: 'user-2',
      customerId: 'user-2',
      name: 'b2',
      selected: false,
    },
    {
      uid: 'user-3',
      customerId: 'user-3',
      name: 'b3',
      selected: false,
    },
  ],
};

class MockUserGroupService {
  assignMember() {}
  unassignMember() {}
  getAvailableOrgCustomers(): Observable<EntitiesModel<B2BUser>> {
    return of(mockUserEntities);
  }
}

@Injectable()
export class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('UserGroupAssignUserService', () => {
  let service: UserGroupAssignUserService;
  let userGroupService: UserGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UserGroupAssignUserService,
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
    service = TestBed.inject(UserGroupAssignUserService);
    userGroupService = TestBed.inject(UserGroupService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should not filter selected users', () => {
    let result: Table<B2BUser>;
    service.getTable().subscribe((table) => (result = table));
    expect(result.data.length).toEqual(3);
    expect(result.data[0].customerId).toEqual('user-1');
    expect(result.data[1].customerId).toEqual('user-2');
    expect(result.data[2].customerId).toEqual('user-3');
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
