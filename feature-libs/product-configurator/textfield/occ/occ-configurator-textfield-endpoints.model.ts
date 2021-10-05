import { OccEndpoint } from '@spartacus/core';
declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Endpoint for create configuration for the textfield configurator
     *
     * @member {string}
     */
    createTextfieldConfiguration?: string;
    /**
     * Endpoint for add textfield configuration to cart
     *
     * @member {string}
     */
    addTextfieldConfigurationToCart?: string;
    /**
     * Endpoint for reading textfield configuration attached to the cart entry
     */
    readTextfieldConfigurationForCartEntry?: string;
    /**
     * Endpoint for reading textfield configuration attached to the order entry
     */
    readTextfieldConfigurationForOrderEntry?: string | OccEndpoint;
    /**
     * Endpoint for updating textfield configuration attached to the cart entry
     */
    updateTextfieldConfigurationForCartEntry?: string;
  }
}
