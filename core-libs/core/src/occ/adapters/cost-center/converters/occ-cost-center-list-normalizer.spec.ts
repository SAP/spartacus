import { inject, TestBed } from '@angular/core/testing';
import { CostCenter, EntitiesModel, Occ, OccConfig } from '@spartacus/core';
import { OccCostCenterListNormalizer } from './occ-cost-center-list-normalizer';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

describe('CostCenterListNormalizer', () => {
  let service: OccCostCenterListNormalizer;

  const costCenter: Occ.CostCenter = {
    name: 'CostCenter1',
    code: 'testCode',
  };

  const costCentersList: Occ.CostCentersList = {
    costCenters: [costCenter],
  };

  const targetCostCenter: CostCenter = {
    name: 'CostCenter1',
    code: 'testCode',
  };

  const targetCostCentersList: EntitiesModel<CostCenter> = {
    values: [targetCostCenter],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccCostCenterListNormalizer,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.inject(OccCostCenterListNormalizer);
  });

  it('should inject OccCostCenterListNormalizer', inject(
    [OccCostCenterListNormalizer],
    (costCenterListNormalizer: OccCostCenterListNormalizer) => {
      expect(costCenterListNormalizer).toBeTruthy();
    }
  ));

  it('should convert cost center list', () => {
    const result = service.convert(costCentersList);
    expect(result.values).toEqual(targetCostCentersList.values);
  });

  it('should convert cost center list with applied target', () => {
    const result = service.convert(costCentersList, targetCostCentersList);
    expect(result).toEqual(targetCostCentersList);
  });
});
