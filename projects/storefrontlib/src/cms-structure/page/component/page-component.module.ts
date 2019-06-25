import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsModule } from '@spartacus/core';
import { ComponentWrapperDirective } from './component-wrapper.directive';

@NgModule({
  imports: [CommonModule, CmsModule],
  providers: [],
  declarations: [ComponentWrapperDirective],
  exports: [ComponentWrapperDirective],
})
export class PageComponentModule {}
