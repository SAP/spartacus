import { OccEndpoint } from '@spartacus/core';

declare module '@spartacus/core' {
  interface OccEndpoints {
    /**
     * Starts a bundle once the productCode, its quantity, and a bundle templateId is provided. A successful result returns a CartModification response.
     *
     * @member {string}
     */
    bundleStart?: string | OccEndpoint;
    /**
     * Returns products and additional data based on the entry group and search query provided. Examples include available facets, available sorting, and pagination options. It can also include spelling suggestions. To disable spelling suggestions “enableSpellCheck” must be set to “FALSE” on the SearchQuery. Default is set to "TRUE". The configuration of indexed properties is required for spellchecking. Any of the products returned can be added to the specific entry group (bundle).
     *
     * @member {string}
     */
    bundleAllowedProductsSearch?: string | OccEndpoint;
  }
}
