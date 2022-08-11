import { Provider } from '@angular/core';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { SavedCartService } from './saved-cart.service';

export const facadeProviders: Provider[] = [
  SavedCartService,
  {
    provide: SavedCartFacade,
    useExisting: SavedCartService,
  },
];
