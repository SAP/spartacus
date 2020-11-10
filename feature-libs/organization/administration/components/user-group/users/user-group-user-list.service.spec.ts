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
const mockItemStatus = of({ status: LoadStatus.SUCCESS, item: {} });

@Injectable()
class MockB2BUserService {
  getLoadingStatus(): Observable<OrganizationItemStatus<B2BUser>> {
    return mockItemStatus;
  }
}

describe('UserGroupUserListService', () => {
  let service: UserGroupUserListService;
  let userGroupService: UserGroupService;
  let userService: B2BUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UserGroupUserListService,
        {
          provide: B2BUserService,
          useClass: MockB2BUserService,
        },
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
    userService = TestBed.inject(B2BUserService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should not filter selected permissions', () => {
    let result: EntitiesModel<Permission>;
    service.getData().subscribe((table) => (result = table));
    expect(result.values.length).toEqual(3);
  });

  it('should assign permission', () => {
    spyOn(userGroupService, 'assignMember').and.callThrough();
    spyOn(userService, 'getLoadingStatus').and.callThrough();

    expect(service.assign('userGroupCode', 'customerId')).toEqual(
      mockItemStatus
    );
    expect(userGroupService.assignMember).toHaveBeenCalledWith(
      'userGroupCode',
      'customerId'
    );
    expect(userService.getLoadingStatus).toHaveBeenCalledWith('customerId');
  });

  it('should unassign permission', () => {
    spyOn(userGroupService, 'unassignMember').and.callThrough();
    spyOn(userService, 'getLoadingStatus').and.callThrough();

    expect(service.unassign('userGroupCode', 'customerId')).toEqual(
      mockItemStatus
    );
    expect(userGroupService.unassignMember).toHaveBeenCalledWith(
      'userGroupCode',
      'customerId'
    );
    expect(userService.getLoadingStatus).toHaveBeenCalledWith('customerId');
  });
});
