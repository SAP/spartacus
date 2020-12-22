import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EntitiesModel } from '@spartacus/core';
import {
  B2BUserService,
  LoadStatus,
  UserGroup,
  UserGroupService,
} from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UserUserGroupListService } from './user-user-group-list.service';

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

const mockItemStatus = of({ status: LoadStatus.SUCCESS, item: {} });

@Injectable()
class MockUserGroupService implements Partial<UserGroupService> {
  getLoadingStatus(_id) {
    return mockItemStatus;
  }
}

@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('UserUserGroupListService', () => {
  let service: UserUserGroupListService;
  let userService: B2BUserService;
  let userGroupService: UserGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UserUserGroupListService,
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
    service = TestBed.inject(UserUserGroupListService);
    userService = TestBed.inject(B2BUserService);
    userGroupService = TestBed.inject(UserGroupService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should not filter selected budgets', () => {
    let result: EntitiesModel<UserGroup>;
    service.getData().subscribe((table) => (result = table));
    expect(result.values.length).toEqual(3);
    expect(result.values[0].uid).toEqual('first');
    expect(result.values[1].uid).toEqual('second');
    expect(result.values[2].uid).toEqual('third');
  });

  it('should assign permission', () => {
    spyOn(userService, 'assignUserGroup');
    spyOn(userGroupService, 'getLoadingStatus').and.callThrough();

    expect(service.assign('customerId', 'userGroupUid')).toEqual(
      mockItemStatus
    );
    expect(userService.assignUserGroup).toHaveBeenCalledWith(
      'customerId',
      'userGroupUid'
    );
    expect(userGroupService.getLoadingStatus).toHaveBeenCalledWith(
      'userGroupUid'
    );
  });

  it('should unassign permission', () => {
    spyOn(userService, 'unassignUserGroup').and.callThrough();
    spyOn(userGroupService, 'getLoadingStatus').and.callThrough();

    expect(service.unassign('customerId', 'userGroupUid')).toEqual(
      mockItemStatus
    );
    expect(userService.unassignUserGroup).toHaveBeenCalledWith(
      'customerId',
      'userGroupUid'
    );
    expect(userGroupService.getLoadingStatus).toHaveBeenCalledWith(
      'userGroupUid'
    );
  });
});
