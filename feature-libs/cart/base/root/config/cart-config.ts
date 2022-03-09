import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { AddToCartToastConfig, ADD_TO_CART_FEEDBACK } from '../models';
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
      toast?: AddToCartToastConfig;
    };
  };
}

declare module '@spartacus/core' {
  interface Config extends CartConfig {}
}
