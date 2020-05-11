import { ModuleWithProviders, NgModule } from '@angular/core';
import { UserStoreModule } from './store/user-store.module';

@NgModule({
  imports: [UserStoreModule],
})
export class UserModule {
  static forRoot(): ModuleWithProviders<UserModule> {
    return {
      ngModule: UserModule,
    };
  }
}
