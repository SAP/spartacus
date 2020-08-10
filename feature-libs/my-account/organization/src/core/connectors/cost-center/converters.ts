import { InjectionToken } from '@angular/core';
import { CostCenter, EntitiesModel, Converter } from '@spartacus/core';

export const COST_CENTER_NORMALIZER = new InjectionToken<
  Converter<any, CostCenter>
>('CostCenterNormalizer');
export const COST_CENTERS_NORMALIZER = new InjectionToken<
  Converter<any, EntitiesModel<CostCenter>>
>('CostCentersListNormalizer');
