import { InjectionToken } from '@angular/core';
import { AnonymousConsent } from '../../model/consent.model';
import { Converter } from '../../util/converter.service';

export const ANONYMOUS_CONSENT_NORMALIZER = new InjectionToken<
  Converter<string, AnonymousConsent[]>
>('AnonymousConsentNormalizer');
