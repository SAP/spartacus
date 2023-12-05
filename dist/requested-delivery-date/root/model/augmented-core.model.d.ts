import '@spartacus/cart/base/root';
import '@spartacus/order/root';
declare module '@spartacus/cart/base/root' {
    interface Cart {
        earliestRetrievalAt?: string;
        requestedRetrievalAt?: string;
    }
}
declare module '@spartacus/order/root' {
    interface Order {
        requestedRetrievalAt?: string;
    }
}
