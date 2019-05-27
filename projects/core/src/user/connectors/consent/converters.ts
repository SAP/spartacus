import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { ConsentTemplate } from '../../../occ/occ-models/additional-occ.models';

export const CONSENT_TEMPLATE_NORMALIZER = new InjectionToken<
  Converter<any, ConsentTemplate>
>('ConsentTemplateNormalizer');
