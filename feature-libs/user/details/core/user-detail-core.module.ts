import { ModuleWithProviders, NgModule } from '@angular/core';
import { UserDetailStoreModule } from './store/user-detail-store.module';

@NgModule({
  imports: [UserDetailStoreModule],
})
export class UserDetailCoreModule {
  static forRoot(): ModuleWithProviders<UserDetailCoreModule> {
    return {
      ngModule: UserDetailCoreModule,
      providers: [],
    };
  }
}
