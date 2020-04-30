import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config } from '@spartacus/core';
import { LayoutConfig } from '../config/layout-config';
import {
  InlineRenderStrategy,
  LaunchDialogService,
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
    LaunchDialogService,
  ],
})
export class LaunchDialogModule {
  static forRoot(): ModuleWithProviders<LaunchDialogModule> {
    return {
      ngModule: LaunchDialogModule,
      providers: [{ provide: LayoutConfig, useExisting: Config }],
    };
  }
}
