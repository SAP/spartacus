import { NgModule } from '@angular/core';
import { UserAccountConnector } from './connectors/index';
import { UserAccountStoreModule } from './store/user-account-store.module';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  imports: [UserAccountStoreModule],
  providers: [UserAccountConnector, ...facadeProviders],
})
export class UserAccountCoreModule {}
