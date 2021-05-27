import { InjectionToken } from '@angular/core';
import { Converter, PointOfService } from '@spartacus/core';

export const POINT_OF_SERVICE_NORMALIZER = new InjectionToken<
  Converter<any, PointOfService>
>('PointOfServiceNormalizer');
