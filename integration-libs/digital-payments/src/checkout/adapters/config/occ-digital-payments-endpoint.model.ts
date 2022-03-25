import { OccEndpoint } from '@spartacus/core';

export interface DigitalPaymentsOccEndpoints {
  paymentRequest?: string | OccEndpoint;
  paymentDetails?: string | OccEndpoint;
}
declare module '@spartacus/core' {
  interface OccEndpoints extends DigitalPaymentsOccEndpoints {}
}
