import { ADD_TO_CART_FEEDBACK } from '../models';
import { CartConfig } from './cart-config';
import { defaultAddToCartToastConfig } from './default-added-to-cart-toast-config';

export const defaultCartConfig: CartConfig = {
  cart: {
    validation: {
      enabled: false,
    },
    selectiveCart: {
      enabled: false,
    },
    addToCartFeedback: {
      feedback: ADD_TO_CART_FEEDBACK.TOAST,
      toast: defaultAddToCartToastConfig,
    },
  },
};
