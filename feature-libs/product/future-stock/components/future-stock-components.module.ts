import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FutureStockAccordionModule } from './future-stock-accordion/future-stock-accordion.module';
import { FutureStockTriggerModule } from './future-stock-trigger/future-stock-trigger.module';

@NgModule({
  imports: [CommonModule, FutureStockTriggerModule, FutureStockAccordionModule],
})
export class FutureStockComponentsModule {}
