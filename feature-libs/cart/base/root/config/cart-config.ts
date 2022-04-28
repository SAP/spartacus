import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { ADDED_TO_CART_FEEDBACK } from '../models';
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
      feedback: ADDED_TO_CART_FEEDBACK;
      toast?: AddToCartToastConfig;
    };
  };
}

export interface AddToCartToastConfig {
  timeout?: number;
}

declare module '@spartacus/core' {
  interface Config extends CartConfig {}
}
