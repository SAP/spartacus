import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { UserAnonymousConsentTemplatesAdapter } from '@spartacus/user/anonymous-consents/core';
import { defaultOccUserAnonymousConsentsConfig } from './adapters/config/default-occ-user-anonymous-consents-endpoint.config';
import { OccUserAnonymousConsentsAdapter } from './adapters/occ-user-anonymous-consents.adapter';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccUserAnonymousConsentsConfig),
    {
      provide: UserAnonymousConsentTemplatesAdapter,
      useClass: OccUserAnonymousConsentsAdapter,
    },
  ],
})
export class UserAnonymousConsentsOccModule {}
