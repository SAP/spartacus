import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Endpoint for the list of one user's orders
     *
     * @member {string}
     */
    orderHistory?: string | OccEndpoint;
    /**
     * Endpoint for the details of one user's order
     *
     * @member {string}
     */
    orderDetail?: string | OccEndpoint;
    /**
     * Endpoint for consignment tracking
     *
     * @member {string}
     */
    consignmentTracking?: string | OccEndpoint;
    /**
     * Endpoint for cancel an order
     */
    cancelOrder?: string | OccEndpoint;
    /**
     * Endpoint for creating order return request
     */
    returnOrder?: string | OccEndpoint;
    /**
     * Endpoint for user's order return requests
     */
    orderReturns?: string | OccEndpoint;
    /**
     * Endpoint for order return request details
     */
    orderReturnDetail?: string | OccEndpoint;
    /**
     * Endpoint for cancelling return request
     */
    cancelReturn?: string | OccEndpoint;
    /**
     * Endpoint to schedule a replenishment order
     *
     * @member {string}
     */
    scheduleReplenishmentOrder?: string | OccEndpoint;
    /**
     * Endpoint for the list of one user's replenishment orders
     *
     * @member {string}
     */
    replenishmentOrderHistory?: string | OccEndpoint;
    /**
     * Endpoint to get a replenishment order details
     *
     * @member {string}
     */
    replenishmentOrderDetails?: string | OccEndpoint;
    /**
     * Endpoint to get a replenishment order history for a replenishment
     *
     * @member {string}
     */
    replenishmentOrderDetailsHistory?: string | OccEndpoint;
    /**
     * Endpoint to get a replenishment order history for a replenishment
     *
     * @member {string}
     */
    cancelReplenishmentOrder?: string | OccEndpoint;
  }
}
