import '@spartacus/cart/main/core';

declare module '@spartacus/cart/main/core' {
  interface MultiCartState {
    wishList: string;
  }
}
