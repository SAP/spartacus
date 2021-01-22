import { ModuleWithProviders, NgModule } from '@angular/core';
import { UserStoreModule } from './store/user-store.module';

/**
 * @deprecated since 3.2, moved to the `@spartacus/user` package.
 */
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
