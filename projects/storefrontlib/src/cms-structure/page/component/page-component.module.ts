import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentWrapperDirective } from './component-wrapper.directive';

@NgModule({
  imports: [CommonModule],
  providers: [],
  declarations: [ComponentWrapperDirective],
  exports: [ComponentWrapperDirective]
})
export class PageComponentModule {}
