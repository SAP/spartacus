import { InjectionToken } from '@angular/core';
import { CmsComponent, CmsComponentList } from '../../../occ/occ-models/index';
import { Converter } from '../../../util/converter.service';

export const CMS_COMPONENT_NORMALIZE = new InjectionToken<
  Converter<any, CmsComponent>
>('CmsComponentNormalize');

export const CMS_COMPONENT_LIST_NORMALIZE = new InjectionToken<
  Converter<any, CmsComponentList>
>('CmsComponentListNormalize');
