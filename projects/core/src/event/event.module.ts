import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule()
export class EventModule {
  static forRoot(): ModuleWithProviders<EventModule> {
    return {
      ngModule: EventModule,
    };
  }
}
