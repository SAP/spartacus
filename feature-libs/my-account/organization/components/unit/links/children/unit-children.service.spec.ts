import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { B2BUnit, EntitiesModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
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
export class MockTableService {
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
    let result: Table<B2BUnit>;
    service.getTable().subscribe((table) => (result = table));
    expect(result.data.length).toEqual(3);
    expect(result.data[0].uid).toEqual('first');
    expect(result.data[1].uid).toEqual('second');
    expect(result.data[2].uid).toEqual('third');
  });
});
