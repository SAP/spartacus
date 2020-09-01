import { OrgUnitService } from '@spartacus/my-account/organization';
import { Observable, of } from 'rxjs';
import { CostCenter, EntitiesModel } from '@spartacus/core';
import { Injectable } from '@angular/core';
import { Table, TableService, TableStructure } from '@spartacus/storefront';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UnitCostCentersService } from './unit-cost-centers.service';

const mockUnitCostCenterEntities: EntitiesModel<CostCenter> = {
  values: [
    {
      name: 'first',
    },
    {
      name: 'second',
    },
    {
      name: 'third',
    },
  ],
};

class MockOrgUnitService implements Partial<OrgUnitService> {
  getCostCenters(): Observable<EntitiesModel<CostCenter>> {
    return of(mockUnitCostCenterEntities);
  }
}

@Injectable()
export class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('UnitCostCentersService', () => {
  let service: UnitCostCentersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UnitCostCentersService,
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
    service = TestBed.inject(UnitCostCentersService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should get cost center list', () => {
    let result: Table<CostCenter>;
    service.getTable().subscribe((table) => (result = table));
    expect(result.data.length).toEqual(3);
  });
});
