import { inject, TestBed } from '@angular/core/testing';
import { CostCenter } from '../../../../model/org-unit.model';
import { OccConfig } from '../../../config/occ-config';
import { Occ } from '../../../occ-models/occ.models';
import { OccCostCenterSerializer } from './occ-cost-center-serializer';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

describe('CostCenterSerializer', () => {
  let service: OccCostCenterSerializer;

  const costCenter: CostCenter = {
    name: 'CostCenter1',
    code: 'testCode',
    active: true,
  };

  const convertedCostCenter: Occ.CostCenter = {
    name: 'CostCenter1',
    code: 'testCode',
    activeFlag: true,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccCostCenterSerializer,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.inject(OccCostCenterSerializer);
  });

  it('should inject OccCostCenterSerializer', inject(
    [OccCostCenterSerializer],
    (costCenterSerializer: OccCostCenterSerializer) => {
      expect(costCenterSerializer).toBeTruthy();
    }
  ));

  it('should convert costCenter', () => {
    const result = service.convert(costCenter);
    expect(result).toEqual(convertedCostCenter);
  });

  it('should convert costCenter with applied target', () => {
    const result = service.convert(costCenter, {});
    expect(result).toEqual({ activeFlag: true });
  });
});
