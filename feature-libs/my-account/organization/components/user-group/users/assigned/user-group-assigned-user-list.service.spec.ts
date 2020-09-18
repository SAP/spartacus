import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { B2BUser, EntitiesModel, Permission } from '@spartacus/core';
import { UserGroupService } from '@spartacus/my-account/organization/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UserGroupAssignedUserListService } from './user-group-assigned-user-list.service';

const mockUserGroupCustomersEntities: EntitiesModel<B2BUser> = {
  values: [
    {
      customerId: 'first',
      selected: true,
    },
    {
      customerId: 'second',
      selected: false,
    },
    {
      customerId: 'third',
      selected: true,
    },
  ],
};

class MockUserGroupService {
  getAvailableOrgCustomers(): Observable<EntitiesModel<Permission>> {
    return of(mockUserGroupCustomersEntities);
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

describe('UserGroupAssignedUsersListService', () => {
  let service: UserGroupAssignedUserListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UserGroupAssignedUserListService,
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
    service = TestBed.inject(UserGroupAssignedUserListService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should filter selected users', () => {
    let result: Table<B2BUser>;
    service.getTable().subscribe((table) => (result = table));
    expect(result.data.length).toEqual(2);
    expect(result.data[0].customerId).toEqual('first');
    expect(result.data[1].customerId).toEqual('third');
  });
});
