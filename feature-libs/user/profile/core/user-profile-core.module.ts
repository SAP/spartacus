import { NgModule } from '@angular/core';
import { UserProfileConnector } from './connectors/user-profile.connector';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  providers: [UserProfileConnector, ...facadeProviders],
})
export class UserProfileCoreModule {}
