/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultOccServiceOrderConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        setServiceScheduleSlot:
          'users/${userId}/orders/${code}/serviceOrder/serviceScheduleSlot',
      },
    },
  },
};
