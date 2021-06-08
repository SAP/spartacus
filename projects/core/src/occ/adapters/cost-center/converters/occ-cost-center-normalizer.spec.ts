import { inject, TestBed } from '@angular/core/testing';
import { CostCenter } from '../../../../model/org-unit.model';
import { OccConfig } from '../../../config/occ-config';
import { Occ } from '../../../occ-models/occ.models';
import { OccCostCenterNormalizer } from './occ-cost-center-normalizer';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

describe('CostCenterNormalizer', () => {
  let service: OccCostCenterNormalizer;

  const costCenter: Occ.CostCenter = {
    name: 'CostCenter1',
    code: 'testCode',
    active: 'true',
  };

  const convertedCostCenter: CostCenter = {
    name: 'CostCenter1',
    code: 'testCode',
    active: true,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccCostCenterNormalizer,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.inject(OccCostCenterNormalizer);
  });

  it('should inject OccCostCenterNormalizer', inject(
    [OccCostCenterNormalizer],
    (costCenterNormalizer: OccCostCenterNormalizer) => {
      expect(costCenterNormalizer).toBeTruthy();
    }
  ));

  it('should convert costCenter', () => {
    const result = service.convert(costCenter);
    expect(result).toEqual(convertedCostCenter);
  });

  it('should convert costCenter with applied target', () => {
    const result = service.convert(costCenter, {});
    expect(result).toEqual({ active: true });
  });
});
