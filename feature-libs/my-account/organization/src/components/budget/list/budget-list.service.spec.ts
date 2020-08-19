import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EntitiesModel } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { BudgetListService } from './budget-list.service';
import { BudgetService } from '../../../core/services/budget.service';
import { Budget } from '../../../core/model/budget.model';

const mockBudgetEntities: EntitiesModel<Budget> = {
  values: [
    {
      currency: {
        isocode: 'USD',
      },
    },
  ],
};

class MockBudgetService {
  getList(): Observable<EntitiesModel<Budget>> {
    return of(mockBudgetEntities);
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
            provide: BudgetService,
            useClass: MockBudgetService,
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
