import { NgModule } from '@angular/core';
import { UserAnonymousConsentTemplatesConnector } from './connectors/user-anonymous-consent-templates.connector';

// TODO:#anon - add facade providers
@NgModule({
  providers: [UserAnonymousConsentTemplatesConnector],
})
export class UserAnonymousConsentsCoreModule {}
