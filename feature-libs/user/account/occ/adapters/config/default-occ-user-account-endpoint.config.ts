/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultOccUserAccountConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        user: 'users/${userId}',
        createVerificationToken: 'users/anonymous/verificationToken',
      },
    },
  },
};
