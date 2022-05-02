import { Provider } from '@angular/core';
import { FutureStockFacade } from '@spartacus/product/future-stock/root';
import { FutureStockService } from '../services/future-stock.service';

export const facadeProviders: Provider[] = [
  FutureStockService,
  {
    provide: FutureStockFacade,
    useExisting: FutureStockService,
  },
];
