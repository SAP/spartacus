import { InjectionToken } from '@angular/core';
import { CmsStructureModel } from '../../model/page.model';
import { Normalizer } from '../../../util/normalizers.service';

export const CMS_PAGE_NORMALIZER = new InjectionToken<
  Normalizer<any, CmsStructureModel>
>('CmsPage Normalizer');
