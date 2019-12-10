import { NgModule } from '@angular/core';
import { Config } from '@spartacus/core';
import { OutletRefModule } from '../cms-structure/outlet/outlet-ref/outlet-ref.module';
import { SkipLinkModule } from './a11y/index';
import { LayoutConfig } from './config/layout-config';

@NgModule({
  imports: [SkipLinkModule, OutletRefModule],
  providers: [{ provide: LayoutConfig, useExisting: Config }],
  exports: [OutletRefModule],
})
export class LayoutModule {}
