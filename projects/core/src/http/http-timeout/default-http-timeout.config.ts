/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '../../occ/config/occ-config';

export const defaultBackendHttpTimeoutConfig: OccConfig = {
  backend: {
    timeout: {
      // TODO [BREAKING CHANGE]: uncomment it only in the next major (v6.0?):
      // server: 5_000,
    },
  },
};
