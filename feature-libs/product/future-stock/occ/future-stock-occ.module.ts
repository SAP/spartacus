import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { FutureStockAdapter } from '@spartacus/future-stock/core';
import { OccFutureStockAdapter } from './adapters/occ-future-stock.adapter';
import { defaultOccFutureStockConfig } from './config/default-occ-future-stock.config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccFutureStockConfig),
    {
      provide: FutureStockAdapter,
      useClass: OccFutureStockAdapter,
    },
  ],
})
export class FutureStockOccModule {}
