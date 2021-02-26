import { NgModule } from '@angular/core';
import { UserProfileConnector } from './connectors/user-profile.connector';
import { UserProfileStoreModule } from './store/user-profile-store.module';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  imports: [UserProfileStoreModule],
  providers: [UserProfileConnector, ...facadeProviders],
})
export class UserProfileCoreModule {}
