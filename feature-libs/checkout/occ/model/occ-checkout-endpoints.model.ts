import { OccEndpoint } from '@spartacus/core';

export interface CheckoutOccEndpoints {
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
  setCartPaymentType?: string | OccEndpoint;
  /**
   * Get a list of supported payment card types.
   */
  cardTypes?: string | OccEndpoint;
  /**
   * Sets credit card payment details for the cart.
   */
  setCartPaymentDetails?: string | OccEndpoint;
  /**
   *  Get information needed for create subscription
   */
  paymentProviderSubInfo?: string | OccEndpoint;
  /**
   * Handles response from payment provider and create payment details
   */
  createPaymentDetails?: string | OccEndpoint;
  /**
   *  Get a cart with a given identifier.
   */
  loadCheckoutDetails?: string | OccEndpoint;
  /**
   * Endpoint for create delivery address
   */
  createDeliveryAddress?: string | OccEndpoint;
  /**
   * Endpoint for delete deliver address
   */
  removeDeliveryAddress?: string | OccEndpoint;
  /**
   * Endpoint for get the delivery mode selected for the cart.
   */
  deliveryMode?: string | OccEndpoint;
  /**
   * Endpoint for sets the delivery mode for a cart.
   */
  setDeliveryMode?: string | OccEndpoint;
  /**
   * Endpoint for deletes the delivery mode from the cart.
   */
  clearDeliveryMode?: string | OccEndpoint;
  /**
   *Endpoint for get all delivery modes for the current store and delivery address.
   */
  deliveryModes?: string | OccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends CheckoutOccEndpoints {}
}
