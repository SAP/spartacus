import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EntitiesModel } from '@spartacus/core';
import {
  B2BUserService,
  LoadStatus,
  OrganizationItemStatus,
  UserGroup,
  UserGroupService,
} from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UserAssignedUserGroupListService } from './user-assigned-user-group-list.service';

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
}

@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

@Injectable()
class MockUserGroupService {
  getLoadingStatus(): Observable<OrganizationItemStatus<UserGroup>> {
    return of({ status: LoadStatus.SUCCESS, item: {} });
  }
}

describe('UserAssignedUserGroupListService', () => {
  let service: UserAssignedUserGroupListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UserAssignedUserGroupListService,
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
    service = TestBed.inject(UserAssignedUserGroupListService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should filter selected budgets', () => {
    let result: EntitiesModel<UserGroup>;
    service.getData().subscribe((table) => (result = table));
    expect(result.values.length).toEqual(2);
    expect(result.values[0].uid).toEqual('first');
    expect(result.values[1].uid).toEqual('third');
  });
});
