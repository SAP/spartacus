import { ModuleWithProviders, NgModule } from '@angular/core';
import { UserEventBuilder } from './events/user-event.builder';
import { UserEventModule } from './events/user-event.module';
import { UserStoreTransitional_4_2_Module } from './store/user-store-transitional_4_2.module';

@NgModule({
  imports: [UserStoreTransitional_4_2_Module, UserEventModule],
  providers: [UserEventBuilder],
})
export class UserTransitional_4_2_Module {
  static forRoot(): ModuleWithProviders<UserTransitional_4_2_Module> {
    return {
      ngModule: UserTransitional_4_2_Module,
    };
  }
}
