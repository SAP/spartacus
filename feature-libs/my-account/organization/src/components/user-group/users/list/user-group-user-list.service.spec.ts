import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User, UserGroupService, EntitiesModel } from '@spartacus/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UserGroupUserListService } from './user-group-user-list.service';

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
    let result: Table<User>;
    service.getTable().subscribe((table) => (result = table));
    expect(result.data.length).toEqual(2);
    expect(result.data[0].code).toEqual('first');
    expect(result.data[1].code).toEqual('third');
  });
});
