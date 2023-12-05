import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { CostCenter } from '../../../model/org-unit.model';
import { EntitiesModel } from '../../../model/misc.model';
export declare const COST_CENTER_NORMALIZER: InjectionToken<Converter<any, CostCenter>>;
export declare const COST_CENTERS_NORMALIZER: InjectionToken<Converter<any, EntitiesModel<CostCenter>>>;
export declare const COST_CENTER_SERIALIZER: InjectionToken<Converter<CostCenter, any>>;
