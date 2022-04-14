import { LayoutConfig } from '@spartacus/storefront';
import { AddedToCartToastComponent } from './added-to-cart-toast.component';

export const defaultAddedToCartToastLayoutConfig: LayoutConfig = {
  launch: {
    ADDED_TO_CART_TOAST: {
      inlineRoot: true,
      component: AddedToCartToastComponent,
    },
  },
};
