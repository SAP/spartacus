import {
  ACTIVE_CART_SERVICE,
  ANGULAR_ROUTER,
  CART_SERVICE,
  CDS_CONFIG,
  CDS_SPARTACUS_EVENT_SERVICE,
  CONSENT_SERVICE,
  ROUTER,
  SPARTACUS_CDS,
  SPARTACUS_CORE,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CDS_SPARTACUS_EVENT_SERVICE_MIGRATION: ConstructorDeprecation = {
  // integration-libs/cds/src/profiletag/services/spartacus-event.service.ts
  class: CDS_SPARTACUS_EVENT_SERVICE,
  importPath: SPARTACUS_CDS,
  deprecatedParams: [
    {
      className: CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CONSENT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ROUTER,
      importPath: ANGULAR_ROUTER,
    },
    {
      className: CDS_CONFIG,
      importPath: SPARTACUS_CDS,
    },
  ],
  removeParams: [
    {
      className: CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: ACTIVE_CART_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
