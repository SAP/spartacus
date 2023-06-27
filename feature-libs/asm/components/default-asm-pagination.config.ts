/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaginationConfig } from '@spartacus/storefront';

export const defaultAsmPaginationConfig: PaginationConfig = {
  pagination: {
    rangeCount: 2,
    addPrevious: true,
    addNext: true,
    addStart: false,
    addEnd: false,
    addFirst: true,
    addLast: true,
    addDots: true,
    substituteDotsForSingularPage: true,
    dotsLabel: '···',
  },
};
