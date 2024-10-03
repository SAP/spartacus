/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
  },
};
