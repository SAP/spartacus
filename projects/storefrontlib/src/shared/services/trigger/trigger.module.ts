import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config, provideConfig } from '@spartacus/core';
import { DEFAULT_TRIGGER_CONFIG } from './config/default-trigger-config';
import { TriggerConfig } from './config/trigger-config';
import {
  InlineRenderStrategy,
  OutletRenderStrategy,
  RoutingRenderStrategy,
} from './services/index';
import { RenderStrategy } from './services/render.strategy';

@NgModule({
  providers: [
    {
      provide: RenderStrategy,
      useExisting: OutletRenderStrategy,
      multi: true,
    },
    {
      provide: RenderStrategy,
      useExisting: InlineRenderStrategy,
      multi: true,
    },
    {
      provide: RenderStrategy,
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
        { provide: TriggerConfig, useExisting: Config },
      ],
    };
  }
}
