import { NgModule } from '@angular/core';
import { BackdropComponent } from './backdrop.component';

@NgModule({
  declarations: [BackdropComponent],
  entryComponents: [BackdropComponent],
  exports: [BackdropComponent],
})
export class OverlayModule {}
