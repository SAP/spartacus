import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { B2BUser, EntitiesModel } from '@spartacus/core';
import {
  Permission,
  UserGroupService,
} from '@spartacus/my-account/organization/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UserGroupUserListService } from './user-group-user-list.service';

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

describe('UserGroupUserListService', () => {
  let service: UserGroupUserListService;
  let userGroupService: UserGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UserGroupUserListService,
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
    service = TestBed.inject(UserGroupUserListService);
    userGroupService = TestBed.inject(UserGroupService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should not filter selected permissions', () => {
    let result: Table<Permission>;
    service.getTable().subscribe((table) => (result = table));
    expect(result.data.length).toEqual(3);
  });

  it('should assign permission', () => {
    spyOn(userGroupService, 'assignMember');
    service.assign('userGroupCode', 'customerId');
    expect(userGroupService.assignMember).toHaveBeenCalledWith(
      'userGroupCode',
      'customerId'
    );
  });

  it('should unassign permission', () => {
    spyOn(userGroupService, 'unassignMember');
    service.unassign('userGroupCode', 'customerId');
    expect(userGroupService.unassignMember).toHaveBeenCalledWith(
      'userGroupCode',
      'customerId'
    );
  });
});
