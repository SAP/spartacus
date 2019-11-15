import { NgModule } from '@angular/core';
import { Config } from '@spartacus/core';
import { OutletRefModule } from '../cms-structure/outlet/outlet-ref/outlet-ref.module';
import { SkipLinkModule } from './a11y';
import { LayoutConfig } from './config/layout-config';

const layoutModules = [OutletRefModule];

@NgModule({
  imports: [...layoutModules, SkipLinkModule],
  providers: [{ provide: LayoutConfig, useExisting: Config }],
  exports: [...layoutModules],
})
export class LayoutModule {}
