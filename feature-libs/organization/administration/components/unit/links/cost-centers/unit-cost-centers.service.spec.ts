import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CostCenter, EntitiesModel } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
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
class MockTableService {
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
    let result: EntitiesModel<CostCenter>;
    service.getData().subscribe((table) => (result = table));
    expect(result.values.length).toEqual(3);
    expect(result.values[0].code).toEqual('first');
    expect(result.values[1].code).toEqual('second');
    expect(result.values[2].code).toEqual('third');
  });
});
