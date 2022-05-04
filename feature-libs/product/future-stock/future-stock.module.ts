import { NgModule } from '@angular/core';
import { FutureStockComponentsModule } from '@spartacus/product/future-stock/components';
import { FutureStockCoreModule } from '@spartacus/product/future-stock/core';

@NgModule({
  imports: [FutureStockCoreModule, FutureStockComponentsModule],
})
export class FutureStockModule {}
