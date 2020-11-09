import {
  ANGULAR_CORE,
  CMS_COMPONENT_DATA_CLASS,
  ELEMENT_REF,
  INTERSECTION_SERVICE,
  MERCHANDISING_CAROUSEL_COMPONENT,
  MERCHANDISING_CAROUSEL_COMPONENT_SERVICE,
  ROUTING_SERVICE,
  SPARTACUS_CDS,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const MERCHANDISING_CAROUSEL_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // integration-libs/cds/src/merchandising/cms-components/merchandising-carousel/merchandising-carousel.component.ts
  class: MERCHANDISING_CAROUSEL_COMPONENT,
  importPath: SPARTACUS_CDS,
  deprecatedParams: [
    {
      className: CMS_COMPONENT_DATA_CLASS,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: MERCHANDISING_CAROUSEL_COMPONENT_SERVICE,
      importPath: SPARTACUS_CDS,
    },
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ELEMENT_REF,
      importPath: ANGULAR_CORE,
    },
  ],
  addParams: [
    {
      className: INTERSECTION_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
  ],
};
