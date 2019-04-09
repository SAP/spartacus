import { InjectionToken } from '@angular/core';
import { CmsComponent, CmsComponentList } from '../../../occ/occ-models/index';
import { Normalizer } from '../../../util/normalizers.service';

export const CMS_COMPONENT_NORMALIZER = new InjectionToken<
  Normalizer<any, CmsComponent>
  >('CmsComponent Normalizer');

export const CMS_COMPONENT_LIST_NORMALIZER = new InjectionToken<
  Normalizer<any, CmsComponentList>
  >('CmsComponentList Normalizer');
