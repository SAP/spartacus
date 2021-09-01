import { LayoutConfig } from '@spartacus/storefront';
import { OutletPosition } from '../../../cms-structure';
import { CartToastComponent } from './cart-toast.component';

export const defaultCartToastLayoutConfig: LayoutConfig = {
  launch: {
    CART_TOAST: {
      outlet: 'cx-storefront',
      component: CartToastComponent,
      position: OutletPosition.AFTER,
    },
  },
};
