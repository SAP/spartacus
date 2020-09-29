import { InjectionToken } from '@angular/core';
import {
  Address,
  B2BApprovalProcess,
  B2BUnit,
  Converter,
  EntitiesModel,
} from '@spartacus/core';
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
export const B2BUNIT_APPROVAL_PROCESSES_NORMALIZER = new InjectionToken<
  Converter<any, B2BApprovalProcess[]>
>('B2BUnitApprovalProcessNormalizer');

export const B2B_ADDRESS_LIST_NORMALIZER = new InjectionToken<
  Converter<any, EntitiesModel<Address>>
>('B2BAddressesNormalizer');

export const B2B_ADDRESS_NORMALIZER = new InjectionToken<
  Converter<any, Address>
>('B2BAddressNormalizer');
