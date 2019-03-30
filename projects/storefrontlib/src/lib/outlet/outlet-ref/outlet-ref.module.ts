import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutletRefDirective } from './outlet-ref.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [OutletRefDirective],
  exports: [OutletRefDirective],
})
export class OutletRefModule {}
