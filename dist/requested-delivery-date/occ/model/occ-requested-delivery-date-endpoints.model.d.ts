import { OccEndpoint } from '@spartacus/core';
declare module '@spartacus/core' {
    interface OccEndpoints {
        /**
         * Endpoint for requested delivery date
         *
         * @member {string}
         */
        requestedDeliveryDate?: string | OccEndpoint;
    }
}
