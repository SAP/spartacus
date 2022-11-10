/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CDS_MERCHANDISING_USER_CONTEXT_SERVICE,
  ROUTING_SERVICE,
  PRODUCT_SEARCH_SERVICE,
  CONVERTER_SERVICE,
  PROFILE_TAG_EVENT_SERVICE,
  PROFILE_TAG_LIFECYCLE_SERVICE,
  FACET_SERVICE,
} from '../../../../shared/constants';
import {
  SPARTACUS_CDS,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CDS_MERCHANDISING_USER_CONTEXT_SERVICE_CONSTRUCTOR_MIGRATION: ConstructorDeprecation =
  {
    // integration-libs/cds/src/merchandising/facade/cds-merchandising-user-context.service.ts
    class: CDS_MERCHANDISING_USER_CONTEXT_SERVICE,
    importPath: SPARTACUS_CDS,
    deprecatedParams: [
      {
        className: ROUTING_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: PRODUCT_SEARCH_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: CONVERTER_SERVICE,
        importPath: SPARTACUS_CORE,
      },
      {
        className: PROFILE_TAG_EVENT_SERVICE,
        importPath: SPARTACUS_CDS,
      },
      {
        className: PROFILE_TAG_LIFECYCLE_SERVICE,
        importPath: SPARTACUS_CDS,
      },
    ],
    removeParams: [
      {
        className: CONVERTER_SERVICE,
        importPath: SPARTACUS_CORE,
      },
    ],
    addParams: [
      {
        className: FACET_SERVICE,
        importPath: SPARTACUS_STOREFRONTLIB,
      },
    ],
  };
