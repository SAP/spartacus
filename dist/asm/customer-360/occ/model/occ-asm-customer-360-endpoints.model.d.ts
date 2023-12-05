import { OccEndpoint } from '@spartacus/core';
declare module '@spartacus/core' {
    interface OccEndpoints {
        /**
         * Endpoint for customer 360
         *
         * @member {string}
         */
        asmCustomer360?: string | OccEndpoint;
    }
}
