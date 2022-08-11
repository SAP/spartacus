import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({})
export class CostCenterModule {
  static forRoot(): ModuleWithProviders<CostCenterModule> {
    return {
      ngModule: CostCenterModule,
      providers: [],
    };
  }
}
