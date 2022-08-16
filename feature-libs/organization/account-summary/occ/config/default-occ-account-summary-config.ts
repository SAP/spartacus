import { OccConfig, OccEndpoint } from '@spartacus/core';

//TODO Move Endpoints to their own respective model files

interface AccountSummaryDocumentEndpoints {
  accountSummaryDocument?: string | OccEndpoint;
}
declare module '@spartacus/core' {
  interface OccEndpoints extends AccountSummaryDocumentEndpoints { }
}

export interface AccountSummaryHeaderEndpoints {
  accountSummary?: string | OccEndpoint;
}
declare module '@spartacus/core' {
  interface OccEndpoints extends AccountSummaryHeaderEndpoints { }
}

export const defaultOccAccountSummaryConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        accountSummary: 'users/${userId}/orgUnits/${orgUnitId}/summary',
        accountSummaryDocument: 'users/${userId}/orgUnits/${orgUnitId}/documents'
      },
    },
  },
};
