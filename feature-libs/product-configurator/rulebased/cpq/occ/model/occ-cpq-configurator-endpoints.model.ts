declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Endpoint to get Cpq token
     *
     * @member {string}
     */
    getCpqAccessData?: string;
    /**
     * Endpoint to add a cpq configuration to the current cart
     *
     * @member {string}
     */
    addCpqConfigurationToCart?: string;
    /**
     * Endpoint for updating a cpq configuration attached to the given cart entry
     */
    updateCpqConfigurationForCartEntry?: string;
    /**
     * Endpoint for reading a CPQ configuration attached to the given cart entry
     */
    readCpqConfigurationForCartEntry?: string;
    /**
     * Endpoint for reading a CPQ configuration attached to a given order entry
     */
    readCpqConfigurationForOrderEntry?: string;
  }
}
