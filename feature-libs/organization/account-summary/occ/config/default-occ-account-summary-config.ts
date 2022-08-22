import { OccConfig } from '@spartacus/core';
import { AccountSummaryOccEndpoints } from '../model';

const accountSummaryHeaderOccEndpoints: AccountSummaryOccEndpoints = {
  accountSummary: 'users/${userId}/orgUnits/${orgUnitId}/summary',
  accountSummaryDocument: 'users/${userId}/orgUnits/${orgUnitId}/orgDocuments'
};

export const defaultOccAccountSummaryConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        ...accountSummaryHeaderOccEndpoints
      },
    },
  },
};
