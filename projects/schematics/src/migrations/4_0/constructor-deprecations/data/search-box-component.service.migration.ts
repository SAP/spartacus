import {
  EVENT_SERVICE,
  ROUTING_SERVICE,
  SEARCH_BOX_COMPONENT_SERVICE,
  SEARCH_BOX_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  TRANSLATION_SERVICE,
  WINDOW_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const SEARCH_BOX_COMPONENT_SERVICE_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/cms-components/navigation/search-box/search-box-component.service.ts
  class: SEARCH_BOX_COMPONENT_SERVICE,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: SEARCH_BOX_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: ROUTING_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: TRANSLATION_SERVICE,
      importPath: SPARTACUS_CORE,
    },
    {
      className: WINDOW_REF,
      importPath: SPARTACUS_CORE,
    },
  ],
  addParams: [
    {
      className: EVENT_SERVICE,
      importPath: SPARTACUS_CORE,
    },
  ],
};
