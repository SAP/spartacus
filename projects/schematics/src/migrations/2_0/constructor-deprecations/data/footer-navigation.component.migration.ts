import {
  ANONYMOUS_CONSENTS_CONFIG,
  CMS_COMPONENT_DATA_CLASS,
  FOOTER_NAVIGATION_COMPONENT,
  NAVIGATION_SERVICE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const FOOTER_NAVIGATION_COMPONENT_MIGRATION: ConstructorDeprecation = {
  // projects/storefrontlib/src/cms-components/navigation/footer-navigation/footer-navigation.component.ts
  class: FOOTER_NAVIGATION_COMPONENT,
  importPath: SPARTACUS_STOREFRONTLIB,
  deprecatedParams: [
    {
      className: CMS_COMPONENT_DATA_CLASS,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: NAVIGATION_SERVICE,
      importPath: SPARTACUS_STOREFRONTLIB,
    },
    {
      className: ANONYMOUS_CONSENTS_CONFIG,
      importPath: SPARTACUS_CORE,
    },
  ],
  removeParams: [
    {
      className: ANONYMOUS_CONSENTS_CONFIG,
      importPath: SPARTACUS_CORE,
    },
  ],
};
