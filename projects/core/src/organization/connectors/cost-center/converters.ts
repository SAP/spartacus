import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { CostCenter } from '../../../model/cost-center.model';
import { EntitiesModel } from '../../../model/misc.model';

export const COST_CENTER_NORMALIZER = new InjectionToken<
  Converter<any, CostCenter>
>('CostCenterNormalizer');
export const COST_CENTERS_NORMALIZER = new InjectionToken<
  Converter<any, EntitiesModel<CostCenter>>
>('CostCentersListNormalizer');
