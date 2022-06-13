import { NgModule } from '@angular/core';

import { defaultOccStockConfig } from './adapters/default-occ-stock-config';
import { OccStockAdapter } from './adapters/occ-stock.adapter';
import { provideDefaultConfig } from '@spartacus/core';
import { StockAdapter } from '@spartacus/pickup-in-store/core';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccStockConfig),
    { provide: StockAdapter, useClass: OccStockAdapter },
  ],
})
export class StockOccModule {}
