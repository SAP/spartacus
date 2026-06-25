import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CostCenter, EntitiesModel, FeatureToggles } from '@spartacus/core';
import { OrganizationUIConfig } from '@spartacus/organization/administration/root';
import { CostCenterService } from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import {
  CostCenterListService,
  CostCenterModel,
} from './cost-center-list.service';
import { provideMockFeatureToggles } from 'core-libs/core/src/features-config/feature-toggles/testing';

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

const mockFeatureToggles: FeatureToggles = {
  enableB2BCostCenterSearch: false,
};

const mockOrganizationUIConfig: OrganizationUIConfig = {
  organizationUI: {
    listSearch: {
      minCharacters: 3,
    },
  },
};

describe('CostCenterListService', () => {
  let service: CostCenterListService;
  let costCenterService: CostCenterService;
  let featureToggles: FeatureToggles;

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
          provideMockFeatureToggles({ ...mockFeatureToggles }),
          {
            provide: OrganizationUIConfig,
            useValue: mockOrganizationUIConfig,
          },
        ],
      });
      service = TestBed.inject(CostCenterListService);
      costCenterService = TestBed.inject(CostCenterService);
      featureToggles = TestBed.inject(FeatureToggles);
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
      it('should return value from config', () => {
        expect(service.getMinSearchCharacters()).toBe(3);
      });
    });

    describe('isSearchEnabled()', () => {
      it('should return true when feature toggle is enabled', () => {
        featureToggles.enableB2BCostCenterSearch = true;
        expect(service.isSearchEnabled()).toBe(true);
      });

      it('should return false when feature toggle is disabled', () => {
        featureToggles.enableB2BCostCenterSearch = false;
        expect(service.isSearchEnabled()).toBe(false);
      });
    });
  });
});
