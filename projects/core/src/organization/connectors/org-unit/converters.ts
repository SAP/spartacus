import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { B2BUnitNode } from '../../../model/org-unit.model';
import { EntitiesModel } from '../../../model/misc.model';

export const B2BUNIT_NORMALIZER = new InjectionToken<
  Converter<any, B2BUnitNode>
>('B2BUnitNormalizer');
export const B2BUNIT_LIST_NORMALIZER = new InjectionToken<
  Converter<any, EntitiesModel<B2BUnitNode>>
>('B2BUnitListNormalizer');
