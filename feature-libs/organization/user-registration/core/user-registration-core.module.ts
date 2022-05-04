import { ModuleWithProviders, NgModule } from '@angular/core';
import { UserRegistrationConnector } from './connectors';
import { facadeProviders } from './facade/facade-providers';

@NgModule({})
export class UserRegistrationCoreModule {
  static forRoot(): ModuleWithProviders<UserRegistrationCoreModule> {
    return {
      ngModule: UserRegistrationCoreModule,
      providers: [...facadeProviders, UserRegistrationConnector],
    };
  }
}
