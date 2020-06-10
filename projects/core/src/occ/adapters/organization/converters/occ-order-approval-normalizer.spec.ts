import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { OrderApproval } from '../../../../model/order-approval.model';
import { OccConfig } from '../../../config/occ-config';
import { Occ } from '../../../occ-models/occ.models';
import { OccOrderApprovalNormalizer } from './occ-order-approval-normalizer';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

describe('OrderApprovalNormalizer', () => {
  let service: OccOrderApprovalNormalizer;

  const costCenter: Occ.OrderApproval = {
    code: 'testCode',
  };

  const convertedOrderApproval: OrderApproval = {
    code: 'testCode',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccOrderApprovalNormalizer,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.get(
      OccOrderApprovalNormalizer as Type<OccOrderApprovalNormalizer>
    );
  });

  it('should inject OccOrderApprovalNormalizer', inject(
    [OccOrderApprovalNormalizer],
    (costCenterNormalizer: OccOrderApprovalNormalizer) => {
      expect(costCenterNormalizer).toBeTruthy();
    }
  ));

  it('should convert costCenter', () => {
    const result = service.convert(costCenter);
    expect(result).toEqual(convertedOrderApproval);
  });

  it('should convert orderApproval with applied target', () => {
    const result = service.convert(costCenter, {});
    expect(result).toEqual({});
  });
});
