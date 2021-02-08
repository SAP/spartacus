import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EntitiesModel } from '@spartacus/core';
import {
  UserGroup,
  UserGroupService,
} from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UserGroupListService } from './user-group-list.service';
const uid = 'userGroup';
const mockUserGroupEntities: EntitiesModel<UserGroup> = {
  values: [
    {
      uid,
    },
  ],
};

class MockUserGroupService {
  getList(): Observable<EntitiesModel<UserGroup>> {
    return of(mockUserGroupEntities);
  }
}

@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('UserGroupListService', () => {
  let service: UserGroupListService;

  describe('with table config', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          UserGroupListService,
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
      service = TestBed.inject(UserGroupListService);
    });

    it('should inject service', () => {
      expect(service).toBeTruthy();
    });

    it('should return "uid" key', () => {
      expect(service.key()).toEqual('uid');
    });

    it('should populate object to string literal', () => {
      let result: EntitiesModel<UserGroup>;
      service.getData().subscribe((table) => (result = table));
      expect(result.values[0].uid).toEqual(uid);
    });
  });
});
