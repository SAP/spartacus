/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '../../occ/config/occ-config';

export const defaultBackendHttpTimeoutConfig: OccConfig = {
  backend: {
    timeout: {
      // [CXSPA-2234] (breaking change): uncomment it only in the next major (v6.0?):
      // server: 10_000,
    },
  },
};
