import { ModuleWithProviders, NgModule } from '@angular/core';
import { UserProfileConnector } from './connectors/user-profile.connector';
import { UserProfileStoreModule } from './store/user-profile-store.module';

@NgModule({
  imports: [UserProfileStoreModule],
})
export class UserProfileCoreModule {
  static forRoot(): ModuleWithProviders<UserProfileCoreModule> {
    return {
      ngModule: UserProfileCoreModule,
      providers: [UserProfileConnector],
    };
  }
}
