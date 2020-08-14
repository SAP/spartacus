import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EntitiesModel, Permission } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { PermissionListService } from './permission-list.service';
import { PermissionService } from '../../../core/services/permission.service';

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
export class MockTableService {
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

    it('should populate object to string literal', () => {
      let result;
      service.getTable().subscribe((table) => (result = table));

      expect(result.data[0].code).toEqual(code);
    });
  });
});
