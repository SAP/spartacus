import { NgModule } from '@angular/core';
import { FutureStockComponentsModule } from '@spartacus/product/future-stock/components';
import { FutureStockCoreModule } from '@spartacus/product/future-stock/core';
import { FutureStockOccModule } from './occ/future-stock-occ.module';

@NgModule({
  imports: [
    FutureStockCoreModule.forRoot(),
    FutureStockComponentsModule,
    FutureStockOccModule,
  ],
})
export class FutureStockModule {}
