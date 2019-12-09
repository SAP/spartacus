import { InjectionToken } from '@angular/core';

import { ConsentTemplate } from '../../../model/consent.model';
import { Converter } from '../../../util/converter.service';

export const CONSENT_TEMPLATE_NORMALIZER = new InjectionToken<
  Converter<any, ConsentTemplate>
>('ConsentTemplateNormalizer');
