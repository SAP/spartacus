import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CostCenter, EntitiesModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UnitCostCenterListService } from '.';

const mockUnitCostCentersEntities: EntitiesModel<CostCenter> = {
  values: [
    {
      code: 'first',
    },
    {
      code: 'second',
    },
    {
      code: 'third',
    },
  ],
};

class MockUnitCostCentersService {
  getCostCenters(): Observable<EntitiesModel<CostCenter>> {
    return of(mockUnitCostCentersEntities);
  }
}

@Injectable()
export class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('UnitCostCenterListService', () => {
  let service: UnitCostCenterListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UnitCostCenterListService,
        {
          provide: OrgUnitService,
          useClass: MockUnitCostCentersService,
        },
        {
          provide: TableService,
          useClass: MockTableService,
        },
      ],
    });
    service = TestBed.inject(UnitCostCenterListService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should load cost centers', () => {
    let result: Table<CostCenter>;
    service.getTable().subscribe((table) => (result = table));
    expect(result.data.length).toEqual(3);
    expect(result.data[0].code).toEqual('first');
    expect(result.data[1].code).toEqual('second');
    expect(result.data[2].code).toEqual('third');
  });
});
