import { NgModule } from '@angular/core';
import { UserAccountConnector } from './connectors/index';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  providers: [UserAccountConnector, ...facadeProviders],
})
export class UserAccountCoreModule {}
