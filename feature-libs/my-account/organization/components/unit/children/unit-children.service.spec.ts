import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { Observable, of } from 'rxjs';
import { B2BUnitNode, EntitiesModel } from '@spartacus/core';
import { Injectable } from '@angular/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UnitChildrenService } from './unit-children.service';

const mockUnitNodeListEntities: EntitiesModel<B2BUnitNode> = {
  values: [
    {
      id: 'first',
    },
    {
      id: 'second',
    },
    {
      id: 'third',
    },
  ],
};

class MockOrgUnitService implements Partial<OrgUnitService> {
  getChildUnits(): Observable<EntitiesModel<B2BUnitNode>> {
    return of(mockUnitNodeListEntities);
  }
}

@Injectable()
export class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('UnitChildrenService', () => {
  let service: UnitChildrenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UnitChildrenService,
        {
          provide: OrgUnitService,
          useClass: MockOrgUnitService,
        },
        {
          provide: TableService,
          useClass: MockTableService,
        },
      ],
    });
    service = TestBed.inject(UnitChildrenService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should get unit node list', () => {
    let result: Table<B2BUnitNode>;
    service.getTable().subscribe((table) => (result = table));
    expect(result.data.length).toEqual(3);
  });
});
