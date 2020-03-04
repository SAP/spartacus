import { NgModule, ModuleWithProviders } from '@angular/core';
import { TriggerConfig } from './config/trigger-config';
import { provideConfig, Config } from '@spartacus/core';
import { DEFAULT_TRIGGER_CONFIG } from './config/default-trigger-config';

@NgModule({})
export class TriggerModule {
  static forRoot(): ModuleWithProviders<TriggerModule> {
    return {
      ngModule: TriggerModule,
      providers: [
        provideConfig(DEFAULT_TRIGGER_CONFIG),
        { provide: TriggerConfig, useExisting: Config },
      ],
    };
  }
}
