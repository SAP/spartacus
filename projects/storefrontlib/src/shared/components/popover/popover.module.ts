import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KeyboardFocusModule } from '../../../layout/a11y/keyboard-focus/keyboard-focus.module';
import { PopoverComponent } from './popover.component';
import { PopoverDirective } from './popover.directive';

@NgModule({
  imports: [CommonModule, RouterModule, KeyboardFocusModule],
  declarations: [PopoverDirective, PopoverComponent],
  exports: [PopoverDirective, PopoverComponent],
})
export class PopoverModule {}
