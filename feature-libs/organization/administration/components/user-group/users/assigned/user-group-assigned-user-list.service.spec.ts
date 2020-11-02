import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { B2BUser, EntitiesModel } from '@spartacus/core';
import {
  B2BUserService,
  LoadStatus,
  OrganizationItemStatus,
  Permission,
  UserGroupService,
} from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
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
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

@Injectable()
class MockB2BUserService {
  getLoadingStatus(): Observable<OrganizationItemStatus<B2BUser>> {
    return of({ status: LoadStatus.SUCCESS, item: {} });
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
          provide: B2BUserService,
          useClass: MockB2BUserService,
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
    let result: EntitiesModel<B2BUser>;
    service.getData().subscribe((table) => (result = table));
    expect(result.values.length).toEqual(2);
    expect(result.values[0].customerId).toEqual('first');
    expect(result.values[1].customerId).toEqual('third');
  });
});
