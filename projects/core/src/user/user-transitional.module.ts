import { ModuleWithProviders, NgModule } from '@angular/core';
import { UserStoreTransitionalModule } from './store/user-store-transitional.module';

@NgModule({
  imports: [UserStoreTransitionalModule],
})
export class UserTransitionalModule {
  static forRoot(): ModuleWithProviders<UserTransitionalModule> {
    return {
      ngModule: UserTransitionalModule,
    };
  }
}
