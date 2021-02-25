import { OccConfig } from '@spartacus/core';

export const defaultOccSavedCartConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        saveCart:
          '/users/${userId}/carts/${cartId}/save?saveCartName=${saveCartName}&saveCartDescription=${saveCartDescription}',
        savedCart: '/users/${userId}/carts/${cartId}/savedcart',
        restoreSavedCart: '/users/${userId}/carts/${cartId}/restoresavedcart',
      },
    },
  },
};
