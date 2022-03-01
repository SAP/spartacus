import { Images } from '@spartacus/core';

export interface CartToastItem {
  productName: string;
  quantity: number;
  unitPrice: string;
  baseClass: string;
  images?: Images;
  timeoutRef?: ReturnType<typeof setTimeout>;
  scrollUnlistener?: () => void;
}

export enum CART_TOAST_STATE {
  OPENING = 'OPENING',
  OPENED = 'OPENED',
  CLOSING = 'CLOSING',
}
