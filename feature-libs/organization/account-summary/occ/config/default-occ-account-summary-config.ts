import { OccConfig, OccEndpoint } from '@spartacus/core';



//TODO Move Endpoints to their own respective model files

interface AccountSummaryDocumentEndpoints {
  documentData?: string | OccEndpoint;
}
declare module '@spartacus/core' {
  interface OccEndpoints extends AccountSummaryDocumentEndpoints { }
}

export interface AccountSummaryHeaderEndpoints {
  headerData?: string | OccEndpoint;
}
declare module '@spartacus/core' {
  interface OccEndpoints extends AccountSummaryHeaderEndpoints { }
}


export const defaultOccAccountSummaryConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        headerData: 'users/${userId}/accountSummary',
        documentData: 'users/${userId}/accountSummary/${unitCode}/document'
      },
    },
  },
};
