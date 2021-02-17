import { ModuleWithProviders, NgModule } from '@angular/core';
import { UserProfileConnector } from './connectors/user-profile.connector';
import { UserProfileStoreModule } from './store/user-profile-store.module';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  imports: [UserProfileStoreModule],
  providers: [...facadeProviders],
})
export class UserProfileCoreModule {
  static forRoot(): ModuleWithProviders<UserProfileCoreModule> {
    return {
      ngModule: UserProfileCoreModule,
      providers: [UserProfileConnector],
    };
  }
}
