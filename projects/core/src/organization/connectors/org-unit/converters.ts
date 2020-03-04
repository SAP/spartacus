import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import {
  B2BApprovalProcess,
  B2BUnit,
  B2BUnitNode,
} from '../../../model/org-unit.model';
import { EntitiesModel } from '../../../model/misc.model';

export const B2BUNIT_NODE_NORMALIZER = new InjectionToken<
  Converter<any, B2BUnitNode>
>('B2BUnitNodeNormalizer');
export const B2BUNIT_NODE_LIST_NORMALIZER = new InjectionToken<
  Converter<any, EntitiesModel<B2BUnitNode>>
>('B2BUnitNodeListNormalizer');
export const B2BUNIT_NORMALIZER = new InjectionToken<Converter<any, B2BUnit>>(
  'B2BUnitNormalizer'
);
export const B2BUNIT_APPROVAL_PROCESSES_NORMALIZER = new InjectionToken<
  Converter<any, B2BApprovalProcess>
>('B2BUnitApprovalProcessNormalizer');
