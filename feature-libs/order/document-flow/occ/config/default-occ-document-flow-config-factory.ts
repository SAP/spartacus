/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';
import { DocumentFlowOccEndpoints } from '../model/occ-document-flow-endpoints.model';

const documentFlowOccEndpoints: DocumentFlowOccEndpoints = {
  subsequentDocuments: 'users/${userId}/orders/${orderId}/subsequentDocuments',
  subsequentDocumentsEntries:
    'users/${userId}/orders/${orderId}/subsequentDocuments/${documentCategory}/${documentId}/entries',
};

export const defaultOccDocumentFlowConfigFactory: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        ...documentFlowOccEndpoints,
      },
    },
  },
};
