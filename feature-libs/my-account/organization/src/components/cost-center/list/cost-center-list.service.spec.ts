import { TestBed } from '@angular/core/testing';
import { CostCenter, CostCenterService, EntitiesModel } from '@spartacus/core';
import { TableTestingModule } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { CostCenterListService } from './cost-center-list.service';

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

describe('CostCenterListService', () => {
  let service: CostCenterListService;

  describe('with table config', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TableTestingModule],
        providers: [
          CostCenterListService,
          {
            provide: CostCenterService,
            useClass: MockCostCenterService,
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
