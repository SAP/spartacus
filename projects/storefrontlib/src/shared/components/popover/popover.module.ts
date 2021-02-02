import { NgModule } from '@angular/core';
import { PopoverComponent } from './popover.component';
import { PopoverDirective } from './popover.directive';

@NgModule({
  declarations: [PopoverDirective, PopoverComponent],
  exports: [PopoverDirective, PopoverComponent],
})
export class PopoverModule {}
