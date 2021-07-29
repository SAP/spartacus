export interface HybridStorefrontEndpoints {
  /**
   * GET and POST session data to Accelerator
   *
   * @member {string}
   */
  sessionEndpoint?: string;
}

// TODO: will this work?
declare module '@spartacus/core' {
  interface OccEndpoints extends HybridStorefrontEndpoints {}
}
