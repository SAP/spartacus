import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicSlotComponent } from './dynamic-slot.component';
import { ComponentWrapperDirective } from './component-wrapper.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [DynamicSlotComponent, ComponentWrapperDirective],
  exports: [DynamicSlotComponent, ComponentWrapperDirective]
})
export class DynamicSlotModule {}
