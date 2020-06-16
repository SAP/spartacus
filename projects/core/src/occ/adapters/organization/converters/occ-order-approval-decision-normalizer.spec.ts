import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { OrderApprovalDecision } from 'projects/core/src/model/order-approval.model';
import { OccConfig } from '../../../config/occ-config';
import { Occ } from '../../../occ-models/occ.models';
import { OccOrderApprovalDecisionNormalizer } from './occ-order-approval-decision-normalizer';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

describe('OrderApprovalDecisionNormalizer', () => {
  let service: OccOrderApprovalDecisionNormalizer;

  const orderApprovalDecision: Occ.OrderApprovalDecision = {
    decision: 'APPROVE',
  };

  const convertedOrderApprovalDecision: OrderApprovalDecision = {
    decision: 'APPROVE',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccOrderApprovalDecisionNormalizer,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.get(
      OccOrderApprovalDecisionNormalizer as Type<
        OccOrderApprovalDecisionNormalizer
      >
    );
  });

  it('should inject OccOrderApprovalDecisionNormalizer', inject(
    [OccOrderApprovalDecisionNormalizer],
    (orderApprovalDecisionNormalizer: OccOrderApprovalDecisionNormalizer) => {
      expect(orderApprovalDecisionNormalizer).toBeTruthy();
    }
  ));

  it('should convert order approval decision', () => {
    const result = service.convert(orderApprovalDecision);
    expect(result).toEqual(convertedOrderApprovalDecision);
  });

  it('should convert order approval decision with applied target', () => {
    const result = service.convert(orderApprovalDecision, {});
    expect(result).toEqual({});
  });
});
