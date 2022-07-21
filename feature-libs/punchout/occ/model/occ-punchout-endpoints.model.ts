//import { OccEndpoint } from '@spartacus/core';

export interface PunchoutOccEndpoints {}

declare module '@spartacus/core' {
  interface OccEndpoints extends PunchoutOccEndpoints {}
}
