import { OccEndpoint } from '@spartacus/core';

export interface digitalPaymentsEndpoints {
  paymentRequest?: string | OccEndpoint;
  paymentDetails?: string | OccEndpoint;
}
declare module '@spartacus/core' {
  interface OccEndpoints extends digitalPaymentsEndpoints {}
}
