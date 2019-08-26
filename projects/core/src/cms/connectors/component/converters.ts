import { InjectionToken } from '@angular/core';
import { CmsComponent } from '../../../model/cms.model';
import { Converter } from '../../../util/converter.service';

export const CMS_COMPONENT_NORMALIZER = new InjectionToken<
  Converter<any, CmsComponent>
>('CmsComponentNormalizer');
