import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config, provideConfig } from '@spartacus/core';
import { DEFAULT_TRIGGER_CONFIG } from './config/default-trigger-config';
import { LaunchConfig } from './config/launch-config';
import {
  InlineRenderStrategy,
  LaunchRenderStrategy,
  OutletRenderStrategy,
  RoutingRenderStrategy,
} from './services/index';

@NgModule({
  providers: [
    {
      provide: LaunchRenderStrategy,
      useExisting: OutletRenderStrategy,
      multi: true,
    },
    {
      provide: LaunchRenderStrategy,
      useExisting: InlineRenderStrategy,
      multi: true,
    },
    {
      provide: LaunchRenderStrategy,
      useExisting: RoutingRenderStrategy,
      multi: true,
    },
  ],
})
export class TriggerModule {
  static forRoot(): ModuleWithProviders<TriggerModule> {
    return {
      ngModule: TriggerModule,
      providers: [
        provideConfig(DEFAULT_TRIGGER_CONFIG),
        { provide: LaunchConfig, useExisting: Config },
      ],
    };
  }
}
