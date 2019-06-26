import { ModuleWithProviders, NgModule } from '@angular/core';
import { UserService } from './facade/index';
import { UserStoreModule } from './store/user-store.module';

@NgModule({
  imports: [UserStoreModule],
})
export class UserModule {
  static forRoot(): ModuleWithProviders<UserModule> {
    return {
      ngModule: UserModule,
      providers: [UserService],
    };
  }
}
