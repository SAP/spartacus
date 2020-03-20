import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config, provideConfig } from '@spartacus/core';
import { DEFAULT_TRIGGER_CONFIG } from './config/default-trigger-config';
import { TriggerConfig } from './config/trigger-config';
import {
  InlineRenderService,
  OutletRenderService,
  RoutingRenderService,
} from './services/index';
import { RenderStrategy } from './services/render.strategy';

@NgModule({
  providers: [
    {
      provide: RenderStrategy,
      useExisting: OutletRenderService,
      multi: true,
    },
    {
      provide: RenderStrategy,
      useExisting: InlineRenderService,
      multi: true,
    },
    {
      provide: RenderStrategy,
      useExisting: RoutingRenderService,
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
