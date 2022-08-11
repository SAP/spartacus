import { Provider } from '@angular/core';
import { WishListFacade } from '@spartacus/cart/wish-list/root';
import { WishListService } from './wish-list.service';

export const facadeProviders: Provider[] = [
  WishListService,
  {
    provide: WishListFacade,
    useExisting: WishListService,
  },
];
