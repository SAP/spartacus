import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { B2BUnit, EntitiesModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UnitChildrenService } from './unit-children.service';

const mockUnitEntities: EntitiesModel<B2BUnit> = {
  values: [
    {
      uid: 'first',
    },
    {
      uid: 'second',
    },
    {
      uid: 'third',
    },
  ],
};

class MockUnitChildrenService {
  getChildUnits(): Observable<EntitiesModel<B2BUnit>> {
    return of(mockUnitEntities);
  }
}

@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('UnitCostCenterListService', () => {
  let service: UnitChildrenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UnitChildrenService,
        {
          provide: OrgUnitService,
          useClass: MockUnitChildrenService,
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

  it('should load children', () => {
    let result: EntitiesModel<B2BUnit>;
    service.getData().subscribe((table) => (result = table));
    expect(result.values.length).toEqual(3);
    expect(result.values[0].uid).toEqual('first');
    expect(result.values[1].uid).toEqual('second');
    expect(result.values[2].uid).toEqual('third');
  });
});
