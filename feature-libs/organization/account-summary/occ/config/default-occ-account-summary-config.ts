/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';
import { AccountSummaryOccEndpoints } from '../model';

const accountSummaryHeaderOccEndpoints: AccountSummaryOccEndpoints = {
  accountSummary: 'users/${userId}/orgUnits/${orgUnitId}/accountSummary',
  accountSummaryDocument: 'users/${userId}/orgUnits/${orgUnitId}/orgDocuments',
  accountSummaryDocumentAttachment:
    'users/${userId}/orgUnits/${orgUnitId}/orgDocuments/${orgDocumentId}/attachments/${orgDocumentAttachmentId}',
};

export const defaultOccAccountSummaryConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        ...accountSummaryHeaderOccEndpoints,
      },
    },
  },
};
