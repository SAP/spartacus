/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingConfig } from '@commerce-storefront-toolset/core';

export const defaultCpqInteractiveRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      configureCLOUDCPQCONFIGURATOR: {
        paths: ['configure/cpq/:ownerType/entityKey/:entityKey'],
      },
    },
  },
};
