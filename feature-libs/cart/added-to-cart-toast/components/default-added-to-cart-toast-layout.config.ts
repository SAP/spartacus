import { LayoutConfig, OutletPosition } from '@spartacus/storefront';
import { AddedToCartToastComponent } from './added-to-cart-toast/added-to-cart-toast.component';

export const defaultAddedToCartToastLayoutConfig: LayoutConfig = {
  launch: {
    ADDED_TO_CART_TOAST: {
      outlet: 'cx-storefront',
      component: AddedToCartToastComponent,
      position: OutletPosition.AFTER,
    },
  },
};
