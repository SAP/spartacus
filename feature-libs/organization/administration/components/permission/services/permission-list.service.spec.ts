import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EntitiesModel } from '@spartacus/core';
import {
  Permission,
  PermissionService,
} from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import {
  PermissionListService,
  PermissionModel,
} from './permission-list.service';

const code = 'permission';
const mockPermissionEntities: EntitiesModel<Permission> = {
  values: [
    {
      code,
    },
  ],
};

class MockPermissionService {
  getList(): Observable<EntitiesModel<Permission>> {
    return of(mockPermissionEntities);
  }
}

@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('PermissionListService', () => {
  let service: PermissionListService;

  describe('with table config', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          PermissionListService,
          {
            provide: PermissionService,
            useClass: MockPermissionService,
          },
          {
            provide: TableService,
            useClass: MockTableService,
          },
        ],
      });
      service = TestBed.inject(PermissionListService);
    });

    it('should inject service', () => {
      expect(service).toBeTruthy();
    });

    it('should return "code" key', () => {
      expect(service.key()).toEqual('code');
    });

    it('should populate object to string literal', () => {
      let result: EntitiesModel<PermissionModel>;
      service.getData().subscribe((table) => (result = table));
      expect(result.values[0].code).toEqual(code);
    });
  });
});
