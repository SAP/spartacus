import { ModuleWithProviders, NgModule } from '@angular/core';
import { ConsentEventModule } from './events/consent-event.module';
import { UserStoreTransitionalModule } from './store/user-store-transitional.module';

@NgModule({
  imports: [UserStoreTransitionalModule, ConsentEventModule],
})
export class UserTransitionalModule {
  static forRoot(): ModuleWithProviders<UserTransitionalModule> {
    return {
      ngModule: UserTransitionalModule,
    };
  }
}
