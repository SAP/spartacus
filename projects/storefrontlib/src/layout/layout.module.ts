import { NgModule } from '@angular/core';
import { Config, ConfigModule } from '@spartacus/core';
import { OutletRefModule } from '../cms-structure/outlet/index';
import { StyleRefModule } from '../cms-structure/outlet/style-ref/style-ref.module';
import { defaultLayoutConfig } from './config/default-layout-config';
import { LayoutConfig } from './config/layout-config';
import { MainModule } from './main/main.module';

const layoutModules = [OutletRefModule, StyleRefModule];

@NgModule({
  imports: [
    MainModule,
    ...layoutModules,
    ConfigModule.withConfig(defaultLayoutConfig),
  ],
  providers: [{ provide: LayoutConfig, useExisting: Config }],
  exports: [MainModule, ...layoutModules],
})
export class LayoutModule {}
