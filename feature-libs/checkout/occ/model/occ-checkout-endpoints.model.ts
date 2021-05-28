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
    /**
     * Returns a list of the available payment types.
     */
    paymentTypes?: string | OccEndpoint;
    /**
     * Sets the cost center for the checkout cart.
     */
    setCartCostCenter?: string | OccEndpoint;
    /**
     * Sets the payment type for the checkout cart
     */
    cartPaymentType?: string | OccEndpoint;
    /**
     * Get a list of supported payment card types.
     */
    cardTypes?: string | OccEndpoint;
    /**
     * Sets credit card payment details for the cart.
     */
    cartPaymentDetails?: string | OccEndpoint;
    /**
     *  Get information needed for create subscription
     */
    paymentProviderRequest?: string | OccEndpoint;
    /**
     * Handles response from payment provider and create payment details
     */
    paymentProviderResponse?: string | OccEndpoint;
    /**
     *  Get a cart with a given identifier.
     */
    loadCheckoutDetails?: string | OccEndpoint;
    /**
     * Endpoint for delivery addresses
     */
    deliveryAddresses?: string | OccEndpoint;
    /**
     * Endpoint for the delivery mode selected for the cart.
     */
    deliveryMode?: string | OccEndpoint;
    /**
     *Endpoint for get all delivery modes for the current store and delivery address.
     */
    deliveryModes?: string | OccEndpoint;
  }
}
