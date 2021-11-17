import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Endpoint to load saved carts
     *
     * * @member {string}
     */
    savedCarts?: string | OccEndpoint;
    /**
     * Endpoint to save a cart
     *
     * * @member {string}
     */
    saveCart?: string | OccEndpoint;
    /**
     * Endpoint to get specific saved cart
     *
     * * @member {string}
     */
    savedCart?: string | OccEndpoint;
    /**
     * Endpoint to make a saved cart active
     *
     * * @member {string}
     */
    restoreSavedCart?: string | OccEndpoint;
    /**
     * Endpoint to clone a saved cart
     *
     * * @member {string}
     */
    cloneSavedCart?: string | OccEndpoint;
  }
}
