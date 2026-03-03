import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CostCenter, EntitiesModel, FeatureConfigService } from '@spartacus/core';
import { CostCenterService } from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import {
  CostCenterListService,
  CostCenterModel,
} from './cost-center-list.service';

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
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

class MockFeatureConfigService {
  isEnabled(_feature: string): boolean {
    return false;
  }
}

describe('CostCenterListService', () => {
  let service: CostCenterListService;
  let costCenterService: CostCenterService;
  let featureConfigService: FeatureConfigService;

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
          {
            provide: FeatureConfigService,
            useClass: MockFeatureConfigService,
          },
        ],
      });
      service = TestBed.inject(CostCenterListService);
      costCenterService = TestBed.inject(CostCenterService);
      featureConfigService = TestBed.inject(FeatureConfigService);
    });

    it('should inject service', () => {
      expect(service).toBeTruthy();
    });

    it('should return "code" key', () => {
      expect(service.key()).toEqual('code');
    });

    it('should populate currency object to currency string literal', () => {
      let result: EntitiesModel<CostCenterModel>;
      service.getData().subscribe((table) => (result = table));

      expect(result.values[0].currency).toEqual('USD');
    });

    it('should get empty table with 10 rows', () => {
      spyOn(costCenterService, 'getList').and.returnValue(of(undefined));
      let result: EntitiesModel<CostCenterModel>;
      service.getData().subscribe((table) => (result = table));
      expect(result.values.length).toBe(10);
      expect(result.values[0]).toBeUndefined();
    });

    describe('getMinSearchCharacters()', () => {
      it('should return 3 by default', () => {
        expect(service.getMinSearchCharacters()).toBe(3);
      });
    });

    describe('isSearchEnabled()', () => {
      it('should return true when feature toggle is enabled', () => {
        spyOn(featureConfigService, 'isEnabled').and.returnValue(true);
        expect(service.isSearchEnabled()).toBe(true);
        expect(featureConfigService.isEnabled).toHaveBeenCalledWith(
          'enableB2BCostCenterSearch'
        );
      });

      it('should return false when feature toggle is disabled', () => {
        spyOn(featureConfigService, 'isEnabled').and.returnValue(false);
        expect(service.isSearchEnabled()).toBe(false);
        expect(featureConfigService.isEnabled).toHaveBeenCalledWith(
          'enableB2BCostCenterSearch'
        );
      });
    });
  });
});
