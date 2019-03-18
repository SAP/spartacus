import { NgModule } from '@angular/core';

import { ConfigModule, Config } from '@spartacus/core';

import { OutletRefModule } from '../../outlet/index';
import { StyleRefModule } from '../../outlet/style-ref/style-ref.module';

import { BreakpointService } from './breakpoint/breakpoint.service';
import { defaultLayoutConfig } from './config/default-layout-config';
import { LayoutConfig } from './config/layout-config';
import { MainModule } from './main/main.module';

const layoutModules = [OutletRefModule, StyleRefModule];

@NgModule({
  imports: [
    MainModule,
    ...layoutModules,
    ConfigModule.withConfig(defaultLayoutConfig)
  ],
  providers: [
    { provide: LayoutConfig, useExisting: Config },
    BreakpointService
  ],
  exports: [MainModule, ...layoutModules]
})
export class LayoutModule {}
