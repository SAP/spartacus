/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { OrderDocumentFlowFacade } from '@spartacus/order/document-flow/root';
import { OrderDocumentFlowService } from '../services';

export const facadeProviders: Provider[] = [
  OrderDocumentFlowService,
  {
    provide: OrderDocumentFlowFacade,
    useExisting: OrderDocumentFlowService,
  },
];
