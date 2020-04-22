import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { DEFAULT_LAUNCH_CONFIG } from './config/default-launch-config';
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
export class LaunchDialogModule {
  static forRoot(): ModuleWithProviders<LaunchDialogModule> {
    return {
      ngModule: LaunchDialogModule,
      providers: [provideConfig(DEFAULT_LAUNCH_CONFIG)],
    };
  }
}
