import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import {
  ANONYMOUS_CONSENT_NORMALIZER,
  UserAnonymousConsentTemplatesAdapter,
} from '@spartacus/user/anonymous-consents/core';
import { defaultOccUserAnonymousConsentsConfig } from './adapters/config/default-occ-user-anonymous-consents-endpoint.config';
import { OccUserAnonymousConsentsAdapter } from './adapters/occ-user-anonymous-consents.adapter';
import { AnonymousConsentNormalizer } from './converters/anonymous-consents-normalizer';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccUserAnonymousConsentsConfig),
    {
      provide: UserAnonymousConsentTemplatesAdapter,
      useClass: OccUserAnonymousConsentsAdapter,
    },
    {
      provide: ANONYMOUS_CONSENT_NORMALIZER,
      useExisting: AnonymousConsentNormalizer,
      multi: true,
    },
  ],
})
export class UserAnonymousConsentsOccModule {}
