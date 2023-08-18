import { Images } from '@spartacus/core';
import '@spartacus/order/root';

declare module '@spartacus/order/root' {
  interface OrderHistory {
    purchaseType?: string; //?? Question: Purchased Online or Purchased Instore-> not decided
    totalItems?: number; //  - gets data from: /users/current/orders/{code}
    consolidatedInfo?: any; //eg: shipped-3; retured-1; estimated delivery date etc.,
    images?: Images[]; //images of all items in the order
  }
}
