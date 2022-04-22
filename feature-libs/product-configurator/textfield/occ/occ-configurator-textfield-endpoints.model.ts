import { OccEndpoint } from '@spartacus/core';
declare module '@spartacus/core' {
  interface OccEndpoints {
    readTextfieldConfigurationForOrderEntry?: string | OccEndpoint;
  }
}
