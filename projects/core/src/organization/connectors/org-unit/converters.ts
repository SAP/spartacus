import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { B2BUnitNode, B2BUnitNodeList } from '../../../model/org-unit.model';

export const B2BUNIT_NORMALIZER = new InjectionToken<
  Converter<any, B2BUnitNode>
>('B2BUnitNormalizer');
export const B2BUNIT_LIST_NORMALIZER = new InjectionToken<
  Converter<any, B2BUnitNodeList>
>('B2BUnitListNormalizer');
