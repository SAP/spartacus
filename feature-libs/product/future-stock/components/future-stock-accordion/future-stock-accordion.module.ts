import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FutureStockAccordionComponent } from './future-stock-accordion.component';
import { IconModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    IconModule
  ],
  declarations: [FutureStockAccordionComponent],
  exports: [FutureStockAccordionComponent]
})
export class FutureStockAccordionModule { }
