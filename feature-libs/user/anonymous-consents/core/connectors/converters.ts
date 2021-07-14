import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import {
  AnonymousConsent,
  ConsentTemplate,
} from '@spartacus/user/anonymous-consents/root';

export const ANONYMOUS_CONSENT_NORMALIZER = new InjectionToken<
  Converter<string, AnonymousConsent[]>
>('AnonymousConsentNormalizer');

// TODO:#anon move to @spartacus/user/consents
export const CONSENT_TEMPLATE_NORMALIZER = new InjectionToken<
  Converter<ConsentTemplate, ConsentTemplate>
>('ConsentTemplateNormalizer');
