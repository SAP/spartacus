import { FormControl } from '@angular/forms';
import '@spartacus/storefront';
import { BaseContext } from '@spartacus/storefront';
import {
  CartItemComponentOptions,
  OrderEntry,
  PromotionLocation,
} from './cart.model';

declare module '@spartacus/storefront' {
  const enum LAUNCH_CALLER {
    CLEAR_CART = 'CLEAR_CART',
  }
}

export interface CartItemContextNew extends BaseContext {
  readonly compact: boolean;

  readonly readonly: boolean;

  readonly item: OrderEntry;

  readonly quantityControl: FormControl;

  readonly location: PromotionLocation;

  readonly options: CartItemComponentOptions;
}

declare module '@spartacus/storefront' {
  interface AllContext {
    cartItemContextNew: CartItemContextNew;
  }
}
