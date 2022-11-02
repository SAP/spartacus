/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from './occ-config';

export const defaultOccConfig: OccConfig = {
  backend: {
    occ: {
      prefix: '/occ/v2/',
    },
    media: {},

    // TODO [BREAKING CHANGE]: uncomment it only in the next major (v6.0?):
    timeout: {
      server: 10_000,
    },
  },
};
