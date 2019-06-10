import { NgModule } from '@angular/core';
import { Config } from '@spartacus/core';
import { OutletRefModule } from '../cms-structure/outlet/index';
import { LayoutConfig } from './config/layout-config';
import { MainModule } from './main/main.module';

const layoutModules = [OutletRefModule];

@NgModule({
  imports: [MainModule, ...layoutModules],
  providers: [{ provide: LayoutConfig, useExisting: Config }],
  exports: [MainModule, ...layoutModules],
})
export class LayoutModule {}
