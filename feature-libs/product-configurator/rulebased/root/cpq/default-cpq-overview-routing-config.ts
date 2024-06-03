/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingConfig } from '@spartacus/core';

export const defaultCpqOverviewRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      configureOverviewCLOUDCPQCONFIGURATOR: {
        paths: [
          'configure-overview/cpq/:ownerType/entityKey/:entityKey/displayOnly/:displayOnly',
          'configure-overview/cpq/:ownerType/entityKey/:entityKey',
        ],
      },
    },
  },
};
