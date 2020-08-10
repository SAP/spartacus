import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CostCenter, EntitiesModel } from '@spartacus/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { CostCenterListService } from './cost-center-list.service';
import { CostCenterService } from '../../../core/services/cost-center.service';

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

describe('CostCenterListService', () => {
  let service: CostCenterListService;

  describe('with table config', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          CostCenterListService,
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
      service = TestBed.inject(CostCenterListService);
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
