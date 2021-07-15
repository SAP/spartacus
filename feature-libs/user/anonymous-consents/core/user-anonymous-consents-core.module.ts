import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultAnonymousConsentsConfig } from './config/default-anonymous-consents-config';
import { UserAnonymousConsentTemplatesConnector } from './connectors/user-anonymous-consent-templates.connector';

// TODO:#anon - add facade providers
@NgModule({
  providers: [
    provideDefaultConfig(defaultAnonymousConsentsConfig),
    UserAnonymousConsentTemplatesConnector,
  ],
})
export class UserAnonymousConsentsCoreModule {}
