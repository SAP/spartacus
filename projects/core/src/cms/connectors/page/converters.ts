import { InjectionToken } from '@angular/core';

import { Converter } from '../../../util/converter.service';
import { CmsStructureModel } from '../../model/page.model';

export const CMS_PAGE_NORMALIZER = new InjectionToken<
  Converter<any, CmsStructureModel>
>('CmsPageNormalizer');
