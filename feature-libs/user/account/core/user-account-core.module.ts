import { ModuleWithProviders, NgModule } from '@angular/core';
import { UserAccountConnector } from './connectors/index';
import { UserAccountStoreModule } from './store/user-account-store.module';

@NgModule({
  imports: [UserAccountStoreModule],
})
export class UserAccountCoreModule {
  static forRoot(): ModuleWithProviders<UserAccountCoreModule> {
    return {
      ngModule: UserAccountCoreModule,
      providers: [UserAccountConnector],
    };
  }
}
