import { CartConfig } from './cart-config';
import { ADD_TO_CART_FEEDBACK } from './add-to-cart-feedback';

export const defaultCartConfig: CartConfig = {
  cart: {
    validation: {
      enabled: false,
    },
    selectiveCart: {
      enabled: false,
    },
    addToCartFeedback: {
      feedback: ADD_TO_CART_FEEDBACK.MODAL,
      toastTimeout: 3000,
    },
  },
};
