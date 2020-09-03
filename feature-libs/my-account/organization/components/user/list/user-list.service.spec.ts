import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { B2BUser, EntitiesModel } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UserListService } from './user-list.service';
import { B2BUserService } from '@spartacus/my-account/organization/core';

const uid = 'user';
const mockUserEntities: EntitiesModel<B2BUser> = {
  values: [
    {
      uid,
    },
  ],
};

class MockB2BUserService {
  getList(): Observable<EntitiesModel<B2BUser>> {
    return of(mockUserEntities);
  }
}

@Injectable()
export class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('UserListService', () => {
  let service: UserListService;

  describe('with table config', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          UserListService,
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
      service = TestBed.inject(UserListService);
    });

    it('should inject service', () => {
      expect(service).toBeTruthy();
    });

    it('should populate object to string literal', () => {
      let result;
      service.getTable().subscribe((table) => (result = table));

      expect(result.data[0].uid).toEqual(uid);
    });
  });
});
