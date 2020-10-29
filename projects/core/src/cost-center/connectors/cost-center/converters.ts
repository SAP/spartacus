import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { CostCenter } from '../../../model/org-unit.model';
import { EntitiesModel } from '../../../model/misc.model';

export const COST_CENTER_NORMALIZER = new InjectionToken<
  Converter<any, CostCenter>
>('CostCenterNormalizer');

export const COST_CENTERS_NORMALIZER = new InjectionToken<
  Converter<any, EntitiesModel<CostCenter>>
>('CostCentersListNormalizer');

export const COST_CENTER_SERIALIZER = new InjectionToken<
  Converter<CostCenter, any>
>('CostCenterSerializer');
