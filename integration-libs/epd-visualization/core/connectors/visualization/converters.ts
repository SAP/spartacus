import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { LookupVisualizationsResponse } from './lookup-visualizations-response';

export const LOOKUP_VISUALIZATIONS_RESPONSE_NORMALIZER = new InjectionToken<
  Converter<any, LookupVisualizationsResponse>
>('LookupVisualizationsResponseNormalizer');
