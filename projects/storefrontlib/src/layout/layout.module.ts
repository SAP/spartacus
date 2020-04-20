import { NgModule } from '@angular/core';
import { Config } from '@spartacus/core';
import { OutletRefModule } from '../cms-structure/outlet/outlet-ref/outlet-ref.module';
import { LayoutConfig } from './config/layout-config';
import { LaunchDialogModule } from './launch-dialog/index';

@NgModule({
  imports: [OutletRefModule, LaunchDialogModule.forRoot()],
  providers: [{ provide: LayoutConfig, useExisting: Config }],
  exports: [OutletRefModule],
})
export class LayoutModule {}
