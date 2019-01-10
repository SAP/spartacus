import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutletRefDirective, CssRefDirective } from './outlet-ref.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [CssRefDirective, OutletRefDirective],
  exports: [CssRefDirective, OutletRefDirective]
})
export class OutletRefModule {}
