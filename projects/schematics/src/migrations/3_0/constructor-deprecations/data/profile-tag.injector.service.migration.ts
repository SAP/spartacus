import {
  CDS_BACKEND_CONNECTOR,
  CDS_SPARTACUS_EVENT_SERVICE,
  PROFILE_TAG_EVENT_SERVICE,
  PROFILE_TAG_INJECTOR_SERVICE,
  PROFILE_TAG_LIFECYCLE_SERVICE,
  SPARTACUS_CDS,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const PROFILE_TAG_INJECTOR_SERVICE_MIGRATION: ConstructorDeprecation = {
  // integration-libs/cds/src/profiletag/services/profile-tag.injector.service.ts
  class: PROFILE_TAG_INJECTOR_SERVICE,
  importPath: SPARTACUS_CDS,
  deprecatedParams: [
    {
      className: PROFILE_TAG_EVENT_SERVICE,
      importPath: SPARTACUS_CDS,
    },
    {
      className: CDS_SPARTACUS_EVENT_SERVICE,
      importPath: SPARTACUS_CDS,
    },
    {
      className: CDS_BACKEND_CONNECTOR,
      importPath: SPARTACUS_CDS,
    },
  ],
  removeParams: [
    {
      className: CDS_SPARTACUS_EVENT_SERVICE,
      importPath: SPARTACUS_CDS,
    },
  ],
  addParams: [
    {
      className: PROFILE_TAG_LIFECYCLE_SERVICE,
      importPath: SPARTACUS_CDS,
    },
  ],
};
