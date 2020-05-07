import { NgModule } from '@angular/core';
import { OutletRefModule } from '../cms-structure/outlet/outlet-ref/outlet-ref.module';
import { LaunchDialogModule } from './launch-dialog/index';

@NgModule({
  imports: [OutletRefModule, LaunchDialogModule.forRoot()],
  exports: [OutletRefModule],
})
export class LayoutModule {}
