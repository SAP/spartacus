import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Currency, EntitiesModel } from '@spartacus/core';
import {
  Budget,
  BudgetService,
} from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { BudgetListService } from './budget-list.service';

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
class MockTableService {
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

    it('should return "code" key', () => {
      expect(service.key()).toEqual('code');
    });

    it('should populate currency object to currency string literal', () => {
      let result: EntitiesModel<Budget>;
      service.getData().subscribe((table) => (result = table));
      expect(result.values[0].currency).toEqual('USD' as Currency);
    });
  });
});
