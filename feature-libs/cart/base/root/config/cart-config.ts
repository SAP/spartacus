import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { ADD_TO_CART_FEEDBACK } from './add-to-cart-feedback';
// Imported for side effects (module augmentation)
import '@spartacus/storefront';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class CartConfig {
  cart?: {
    selectiveCart?: {
      enabled?: boolean;
    };
    validation?: {
      enabled?: boolean;
    };
    addToCartFeedback: {
      feedback: ADD_TO_CART_FEEDBACK;
      toastTimeout?: number;
    };
  };
}

declare module '@spartacus/core' {
  interface Config extends CartConfig {}
}
