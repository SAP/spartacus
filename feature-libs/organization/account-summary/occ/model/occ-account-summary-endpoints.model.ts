import { OccEndpoint } from '@spartacus/core';


export interface AccountSummaryOccEndpoints {

    /**
     * Get Account summary header details
     *
     * @member {string} [accountSummary]
     */

    accountSummary?: string | OccEndpoint;

    /**
     * Get Account summary documents
     *
     * @member {string} [accountSummaryDocument]
     */

    accountSummaryDocument?: string | OccEndpoint;

}

declare module '@spartacus/core' {
    interface OccEndpoints extends AccountSummaryOccEndpoints { }
}
