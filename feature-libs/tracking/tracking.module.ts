import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({})
export class TrackingModule {
  static forRoot(): ModuleWithProviders<TrackingModule> {
    return {
      ngModule: TrackingModule,
    };
  }
}
