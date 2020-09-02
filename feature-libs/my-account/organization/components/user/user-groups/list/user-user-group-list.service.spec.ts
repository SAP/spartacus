import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EntitiesModel } from '@spartacus/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UserGroup } from '../../../../core/model/user-group.model';
import { B2BUserService } from '../../../../core/services/b2b-user.service';
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
  unassignUserGroup() {}
}

@Injectable()
export class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('UserUserGroupListService', () => {
  let service: UserUserGroupListService;

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
          provide: TableService,
          useClass: MockTableService,
        },
      ],
    });
    service = TestBed.inject(UserUserGroupListService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should filter selected permissions', () => {
    let result: Table<UserGroup>;
    service.getTable().subscribe((table) => (result = table));
    expect(result.data.length).toEqual(2);
    expect(result.data[0].uid).toEqual('first');
    expect(result.data[1].uid).toEqual('third');
  });
});
