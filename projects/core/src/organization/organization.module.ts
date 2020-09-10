import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({})
export class OrganizationModule {
  static forRoot(): ModuleWithProviders<OrganizationModule> {
    return {
      ngModule: OrganizationModule,
      providers: [],
    };
  }
}
