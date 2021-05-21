import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Endpoint for set delivery address to cart
     */
    setDeliveryAddress?: string | OccEndpoint;
    /**
     * Endpoint for place order
     */
    placeOrder?: string | OccEndpoint;
  }
}
