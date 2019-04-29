import { InjectionToken } from '@angular/core';
import { CmsComponent } from '../../../occ/occ-models/index';
import { Converter } from '../../../util/converter.service';

export const CMS_COMPONENT_NORMALIZER = new InjectionToken<
  Converter<any, CmsComponent>
>('CmsComponentNormalizer');
