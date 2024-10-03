/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingConfig } from '@spartacus/core';

export const defaultCpqInteractiveRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      configureCLOUDCPQCONFIGURATOR: {
        paths: ['configure/cpq/:ownerType/entityKey/:entityKey'],
      },
    },
  },
};
