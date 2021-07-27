import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { UserAnonymousConsentsFacade } from '@spartacus/user/anonymous-consents/root';
import { defaultAnonymousConsentsConfig } from './config/default-anonymous-consents-config';
import { UserAnonymousConsentTemplatesConnector } from './connectors/user-anonymous-consent-templates.connector';
import { UserAnonymousConsentsService } from './facade/user-anonymous-consents.service';
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

        // TODO:#anon - use facadeProviders
        UserAnonymousConsentsService,
        {
          provide: UserAnonymousConsentsFacade,
          useExisting: UserAnonymousConsentsService,
        },
      ],
    };
  }
}
