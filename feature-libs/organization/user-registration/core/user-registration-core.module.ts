import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({})
export class UserRegistrationCoreModule {
  static forRoot(): ModuleWithProviders<UserRegistrationCoreModule> {
    return {
      ngModule: UserRegistrationCoreModule,
    };
  }
}
