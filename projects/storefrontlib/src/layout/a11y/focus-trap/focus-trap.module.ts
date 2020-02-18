import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FocusTrapDirective } from './directive/focus-trap.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [FocusTrapDirective],
  exports: [FocusTrapDirective],
})
export class FocusTrapModule {}
