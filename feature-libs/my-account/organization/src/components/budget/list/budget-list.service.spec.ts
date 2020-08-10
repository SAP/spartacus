import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CostCenter, EntitiesModel } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { CostCenterService } from '../../../core/services/cost-center.service';
import { Observable, of } from 'rxjs';
import { BudgetListService } from './budget-list.service';

const mockCostCenterEntities: EntitiesModel<CostCenter> = {
  values: [
    {
      currency: {
        isocode: 'USD',
      },
    },
  ],
};

class MockCostCenterService {
  getList(): Observable<EntitiesModel<CostCenter>> {
    return of(mockCostCenterEntities);
  }
}

@Injectable()
export class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

describe('BudgetListService', () => {
  let service: BudgetListService;

  describe('with table config', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          BudgetListService,
          {
            provide: CostCenterService,
            useClass: MockCostCenterService,
          },
          {
            provide: TableService,
            useClass: MockTableService,
          },
        ],
      });
      service = TestBed.inject(BudgetListService);
    });

    it('should inject service', () => {
      expect(service).toBeTruthy();
    });

    it('should populate currency object to currency string literal', () => {
      let result;
      service.getTable().subscribe((table) => (result = table));

      expect(result.data[0].currency).toEqual('USD');
    });
  });
});
