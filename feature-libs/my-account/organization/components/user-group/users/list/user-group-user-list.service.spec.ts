import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { B2BUser, EntitiesModel } from '@spartacus/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UserGroupUserListService } from './user-group-user-list.service';
import { UserGroupService } from '../../../../core/services/user-group.service';

const mockUserEntities: EntitiesModel<B2BUser> = {
  values: [
    { uid: '1', customerId: 'first', name: 'b1', selected: true },
    {
      uid: '2',
      customerId: 'second',
      name: 'b2',
      selected: false,
    },
    {
      uid: '3',
      customerId: 'third',
      name: 'b3',
      selected: true,
    },
  ],
};

class MockUserGroupService {
  getAvailableOrgCustomers(): Observable<EntitiesModel<B2BUser>> {
    return of(mockUserEntities);
  }
  unassignMember() {}
}

@Injectable()
export class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('UserGroupUserListService', () => {
  let service: UserGroupUserListService;

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
