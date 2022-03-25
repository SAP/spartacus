import { ModuleWithProviders, NgModule } from '@angular/core';
import { UserEventBuilder } from './events/user-event.builder';
import { UserEventModule } from './events/user-event.module';
import { UserStoreModule } from './store/user-store.module';

@NgModule({
  imports: [UserStoreModule, UserEventModule],
  providers: [UserEventBuilder],
})
export class UserModule {
  static forRoot(): ModuleWithProviders<UserModule> {
    return {
      ngModule: UserModule,
    };
  }
}
