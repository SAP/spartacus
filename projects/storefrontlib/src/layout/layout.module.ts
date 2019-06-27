import { NgModule } from '@angular/core';
import { Config } from '@spartacus/core';
import { OutletRefModule } from '../cms-structure/outlet/index';
import { LayoutConfig } from './config/layout-config';

const layoutModules = [OutletRefModule];

@NgModule({
  imports: [...layoutModules],
  providers: [{ provide: LayoutConfig, useExisting: Config }],
  exports: [...layoutModules],
})
export class LayoutModule {}
