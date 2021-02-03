import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PopoverComponent } from './popover.component';
import { PopoverDirective } from './popover.directive';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [PopoverDirective, PopoverComponent],
  exports: [PopoverDirective, PopoverComponent],
})
export class PopoverModule {}
