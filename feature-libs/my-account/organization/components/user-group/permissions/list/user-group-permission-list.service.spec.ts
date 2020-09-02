import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Permission, EntitiesModel } from '@spartacus/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UserGroupPermissionListService } from './user-group-permission-list.service';
import { UserGroupService } from '../../../../core/services/user-group.service';

const mockUserGroupPermissionEntities: EntitiesModel<Permission> = {
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
  getAvailableOrderApprovalPermissions(): Observable<
    EntitiesModel<Permission>
  > {
    return of(mockUserGroupPermissionEntities);
  }
}

@Injectable()
export class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('UserGroupPermissionListService', () => {
  let service: UserGroupPermissionListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UserGroupPermissionListService,
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
    service = TestBed.inject(UserGroupPermissionListService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should filter selected permissions', () => {
    let result: Table<Permission>;
    service.getTable().subscribe((table) => (result = table));
    expect(result.data.length).toEqual(2);
    expect(result.data[0].code).toEqual('first');
    expect(result.data[1].code).toEqual('third');
  });
});
