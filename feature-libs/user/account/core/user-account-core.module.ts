import { ModuleWithProviders, NgModule } from '@angular/core';
import { UserAccountConnector } from './connectors/index';
import { UserAccountStoreModule } from './store/user-account-store.module';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  imports: [UserAccountStoreModule],
  providers: [...facadeProviders],
})
export class UserAccountCoreModule {
  static forRoot(): ModuleWithProviders<UserAccountCoreModule> {
    return {
      ngModule: UserAccountCoreModule,
      providers: [UserAccountConnector],
    };
  }
}
