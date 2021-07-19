import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultAnonymousConsentsConfig } from './config/default-anonymous-consents-config';
import { UserAnonymousConsentTemplatesConnector } from './connectors/user-anonymous-consent-templates.connector';
import { AnonymousConsentsStoreModule } from './store/anonymous-consents-store.module';

// TODO:#anon - add facade providers
@NgModule({
  imports: [AnonymousConsentsStoreModule],
})
export class UserAnonymousConsentsCoreModule {
  static forRoot(): ModuleWithProviders<UserAnonymousConsentsCoreModule> {
    return {
      ngModule: UserAnonymousConsentsCoreModule,
      providers: [
        provideDefaultConfig(defaultAnonymousConsentsConfig),
        UserAnonymousConsentTemplatesConnector,
      ],
    };
  }
}
