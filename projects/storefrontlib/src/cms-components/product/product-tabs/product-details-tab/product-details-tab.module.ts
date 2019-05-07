import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailsTabComponent } from './product-details-tab.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ProductDetailsTabComponent],
  entryComponents: [ProductDetailsTabComponent],
  exports: [ProductDetailsTabComponent],
})
export class ProductDetailsTabModule {}
