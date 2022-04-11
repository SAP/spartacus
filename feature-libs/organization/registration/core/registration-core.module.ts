import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({})
export class RegistrationCoreModule {
  static forRoot(): ModuleWithProviders<RegistrationCoreModule> {
    return {
      ngModule: RegistrationCoreModule,
    };
  }
}
