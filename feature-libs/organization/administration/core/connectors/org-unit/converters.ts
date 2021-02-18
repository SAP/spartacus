import { InjectionToken } from '@angular/core';
import { B2BApprovalProcess, B2BUnit, Converter } from '@spartacus/core';
import { B2BUnitNode } from '../../model/unit-node.model';

export const B2BUNIT_NODE_NORMALIZER = new InjectionToken<
  Converter<any, B2BUnitNode>
>('B2BUnitNodeNormalizer');

export const B2BUNIT_NODE_LIST_NORMALIZER = new InjectionToken<
  Converter<any, B2BUnitNode[]>
>('B2BUnitNodeListNormalizer');

export const B2BUNIT_NORMALIZER = new InjectionToken<Converter<any, B2BUnit>>(
  'B2BUnitNormalizer'
);

export const B2BUNIT_SERIALIZER = new InjectionToken<Converter<B2BUnit, any>>(
  'B2BUnitSerializer'
);

export const B2BUNIT_APPROVAL_PROCESSES_NORMALIZER = new InjectionToken<
  Converter<any, B2BApprovalProcess[]>
>('B2BUnitApprovalProcessNormalizer');
